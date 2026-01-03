package com.hydravision.vo.monitor;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 降水数据VO
 */
@Data
@Schema(description = "降水数据")
public class RainfallDataVO {

    @Schema(description = "主键ID")
    private Long id;

    @Schema(description = "设备ID")
    private Long deviceId;

    @Schema(description = "监测区域ID")
    private Long areaId;

    @Schema(description = "降水量(mm)")
    private BigDecimal rainfallValue;

    @Schema(description = "降水强度(mm/h)")
    private BigDecimal rainfallIntensity;

    @Schema(description = "降水类型")
    private Integer rainfallType;

    @Schema(description = "温度(℃)")
    private BigDecimal temperature;

    @Schema(description = "湿度(%)")
    private BigDecimal humidity;

    @Schema(description = "记录时间")
    private LocalDateTime recordTime;
}
