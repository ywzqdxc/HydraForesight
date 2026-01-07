package com.hydravision.dto.report;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * 上报处理DTO
 */
@Schema(description = "上报处理DTO")
public class ReportProcessDTO {

    @Schema(description = "上报ID", required = true)
    @NotNull(message = "上报ID不能为空")
    private Long reportId;

    @Schema(description = "处理类型: 1-接收, 2-派单, 3-现场处理, 4-完成, 5-回访")
    @NotNull(message = "处理类型不能为空")
    private Integer processType;

    @Schema(description = "处理内容", required = true)
    @NotBlank(message = "处理内容不能为空")
    private String processContent;

    @Schema(description = "处理状态: 0-待处理, 1-处理中, 2-已处理, 3-已关闭")
    private Integer processStatus;

    public Long getReportId() {
        return reportId;
    }

    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    public Integer getProcessType() {
        return processType;
    }

    public void setProcessType(Integer processType) {
        this.processType = processType;
    }

    public String getProcessContent() {
        return processContent;
    }

    public void setProcessContent(String processContent) {
        this.processContent = processContent;
    }

    public Integer getProcessStatus() {
        return processStatus;
    }

    public void setProcessStatus(Integer processStatus) {
        this.processStatus = processStatus;
    }
}
