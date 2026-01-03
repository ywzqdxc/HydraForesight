package com.hydravision.service.auth;

import com.hydravision.dto.auth.LoginDTO;
import com.hydravision.dto.auth.RegisterDTO;
import com.hydravision.vo.auth.LoginVO;

/**
 * 认证服务接口
 */
public interface AuthService {

    /**
     * 用户登录
     */
    LoginVO login(LoginDTO dto, String ip);

    /**
     * 用户注册
     */
    Long register(RegisterDTO dto);

    /**
     * 刷新令牌
     */
    LoginVO refreshToken(String refreshToken);

    /**
     * 用户登出
     */
    void logout(String token);
}
