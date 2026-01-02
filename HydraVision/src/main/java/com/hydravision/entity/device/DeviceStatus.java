package com.hydravision.entity.device;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 设备状态记录实体类
 */
@Data
@TableName("hf_device_status")
@Schema(description = "设备状态记录")
public class DeviceStatus implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "主键ID")
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @Schema(description = "设备ID")
    @TableField("device_id")
    private Long deviceId;

    @Schema(description = "电池电量百分比")
    @TableField("battery_level")
    private Integer batteryLevel;

    @Schema(description = "信号强度百分比")
    @TableField("signal_strength")
    private Integer signalStrength;

    @Schema(description = "设备温度")
    private BigDecimal temperature;

    @Schema(description = "设备湿度")
    private BigDecimal humidity;

    @Schema(description = "状态: 0-离线, 1-在线, 2-警告, 3-故障")
    private Integer status;

    @Schema(description = "错误代码")
    @TableField("error_code")
    private String errorCode;

    @Schema(description = "错误信息")
    @TableField("error_message")
    private String errorMessage;

    @Schema(description = "最后心跳时间")
    @TableField("last_heartbeat")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastHeartbeat;

    @Schema(description = "记录时间")
    @TableField("record_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime recordTime;

    @Schema(description = "创建时间")
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
}
