package com.hydravision.service.user;

import com.baomidou.mybatisplus.extension.service.IService;
import com.hydravision.common.result.PageResult;
import com.hydravision.dto.user.UserCreateDTO;
import com.hydravision.dto.user.UserQueryDTO;
import com.hydravision.dto.user.UserUpdateDTO;
import com.hydravision.entity.user.User;
import com.hydravision.vo.user.UserVO;

import java.util.List;

/**
 * 用户服务接口
 */
public interface UserService extends IService<User> {

    /**
     * 根据用户名查询用户
     */
    User getByUsername(String username);

    /**
     * 创建用户
     */
    Long createUser(UserCreateDTO dto);

    /**
     * 更新用户
     */
    void updateUser(UserUpdateDTO dto);

    /**
     * 删除用户
     */
    void deleteUser(Long id);

    /**
     * 获取用户详情
     */
    UserVO getUserDetail(Long id);

    /**
     * 分页查询用户
     */
    PageResult<UserVO> pageUsers(UserQueryDTO query);

    /**
     * 获取用户角色编码列表
     */
    List<String> getUserRoleCodes(Long userId);

    /**
     * 获取用户权限编码列表
     */
    List<String> getUserPermCodes(Long userId);

    /**
     * 更新用户登录信息
     */
    void updateLoginInfo(Long userId, String ip);
}
