package com.hydravision.service.user;

import com.baomidou.mybatisplus.extension.service.IService;
import com.hydravision.common.result.PageResult;
import com.hydravision.dto.user.RoleCreateDTO;
import com.hydravision.dto.user.RoleUpdateDTO;
import com.hydravision.entity.user.Role;
import com.hydravision.vo.user.RoleVO;
import com.hydravision.common.base.BasePageQuery;

import java.util.List;

/**
 * 角色服务接口
 */
public interface RoleService extends IService<Role> {

    /**
     * 创建角色
     */
    Long createRole(RoleCreateDTO dto);

    /**
     * 更新角色
     */
    void updateRole(RoleUpdateDTO dto);

    /**
     * 删除角色
     */
    void deleteRole(Long id);

    /**
     * 获取角色详情
     */
    RoleVO getRoleDetail(Long id);

    /**
     * 分页查询角色
     */
    PageResult<RoleVO> pageRoles(BasePageQuery query);

    /**
     * 获取所有角色列表
     */
    List<RoleVO> listRoles();

    /**
     * 根据用户ID获取角色列表
     */
    List<RoleVO> getRolesByUserId(Long userId);

    /**
     * 分配用户角色
     */
    void assignUserRoles(Long userId, List<Long> roleIds);
}
