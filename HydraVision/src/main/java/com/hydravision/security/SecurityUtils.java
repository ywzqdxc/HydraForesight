package com.hydravision.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * 安全工具类，用于获取当前认证用户信息
 */
public class SecurityUtils {

    /**
     * 获取当前认证用户
     */
    public static UserDetails getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserDetails) {
                return (UserDetails) principal;
            }
        }
        return null;
    }

    /**
     * 获取当前用户名
     */
    public static String getCurrentUsername() {
        UserDetails user = getCurrentUser();
        return user != null ? user.getUsername() : null;
    }

    /**
     * 获取当前用户ID
     * 注：用户ID需要从数据库查询或从认证令牌中提取
     */
    public static Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserDetails) {
                UserDetails userDetails = (UserDetails) principal;
                // 从用户名查询用户ID，需要注入UserService或UserMapper
                // 这里返回一个占位符，实际实现需要根据项目具体情况调整
                return getUserIdByUsername(userDetails.getUsername());
            }
        }
        return null;
    }

    /**
     * 检查用户是否已认证
     */
    public static boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && authentication.isAuthenticated();
    }

    /**
     * 根据用户名获取用户ID
     * 这是一个辅助方法，实际实现需要通过DI注入UserMapper来查询
     */
    private static Long getUserIdByUsername(String username) {
        // 这里需要实际的数据库查询逻辑
        // 由于这是一个静态工具方法，建议改进设计：
        // 1. 在JWT Token中存储userId信息
        // 2. 或者将SecurityUtils改为Spring Bean，注入UserMapper
        return null;
    }
}
