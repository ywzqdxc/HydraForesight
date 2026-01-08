package com.hydravision.service.alert;

import com.baomidou.mybatisplus.extension.service.IService;
import com.hydravision.common.result.PageResult;
import com.hydravision.dto.alert.AlertNotificationDTO;
import com.hydravision.entity.alert.AlertNotification;
import com.hydravision.vo.alert.AlertNotificationVO;

import java.util.List;

/**
 * 预警通知服务接口
 */
public interface AlertNotificationService extends IService<AlertNotification> {

    /**
     * 创建并发送预警通知（发送到首页横幅）
     */
    Long createAndSendNotification(AlertNotificationDTO dto, Long publisherId, String publisherName);

    /**
     * 撤销预警通知
     */
    void revokeNotification(Long id);

    /**
     * 获取首页横幅通知
     */
    AlertNotificationVO getBannerNotification();

    /**
     * 获取所有有效的首页横幅通知列表
     */
    List<AlertNotificationVO> getActiveBannerNotifications();

    /**
     * 分页查询预警通知记录
     */
    PageResult<AlertNotificationVO> pageNotifications(Integer notifyChannel, Integer sendStatus, Integer current, Integer size);

    /**
     * 获取预警通知详情
     */
    AlertNotificationVO getNotificationDetail(Long id);

    /**
     * 标记通知为已读
     */
    void markAsRead(Long id);
}
