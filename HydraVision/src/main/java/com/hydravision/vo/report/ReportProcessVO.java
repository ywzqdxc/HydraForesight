package com.hydravision.vo.report;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

/**
 * 上报处理记录VO
 */
@Schema(description = "上报处理记录VO")
public class ReportProcessVO {

    @Schema(description = "ID")
    private Long id;

    @Schema(description = "上报ID")
    private Long reportId;

    @Schema(description = "处理类型: 1-接收, 2-派单, 3-现场处理, 4-完成, 5-回访")
    private Integer processType;

    @Schema(description = "处理类型名称")
    private String processTypeName;

    @Schema(description = "处理内容")
    private String processContent;

    @Schema(description = "处理人姓名")
    private String processorName;

    @Schema(description = "处理人部门")
    private String processorDept;

    @Schema(description = "处理时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime processTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getProcessTypeName() {
        return processTypeName;
    }

    public void setProcessTypeName(String processTypeName) {
        this.processTypeName = processTypeName;
    }

    public String getProcessContent() {
        return processContent;
    }

    public void setProcessContent(String processContent) {
        this.processContent = processContent;
    }

    public String getProcessorName() {
        return processorName;
    }

    public void setProcessorName(String processorName) {
        this.processorName = processorName;
    }

    public String getProcessorDept() {
        return processorDept;
    }

    public void setProcessorDept(String processorDept) {
        this.processorDept = processorDept;
    }

    public LocalDateTime getProcessTime() {
        return processTime;
    }

    public void setProcessTime(LocalDateTime processTime) {
        this.processTime = processTime;
    }
}
