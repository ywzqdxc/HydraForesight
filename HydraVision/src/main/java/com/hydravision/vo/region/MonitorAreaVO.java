package com.hydravision.vo.region;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 监测区域VO
 */
@Data
@Schema(description = "监测区域信息")
public class MonitorAreaVO {

    @Schema(description = "主键ID")
    private Long id;

    @Schema(description = "监测区域编码")
    private String areaCode;

    @Schema(description = "监测区域名称")
    private String areaName;

    @Schema(description = "区域英文名称")
    private String areaNameEn;

    @Schema(description = "区域类型: 1-城区, 2-河流, 3-水库, 4-低洼地带")
    private Integer areaType;

    @Schema(description = "风险等级: 1-低, 2-中, 3-高, 4-极高")
    private Integer riskLevel;

    @Schema(description = "中心经度")
    private BigDecimal centerLng;

    @Schema(description = "中心纬度")
    private BigDecimal centerLat;

    @Schema(description = "区域描述")
    private String description;

    @Schema(description = "蓝色预警阈值(mm)")
    private BigDecimal warningThreshold1;

    @Schema(description = "黄色预警阈值(mm)")
    private BigDecimal warningThreshold2;

    @Schema(description = "橙色预警阈值(mm)")
    private BigDecimal warningThreshold3;

    @Schema(description = "红色预警阈值(mm)")
    private BigDecimal warningThreshold4;

    @Schema(description = "责任人")
    private String responsiblePerson;

    @Schema(description = "状态")
    private Integer status;

    @Schema(description = "创建时间")
    private LocalDateTime createTime;
}
