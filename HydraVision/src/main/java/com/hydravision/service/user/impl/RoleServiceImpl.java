package com.hydravision.service.user.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hydravision.common.base.BasePageQuery;
import com.hydravision.common.exception.BusinessException;
import com.hydravision.common.result.PageResult;
import com.hydravision.common.result.ResultCode;
import com.hydravision.dto.user.RoleCreateDTO;
import com.hydravision.dto.user.RoleUpdateDTO;
import com.hydravision.entity.user.Role;
import com.hydravision.mapper.user.RoleMapper;
import com.hydravision.service.user.RoleService;
import com.hydravision.vo.user.RoleVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 角色服务实现类
 */
@Service
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements RoleService {

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long createRole(RoleCreateDTO dto) {
        // 检查角色编码是否存在
        if (baseMapper.selectByRoleCode(dto.getRoleCode()) != null) {
            throw new BusinessException(ResultCode.PARAMS_ERROR.getCode(), "角色编码已存在");
        }

        Role role = new Role();
        BeanUtil.copyProperties(dto, role);
        role.setStatus(1);
        role.setIsSystem(0);
        baseMapper.insert(role);
        return role.getId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateRole(RoleUpdateDTO dto) {
        Role role = baseMapper.selectById(dto.getId());
        if (role == null) {
            throw new BusinessException(ResultCode.PARAMS_ERROR.getCode(), "角色不存在");
        }

        // 系统角色不允许修改
        if (role.getIsSystem() == 1) {
            throw new BusinessException(ResultCode.PARAMS_ERROR.getCode(), "系统角色不允许修改");
        }

        BeanUtil.copyProperties(dto, role, "id", "roleCode", "isSystem");
        baseMapper.updateById(role);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteRole(Long id) {
        Role role = baseMapper.selectById(id);
        if (role == null) {
            throw new BusinessException(ResultCode.PARAMS_ERROR.getCode(), "角色不存在");
        }

        // 系统角色不允许删除
        if (role.getIsSystem() == 1) {
            throw new BusinessException(ResultCode.PARAMS_ERROR.getCode(), "系统角色不允许删除");
        }

        baseMapper.deleteById(id);
    }

    @Override
    public RoleVO getRoleDetail(Long id) {
        Role role = baseMapper.selectById(id);
        if (role == null) {
            throw new BusinessException(ResultCode.PARAMS_ERROR.getCode(), "角色不存在");
        }
        return convertToVO(role);
    }

    @Override
    public PageResult<RoleVO> pageRoles(BasePageQuery query) {
        LambdaQueryWrapper<Role> wrapper = new LambdaQueryWrapper<>();
        wrapper.orderByAsc(Role::getSortOrder);

        IPage<Role> page = baseMapper.selectPage(
                new Page<>(query.getCurrent(), query.getSize()),
                wrapper
        );

        List<RoleVO> voList = page.getRecords().stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());

        return PageResult.of(page.getCurrent(), page.getSize(), page.getTotal(), voList);
    }

    @Override
    public List<RoleVO> listRoles() {
        LambdaQueryWrapper<Role> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Role::getStatus, 1)
                .orderByAsc(Role::getSortOrder);
        List<Role> list = baseMapper.selectList(wrapper);
        return list.stream().map(this::convertToVO).collect(Collectors.toList());
    }

    @Override
    public List<RoleVO> getRolesByUserId(Long userId) {
        List<Role> roles = baseMapper.selectByUserId(userId);
        return roles.stream().map(this::convertToVO).collect(Collectors.toList());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void assignUserRoles(Long userId, List<Long> roleIds) {
        // TODO: 实现用户角色分配
    }

    private RoleVO convertToVO(Role role) {
        RoleVO vo = new RoleVO();
        BeanUtil.copyProperties(role, vo);
        return vo;
    }
}
