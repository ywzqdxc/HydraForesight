package com.hydravision.dto.alert;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 预警创建DTO
 */
@Data
@Schema(description = "预警创建请求")
public class AlertCreateDTO implements Serializable {

    @Schema(description = "预警类型", required = true)
    @NotNull(message = "预警类型不能为空")
    private Integer alertType;

    @Schema(description = "预警级别", required = true)
    @NotNull(message = "预警级别不能为空")
    private Integer alertLevel;

    @Schema(description = "预警区域ID", required = true)
    @NotNull(message = "预警区域不能为空")
    private Long areaId;

    @Schema(description = "预警区域名称")
    private String areaName;

    @Schema(description = "预警标题", required = true)
    @NotBlank(message = "预警标题不能为空")
    private String title;

    @Schema(description = "预警内容", required = true)
    @NotBlank(message = "预警内容不能为空")
    private String content;

    @Schema(description = "触发值")
    private BigDecimal triggerValue;

    @Schema(description = "预计结束时间")
    private LocalDateTime expectedEndTime;

    @Schema(description = "是否公开")
    private Integer isPublic;
}
