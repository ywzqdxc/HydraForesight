package com.hydravision.service.user;

import com.baomidou.mybatisplus.extension.service.IService;
import com.hydravision.dto.user.DepartmentCreateDTO;
import com.hydravision.dto.user.DepartmentUpdateDTO;
import com.hydravision.entity.user.Department;
import com.hydravision.vo.user.DepartmentVO;

import java.util.List;

/**
 * 部门服务接口
 */
public interface DepartmentService extends IService<Department> {

    /**
     * 创建部门
     */
    Long createDepartment(DepartmentCreateDTO dto);

    /**
     * 更新部门
     */
    void updateDepartment(DepartmentUpdateDTO dto);

    /**
     * 删除部门
     */
    void deleteDepartment(Long id);

    /**
     * 获取部门详情
     */
    DepartmentVO getDepartmentDetail(Long id);

    /**
     * 获取部门列表
     */
    List<DepartmentVO> listDepartments();

    /**
     * 获取部门树
     */
    List<DepartmentVO> getDepartmentTree();
}
