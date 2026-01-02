package com.hydravision.mapper.device;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hydravision.entity.device.Device;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 * 设备Mapper接口
 */
@Mapper
public interface DeviceMapper extends BaseMapper<Device> {

    /**
     * 根据设备ID查询设备
     */
    @Select("SELECT * FROM hf_device WHERE device_id = #{deviceId} AND is_deleted = 0")
    Device selectByDeviceId(@Param("deviceId") String deviceId);

    /**
     * 统计各状态设备数量
     */
    @Select("SELECT status, COUNT(*) as count FROM hf_device WHERE is_deleted = 0 GROUP BY status")
    List<Map<String, Object>> countByStatus();

    /**
     * 统计各类型设备数量
     */
    @Select("SELECT device_type as deviceType, COUNT(*) as count FROM hf_device WHERE is_deleted = 0 GROUP BY device_type")
    List<Map<String, Object>> countByType();

    /**
     * 统计各区域设备数量
     */
    @Select("SELECT area_id as areaId, COUNT(*) as count FROM hf_device WHERE is_deleted = 0 GROUP BY area_id")
    List<Map<String, Object>> countByArea();

    /**
     * 分页查询设备列表
     */
    IPage<Device> selectDevicePage(Page<Device> page, @Param("query") Map<String, Object> query);
}
