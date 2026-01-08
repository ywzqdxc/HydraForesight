package com.hydravision.service.alert.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.IdUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hydravision.common.exception.BusinessException;
import com.hydravision.common.result.PageResult;
import com.hydravision.dto.alert.AlertNotificationDTO;
import com.hydravision.entity.alert.AlertNotification;
import com.hydravision.entity.alert.AlertRecord;
import com.hydravision.mapper.alert.AlertNotificationMapper;
import com.hydravision.mapper.alert.AlertRecordMapper;
import com.hydravision.service.alert.AlertNotificationService;
import com.hydravision.vo.alert.AlertNotificationVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 预警通知服务实现类
 */
@Service
public class AlertNotificationServiceImpl extends ServiceImpl<AlertNotificationMapper, AlertNotification> implements AlertNotificationService {

    private static final String[] ALERT_TYPE_NAMES = {"", "暴雨预警", "洪水预警", "内涝预警", "雷电预警", "道路积水"};
    private static final String[] ALERT_LEVEL_NAMES = {"", "蓝色", "黄色", "橙色", "红色"};
    private static final String[] NOTIFY_CHANNEL_NAMES = {"", "短信", "邮件", "APP推送", "微信", "首页横幅"};
    private static final String[] SEND_STATUS_NAMES = {"待发送", "已发送", "发送失败"};

    @Autowired
    private AlertRecordMapper alertRecordMapper;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long createAndSendNotification(AlertNotificationDTO dto, Long publisherId, String publisherName) {
        Long alertRecordId = dto.getAlertRecordId();

        // 如果没有关联预警记录，先创建一条预警记录
        if (alertRecordId == null) {
            AlertRecord alertRecord = new AlertRecord();
            alertRecord.setAlertId("ALT" + IdUtil.getSnowflakeNextIdStr());
            alertRecord.setAlertType(dto.getAlertType());
            alertRecord.setAlertLevel(dto.getAlertLevel());
            alertRecord.setAreaId(dto.getAreaId() != null ? dto.getAreaId() : 0L);
            alertRecord.setAreaName(dto.getAreaName());
            alertRecord.setTitle(dto.getTitle());
            alertRecord.setContent(dto.getContent());
            alertRecord.setTriggerTime(LocalDateTime.now());
            alertRecord.setPublishTime(LocalDateTime.now());
            alertRecord.setPublisherId(publisherId);
            alertRecord.setPublisherName(publisherName);
            alertRecord.setStatus(1); // 已发布
            alertRecord.setIsPublic(1);
            alertRecord.setViewCount(0);
            alertRecordMapper.insert(alertRecord);
            alertRecordId = alertRecord.getId();
        }

        // 创建通知记录
        AlertNotification notification = new AlertNotification();
        notification.setAlertRecordId(alertRecordId);
        notification.setUserId(0L); // 首页横幅面向所有用户
        notification.setNotifyChannel(dto.getNotifyChannel() != null ? dto.getNotifyChannel() : 5);
        notification.setNotifyTarget("首页横幅");
        notification.setNotifyContent(dto.getContent());
        notification.setSendTime(LocalDateTime.now());
        notification.setSendStatus(1); // 已发送
        notification.setIsRead(0);
        notification.setRetryCount(0);
        notification.setCreateTime(LocalDateTime.now());

        baseMapper.insert(notification);
        return notification.getId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void revokeNotification(Long id) {
        AlertNotification notification = baseMapper.selectById(id);
        if (notification == null) {
            throw new BusinessException("通知记录不存在");
        }
        notification.setSendStatus(2); // 标记为发送失败/已撤销
        baseMapper.updateById(notification);

        // 同时更新关联的预警记录状态为已解除
        AlertRecord alertRecord = alertRecordMapper.selectById(notification.getAlertRecordId());
        if (alertRecord != null && alertRecord.getStatus() == 1) {
            alertRecord.setStatus(2); // 已解除
            alertRecord.setActualEndTime(LocalDateTime.now());
            alertRecord.setReleaseReason("手动撤销通知");
            alertRecordMapper.updateById(alertRecord);
        }
    }

    @Override
    public AlertNotificationVO getBannerNotification() {
        // 获取最新的首页横幅通知（已发送状态）
        LambdaQueryWrapper<AlertNotification> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(AlertNotification::getNotifyChannel, 5)
                .eq(AlertNotification::getSendStatus, 1)
                .orderByDesc(AlertNotification::getSendTime)
                .last("LIMIT 1");
        AlertNotification notification = baseMapper.selectOne(wrapper);
        if (notification == null) {
            return null;
        }
        return convertToVO(notification);
    }

    @Override
    public List<AlertNotificationVO> getActiveBannerNotifications() {
        LambdaQueryWrapper<AlertNotification> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(AlertNotification::getNotifyChannel, 5)
                .eq(AlertNotification::getSendStatus, 1)
                .orderByDesc(AlertNotification::getSendTime);
        return baseMapper.selectList(wrapper).stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
    }

    @Override
    public PageResult<AlertNotificationVO> pageNotifications(Integer notifyChannel, Integer sendStatus, Integer current, Integer size) {
        LambdaQueryWrapper<AlertNotification> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(notifyChannel != null, AlertNotification::getNotifyChannel, notifyChannel)
                .eq(sendStatus != null, AlertNotification::getSendStatus, sendStatus)
                .orderByDesc(AlertNotification::getCreateTime);

        IPage<AlertNotification> page = baseMapper.selectPage(new Page<>(current, size), wrapper);
        List<AlertNotificationVO> voList = page.getRecords().stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());

        return PageResult.of(page.getCurrent(), page.getSize(), page.getTotal(), voList);
    }

