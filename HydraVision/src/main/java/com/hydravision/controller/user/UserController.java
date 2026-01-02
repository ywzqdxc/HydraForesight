package com.hydravision.controller.user;

import com.hydravision.common.result.PageResult;
import com.hydravision.common.result.Result;
import com.hydravision.dto.user.UserCreateDTO;
import com.hydravision.dto.user.UserQueryDTO;
import com.hydravision.dto.user.UserUpdateDTO;
import com.hydravision.service.user.UserService;
import com.hydravision.vo.user.UserVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
}
