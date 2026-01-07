package com.hydravision.entity.report;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

/**
 * 上报处理记录实体
 */
@TableName("hf_report_process")
@Schema(description = "上报处理记录")
public class ReportProcess {

    @Schema(description = "主键ID")
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @Schema(description = "上报记录ID")
    @TableField("report_id")
    private Long reportId;

    @Schema(description = "处理类型: 1-接收, 2-派单, 3-现场处理, 4-完成, 5-回访")
    @TableField("process_type")
    private Integer processType;

    @Schema(description = "处理内容")
    @TableField("process_content")
    private String processContent;

    @Schema(description = "处理人ID")
    @TableField("processor_id")
    private Long processorId;

    @Schema(description = "处理人姓名")
    @TableField("processor_name")
    private String processorName;

    @Schema(description = "处理人部门")
    @TableField("processor_dept")
    private String processorDept;

    @Schema(description = "处理时间")
    @TableField("process_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime processTime;

    @Schema(description = "附件URL")
    @TableField("attachment_urls")
    private String attachmentUrls;

    @Schema(description = "创建时间")
    @TableField("create_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

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

    public String getProcessContent() {
        return processContent;
    }

    public void setProcessContent(String processContent) {
        this.processContent = processContent;
    }

    public Long getProcessorId() {
        return processorId;
    }

    public void setProcessorId(Long processorId) {
        this.processorId = processorId;
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

    public String getAttachmentUrls() {
        return attachmentUrls;
    }

    public void setAttachmentUrls(String attachmentUrls) {
        this.attachmentUrls = attachmentUrls;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }
}
