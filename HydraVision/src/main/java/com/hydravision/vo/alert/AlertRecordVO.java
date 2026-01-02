package com.hydravision.vo.alert;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 预警记录VO
 */
@Data
@Schema(description = "预警记录信息")
public class AlertRecordVO implements Serializable {

    @Schema(description = "ID")
    private Long id;

    @Schema(description = "预警唯一标识")
    private String alertId;

    @Schema(description = "预警类型")
    private Integer alertType;

    @Schema(description = "预警级别")
    private Integer alertLevel;

    @Schema(description = "预警区域ID")
    private Long areaId;

    @Schema(description = "预警区域名称")
    private String areaName;

    @Schema(description = "预警标题")
    private String title;

    @Schema(description = "预警内容")
    private String content;

    @Schema(description = "触发值")
    private BigDecimal triggerValue;

    @Schema(description = "触发时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime triggerTime;

    @Schema(description = "发布时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime publishTime;

    @Schema(description = "预计结束时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime expectedEndTime;

    @Schema(description = "实际结束时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime actualEndTime;

    @Schema(description = "状态")
    private Integer status;

    @Schema(description = "发布人姓名")
    private String publisherName;

    @Schema(description = "解除原因")
    private String releaseReason;

    @Schema(description = "是否公开")
    private Integer isPublic;

    @Schema(description = "查看次数")
    private Integer viewCount;

    @Schema(description = "创建时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
}
