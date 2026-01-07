package com.hydravision.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

/**
 * 创建部门DTO
 */
@Schema(description = "创建部门请求")
public class DepartmentCreateDTO {

    @NotBlank(message = "部门编码不能为空")
    @Schema(description = "部门编码", required = true)
    private String deptCode;

    @NotBlank(message = "部门名称不能为空")
    @Schema(description = "部门名称", required = true)
    private String deptName;

    @Schema(description = "父部门ID")
    private Long parentId;

    @Schema(description = "负责人用户ID")
    private Long leaderId;

    @Schema(description = "联系电话")
    private String phone;

    @Schema(description = "邮箱")
    private String email;

    @Schema(description = "排序号")
    private Integer sortOrder;

    // Getters and Setters
    public String getDeptCode() {
        return deptCode;
    }

    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public Long getLeaderId() {
        return leaderId;
    }

    public void setLeaderId(Long leaderId) {
        this.leaderId = leaderId;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }
}
