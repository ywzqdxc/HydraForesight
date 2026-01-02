package com.hydravision.dto.report;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 上报创建DTO
 */
@Data
@Schema(description = "上报创建请求")
public class ReportCreateDTO implements Serializable {

    @Schema(description = "上报类型", required = true)
    @NotNull(message = "上报类型不能为空")
    private Integer reportType;

    @Schema(description = "上报标题", required = true)
    @NotBlank(message = "上报标题不能为空")
    private String title;

    @Schema(description = "上报内容", required = true)
    @NotBlank(message = "上报内容不能为空")
    private String content;

    @Schema(description = "位置描述", required = true)
    @NotBlank(message = "位置描述不能为空")
    private String locationName;

    @Schema(description = "经度")
    private BigDecimal longitude;

    @Schema(description = "纬度")
    private BigDecimal latitude;

    @Schema(description = "严重程度")
    private Integer severity;

    @Schema(description = "图片URL")
    private String imageUrls;

    @Schema(description = "上报人姓名")
    private String reporterName;

    @Schema(description = "上报人电话")
    private String reporterPhone;
}
