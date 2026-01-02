package com.hydravision.dto.device;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * 设备创建DTO
 */
@Data
@Schema(description = "设备创建请求")
public class DeviceCreateDTO implements Serializable {

    @Schema(description = "设备ID", required = true)
    @NotBlank(message = "设备ID不能为空")
    private String deviceId;

    @Schema(description = "设备名称", required = true)
    @NotBlank(message = "设备名称不能为空")
    private String deviceName;

    @Schema(description = "设备类型", required = true)
    @NotNull(message = "设备类型不能为空")
    private Integer deviceType;

    @Schema(description = "设备型号")
    private String deviceModel;

    @Schema(description = "生产厂家")
    private String manufacturer;

    @Schema(description = "设备序列号")
    private String serialNumber;

    @Schema(description = "所属区域ID", required = true)
    @NotNull(message = "所属区域不能为空")
    private Long areaId;

    @Schema(description = "安装位置描述", required = true)
    @NotBlank(message = "安装位置不能为空")
    private String locationName;

    @Schema(description = "经度", required = true)
    @NotNull(message = "经度不能为空")
    private BigDecimal longitude;

    @Schema(description = "纬度", required = true)
    @NotNull(message = "纬度不能为空")
    private BigDecimal latitude;

    @Schema(description = "海拔高度")
    private BigDecimal altitude;

    @Schema(description = "安装日期")
    private LocalDate installDate;

    @Schema(description = "通讯方式")
    private Integer communicationType;

    @Schema(description = "供电方式")
    private Integer powerType;

    @Schema(description = "备注")
    private String remark;
}
