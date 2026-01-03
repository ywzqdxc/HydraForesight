package com.hydravision.service.monitor.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hydravision.common.result.PageResult;
import com.hydravision.entity.alert.AlertRecord;
import com.hydravision.entity.device.Device;
import com.hydravision.entity.monitor.RainfallData;
import com.hydravision.entity.report.PublicReport;
import com.hydravision.mapper.alert.AlertRecordMapper;
import com.hydravision.mapper.device.DeviceMapper;
import com.hydravision.mapper.monitor.RainfallDataMapper;
import com.hydravision.mapper.report.PublicReportMapper;
import com.hydravision.service.monitor.MonitorDataService;
import com.hydravision.vo.monitor.DashboardDataVO;
import com.hydravision.vo.monitor.RainfallDataVO;
import com.hydravision.vo.monitor.RainfallStatisticsVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 监测数据服务实现类
 */
@Service
@RequiredArgsConstructor
public class MonitorDataServiceImpl implements MonitorDataService {

    private final RainfallDataMapper rainfallDataMapper;
    private final DeviceMapper deviceMapper;
    private final AlertRecordMapper alertRecordMapper;
    private final PublicReportMapper publicReportMapper;

    @Override
    public DashboardDataVO getDashboardData() {
        DashboardDataVO vo = new DashboardDataVO();

        // 设备统计
        Long totalDevices = deviceMapper.selectCount(null);
        LambdaQueryWrapper<Device> onlineWrapper = new LambdaQueryWrapper<>();
        onlineWrapper.eq(Device::getStatus, 1);
        Long onlineDevices = deviceMapper.selectCount(onlineWrapper);

        LambdaQueryWrapper<Device> warningWrapper = new LambdaQueryWrapper<>();
        warningWrapper.eq(Device::getStatus, 2);
        Long warningDevices = deviceMapper.selectCount(warningWrapper);

        vo.setTotalDevices(totalDevices.intValue());
        vo.setOnlineDevices(onlineDevices.intValue());
        vo.setWarningDevices(warningDevices.intValue());

        // 活跃预警数
        LambdaQueryWrapper<AlertRecord> activeAlertWrapper = new LambdaQueryWrapper<>();
        activeAlertWrapper.eq(AlertRecord::getStatus, 1);
        Long activeAlerts = alertRecordMapper.selectCount(activeAlertWrapper);
        vo.setActiveAlerts(activeAlerts.intValue());

        // 今日公众上报数
        LambdaQueryWrapper<PublicReport> reportWrapper = new LambdaQueryWrapper<>();
        reportWrapper.ge(PublicReport::getReportTime, LocalDateTime.of(LocalDate.now(), LocalTime.MIN));
        Long todayReports = publicReportMapper.selectCount(reportWrapper);
        vo.setTodayReports(todayReports.intValue());

        // 今日降水量统计
        RainfallStatisticsVO rainfallStats = getRainfallStatistics(null, 1);
        vo.setTodayRainfall(rainfallStats.getTotalRainfall());
        vo.setMonthRainfall(rainfallStats.getMonthRainfall());

        return vo;
    }

    @Override
    public List<RainfallDataVO> getLatestRainfallData(Integer limit) {
        LambdaQueryWrapper<RainfallData> wrapper = new LambdaQueryWrapper<>();
        wrapper.orderByDesc(RainfallData::getRecordTime)
                .last("LIMIT " + limit);
        return rainfallDataMapper.selectList(wrapper).stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
    }

    @Override
    public List<RainfallDataVO> getAreaRainfallData(Long areaId, LocalDate startDate, LocalDate endDate) {
        LambdaQueryWrapper<RainfallData> wrapper = new LambdaQueryWrapper<>();
        if (areaId != null) {
            wrapper.eq(RainfallData::getAreaId, areaId);
        }
        wrapper.ge(RainfallData::getRecordTime, LocalDateTime.of(startDate, LocalTime.MIN))
                .le(RainfallData::getRecordTime, LocalDateTime.of(endDate, LocalTime.MAX))
                .orderByAsc(RainfallData::getRecordTime);
        return rainfallDataMapper.selectList(wrapper).stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
    }

    @Override
    public RainfallStatisticsVO getRainfallStatistics(Long areaId, Integer days) {
        RainfallStatisticsVO vo = new RainfallStatisticsVO();

        LocalDateTime startTime = LocalDateTime.now().minusDays(days);

        LambdaQueryWrapper<RainfallData> wrapper = new LambdaQueryWrapper<>();
        if (areaId != null) {
            wrapper.eq(RainfallData::getAreaId, areaId);
        }
        wrapper.ge(RainfallData::getRecordTime, startTime);

        List<RainfallData> dataList = rainfallDataMapper.selectList(wrapper);

        if (dataList.isEmpty()) {
            vo.setTotalRainfall(BigDecimal.ZERO);
            vo.setMaxRainfall(BigDecimal.ZERO);
            vo.setAvgRainfall(BigDecimal.ZERO);
            vo.setMonthRainfall(BigDecimal.ZERO);
            return vo;
        }

        BigDecimal total = dataList.stream()
                .map(RainfallData::getRainfallValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal max = dataList.stream()
                .map(RainfallData::getRainfallValue)
                .max(BigDecimal::compareTo)
                .orElse(BigDecimal.ZERO);

        BigDecimal avg = total.divide(BigDecimal.valueOf(dataList.size()), 2, RoundingMode.HALF_UP);

        vo.setTotalRainfall(total);
        vo.setMaxRainfall(max);
        vo.setAvgRainfall(avg);

        // 本月降水量
        LocalDateTime monthStart = LocalDateTime.of(LocalDate.now().withDayOfMonth(1), LocalTime.MIN);
        LambdaQueryWrapper<RainfallData> monthWrapper = new LambdaQueryWrapper<>();
        if (areaId != null) {
            monthWrapper.eq(RainfallData::getAreaId, areaId);
        }
        monthWrapper.ge(RainfallData::getRecordTime, monthStart);
        List<RainfallData> monthDataList = rainfallDataMapper.selectList(monthWrapper);
        BigDecimal monthTotal = monthDataList.stream()
                .map(RainfallData::getRainfallValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        vo.setMonthRainfall(monthTotal);

        return vo;
    }

    @Override
    public PageResult<RainfallDataVO> pageRainfallData(Long areaId, Integer current, Integer size) {
        LambdaQueryWrapper<RainfallData> wrapper = new LambdaQueryWrapper<>();
        if (areaId != null) {
            wrapper.eq(RainfallData::getAreaId, areaId);
        }
        wrapper.orderByDesc(RainfallData::getRecordTime);

        IPage<RainfallData> page = rainfallDataMapper.selectPage(new Page<>(current, size), wrapper);

        List<RainfallDataVO> voList = page.getRecords().stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());

        return PageResult.of(page.getCurrent(), page.getSize(), page.getTotal(), voList);
    }

    private RainfallDataVO convertToVO(RainfallData data) {
        RainfallDataVO vo = new RainfallDataVO();
        BeanUtil.copyProperties(data, vo);
        return vo;
    }
}
