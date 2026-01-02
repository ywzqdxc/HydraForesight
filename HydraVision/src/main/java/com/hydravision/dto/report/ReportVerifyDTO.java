package com.hydravision.dto.report;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;

/**
 * 上报核实DTO
 */
@Data
@Schema(description = "上报核实请求")
public class ReportVerifyDTO implements Serializable {

    @Schema(description = "上报ID", required = true)
    @NotNull(message = "上报ID不能为空")
    private Long id;

    @Schema(description = "核实状态", required = true)
    @NotNull(message = "核实状态不能为空")
    private Integer verifyStatus;

    @Schema(description = "核实人ID")
    private Long verifierId;

    @Schema(description = "核实人姓名")
    private String verifierName;

    @Schema(description = "核实备注")
    private String verifyRemark;
}
