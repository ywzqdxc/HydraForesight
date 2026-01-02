package com.hydravision.dto.device;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * 设备更新DTO
 */
@Data
@Schema(description = "设备更新请求")
public class DeviceUpdateDTO implements Serializable {

    @Schema(description = "ID", required = true)
    @NotNull(message = "ID不能为空")
    private Long id;

    @Schema(description = "设备名称")
    private String deviceName;

    @Schema(description = "设备型号")
    private String deviceModel;

    @Schema(description = "生产厂家")
    private String manufacturer;

    @Schema(description = "所属区域ID")
    private Long areaId;

    @Schema(description = "安装位置描述")
    private String locationName;

    @Schema(description = "经度")
    private BigDecimal longitude;

    @Schema(description = "纬度")
    private BigDecimal latitude;

    @Schema(description = "海拔高度")
    private BigDecimal altitude;

    @Schema(description = "安装日期")
    private LocalDate installDate;

    @Schema(description = "保修截止日期")
    private LocalDate warrantyDate;

    @Schema(description = "数据采集间隔")
    private Integer dataInterval;

    @Schema(description = "通讯方式")
    private Integer communicationType;

    @Schema(description = "供电方式")
    private Integer powerType;

    @Schema(description = "状态")
    private Integer status;

    @Schema(description = "备注")
    private String remark;
}
