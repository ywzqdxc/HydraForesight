package com.hydravision.controller.alert;

import com.hydravision.common.result.PageResult;
import com.hydravision.common.result.Result;
import com.hydravision.dto.alert.AlertResponseDTO;
import com.hydravision.entity.user.User;
import com.hydravision.mapper.user.DepartmentMapper;
import com.hydravision.security.SecurityUtils;
import com.hydravision.service.alert.AlertResponseService;
import com.hydravision.service.user.UserService;
import com.hydravision.vo.alert.AlertResponseVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 预警响应管理控制器
 */
@Tag(name = "预警响应管理", description = "预警响应相关接口")
@RestController
@RequestMapping("/alert/response")
@RequiredArgsConstructor
public class AlertResponseController {

    private final AlertResponseService alertResponseService;
    private final UserService userService;
    private final DepartmentMapper departmentMapper;

    @Operation(summary = "创建预警响应")
    @PostMapping
    public Result<Long> createResponse(@Valid @RequestBody AlertResponseDTO dto) {
        Long userId = SecurityUtils.getCurrentUserId();
        String username = SecurityUtils.getCurrentUsername();
        
        // 获取用户部门信息
        String deptName = "";
        try {
            User user = userService.getById(userId);
            if (user != null && user.getDeptId() != null) {
                var dept = departmentMapper.selectById(user.getDeptId());
                if (dept != null) {
                    deptName = dept.getDeptName();
                }
            }
        } catch (Exception e) {
            // 忽略获取部门失败的情况
        }
        
        return Result.success(alertResponseService.createResponse(dto, userId, username, deptName));
    }

    @Operation(summary = "获取预警的所有响应记录")
    @GetMapping("/alert/{alertRecordId}")
    public Result<List<AlertResponseVO>> getResponsesByAlertId(
            @Parameter(description = "预警记录ID") @PathVariable Long alertRecordId) {
        return Result.success(alertResponseService.getResponsesByAlertId(alertRecordId));
    }

    @Operation(summary = "分页查询响应记录")
    @GetMapping("/page")
    public Result<PageResult<AlertResponseVO>> pageResponses(
            @Parameter(description = "预警记录ID") @RequestParam(required = false) Long alertRecordId,
            @Parameter(description = "响应类型") @RequestParam(required = false) Integer responseType,
            @Parameter(description = "当前页") @RequestParam(defaultValue = "1") Integer current,
            @Parameter(description = "每页数量") @RequestParam(defaultValue = "10") Integer size) {
        return Result.success(alertResponseService.pageResponses(alertRecordId, responseType, current, size));
    }

    @Operation(summary = "获取响应详情")
    @GetMapping("/{id}")
    public Result<AlertResponseVO> getResponseDetail(@Parameter(description = "响应ID") @PathVariable Long id) {
        return Result.success(alertResponseService.getResponseDetail(id));
    }
}
