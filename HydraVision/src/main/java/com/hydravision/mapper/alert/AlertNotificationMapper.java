package com.hydravision.mapper.alert;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.hydravision.entity.alert.AlertNotification;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 预警通知记录Mapper接口
 */
@Mapper
public interface AlertNotificationMapper extends BaseMapper<AlertNotification> {

    /**
     * 获取首页横幅通知（最新已发布的通知）
     */
    @Select("SELECT n.*, r.title as alert_title, r.alert_level, r.alert_type " +
            "FROM hf_alert_notification n " +
            "LEFT JOIN hf_alert_record r ON n.alert_record_id = r.id " +
            "WHERE n.notify_channel = 5 AND n.send_status = 1 " +
            "ORDER BY n.send_time DESC LIMIT #{limit}")
    List<AlertNotification> selectBannerNotifications(@Param("limit") Integer limit);
}
