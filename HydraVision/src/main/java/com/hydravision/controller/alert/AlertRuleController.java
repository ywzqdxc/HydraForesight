package com.hydravision.controller.alert;

import com.hydravision.common.result.PageResult;
import com.hydravision.common.result.Result;
import com.hydravision.dto.alert.AlertRuleDTO;
import com.hydravision.service.alert.AlertRuleService;
import com.hydravision.vo.alert.AlertRuleVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 预警规则管理控制器
 */
@Tag(name = "预警规则管理", description = "预警规则相关接口")
@RestController
@RequestMapping("/alert/rule")
@RequiredArgsConstructor
public class AlertRuleController {

    private final AlertRuleService alertRuleService;

    @Operation(summary = "创建预警规则")
    @PostMapping
    public Result<Long> createRule(@Valid @RequestBody AlertRuleDTO dto) {
        return Result.success(alertRuleService.createRule(dto));
    }

    @Operation(summary = "更新预警规则")
    @PutMapping
    public Result<Void> updateRule(@Valid @RequestBody AlertRuleDTO dto) {
        alertRuleService.updateRule(dto);
        return Result.success();
    }

    @Operation(summary = "删除预警规则")
    @DeleteMapping("/{id}")
    public Result<Void> deleteRule(@Parameter(description = "规则ID") @PathVariable Long id) {
        alertRuleService.deleteRule(id);
        return Result.success();
    }

    @Operation(summary = "获取预警规则详情")
    @GetMapping("/{id}")
    public Result<AlertRuleVO> getRuleDetail(@Parameter(description = "规则ID") @PathVariable Long id) {
        return Result.success(alertRuleService.getRuleDetail(id));
    }

    @Operation(summary = "分页查询预警规则")
    @GetMapping("/page")
    public Result<PageResult<AlertRuleVO>> pageRules(
            @Parameter(description = "规则类型") @RequestParam(required = false) Integer ruleType,
            @Parameter(description = "预警级别") @RequestParam(required = false) Integer alertLevel,
            @Parameter(description = "状态") @RequestParam(required = false) Integer status,
            @Parameter(description = "当前页") @RequestParam(defaultValue = "1") Integer current,
            @Parameter(description = "每页数量") @RequestParam(defaultValue = "10") Integer size) {
        return Result.success(alertRuleService.pageRules(ruleType, alertLevel, status, current, size));
    }

    @Operation(summary = "获取所有启用的预警规则")
    @GetMapping("/enabled")
    public Result<List<AlertRuleVO>> getEnabledRules() {
        return Result.success(alertRuleService.getEnabledRules());
    }

    @Operation(summary = "启用/禁用预警规则")
    @PutMapping("/{id}/status")
    public Result<Void> toggleRuleStatus(
            @Parameter(description = "规则ID") @PathVariable Long id,
            @Parameter(description = "状态") @RequestParam Integer status) {
        alertRuleService.toggleRuleStatus(id, status);
        return Result.success();
    }
}
