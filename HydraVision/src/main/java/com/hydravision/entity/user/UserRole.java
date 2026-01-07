package com.hydravision.entity.user;

import com.baomidou.mybatisplus.annotation.TableName;
import com.hydravision.common.base.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * 用户角色关联实体类
 */
@TableName("hf_user_role")
@Schema(description = "用户角色关联")
public class UserRole extends BaseEntity {

    @Schema(description = "用户ID")
    private Long userId;

    @Schema(description = "角色ID")
    private Long roleId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }
}
