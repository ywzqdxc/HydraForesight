package com.hydravision.dto.alert;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * 预警通知创建DTO
 */
@Schema(description = "预警通知DTO")
public class AlertNotificationDTO {

    @Schema(description = "预警记录ID(已有预警时填写)")
    private Long alertRecordId;

    @Schema(description = "预警类型: 1-暴雨预警, 2-洪水预警, 3-内涝预警, 4-雷电预警, 5-道路积水")
    @NotNull(message = "预警类型不能为空")
    private Integer alertType;

    @Schema(description = "预警级别: 1-蓝色, 2-黄色, 3-橙色, 4-红色")
    @NotNull(message = "预警级别不能为空")
    private Integer alertLevel;

    @Schema(description = "预警区域ID(0表示全局)")
    private Long areaId;

    @Schema(description = "预警区域名称")
    @NotBlank(message = "预警区域不能为空")
    private String areaName;

    @Schema(description = "预警标题")
    @NotBlank(message = "预警标题不能为空")
    private String title;

    @Schema(description = "预警内容")
    @NotBlank(message = "预警内容不能为空")
    private String content;

    @Schema(description = "通知渠道: 5-首页横幅")
    private Integer notifyChannel = 5;

    // Getters and Setters
    public Long getAlertRecordId() {
        return alertRecordId;
    }

    public void setAlertRecordId(Long alertRecordId) {
        this.alertRecordId = alertRecordId;
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

    public Integer getNotifyChannel() {
        return notifyChannel;
    }

    public void setNotifyChannel(Integer notifyChannel) {
        this.notifyChannel = notifyChannel;
    }
}
