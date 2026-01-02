package com.hydravision.mapper.region;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.hydravision.entity.region.MonitorArea;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 监测区域Mapper接口
 */
@Mapper
public interface MonitorAreaMapper extends BaseMapper<MonitorArea> {

    /**
     * 根据区域编码查询
     */
    @Select("SELECT * FROM hf_monitor_area WHERE area_code = #{areaCode} AND is_deleted = 0")
    MonitorArea selectByAreaCode(@Param("areaCode") String areaCode);

    /**
     * 查询所有启用的监测区域
     */
    @Select("SELECT * FROM hf_monitor_area WHERE status = 1 AND is_deleted = 0 ORDER BY id")
    List<MonitorArea> selectAllActive();

    /**
     * 根据风险等级查询
     */
    @Select("SELECT * FROM hf_monitor_area WHERE risk_level = #{riskLevel} AND is_deleted = 0")
    List<MonitorArea> selectByRiskLevel(@Param("riskLevel") Integer riskLevel);
}
