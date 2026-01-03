package com.hydravision.service.auth.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.IdUtil;
import com.hydravision.common.exception.BusinessException;
import com.hydravision.common.result.ResultCode;
import com.hydravision.dto.auth.LoginDTO;
import com.hydravision.dto.auth.RegisterDTO;
import com.hydravision.entity.user.User;
import com.hydravision.mapper.user.UserMapper;
import com.hydravision.security.JwtTokenProvider;
import com.hydravision.service.auth.AuthService;
import com.hydravision.service.user.UserService;
import com.hydravision.vo.auth.LoginVO;
import com.hydravision.vo.user.UserVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 认证服务实现类
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${jwt.expiration}")
    private Long expiration;

    @Override
    public LoginVO login(LoginDTO dto, String ip) {
        // 根据用户名查询用户
        User user = userService.getByUsername(dto.getUsername());
        if (user == null) {
            throw new BusinessException(ResultCode.USERNAME_OR_PASSWORD_ERROR);
        }

        // 检查用户状态
        if (user.getStatus() == 0) {
            throw new BusinessException(ResultCode.ACCOUNT_DISABLED);
        }
        if (user.getStatus() == 2) {
            throw new BusinessException(ResultCode.ACCOUNT_LOCKED);
        }

        // 验证密码
        if (!passwordEncoder.matches(dto.getPassword(), user.getPasswordHash())) {
            throw new BusinessException(ResultCode.USERNAME_OR_PASSWORD_ERROR);
        }

        // 更新登录信息
        userService.updateLoginInfo(user.getId(), ip);

        // 生成令牌
        String accessToken = jwtTokenProvider.generateToken(user.getId(), user.getUsername());
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getId(), user.getUsername());

        // 构建用户信息
        UserVO userVO = new UserVO();
        BeanUtil.copyProperties(user, userVO);

        return LoginVO.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(expiration / 1000)
                .user(userVO)
                .build();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long register(RegisterDTO dto) {
        // 检查用户名是否存在
        if (userService.getByUsername(dto.getUsername()) != null) {
            throw new BusinessException(ResultCode.USER_ALREADY_EXISTS);
        }

        // 创建用户
        User user = new User();
        user.setUserId(IdUtil.simpleUUID());
        user.setUsername(dto.getUsername());
        user.setSalt(IdUtil.fastSimpleUUID().substring(0, 8));
        user.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setRealName(dto.getRealName());
        user.setStatus(1);
        user.setLoginCount(0);

        userMapper.insert(user);

        log.info("用户注册成功: {}", dto.getUsername());
        return user.getId();
    }

    @Override
    public LoginVO refreshToken(String refreshToken) {
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new BusinessException(ResultCode.TOKEN_INVALID);
        }

        String username = jwtTokenProvider.getUsernameFromToken(refreshToken);
        Long userId = jwtTokenProvider.getUserIdFromToken(refreshToken);

        User user = userService.getByUsername(username);
        if (user == null) {
            throw new BusinessException(ResultCode.USER_NOT_FOUND);
        }

        String newAccessToken = jwtTokenProvider.generateToken(userId, username);
        String newRefreshToken = jwtTokenProvider.generateRefreshToken(userId, username);

        UserVO userVO = new UserVO();
        BeanUtil.copyProperties(user, userVO);

        return LoginVO.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .tokenType("Bearer")
                .expiresIn(expiration / 1000)
                .user(userVO)
                .build();
    }

    @Override
    public void logout(String token) {
        // 可以将token加入黑名单(Redis实现)
        log.info("用户登出");
    }
}
