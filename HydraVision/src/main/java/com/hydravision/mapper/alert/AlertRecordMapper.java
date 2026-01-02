package com.hydravision.mapper.alert;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hydravision.entity.alert.AlertRecord;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 * 预警记录Mapper接口
 */
@Mapper
public interface AlertRecordMapper extends BaseMapper<AlertRecord> {

    /**
     * 统计各级别预警数量
     */
    @Select("SELECT alert_level as alertLevel, COUNT(*) as count FROM hf_alert_record WHERE is_deleted = 0 GROUP BY alert_level")
    List<Map<String, Object>> countByLevel();

    /**
     * 统计各状态预警数量
     */
    @Select("SELECT status, COUNT(*) as count FROM hf_alert_record WHERE is_deleted = 0 GROUP BY status")
    List<Map<String, Object>> countByStatus();

    /**
     * 获取最新预警列表
     */
    @Select("SELECT * FROM hf_alert_record WHERE is_deleted = 0 ORDER BY create_time DESC LIMIT #{limit}")
    List<AlertRecord> selectLatestAlerts(@Param("limit") Integer limit);

    /**
     * 分页查询预警记录
     */
    IPage<AlertRecord> selectAlertPage(Page<AlertRecord> page, @Param("query") Map<String, Object> query);
}