    @Override
    public AlertNotificationVO getNotificationDetail(Long id) {
        AlertNotification notification = baseMapper.selectById(id);
        if (notification == null) {
            throw new BusinessException("通知记录不存在");
        }
        return convertToVO(notification);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void markAsRead(Long id) {
        AlertNotification notification = baseMapper.selectById(id);
        if (notification != null && notification.getIsRead() == 0) {
            notification.setIsRead(1);
            notification.setReadTime(LocalDateTime.now());
            baseMapper.updateById(notification);
        }
    }

    private AlertNotificationVO convertToVO(AlertNotification notification) {
        AlertNotificationVO vo = new AlertNotificationVO();
        BeanUtil.copyProperties(notification, vo);

        if (notification.getNotifyChannel() != null && notification.getNotifyChannel() < NOTIFY_CHANNEL_NAMES.length) {
            vo.setNotifyChannelName(NOTIFY_CHANNEL_NAMES[notification.getNotifyChannel()]);
        }
        if (notification.getSendStatus() != null && notification.getSendStatus() < SEND_STATUS_NAMES.length) {
            vo.setSendStatusName(SEND_STATUS_NAMES[notification.getSendStatus()]);
        }

        // 获取关联的预警记录信息
        if (notification.getAlertRecordId() != null) {
            AlertRecord alertRecord = alertRecordMapper.selectById(notification.getAlertRecordId());
            if (alertRecord != null) {
                vo.setAlertTitle(alertRecord.getTitle());
                vo.setAlertLevel(alertRecord.getAlertLevel());
                vo.setAlertType(alertRecord.getAlertType());
                vo.setAreaName(alertRecord.getAreaName());

                if (alertRecord.getAlertType() != null && alertRecord.getAlertType() < ALERT_TYPE_NAMES.length) {
                    vo.setAlertTypeName(ALERT_TYPE_NAMES[alertRecord.getAlertType()]);
                }
                if (alertRecord.getAlertLevel() != null && alertRecord.getAlertLevel() < ALERT_LEVEL_NAMES.length) {
                    vo.setAlertLevelName(ALERT_LEVEL_NAMES[alertRecord.getAlertLevel()]);
                }
            }
        }

        return vo;
    }
}
