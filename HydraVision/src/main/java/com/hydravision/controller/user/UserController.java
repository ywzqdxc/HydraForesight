package com.hydravision.controller.user;

import com.hydravision.common.result.PageResult;
import com.hydravision.common.result.Result;
import com.hydravision.common.result.ResultCode;
import com.hydravision.common.exception.BusinessException;
import com.hydravision.dto.user.PasswordUpdateDTO;
import com.hydravision.dto.user.UserCreateDTO;
import com.hydravision.dto.user.UserQueryDTO;
import com.hydravision.dto.user.UserUpdateDTO;
import com.hydravision.entity.user.User;
import com.hydravision.service.user.UserService;
import com.hydravision.vo.user.UserVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 用户管理控制器
 */
@Tag(name = "用户管理", description = "用户相关接口")
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Operation(summary = "创建用户")
    @PostMapping
    public Result<Long> createUser(@Valid @RequestBody UserCreateDTO dto) {
        return Result.success(userService.createUser(dto));
    }

    @Operation(summary = "更新用户")
    @PutMapping
    public Result<Void> updateUser(@Valid @RequestBody UserUpdateDTO dto) {
        userService.updateUser(dto);
        return Result.success();
    }

    @Operation(summary = "删除用户")
    @DeleteMapping("/{id}")
    public Result<Void> deleteUser(@Parameter(description = "用户ID") @PathVariable Long id) {
        userService.deleteUser(id);
        return Result.success();
    }

    @Operation(summary = "获取用户详情")
    @GetMapping("/{id}")
    public Result<UserVO> getUserDetail(@Parameter(description = "用户ID") @PathVariable Long id) {
        return Result.success(userService.getUserDetail(id));
    }

    @Operation(summary = "分页查询用户")
    @GetMapping("/page")
    public Result<PageResult<UserVO>> pageUsers(UserQueryDTO query) {
        return Result.success(userService.pageUsers(query));
    }

    @Operation(summary = "获取当前用户信息")
    @GetMapping("/current")
    public Result<UserVO> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.getByUsername(username);
        if (user == null) {
            throw new BusinessException(ResultCode.USER_NOT_FOUND);
        }
        return Result.success(userService.getUserDetail(user.getId()));
    }

    @Operation(summary = "修改密码")
    @PutMapping("/password")
    public Result<Void> updatePassword(@Valid @RequestBody PasswordUpdateDTO dto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        userService.updatePassword(username, dto);
        return Result.success();
    }

    @Operation(summary = "为用户设置角色")
    @PostMapping("/{userId}/role/{roleId}")
    public Result<Void> setUserRole(
            @Parameter(description = "用户ID") @PathVariable Long userId,
            @Parameter(description = "角色ID") @PathVariable Long roleId) {
        userService.setUserRole(userId, roleId);
        return Result.success();
    }

    @Operation(summary = "移除用户的角色")
    @DeleteMapping("/{userId}/role/{roleId}")
    public Result<Void> removeUserRole(
            @Parameter(description = "用户ID") @PathVariable Long userId,
            @Parameter(description = "角色ID") @PathVariable Long roleId) {
        userService.removeUserRole(userId, roleId);
        return Result.success();
    }

    @Operation(summary = "获取用户的角色列表")
    @GetMapping("/{userId}/roles")
    public Result<List<String>> getUserRoles(
            @Parameter(description = "用户ID") @PathVariable Long userId) {
        return Result.success(userService.getUserRoles(userId));
    }
}
