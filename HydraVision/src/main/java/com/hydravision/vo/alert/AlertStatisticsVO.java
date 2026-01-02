package com.hydravision.vo.alert;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;

/**
 * 预警统计VO
 */
@Data
@Schema(description = "预警统计信息")
public class AlertStatisticsVO implements Serializable {

    @Schema(description = "总预警数")
    private Long totalCount;

    @Schema(description = "蓝色预警数")
    private Long blueCount;

    @Schema(description = "黄色预警数")
    private Long yellowCount;

    @Schema(description = "橙色预警数")
    private Long orangeCount;

    @Schema(description = "红色预警数")
    private Long redCount;

    @Schema(description = "待发布数")
    private Long pendingCount;

    @Schema(description = "已发布数")
    private Long publishedCount;

    @Schema(description = "已解除数")
    private Long releasedCount;
}
