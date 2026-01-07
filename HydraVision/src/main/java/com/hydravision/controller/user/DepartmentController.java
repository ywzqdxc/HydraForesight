package com.hydravision.controller.user;

import com.hydravision.common.result.Result;
import com.hydravision.dto.user.DepartmentCreateDTO;
import com.hydravision.dto.user.DepartmentUpdateDTO;
import com.hydravision.service.user.DepartmentService;
import com.hydravision.vo.user.DepartmentVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 部门管理控制器
 */
@Tag(name = "部门管理", description = "部门相关接口")
@RestController
@RequestMapping("/department")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @Operation(summary = "创建部门")
    @PostMapping
    public Result<Long> createDepartment(@Valid @RequestBody DepartmentCreateDTO dto) {
        return Result.success(departmentService.createDepartment(dto));
    }

    @Operation(summary = "更新部门")
    @PutMapping
    public Result<Void> updateDepartment(@Valid @RequestBody DepartmentUpdateDTO dto) {
        departmentService.updateDepartment(dto);
        return Result.success();
    }

    @Operation(summary = "删除部门")
    @DeleteMapping("/{id}")
    public Result<Void> deleteDepartment(@PathVariable Long id) {
        departmentService.deleteDepartment(id);
        return Result.success();
    }

    @Operation(summary = "获取部门详情")
    @GetMapping("/{id}")
    public Result<DepartmentVO> getDepartmentDetail(@PathVariable Long id) {
        return Result.success(departmentService.getDepartmentDetail(id));
    }

    @Operation(summary = "获取部门列表")
    @GetMapping("/list")
    public Result<List<DepartmentVO>> listDepartments() {
        return Result.success(departmentService.listDepartments());
    }

    @Operation(summary = "获取部门树")
    @GetMapping("/tree")
    public Result<List<DepartmentVO>> getDepartmentTree() {
        return Result.success(departmentService.getDepartmentTree());
    }
}
