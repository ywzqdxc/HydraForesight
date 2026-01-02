package com.hydravision.dto.alert;

import com.hydravision.common.base.BasePageQuery;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

/**
 * 预警查询DTO
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "预警查询请求")
public class AlertQueryDTO extends BasePageQuery {

    @Schema(description = "预警类型")
    private Integer alertType;

    @Schema(description = "预警级别")
    private Integer alertLevel;

    @Schema(description = "预警区域ID")
    private Long areaId;

    @Schema(description = "状态")
    private Integer status;

    @Schema(description = "开始时间")
    private LocalDateTime startTime;

    @Schema(description = "结束时间")
    private LocalDateTime endTime;
}
