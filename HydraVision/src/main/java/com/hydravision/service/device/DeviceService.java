package com.hydravision.service.device;

import com.baomidou.mybatisplus.extension.service.IService;
import com.hydravision.common.result.PageResult;
import com.hydravision.dto.device.DeviceCreateDTO;
import com.hydravision.dto.device.DeviceQueryDTO;
import com.hydravision.dto.device.DeviceUpdateDTO;
import com.hydravision.entity.device.Device;
import com.hydravision.vo.device.DeviceStatisticsVO;
import com.hydravision.vo.device.DeviceVO;

import java.util.List;

/**
 * 设备服务接口
 */
public interface DeviceService extends IService<Device> {

    /**
     * 创建设备
     */
    Long createDevice(DeviceCreateDTO dto);

    /**
     * 更新设备
     */
    void updateDevice(DeviceUpdateDTO dto);

    /**
     * 删除设备
     */
    void deleteDevice(Long id);

    /**
     * 获取设备详情
     */
    DeviceVO getDeviceDetail(Long id);

    /**
     * 分页查询设备
     */
    PageResult<DeviceVO> pageDevices(DeviceQueryDTO query);

    /**
     * 获取设备统计信息
     */
    DeviceStatisticsVO getStatistics();

    /**
     * 获取所有在线设备
     */
    List<DeviceVO> getOnlineDevices();

    /**
     * 更新设备状态
     */
    void updateDeviceStatus(Long id, Integer status);
}
