package com.hydravision.entity.monitor;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 降水数据实体类
 */
@Data
@TableName("hf_rainfall_data")
@Schema(description = "降水数据")
public class RainfallData implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "主键ID")
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @Schema(description = "设备ID")
    @TableField("device_id")
    private Long deviceId;

    @Schema(description = "监测区域ID")
    @TableField("area_id")
    private Long areaId;

    @Schema(description = "降水量(mm)")
    @TableField("rainfall_value")
    private BigDecimal rainfallValue;

    @Schema(description = "降水强度(mm/h)")
    @TableField("rainfall_intensity")
    private BigDecimal rainfallIntensity;

    @Schema(description = "累计降水时长(分钟)")
    @TableField("rainfall_duration")
    private Integer rainfallDuration;

    @Schema(description = "降水类型: 0-无, 1-小雨, 2-中雨, 3-大雨, 4-暴雨, 5-大暴雨")
    @TableField("rainfall_type")
    private Integer rainfallType;

    @Schema(description = "温度")
    private BigDecimal temperature;

    @Schema(description = "湿度")
    private BigDecimal humidity;

    @Schema(description = "记录时间")
    @TableField("record_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime recordTime;

    @Schema(description = "数据质量: 0-异常, 1-正常, 2-可疑")
    @TableField("data_quality")
    private Integer dataQuality;

    @Schema(description = "创建时间")
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
}
