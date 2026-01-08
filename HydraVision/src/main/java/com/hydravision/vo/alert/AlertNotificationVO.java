package com.hydravision.vo.alert;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

/**
 * 预警通知记录VO
 */
@Schema(description = "预警通知记录VO")
public class AlertNotificationVO {

    @Schema(description = "主键ID")
    private Long id;

    @Schema(description = "预警记录ID")
    private Long alertRecordId;

    @Schema(description = "预警标题")
    private String alertTitle;

    @Schema(description = "预警级别")
    private Integer alertLevel;

    @Schema(description = "预警级别名称")
    private String alertLevelName;

    @Schema(description = "预警类型")
    private Integer alertType;

    @Schema(description = "预警类型名称")
    private String alertTypeName;

    @Schema(description = "预警区域")
    private String areaName;

    @Schema(description = "接收用户ID")
    private Long userId;

    @Schema(description = "通知渠道: 1-短信, 2-邮件, 3-APP推送, 4-微信, 5-首页横幅")
    private Integer notifyChannel;

    @Schema(description = "通知渠道名称")
    private String notifyChannelName;

    @Schema(description = "通知目标")
    private String notifyTarget;

    @Schema(description = "通知内容")
    private String notifyContent;

    @Schema(description = "发送时间")
    private LocalDateTime sendTime;

    @Schema(description = "发送状态: 0-待发送, 1-已发送, 2-发送失败")
    private Integer sendStatus;

    @Schema(description = "发送状态名称")
    private String sendStatusName;

    @Schema(description = "是否已读")
    private Integer isRead;

    @Schema(description = "创建时间")
    private LocalDateTime createTime;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAlertRecordId() {
        return alertRecordId;
    }

    public void setAlertRecordId(Long alertRecordId) {
        this.alertRecordId = alertRecordId;
    }

    public String getAlertTitle() {
        return alertTitle;
    }

    public void setAlertTitle(String alertTitle) {
        this.alertTitle = alertTitle;
    }

    public Integer getAlertLevel() {
        return alertLevel;
    }

    public void setAlertLevel(Integer alertLevel) {
        this.alertLevel = alertLevel;
    }

    public String getAlertLevelName() {
        return alertLevelName;
    }

    public void setAlertLevelName(String alertLevelName) {
        this.alertLevelName = alertLevelName;
    }

    public Integer getAlertType() {
        return alertType;
    }

    public void setAlertType(Integer alertType) {
        this.alertType = alertType;
    }

    public String getAlertTypeName() {
        return alertTypeName;
    }

    public void setAlertTypeName(String alertTypeName) {
        this.alertTypeName = alertTypeName;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Integer getNotifyChannel() {
        return notifyChannel;
    }

    public void setNotifyChannel(Integer notifyChannel) {
        this.notifyChannel = notifyChannel;
    }

    public String getNotifyChannelName() {
        return notifyChannelName;
    }

    public void setNotifyChannelName(String notifyChannelName) {
        this.notifyChannelName = notifyChannelName;
    }

    public String getNotifyTarget() {
        return notifyTarget;
    }

    public void setNotifyTarget(String notifyTarget) {
        this.notifyTarget = notifyTarget;
    }

    public String getNotifyContent() {
        return notifyContent;
    }

    public void setNotifyContent(String notifyContent) {
        this.notifyContent = notifyContent;
    }

    public LocalDateTime getSendTime() {
        return sendTime;
    }

    public void setSendTime(LocalDateTime sendTime) {
        this.sendTime = sendTime;
    }

    public Integer getSendStatus() {
        return sendStatus;
    }

    public void setSendStatus(Integer sendStatus) {
        this.sendStatus = sendStatus;
    }

    public String getSendStatusName() {
        return sendStatusName;
    }

    public void setSendStatusName(String sendStatusName) {
        this.sendStatusName = sendStatusName;
    }

    public Integer getIsRead() {
        return isRead;
    }

    public void setIsRead(Integer isRead) {
        this.isRead = isRead;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }
}
