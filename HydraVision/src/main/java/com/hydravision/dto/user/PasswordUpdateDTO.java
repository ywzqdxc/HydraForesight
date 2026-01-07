package com.hydravision.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

/**
 * 密码修改DTO
 */
@Schema(description = "密码修改请求")
public class PasswordUpdateDTO implements Serializable {

    @Schema(description = "当前密码", required = true)
    @NotBlank(message = "当前密码不能为空")
    private String currentPassword;

    @Schema(description = "新密码", required = true)
    @NotBlank(message = "新密码不能为空")
    private String newPassword;

    @Schema(description = "确认新密码", required = true)
    @NotBlank(message = "确认新密码不能为空")
    private String confirmPassword;

    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
