package com.hydravision.mapper.user;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.hydravision.entity.user.Role;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 角色Mapper接口
 */
@Mapper
public interface RoleMapper extends BaseMapper<Role> {

    /**
     * 根据角色编码查询角色
     */
    @Select("SELECT * FROM hf_role WHERE role_code = #{roleCode} AND is_deleted = 0")
    Role selectByRoleCode(String roleCode);

    /**
     * 根据用户ID查询角色列表
     */
    List<Role> selectByUserId(@Param("userId") Long userId);
}
