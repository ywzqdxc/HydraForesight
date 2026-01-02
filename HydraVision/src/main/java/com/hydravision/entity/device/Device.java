package com.hydravision.entity.device;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.hydravision.common.base.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * 设备实体类
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("hf_device")
@Schema(description = "设备信息")
public class Device extends BaseEntity {

    @Schema(description = "设备唯一标识")
    @TableField("device_id")
    private String deviceId;

    @Schema(description = "设备名称")
    @TableField("device_name")
    private String deviceName;

    @Schema(description = "设备类型: 1-雨量站, 2-水位站, 3-流量站, 4-气象站, 5-摄像头")
    @TableField("device_type")
    private Integer deviceType;

    @Schema(description = "设备型号")
    @TableField("device_model")
    private String deviceModel;

    @Schema(description = "生产厂家")
    private String manufacturer;

    @Schema(description = "设备序列号")
    @TableField("serial_number")
    private String serialNumber;

    @Schema(description = "所属区域ID")
    @TableField("area_id")
    private Long areaId;

    @Schema(description = "安装位置描述")
    @TableField("location_name")
    private String locationName;

    @Schema(description = "经度")
    private BigDecimal longitude;

    @Schema(description = "纬度")
    private BigDecimal latitude;

    @Schema(description = "海拔高度")
    private BigDecimal altitude;

    @Schema(description = "安装日期")
    @TableField("install_date")
    private LocalDate installDate;

    @Schema(description = "保修截止日期")
    @TableField("warranty_date")
    private LocalDate warrantyDate;

    @Schema(description = "数据采集间隔(秒)")
    @TableField("data_interval")
    private Integer dataInterval;

    @Schema(description = "通讯方式: 1-4G, 2-5G, 3-LoRa, 4-NB-IoT, 5-有线")
    @TableField("communication_type")
    private Integer communicationType;

    @Schema(description = "供电方式: 1-市电, 2-太阳能, 3-电池")
    @TableField("power_type")
    private Integer powerType;

    @Schema(description = "设备状态: 0-离线, 1-在线, 2-警告, 3-维护中")
    private Integer status;

    @Schema(description = "备注")
    private String remark;
}
