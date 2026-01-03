package com.hydravision.vo.monitor;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;

/**
 * 降水统计VO
 */
@Data
@Schema(description = "降水统计数据")
public class RainfallStatisticsVO {

    @Schema(description = "累计降水量(mm)")
    private BigDecimal totalRainfall;

    @Schema(description = "最大降水量(mm)")
    private BigDecimal maxRainfall;

    @Schema(description = "平均降水量(mm)")
    private BigDecimal avgRainfall;

    @Schema(description = "本月降水量(mm)")
    private BigDecimal monthRainfall;
}
