package com.hydravision.dto.report;

import com.hydravision.common.base.BasePageQuery;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

/**
 * 上报查询DTO
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "上报查询请求")
public class ReportQueryDTO extends BasePageQuery {

    @Schema(description = "上报类型")
    private Integer reportType;

    @Schema(description = "严重程度")
    private Integer severity;

    @Schema(description = "核实状态")
    private Integer verifyStatus;

    @Schema(description = "处理状态")
    private Integer processStatus;

    @Schema(description = "关键词")
    private String keyword;

    @Schema(description = "开始时间")
    private LocalDateTime startTime;

    @Schema(description = "结束时间")
    private LocalDateTime endTime;
}
