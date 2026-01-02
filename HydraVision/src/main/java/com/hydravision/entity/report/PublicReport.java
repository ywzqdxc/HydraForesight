package com.hydravision.entity.report;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.hydravision.common.base.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 公众上报实体类
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("hf_public_report")
@Schema(description = "公众上报")
public class PublicReport extends BaseEntity {

    @Schema(description = "上报唯一标识")
    @TableField("report_id")
    private String reportId;

    @Schema(description = "上报类型: 1-积水, 2-降雨, 3-交通, 4-灾害, 5-其他")
    @TableField("report_type")
    private Integer reportType;

    @Schema(description = "上报标题")
    private String title;

    @Schema(description = "上报内容")
    private String content;

    @Schema(description = "位置描述")
    @TableField("location_name")
    private String locationName;

    @Schema(description = "经度")
    private BigDecimal longitude;

    @Schema(description = "纬度")
    private BigDecimal latitude;

    @Schema(description = "所属区域ID")
    @TableField("area_id")
    private Long areaId;

    @Schema(description = "严重程度: 1-轻微, 2-中等, 3-严重")
    private Integer severity;

    @Schema(description = "图片URL")
    @TableField("image_urls")
    private String imageUrls;

    @Schema(description = "视频URL")
    @TableField("video_url")
    private String videoUrl;

    @Schema(description = "上报人ID")
    @TableField("reporter_id")
    private Long reporterId;

    @Schema(description = "上报人姓名")
    @TableField("reporter_name")
    private String reporterName;

    @Schema(description = "上报人电话")
    @TableField("reporter_phone")
    private String reporterPhone;

    @Schema(description = "上报时间")
    @TableField("report_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime reportTime;

    @Schema(description = "核实状态: 0-未核实, 1-已核实, 2-不属实")
    @TableField("verify_status")
    private Integer verifyStatus;

    @Schema(description = "核实时间")
    @TableField("verify_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime verifyTime;

    @Schema(description = "核实人ID")
    @TableField("verifier_id")
    private Long verifierId;

    @Schema(description = "核实人姓名")
    @TableField("verifier_name")
    private String verifierName;

    @Schema(description = "核实备注")
    @TableField("verify_remark")
    private String verifyRemark;

    @Schema(description = "处理状态: 0-待处理, 1-处理中, 2-已处理, 3-已关闭")
    @TableField("process_status")
    private Integer processStatus;

    @Schema(description = "处理结果")
    @TableField("process_result")
    private String processResult;

    @Schema(description = "点赞数")
    @TableField("upvote_count")
    private Integer upvoteCount;

    @Schema(description = "浏览数")
    @TableField("view_count")
    private Integer viewCount;

    @Schema(description = "是否公开")
    @TableField("is_public")
    private Integer isPublic;
}
