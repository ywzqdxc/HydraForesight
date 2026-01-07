package com.hydravision.mapper.user;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.hydravision.entity.user.Department;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

/**
 * 部门Mapper接口
 */
@Mapper
public interface DepartmentMapper extends BaseMapper<Department> {

    /**
     * 根据部门编码查询部门
     */
    @Select("SELECT * FROM hf_department WHERE dept_code = #{deptCode} AND is_deleted = 0")
    Department selectByDeptCode(String deptCode);
}
