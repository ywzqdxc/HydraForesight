package com.hydravision.mapper.monitor;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.hydravision.entity.monitor.RainfallData;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * 降水数据Mapper接口
 */
@Mapper
public interface RainfallDataMapper extends BaseMapper<RainfallData> {

    /**
     * 获取区域最新降水数据
     */
    @Select("SELECT * FROM hf_rainfall_data WHERE area_id = #{areaId} ORDER BY record_time DESC LIMIT 1")
    RainfallData selectLatestByArea(@Param("areaId") Long areaId);

    /**
     * 获取时间范围内的降水数据
     */
    List<RainfallData> selectByTimeRange(@Param("areaId") Long areaId,
                                         @Param("startTime") LocalDateTime startTime,
                                         @Param("endTime") LocalDateTime endTime);

    /**
     * 统计区域降水量
     */
    @Select("SELECT SUM(rainfall_value) FROM hf_rainfall_data WHERE area_id = #{areaId} AND record_time BETWEEN #{startTime} AND #{endTime}")
    Double sumRainfallByArea(@Param("areaId") Long areaId,
                             @Param("startTime") LocalDateTime startTime,
                             @Param("endTime") LocalDateTime endTime);

    /**
     * 获取各区域降水统计
     */
    List<Map<String, Object>> selectRainfallStatsByArea(@Param("startTime") LocalDateTime startTime,
                                                        @Param("endTime") LocalDateTime endTime);
}
