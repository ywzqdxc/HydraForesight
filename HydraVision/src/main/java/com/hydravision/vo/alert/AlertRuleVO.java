package com.hydravision.vo.alert;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 预警规则VO
 */
@Schema(description = "预警规则VO")
public class AlertRuleVO {

    @Schema(description = "主键ID")
    private Long id;

    @Schema(description = "规则编码")
    private String ruleCode;

    @Schema(description = "规则名称")
    private String ruleName;

    @Schema(description = "规则类型: 1-降水预警, 2-水位预警, 3-内涝预警, 4-设备预警")
    private Integer ruleType;

    @Schema(description = "规则类型名称")
    private String ruleTypeName;

    @Schema(description = "适用区域ID")
    private Long areaId;

    @Schema(description = "适用区域名称")
    private String areaName;

    @Schema(description = "预警级别: 1-蓝色, 2-黄色, 3-橙色, 4-红色")
    private Integer alertLevel;

    @Schema(description = "预警级别名称")
    private String alertLevelName;

    @Schema(description = "条件类型")
    private Integer conditionType;

    @Schema(description = "阈值")
    private BigDecimal thresholdValue;

    @Schema(description = "阈值单位")
    private String thresholdUnit;

    @Schema(description = "持续时间(分钟)")
    private Integer durationMinutes;

    @Schema(description = "预警消息模板")
    private String alertMessage;

    @Schema(description = "通知渠道")
    private String notifyChannels;

    @Schema(description = "是否自动解除")
    private Integer isAutoRelease;

    @Schema(description = "状态: 0-禁用, 1-启用")
    private Integer status;

    @Schema(description = "创建时间")
    private LocalDateTime createTime;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRuleCode() {
        return ruleCode;
    }

    public void setRuleCode(String ruleCode) {
        this.ruleCode = ruleCode;
    }

    public String getRuleName() {
        return ruleName;
    }

    public void setRuleName(String ruleName) {
        this.ruleName = ruleName;
    }

    public Integer getRuleType() {
        return ruleType;
    }

    public void setRuleType(Integer ruleType) {
        this.ruleType = ruleType;
    }

    public String getRuleTypeName() {
        return ruleTypeName;
    }

    public void setRuleTypeName(String ruleTypeName) {
        this.ruleTypeName = ruleTypeName;
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

    public Integer getConditionType() {
        return conditionType;
    }

    public void setConditionType(Integer conditionType) {
        this.conditionType = conditionType;
    }

    public BigDecimal getThresholdValue() {
        return thresholdValue;
    }

    public void setThresholdValue(BigDecimal thresholdValue) {
        this.thresholdValue = thresholdValue;
    }

    public String getThresholdUnit() {
        return thresholdUnit;
    }

    public void setThresholdUnit(String thresholdUnit) {
        this.thresholdUnit = thresholdUnit;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public String getAlertMessage() {
        return alertMessage;
    }

    public void setAlertMessage(String alertMessage) {
        this.alertMessage = alertMessage;
    }

    public String getNotifyChannels() {
        return notifyChannels;
    }

    public void setNotifyChannels(String notifyChannels) {
        this.notifyChannels = notifyChannels;
    }

    public Integer getIsAutoRelease() {
        return isAutoRelease;
    }

    public void setIsAutoRelease(Integer isAutoRelease) {
        this.isAutoRelease = isAutoRelease;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }
}
