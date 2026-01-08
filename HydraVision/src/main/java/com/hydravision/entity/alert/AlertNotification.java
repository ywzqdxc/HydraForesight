package com.hydravision.entity.alert;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

/**
 * 预警通知记录实体类
 */
@TableName("hf_alert_notification")
@Schema(description = "预警通知记录")
public class AlertNotification {

    @Schema(description = "主键ID")
    @TableId(type = IdType.AUTO)
    private Long id;

    @Schema(description = "预警记录ID")
    @TableField("alert_record_id")
    private Long alertRecordId;

    @Schema(description = "接收用户ID")
    @TableField("user_id")
    private Long userId;

    @Schema(description = "通知渠道: 1-短信, 2-邮件, 3-APP推送, 4-微信, 5-首页横幅")
    @TableField("notify_channel")
    private Integer notifyChannel;

    @Schema(description = "通知目标")
    @TableField("notify_target")
    private String notifyTarget;

    @Schema(description = "通知内容")
    @TableField("notify_content")
    private String notifyContent;

    @Schema(description = "发送时间")
    @TableField("send_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime sendTime;

    @Schema(description = "发送状态: 0-待发送, 1-已发送, 2-发送失败")
    @TableField("send_status")
    private Integer sendStatus;

    @Schema(description = "阅读时间")
    @TableField("read_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime readTime;

    @Schema(description = "是否已读: 0-否, 1-是")
    @TableField("is_read")
    private Integer isRead;

    @Schema(description = "错误信息")
    @TableField("error_message")
    private String errorMessage;

    @Schema(description = "重试次数")
    @TableField("retry_count")
    private Integer retryCount;

    @Schema(description = "创建时间")
    @TableField("create_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
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

    public LocalDateTime getReadTime() {
        return readTime;
    }

    public void setReadTime(LocalDateTime readTime) {
        this.readTime = readTime;
    }

    public Integer getIsRead() {
        return isRead;
    }

    public void setIsRead(Integer isRead) {
        this.isRead = isRead;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public Integer getRetryCount() {
        return retryCount;
    }

    public void setRetryCount(Integer retryCount) {
        this.retryCount = retryCount;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }
}
