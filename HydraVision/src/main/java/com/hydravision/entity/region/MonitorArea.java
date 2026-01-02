package com.hydravision.entity.region;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.hydravision.common.base.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

/**
 * 监测区域实体类
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("hf_monitor_area")
@Schema(description = "监测区域")
public class MonitorArea extends BaseEntity {

    @Schema(description = "监测区域编码")
    @TableField("area_code")
    private String areaCode;

    @Schema(description = "监测区域名称")
    @TableField("area_name")
    private String areaName;

    @Schema(description = "区域英文名称")
    @TableField("area_name_en")
    private String areaNameEn;

    @Schema(description = "所属行政区域ID")
    @TableField("region_id")
    private Long regionId;

    @Schema(description = "区域类型: 1-城区, 2-河流, 3-水库, 4-低洼地带")
    @TableField("area_type")
    private Integer areaType;

    @Schema(description = "风险等级: 1-低, 2-中, 3-高, 4-极高")
    @TableField("risk_level")
    private Integer riskLevel;

    @Schema(description = "中心经度")
    @TableField("center_lng")
    private BigDecimal centerLng;

    @Schema(description = "中心纬度")
    @TableField("center_lat")
    private BigDecimal centerLat;

    @Schema(description = "边界GeoJSON数据")
    @TableField("boundary_geojson")
    private String boundaryGeojson;

    @Schema(description = "区域描述")
    private String description;

    @Schema(description = "蓝色预警阈值(mm)")
    @TableField("warning_threshold_1")
    private BigDecimal warningThreshold1;

    @Schema(description = "黄色预警阈值(mm)")
    @TableField("warning_threshold_2")
    private BigDecimal warningThreshold2;

    @Schema(description = "橙色预警阈值(mm)")
    @TableField("warning_threshold_3")
    private BigDecimal warningThreshold3;

    @Schema(description = "红色预警阈值(mm)")
    @TableField("warning_threshold_4")
    private BigDecimal warningThreshold4;

    @Schema(description = "责任人")
    @TableField("responsible_person")
    private String responsiblePerson;

    @Schema(description = "责任人电话")
    @TableField("responsible_phone")
    private String responsiblePhone;

    @Schema(description = "状态: 0-禁用, 1-正常")
    private Integer status;
}
