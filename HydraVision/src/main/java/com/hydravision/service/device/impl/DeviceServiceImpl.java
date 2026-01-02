package com.hydravision.service.device.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.IdUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hydravision.common.exception.BusinessException;
import com.hydravision.common.result.PageResult;
import com.hydravision.common.result.ResultCode;
import com.hydravision.dto.device.DeviceCreateDTO;
import com.hydravision.dto.device.DeviceQueryDTO;
import com.hydravision.dto.device.DeviceUpdateDTO;
import com.hydravision.entity.device.Device;
import com.hydravision.mapper.device.DeviceMapper;
import com.hydravision.service.device.DeviceService;
import com.hydravision.vo.device.DeviceStatisticsVO;
import com.hydravision.vo.device.DeviceVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 设备服务实现类
 */
@Service
@RequiredArgsConstructor
public class DeviceServiceImpl extends ServiceImpl<DeviceMapper, Device> implements DeviceService {

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long createDevice(DeviceCreateDTO dto) {
        // 检查设备ID是否存在
        if (baseMapper.selectByDeviceId(dto.getDeviceId()) != null) {
            throw new BusinessException(ResultCode.DEVICE_ALREADY_EXISTS);
        }

        Device device = new Device();
        BeanUtil.copyProperties(dto, device);
        device.setStatus(1); // 默认在线

        baseMapper.insert(device);
        return device.getId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateDevice(DeviceUpdateDTO dto) {
        Device device = baseMapper.selectById(dto.getId());
        if (device == null) {
            throw new BusinessException(ResultCode.DEVICE_NOT_FOUND);
        }

        BeanUtil.copyProperties(dto, device, "id", "deviceId");
        baseMapper.updateById(device);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteDevice(Long id) {
        Device device = baseMapper.selectById(id);
        if (device == null) {
            throw new BusinessException(ResultCode.DEVICE_NOT_FOUND);
        }
        baseMapper.deleteById(id);
    }

    @Override
    public DeviceVO getDeviceDetail(Long id) {
        Device device = baseMapper.selectById(id);
        if (device == null) {
            throw new BusinessException(ResultCode.DEVICE_NOT_FOUND);
        }
        return convertToVO(device);
    }

    @Override
    public PageResult<DeviceVO> pageDevices(DeviceQueryDTO query) {
        LambdaQueryWrapper<Device> wrapper = new LambdaQueryWrapper<>();
        wrapper.like(StringUtils.hasText(query.getDeviceName()), Device::getDeviceName, query.getDeviceName())
                .like(StringUtils.hasText(query.getDeviceId()), Device::getDeviceId, query.getDeviceId())
                .eq(query.getDeviceType() != null, Device::getDeviceType, query.getDeviceType())
                .eq(query.getAreaId() != null, Device::getAreaId, query.getAreaId())
                .eq(query.getStatus() != null, Device::getStatus, query.getStatus())
                .orderByDesc(Device::getCreateTime);

        IPage<Device> page = baseMapper.selectPage(
                new Page<>(query.getCurrent(), query.getSize()),
                wrapper
        );

        List<DeviceVO> voList = page.getRecords().stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());

        return PageResult.of(page.getCurrent(), page.getSize(), page.getTotal(), voList);
    }

    @Override
    public DeviceStatisticsVO getStatistics() {
        DeviceStatisticsVO vo = new DeviceStatisticsVO();

        // 总设备数
        vo.setTotalCount(baseMapper.selectCount(null));

        // 各状态统计
        List<Map<String, Object>> statusStats = baseMapper.countByStatus();
        Map<Integer, Long> statusMap = new HashMap<>();
        for (Map<String, Object> stat : statusStats) {
            Integer status = ((Number) stat.get("status")).intValue();
            Long count = ((Number) stat.get("count")).longValue();
            statusMap.put(status, count);
        }
        vo.setOnlineCount(statusMap.getOrDefault(1, 0L));
        vo.setOfflineCount(statusMap.getOrDefault(0, 0L));
        vo.setWarningCount(statusMap.getOrDefault(2, 0L));
        vo.setMaintenanceCount(statusMap.getOrDefault(3, 0L));

        // 各类型统计
        List<Map<String, Object>> typeStats = baseMapper.countByType();
        vo.setTypeStatistics(typeStats);

        // 各区域统计
        List<Map<String, Object>> areaStats = baseMapper.countByArea();
        vo.setAreaStatistics(areaStats);

        return vo;
    }

    @Override
    public List<DeviceVO> getOnlineDevices() {
        LambdaQueryWrapper<Device> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Device::getStatus, 1);
        return baseMapper.selectList(wrapper).stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateDeviceStatus(Long id, Integer status) {
        Device device = baseMapper.selectById(id);
        if (device == null) {
            throw new BusinessException(ResultCode.DEVICE_NOT_FOUND);
        }
        device.setStatus(status);
        baseMapper.updateById(device);
    }

    private DeviceVO convertToVO(Device device) {
        DeviceVO vo = new DeviceVO();
        BeanUtil.copyProperties(device, vo);
        return vo;
    }
}
