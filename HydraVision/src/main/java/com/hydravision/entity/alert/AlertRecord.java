package com.hydravision.entity.alert;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.hydravision.common.base.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 预警记录实体类
 */
@TableName("hf_alert_record")
@Schema(description = "预警记录")
public class AlertRecord extends BaseEntity {

    @Schema(description = "预警唯一标识")
    @TableField("alert_id")
    private String alertId;

    @Schema(description = "触发规则ID")
    @TableField("rule_id")
    private Long ruleId;

    @Schema(description = "预警类型: 1-暴雨预警, 2-洪水预警, 3-内涝预警, 4-雷电预警, 5-道路积水")
    @TableField("alert_type")
    private Integer alertType;

    @Schema(description = "预警级别: 1-蓝色, 2-黄色, 3-橙色, 4-红色")
    @TableField("alert_level")
    private Integer alertLevel;

    @Schema(description = "预警区域ID")
    @TableField("area_id")
    private Long areaId;

    @Schema(description = "预警区域名称")
    @TableField("area_name")
    private String areaName;

    @Schema(description = "预警标题")
    private String title;

    @Schema(description = "预警内容")
    private String content;

    @Schema(description = "触发值")
    @TableField("trigger_value")
    private BigDecimal triggerValue;

    @Schema(description = "触发时间")
    @TableField("trigger_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime triggerTime;

    @Schema(description = "发布时间")
    @TableField("publish_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime publishTime;

    @Schema(description = "预计结束时间")
    @TableField("expected_end_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime expectedEndTime;

    @Schema(description = "实际结束时间")
    @TableField("actual_end_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime actualEndTime;

    @Schema(description = "状态: 0-待发布, 1-已发布, 2-已解除, 3-已过期, 4-已取消")
    private Integer status;

    @Schema(description = "发布人ID")
    @TableField("publisher_id")
    private Long publisherId;

    @Schema(description = "发布人姓名")
    @TableField("publisher_name")
    private String publisherName;

    @Schema(description = "解除原因")
    @TableField("release_reason")
    private String releaseReason;

    @Schema(description = "是否公开")
    @TableField("is_public")
    private Integer isPublic;

    @Schema(description = "查看次数")
    @TableField("view_count")
    private Integer viewCount;

    public String getAlertId() {
        return alertId;
    }

    public void setAlertId(String alertId) {
        this.alertId = alertId;
    }

    public Long getRuleId() {
        return ruleId;
    }

    public void setRuleId(Long ruleId) {
        this.ruleId = ruleId;
    }

    public Integer getAlertType() {
        return alertType;
    }

    public void setAlertType(Integer alertType) {
        this.alertType = alertType;
    }

    public Integer getAlertLevel() {
        return alertLevel;
    }

    public void setAlertLevel(Integer alertLevel) {
        this.alertLevel = alertLevel;
    }

    public Long getAreaId() {
        return areaId;
    }

    public void setAreaId(Long areaId) {
        this.areaId = areaId;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public BigDecimal getTriggerValue() {
        return triggerValue;
    }

    public void setTriggerValue(BigDecimal triggerValue) {
        this.triggerValue = triggerValue;
    }

    public LocalDateTime getTriggerTime() {
        return triggerTime;
    }

    public void setTriggerTime(LocalDateTime triggerTime) {
        this.triggerTime = triggerTime;
    }

    public LocalDateTime getPublishTime() {
        return publishTime;
    }

    public void setPublishTime(LocalDateTime publishTime) {
        this.publishTime = publishTime;
    }

    public LocalDateTime getExpectedEndTime() {
        return expectedEndTime;
    }

    public void setExpectedEndTime(LocalDateTime expectedEndTime) {
        this.expectedEndTime = expectedEndTime;
    }

    public LocalDateTime getActualEndTime() {
        return actualEndTime;
    }

    public void setActualEndTime(LocalDateTime actualEndTime) {
        this.actualEndTime = actualEndTime;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Long getPublisherId() {
        return publisherId;
    }

    public void setPublisherId(Long publisherId) {
        this.publisherId = publisherId;
    }

    public String getPublisherName() {
        return publisherName;
    }

    public void setPublisherName(String publisherName) {
        this.publisherName = publisherName;
    }

    public String getReleaseReason() {
        return releaseReason;
    }

    public void setReleaseReason(String releaseReason) {
        this.releaseReason = releaseReason;
    }

    public Integer getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(Integer isPublic) {
        this.isPublic = isPublic;
    }

    public Integer getViewCount() {
        return viewCount;
    }

    public void setViewCount(Integer viewCount) {
        this.viewCount = viewCount;
    }
}
