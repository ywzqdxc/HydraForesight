package com.hydravision.common.result;

/**
 * 响应状态码枚举
 */
public enum ResultCode {

    // 成功
    SUCCESS(200, "操作成功"),

    // 客户端错误 4xx
    FAIL(400, "操作失败"),
    PARAM_ERROR(400, "参数错误"),
    PARAMS_ERROR(400, "参数错误"), // 添加 PARAMS_ERROR 作为别名
    PARAM_VALID_ERROR(400, "参数校验失败"),
    NOT_FOUND(404, "资源不存在"),
    METHOD_NOT_ALLOWED(405, "请求方法不允许"),

    // 认证授权错误
    UNAUTHORIZED(401, "未认证或认证失败"),
    TOKEN_EXPIRED(401, "Token已过期"),
    TOKEN_INVALID(401, "Token无效"),
    FORBIDDEN(403, "没有操作权限"),
    ACCOUNT_DISABLED(403, "账号已被禁用"),
    ACCOUNT_LOCKED(403, "账号已被锁定"),

    // 服务器错误 5xx
    SERVER_ERROR(500, "服务器内部错误"),
    SERVICE_UNAVAILABLE(503, "服务暂不可用"),

    // 业务错误 1xxx
    USER_NOT_FOUND(1001, "用户不存在"),
    USER_ALREADY_EXISTS(1002, "用户已存在"),
    PASSWORD_ERROR(1003, "密码错误"),
    OLD_PASSWORD_ERROR(1004, "原密码错误"),
    USERNAME_OR_PASSWORD_ERROR(1005, "用户名或密码错误"),
    PASSWORD_NOT_MATCH(1006, "两次输入的密码不一致"), // 添加密码不匹配错误码
    ROLE_NOT_FOUND(1007, "角色不存在"),

    DEVICE_NOT_FOUND(2001, "设备不存在"),
    DEVICE_OFFLINE(2002, "设备离线"),
    DEVICE_ALREADY_EXISTS(2003, "设备已存在"),

    ALERT_NOT_FOUND(3001, "预警不存在"),
    ALERT_ALREADY_RELEASED(3002, "预警已解除"),

    REPORT_NOT_FOUND(4001, "上报不存在"),
    REPORT_ALREADY_PROCESSED(4002, "上报已处理"),

    DATA_NOT_FOUND(5001, "数据不存在"),
    DATA_IMPORT_ERROR(5002, "数据导入失败");

    private final Integer code;
    private final String message;

    ResultCode(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
