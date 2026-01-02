package com.hydravision.vo.device;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * 设备统计VO
 */
@Data
@Schema(description = "设备统计信息")
public class DeviceStatisticsVO implements Serializable {

    @Schema(description = "总设备数")
    private Long totalCount;

    @Schema(description = "在线设备数")
    private Long onlineCount;

    @Schema(description = "离线设备数")
    private Long offlineCount;

    @Schema(description = "警告设备数")
    private Long warningCount;

    @Schema(description = "维护中设备数")
    private Long maintenanceCount;

    @Schema(description = "类型统计")
    private List<Map<String, Object>> typeStatistics;

    @Schema(description = "区域统计")
    private List<Map<String, Object>> areaStatistics;
}
