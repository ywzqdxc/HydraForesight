package com.hydravision.controller.user;

import com.hydravision.common.base.BasePageQuery;
import com.hydravision.common.result.PageResult;
import com.hydravision.common.result.Result;
import com.hydravision.dto.user.RoleCreateDTO;
import com.hydravision.dto.user.RoleUpdateDTO;
import com.hydravision.service.user.RoleService;
import com.hydravision.vo.user.RoleVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 角色管理控制器
 */
@Tag(name = "角色管理", description = "角色相关接口")
@RestController
@RequestMapping("/role")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @Operation(summary = "创建角色")
    @PostMapping
    public Result<Long> createRole(@Valid @RequestBody RoleCreateDTO dto) {
        return Result.success(roleService.createRole(dto));
    }

    @Operation(summary = "更新角色")
    @PutMapping
    public Result<Void> updateRole(@Valid @RequestBody RoleUpdateDTO dto) {
        roleService.updateRole(dto);
        return Result.success();
    }

    @Operation(summary = "删除角色")
    @DeleteMapping("/{id}")
    public Result<Void> deleteRole(@PathVariable Long id) {
        roleService.deleteRole(id);
        return Result.success();
    }

    @Operation(summary = "获取角色详情")
    @GetMapping("/{id}")
    public Result<RoleVO> getRoleDetail(@PathVariable Long id) {
        return Result.success(roleService.getRoleDetail(id));
    }

    @Operation(summary = "分页查询角色")
    @GetMapping("/page")
    public Result<PageResult<RoleVO>> pageRoles(BasePageQuery query) {
        return Result.success(roleService.pageRoles(query));
    }

    @Operation(summary = "获取所有角色列表")
    @GetMapping("/list")
    public Result<List<RoleVO>> listRoles() {
        return Result.success(roleService.listRoles());
    }

    @Operation(summary = "根据用户ID获取角色列表")
    @GetMapping("/user/{userId}")
    public Result<List<RoleVO>> getRolesByUserId(@PathVariable Long userId) {
        return Result.success(roleService.getRolesByUserId(userId));
    }
}
