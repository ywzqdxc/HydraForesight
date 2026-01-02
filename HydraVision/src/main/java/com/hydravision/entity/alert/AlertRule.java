package com.hydravision.entity.alert;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.hydravision.common.base.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

/**
 * 预警规则实体类
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("hf_alert_rule")
@Schema(description = "预警规则")
public class AlertRule extends BaseEntity {

    @Schema(description = "规则编码")
    @TableField("rule_code")
    private String ruleCode;

    @Schema(description = "规则名称")
    @TableField("rule_name")
    private String ruleName;

    @Schema(description = "规则类型: 1-降水预警, 2-水位预警, 3-内涝预警, 4-设备预警")
    @TableField("rule_type")
    private Integer ruleType;

    @Schema(description = "适用区域ID")
    @TableField("area_id")
    private Long areaId;

    @Schema(description = "预警级别: 1-蓝色, 2-黄色, 3-橙色, 4-红色")
    @TableField("alert_level")
    private Integer alertLevel;

    @Schema(description = "条件类型: 1-阈值, 2-变化率, 3-持续时间")
    @TableField("condition_type")
    private Integer conditionType;

    @Schema(description = "阈值")
    @TableField("threshold_value")
    private BigDecimal thresholdValue;

    @Schema(description = "阈值单位")
    @TableField("threshold_unit")
    private String thresholdUnit;

    @Schema(description = "持续时间(分钟)")
    @TableField("duration_minutes")
    private Integer durationMinutes;

    @Schema(description = "预警消息模板")
    @TableField("alert_message")
    private String alertMessage;

    @Schema(description = "通知渠道")
    @TableField("notify_channels")
    private String notifyChannels;

    @Schema(description = "通知用户ID")
    @TableField("notify_users")
    private String notifyUsers;

    @Schema(description = "是否自动解除")
    @TableField("is_auto_release")
    private Integer isAutoRelease;

    @Schema(description = "解除阈值")
    @TableField("release_threshold")
    private BigDecimal releaseThreshold;

    @Schema(description = "优先级")
    private Integer priority;

    @Schema(description = "状态: 0-禁用, 1-启用")
    private Integer status;
}
