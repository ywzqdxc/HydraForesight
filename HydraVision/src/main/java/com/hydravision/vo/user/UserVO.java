package com.hydravision.vo.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 用户VO
 */
@Data
@Schema(description = "用户信息")
public class UserVO implements Serializable {

    @Schema(description = "ID")
    private Long id;

    @Schema(description = "用户唯一标识")
    private String userId;

    @Schema(description = "用户名")
    private String username;

    @Schema(description = "真实姓名")
    private String realName;

    @Schema(description = "昵称")
    private String nickname;

    @Schema(description = "邮箱")
    private String email;

    @Schema(description = "手机号")
    private String phone;

    @Schema(description = "头像URL")
    private String avatarUrl;

    @Schema(description = "性别")
    private Integer gender;

    @Schema(description = "出生日期")
    private LocalDate birthday;

    @Schema(description = "部门ID")
    private Long deptId;

    @Schema(description = "状态")
    private Integer status;

    @Schema(description = "最后登录时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastLoginTime;

    @Schema(description = "最后登录IP")
    private String lastLoginIp;

    @Schema(description = "登录次数")
    private Integer loginCount;

    @Schema(description = "创建时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    @Schema(description = "备注")
    private String remark;

    @Schema(description = "角色列表")
    private List<RoleVO> roles;

    @Schema(description = "部门名称")
    private String deptName;
}
