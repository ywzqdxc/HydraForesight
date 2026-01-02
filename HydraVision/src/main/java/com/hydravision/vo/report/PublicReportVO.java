package com.hydravision.vo.report;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 公众上报VO
 */
@Data
@Schema(description = "公众上报信息")
public class PublicReportVO implements Serializable {

    @Schema(description = "ID")
    private Long id;

    @Schema(description = "上报唯一标识")
    private String reportId;

    @Schema(description = "上报类型")
    private Integer reportType;

    @Schema(description = "上报标题")
    private String title;

    @Schema(description = "上报内容")
    private String content;

    @Schema(description = "位置描述")
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

    @Schema(description = "上报时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime reportTime;

    @Schema(description = "核实状态")
    private Integer verifyStatus;

    @Schema(description = "核实时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime verifyTime;

    @Schema(description = "核实人姓名")
    private String verifierName;

    @Schema(description = "核实备注")
    private String verifyRemark;

    @Schema(description = "处理状态")
    private Integer processStatus;

    @Schema(description = "处理结果")
    private String processResult;

    @Schema(description = "点赞数")
    private Integer upvoteCount;

    @Schema(description = "浏览数")
    private Integer viewCount;

    @Schema(description = "创建时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
}
