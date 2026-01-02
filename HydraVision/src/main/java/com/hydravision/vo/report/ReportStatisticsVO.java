package com.hydravision.vo.report;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * 上报统计VO
 */
@Data
@Schema(description = "上报统计信息")
public class ReportStatisticsVO implements Serializable {

    @Schema(description = "总上报数")
    private Long totalCount;

    @Schema(description = "待处理数")
    private Long pendingCount;

    @Schema(description = "处理中数")
    private Long processingCount;

    @Schema(description = "已处理数")
    private Long processedCount;

    @Schema(description = "类型统计")
    private List<Map<String, Object>> typeStatistics;
}
