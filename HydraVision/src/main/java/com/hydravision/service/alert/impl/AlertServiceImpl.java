package com.hydravision.service.alert.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.IdUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hydravision.common.exception.BusinessException;
import com.hydravision.common.result.PageResult;
import com.hydravision.common.result.ResultCode;
import com.hydravision.dto.alert.AlertCreateDTO;
import com.hydravision.dto.alert.AlertQueryDTO;
import com.hydravision.entity.alert.AlertRecord;
import com.hydravision.mapper.alert.AlertRecordMapper;
import com.hydravision.service.alert.AlertService;
import com.hydravision.vo.alert.AlertRecordVO;
import com.hydravision.vo.alert.AlertStatisticsVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 预警服务实现类
 */
@Service
public class AlertServiceImpl extends ServiceImpl<AlertRecordMapper, AlertRecord> implements AlertService {

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long createAlert(AlertCreateDTO dto) {
        AlertRecord alert = new AlertRecord();
        BeanUtil.copyProperties(dto, alert);
        alert.setAlertId("ALT" + IdUtil.getSnowflakeNextIdStr());
        alert.setStatus(0); // 待发布
        alert.setViewCount(0);
        alert.setTriggerTime(LocalDateTime.now());

        baseMapper.insert(alert);
        return alert.getId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void publishAlert(Long id) {
        AlertRecord alert = baseMapper.selectById(id);
        if (alert == null) {
            throw new BusinessException(ResultCode.ALERT_NOT_FOUND);
        }
        if (alert.getStatus() != 0) {
            throw new BusinessException("预警状态不允许发布");
        }

        alert.setStatus(1);
        alert.setPublishTime(LocalDateTime.now());
        baseMapper.updateById(alert);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void releaseAlert(Long id, String reason) {
        AlertRecord alert = baseMapper.selectById(id);
        if (alert == null) {
            throw new BusinessException(ResultCode.ALERT_NOT_FOUND);
        }
        if (alert.getStatus() == 2) {
            throw new BusinessException(ResultCode.ALERT_ALREADY_RELEASED);
        }

        alert.setStatus(2);
        alert.setActualEndTime(LocalDateTime.now());
        alert.setReleaseReason(reason);
        baseMapper.updateById(alert);
    }

    @Override
    public AlertRecordVO getAlertDetail(Long id) {
        AlertRecord alert = baseMapper.selectById(id);
        if (alert == null) {
            throw new BusinessException(ResultCode.ALERT_NOT_FOUND);
        }

        // 增加查看次数
        LambdaUpdateWrapper<AlertRecord> updateWrapper = new LambdaUpdateWrapper<>();
        updateWrapper.eq(AlertRecord::getId, id)
                .setSql("view_count = view_count + 1");
        baseMapper.update(null, updateWrapper);

        return convertToVO(alert);
    }

    @Override
    public PageResult<AlertRecordVO> pageAlerts(AlertQueryDTO query) {
        LambdaQueryWrapper<AlertRecord> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(query.getAlertType() != null, AlertRecord::getAlertType, query.getAlertType())
                .eq(query.getAlertLevel() != null, AlertRecord::getAlertLevel, query.getAlertLevel())
                .eq(query.getAreaId() != null, AlertRecord::getAreaId, query.getAreaId())
                .eq(query.getStatus() != null, AlertRecord::getStatus, query.getStatus())
                .ge(query.getStartTime() != null, AlertRecord::getTriggerTime, query.getStartTime())
                .le(query.getEndTime() != null, AlertRecord::getTriggerTime, query.getEndTime())
                .orderByDesc(AlertRecord::getCreateTime);

        IPage<AlertRecord> page = baseMapper.selectPage(
                new Page<>(query.getCurrent(), query.getSize()),
                wrapper
        );

        List<AlertRecordVO> voList = page.getRecords().stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());

        return PageResult.of(page.getCurrent(), page.getSize(), page.getTotal(), voList);
    }

    @Override
    public List<AlertRecordVO> getLatestAlerts(Integer limit) {
        return baseMapper.selectLatestAlerts(limit).stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
    }

    @Override
    public AlertStatisticsVO getStatistics() {
        AlertStatisticsVO vo = new AlertStatisticsVO();

        // 总预警数
        vo.setTotalCount(baseMapper.selectCount(null));

        // 各级别统计
        List<Map<String, Object>> levelStats = baseMapper.countByLevel();
        Map<Integer, Long> levelMap = new HashMap<>();
        for (Map<String, Object> stat : levelStats) {
            Integer level = ((Number) stat.get("alertLevel")).intValue();
            Long count = ((Number) stat.get("count")).longValue();
            levelMap.put(level, count);
        }
        vo.setBlueCount(levelMap.getOrDefault(1, 0L));
        vo.setYellowCount(levelMap.getOrDefault(2, 0L));
        vo.setOrangeCount(levelMap.getOrDefault(3, 0L));
        vo.setRedCount(levelMap.getOrDefault(4, 0L));

        // 各状态统计
        List<Map<String, Object>> statusStats = baseMapper.countByStatus();
        Map<Integer, Long> statusMap = new HashMap<>();
        for (Map<String, Object> stat : statusStats) {
            Integer status = ((Number) stat.get("status")).intValue();
            Long count = ((Number) stat.get("count")).longValue();
            statusMap.put(status, count);
        }
        vo.setPendingCount(statusMap.getOrDefault(0, 0L));
        vo.setPublishedCount(statusMap.getOrDefault(1, 0L));
        vo.setReleasedCount(statusMap.getOrDefault(2, 0L));

        return vo;
    }

    @Override
    public List<AlertRecordVO> getActiveAlerts() {
        LambdaQueryWrapper<AlertRecord> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(AlertRecord::getStatus, 1)
                .orderByDesc(AlertRecord::getAlertLevel)
                .orderByDesc(AlertRecord::getPublishTime);
        return baseMapper.selectList(wrapper).stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
    }

    private AlertRecordVO convertToVO(AlertRecord alert) {
        AlertRecordVO vo = new AlertRecordVO();
        BeanUtil.copyProperties(alert, vo);
        return vo;
    }
}
