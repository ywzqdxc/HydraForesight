package com.hydravision.mapper.alert;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.hydravision.entity.alert.AlertResponse;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 预警响应记录Mapper接口
 */
@Mapper
public interface AlertResponseMapper extends BaseMapper<AlertResponse> {

    /**
     * 获取预警的所有响应记录
     */
    @Select("SELECT * FROM hf_alert_response WHERE alert_record_id = #{alertRecordId} ORDER BY response_time DESC")
    List<AlertResponse> selectByAlertRecordId(@Param("alertRecordId") Long alertRecordId);
}
