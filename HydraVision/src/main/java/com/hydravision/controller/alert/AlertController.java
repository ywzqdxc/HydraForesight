package com.hydravision.controller.alert;

import com.hydravision.common.result.PageResult;
import com.hydravision.common.result.Result;
import com.hydravision.dto.alert.AlertCreateDTO;
import com.hydravision.dto.alert.AlertQueryDTO;
import com.hydravision.service.alert.AlertService;
import com.hydravision.vo.alert.AlertRecordVO;
import com.hydravision.vo.alert.AlertStatisticsVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 预警管理控制器
 */
@Tag(name = "预警管理", description = "预警相关接口")
@RestController
@RequestMapping("/alert")
@RequiredArgsConstructor
public class AlertController {

    private final AlertService alertService;

    @Operation(summary = "创建预警")
    @PostMapping
    public Result<Long> createAlert(@Valid @RequestBody AlertCreateDTO dto) {
        return Result.success(alertService.createAlert(dto));
    }

    @Operation(summary = "发布预警")
    @PutMapping("/{id}/publish")
    public Result<Void> publishAlert(@Parameter(description = "预警ID") @PathVariable Long id) {
        alertService.publishAlert(id);
        return Result.success();
    }

    @Operation(summary = "解除预警")
    @PutMapping("/{id}/release")
    public Result<Void> releaseAlert(
            @Parameter(description = "预警ID") @PathVariable Long id,
            @Parameter(description = "解除原因") @RequestParam String reason) {
        alertService.releaseAlert(id, reason);
        return Result.success();
    }

    @Operation(summary = "获取预警详情")
    @GetMapping("/{id}")
    public Result<AlertRecordVO> getAlertDetail(@Parameter(description = "预警ID") @PathVariable Long id) {
        return Result.success(alertService.getAlertDetail(id));
    }

    @Operation(summary = "分页查询预警")
    @GetMapping("/page")
    public Result<PageResult<AlertRecordVO>> pageAlerts(AlertQueryDTO query) {
        return Result.success(alertService.pageAlerts(query));
    }

    @Operation(summary = "获取最新预警列表")
    @GetMapping("/latest")
    public Result<List<AlertRecordVO>> getLatestAlerts(
            @Parameter(description = "数量") @RequestParam(defaultValue = "10") Integer limit) {
        return Result.success(alertService.getLatestAlerts(limit));
    }

    @Operation(summary = "获取预警统计")
    @GetMapping("/statistics")
    public Result<AlertStatisticsVO> getStatistics() {
        return Result.success(alertService.getStatistics());
    }

    @Operation(summary = "获取当前生效预警")
    @GetMapping("/active")
    public Result<List<AlertRecordVO>> getActiveAlerts() {
        return Result.success(alertService.getActiveAlerts());
    }
}
