package com.hydravision.vo.alert;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * 预警响应记录VO
 */
@Schema(description = "预警响应记录VO")
public class AlertResponseVO {

    @Schema(description = "主键ID")
    private Long id;

    @Schema(description = "预警记录ID")
    private Long alertRecordId;

    @Schema(description = "响应类型: 1-确认收到, 2-现场处置, 3-上报情况, 4-处置完成")
    private Integer responseType;

    @Schema(description = "响应类型名称")
    private String responseTypeName;

    @Schema(description = "响应内容")
    private String responseContent;

    @Schema(description = "响应人ID")
    private Long responderId;

    @Schema(description = "响应人姓名")
    private String responderName;

    @Schema(description = "响应人部门")
    private String responderDept;

    @Schema(description = "响应时间")
    private LocalDateTime responseTime;

    @Schema(description = "附件信息列表")
    private List<Map<String, Object>> attachments;

    @Schema(description = "附件信息JSON字符串")
    private String attachmentUrls;

    @Schema(description = "响应位置经度")
    private BigDecimal locationLng;

    @Schema(description = "响应位置纬度")
    private BigDecimal locationLat;

    @Schema(description = "创建时间")
    private LocalDateTime createTime;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAlertRecordId() {
        return alertRecordId;
    }

    public void setAlertRecordId(Long alertRecordId) {
        this.alertRecordId = alertRecordId;
    }

    public Integer getResponseType() {
        return responseType;
    }

    public void setResponseType(Integer responseType) {
        this.responseType = responseType;
    }

    public String getResponseTypeName() {
        return responseTypeName;
    }

    public void setResponseTypeName(String responseTypeName) {
        this.responseTypeName = responseTypeName;
    }

    public String getResponseContent() {
        return responseContent;
    }

    public void setResponseContent(String responseContent) {
        this.responseContent = responseContent;
    }

    public Long getResponderId() {
        return responderId;
    }

    public void setResponderId(Long responderId) {
        this.responderId = responderId;
    }

    public String getResponderName() {
        return responderName;
    }

    public void setResponderName(String responderName) {
        this.responderName = responderName;
    }

    public String getResponderDept() {
        return responderDept;
    }

    public void setResponderDept(String responderDept) {
        this.responderDept = responderDept;
    }

    public LocalDateTime getResponseTime() {
        return responseTime;
    }

    public void setResponseTime(LocalDateTime responseTime) {
        this.responseTime = responseTime;
    }

    public List<Map<String, Object>> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<Map<String, Object>> attachments) {
        this.attachments = attachments;
    }

    public String getAttachmentUrls() {
        return attachmentUrls;
    }

    public void setAttachmentUrls(String attachmentUrls) {
        this.attachmentUrls = attachmentUrls;
    }

    public BigDecimal getLocationLng() {
        return locationLng;
    }

    public void setLocationLng(BigDecimal locationLng) {
        this.locationLng = locationLng;
    }

    public BigDecimal getLocationLat() {
        return locationLat;
    }

    public void setLocationLat(BigDecimal locationLat) {
        this.locationLat = locationLat;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }
}
