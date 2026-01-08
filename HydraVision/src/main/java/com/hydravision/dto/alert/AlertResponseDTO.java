package com.hydravision.dto.alert;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

/**
 * 预警响应DTO
 */
@Schema(description = "预警响应DTO")
public class AlertResponseDTO {

    @Schema(description = "预警记录ID")
    @NotNull(message = "预警记录ID不能为空")
    private Long alertRecordId;

    @Schema(description = "响应类型: 1-确认收到, 2-现场处置, 3-上报情况, 4-处置完成")
    @NotNull(message = "响应类型不能为空")
    private Integer responseType;

    @Schema(description = "响应内容")
    private String responseContent;

    @Schema(description = "附件信息(JSON格式)")
    private String attachmentUrls;

    @Schema(description = "响应位置经度")
    private BigDecimal locationLng;

    @Schema(description = "响应位置纬度")
    private BigDecimal locationLat;

    // Getters and Setters
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
}
