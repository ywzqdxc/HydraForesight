package com.hydravision.service.user.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.IdUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hydravision.common.exception.BusinessException;
import com.hydravision.common.result.PageResult;
import com.hydravision.common.result.ResultCode;
import com.hydravision.dto.user.PasswordUpdateDTO;
import com.hydravision.dto.user.UserCreateDTO;
import com.hydravision.dto.user.UserQueryDTO;
import com.hydravision.dto.user.UserUpdateDTO;
import com.hydravision.entity.user.Role;
import com.hydravision.entity.user.User;
import com.hydravision.entity.user.UserRole;
import com.hydravision.mapper.user.RoleMapper;
import com.hydravision.mapper.user.UserMapper;
import com.hydravision.mapper.user.UserRoleMapper;
import com.hydravision.service.user.UserService;
import com.hydravision.vo.user.UserVO;
import com.hydravision.vo.user.RoleVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 用户服务实现类
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRoleMapper userRoleMapper;

    @Autowired
    private RoleMapper roleMapper;

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User getByUsername(String username) {
        return baseMapper.selectByUsername(username);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long createUser(UserCreateDTO dto) {
        // 检查用户名是否存在
        if (baseMapper.selectByUsername(dto.getUsername()) != null) {
            throw new BusinessException(ResultCode.USER_ALREADY_EXISTS);
        }

        User user = new User();
        BeanUtil.copyProperties(dto, user);
        user.setUserId(IdUtil.simpleUUID());
        user.setSalt(IdUtil.fastSimpleUUID().substring(0, 8));
        user.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        user.setStatus(1);
        user.setLoginCount(0);

        baseMapper.insert(user);
        return user.getId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateUser(UserUpdateDTO dto) {
        User user = baseMapper.selectById(dto.getId());
        if (user == null) {
            throw new BusinessException(ResultCode.USER_NOT_FOUND);
        }

        BeanUtil.copyProperties(dto, user, "id", "username", "passwordHash", "salt");
        baseMapper.updateById(user);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteUser(Long id) {
        User user = baseMapper.selectById(id);
        if (user == null) {
            throw new BusinessException(ResultCode.USER_NOT_FOUND);
        }
        baseMapper.deleteById(id);
    }

    @Override
    public UserVO getUserDetail(Long id) {
        User user = baseMapper.selectById(id);
        if (user == null) {
            throw new BusinessException(ResultCode.USER_NOT_FOUND);
        }
        return convertToVO(user);
    }

    @Override
    public PageResult<UserVO> pageUsers(UserQueryDTO query) {
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.like(StringUtils.hasText(query.getUsername()), User::getUsername, query.getUsername())
                .like(StringUtils.hasText(query.getRealName()), User::getRealName, query.getRealName())
                .like(StringUtils.hasText(query.getPhone()), User::getPhone, query.getPhone())
                .eq(query.getStatus() != null, User::getStatus, query.getStatus())
                .eq(query.getDeptId() != null, User::getDeptId, query.getDeptId())
                .orderByDesc(User::getCreateTime);

        IPage<User> page = baseMapper.selectPage(
                new Page<>(query.getCurrent(), query.getSize()),
                wrapper
        );

        List<UserVO> voList = page.getRecords().stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());

        return PageResult.of(page.getCurrent(), page.getSize(), page.getTotal(), voList);
    }

    @Override
    public List<String> getUserRoleCodes(Long userId) {
        return baseMapper.selectRoleCodesByUserId(userId);
    }

    @Override
    public List<String> getUserPermCodes(Long userId) {
        return baseMapper.selectPermCodesByUserId(userId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateLoginInfo(Long userId, String ip) {
        User user = new User();
        user.setId(userId);
        user.setLastLoginTime(LocalDateTime.now());
        user.setLastLoginIp(ip);
        baseMapper.updateById(user);

        // 更新登录次数
        LambdaUpdateWrapper<User> updateWrapper = new LambdaUpdateWrapper<>();
        updateWrapper.eq(User::getId, userId)
                .setSql("login_count = login_count + 1");
        baseMapper.update(null, updateWrapper);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updatePassword(String username, PasswordUpdateDTO dto) {
        // 验证新密码和确认密码是否一致
        if (!dto.getNewPassword().equals(dto.getConfirmPassword())) {
            throw new BusinessException(ResultCode.PASSWORD_NOT_MATCH);
        }

        // 查询用户
        User user = baseMapper.selectByUsername(username);
        if (user == null) {
            throw new BusinessException(ResultCode.USER_NOT_FOUND);
        }

        // 验证当前密码是否正确
        if (!passwordEncoder.matches(dto.getCurrentPassword(), user.getPasswordHash())) {
            throw new BusinessException(ResultCode.PASSWORD_ERROR);
        }

        // 更新密码
        user.setPasswordHash(passwordEncoder.encode(dto.getNewPassword()));
        user.setSalt(IdUtil.fastSimpleUUID().substring(0, 8));
        baseMapper.updateById(user);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void setUserRole(Long userId, Long roleId) {
        User user = baseMapper.selectById(userId);
        if (user == null) {
            throw new BusinessException(ResultCode.USER_NOT_FOUND);
        }

        Role role = roleMapper.selectById(roleId);
        if (role == null) {
            throw new BusinessException(ResultCode.ROLE_NOT_FOUND);
        }

        UserRole userRole = new UserRole();
        userRole.setUserId(userId);
        userRole.setRoleId(roleId);
        userRoleMapper.insert(userRole);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void removeUserRole(Long userId, Long roleId) {
        LambdaUpdateWrapper<UserRole> wrapper = new LambdaUpdateWrapper<>();
        wrapper.eq(UserRole::getUserId, userId)
               .eq(UserRole::getRoleId, roleId);
        userRoleMapper.delete(wrapper);
    }

    @Override
    public List<String> getUserRoles(Long userId) {
        return baseMapper.selectRoleCodesByUserId(userId);
    }

    private UserVO convertToVO(User user) {
        UserVO vo = new UserVO();
        BeanUtil.copyProperties(user, vo);
        
        List<Role> roles = roleMapper.selectByUserId(user.getId());
        if (roles != null && !roles.isEmpty()) {
            List<RoleVO> roleVOList = roles.stream()
                    .map(role -> {
                        RoleVO roleVO = new RoleVO();
                        BeanUtil.copyProperties(role, roleVO);
                        return roleVO;
                    })
                    .collect(Collectors.toList());
            vo.setRoles(roleVOList);
        }
        
        return vo;
    }
}
