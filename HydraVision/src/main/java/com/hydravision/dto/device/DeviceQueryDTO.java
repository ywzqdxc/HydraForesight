package com.hydravision.dto.device;

import com.hydravision.common.base.BasePageQuery;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 设备查询DTO
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "设备查询请求")
public class DeviceQueryDTO extends BasePageQuery {

    @Schema(description = "设备ID")
    private String deviceId;

    @Schema(description = "设备名称")
    private String deviceName;

    @Schema(description = "设备类型")
    private Integer deviceType;

    @Schema(description = "所属区域ID")
    private Long areaId;

    @Schema(description = "状态")
    private Integer status;
}
