package com.hydravision.vo.monitor;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;

/**
 * 仪表盘数据VO
 */
@Data
@Schema(description = "仪表盘数据")
public class DashboardDataVO {

    @Schema(description = "总设备数")
    private Integer totalDevices;

    @Schema(description = "在线设备数")
    private Integer onlineDevices;

    @Schema(description = "警告设备数")
    private Integer warningDevices;

    @Schema(description = "活跃预警数")
    private Integer activeAlerts;

    @Schema(description = "今日公众上报数")
    private Integer todayReports;

    @Schema(description = "今日降水量(mm)")
    private BigDecimal todayRainfall;

    @Schema(description = "本月累计降水量(mm)")
    private BigDecimal monthRainfall;
}
