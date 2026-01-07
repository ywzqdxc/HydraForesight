package com.hydravision.mapper.user;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.hydravision.entity.user.UserRole;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;

/**
 * 用户角色Mapper
 */
@Mapper
public interface UserRoleMapper extends BaseMapper<UserRole> {

    /**
     * 删除用户的所有角色
     */
    @Delete("DELETE FROM hf_user_role WHERE user_id = #{userId}")
    void deleteByUserId(Long userId);
}
