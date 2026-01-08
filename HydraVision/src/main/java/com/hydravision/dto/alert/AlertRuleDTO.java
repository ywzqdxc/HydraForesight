package com.hydravision.dto.alert;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

/**
 * 预警规则创建/更新DTO
 */
@Schema(description = "预警规则DTO")
public class AlertRuleDTO {

    @Schema(description = "主键ID(更新时必填)")
    private Long id;

    @Schema(description = "规则编码")
    @NotBlank(message = "规则编码不能为空")
    private String ruleCode;

    @Schema(description = "规则名称")
    @NotBlank(message = "规则名称不能为空")
    private String ruleName;

    @Schema(description = "规则类型: 1-降水预警, 2-水位预警, 3-内涝预警, 4-设备预警")
    @NotNull(message = "规则类型不能为空")
    private Integer ruleType;

    @Schema(description = "适用区域ID")
    private Long areaId;

    @Schema(description = "预警级别: 1-蓝色, 2-黄色, 3-橙色, 4-红色")
    @NotNull(message = "预警级别不能为空")
    private Integer alertLevel;

    @Schema(description = "条件类型: 1-阈值, 2-变化率, 3-持续时间")
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

    @Schema(description = "解除阈值")
    private BigDecimal releaseThreshold;

    @Schema(description = "状态: 0-禁用, 1-启用")
    private Integer status;

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

    public Long getAreaId() {
        return areaId;
    }

    public void setAreaId(Long areaId) {
        this.areaId = areaId;
    }

    public Integer getAlertLevel() {
        return alertLevel;
    }

    public void setAlertLevel(Integer alertLevel) {
        this.alertLevel = alertLevel;
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

    public BigDecimal getReleaseThreshold() {
        return releaseThreshold;
    }

    public void setReleaseThreshold(BigDecimal releaseThreshold) {
        this.releaseThreshold = releaseThreshold;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
