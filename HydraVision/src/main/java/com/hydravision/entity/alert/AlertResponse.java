package com.hydravision.entity.alert;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 预警响应记录实体类
 */
@TableName("hf_alert_response")
@Schema(description = "预警响应记录")
public class AlertResponse {

    @Schema(description = "主键ID")
    @TableId(type = IdType.AUTO)
    private Long id;

    @Schema(description = "预警记录ID")
    @TableField("alert_record_id")
    private Long alertRecordId;

    @Schema(description = "响应类型: 1-确认收到, 2-现场处置, 3-上报情况, 4-处置完成")
    @TableField("response_type")
    private Integer responseType;

    @Schema(description = "响应内容")
    @TableField("response_content")
    private String responseContent;

    @Schema(description = "响应人ID")
    @TableField("responder_id")
    private Long responderId;

    @Schema(description = "响应人姓名")
    @TableField("responder_name")
    private String responderName;

    @Schema(description = "响应人部门")
    @TableField("responder_dept")
    private String responderDept;

    @Schema(description = "响应时间")
    @TableField("response_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime responseTime;

    @Schema(description = "附件信息(JSON格式)")
    @TableField("attachment_urls")
    private String attachmentUrls;

    @Schema(description = "响应位置经度")
    @TableField("location_lng")
    private BigDecimal locationLng;

    @Schema(description = "响应位置纬度")
    @TableField("location_lat")
    private BigDecimal locationLat;

    @Schema(description = "创建时间")
    @TableField("create_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
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
