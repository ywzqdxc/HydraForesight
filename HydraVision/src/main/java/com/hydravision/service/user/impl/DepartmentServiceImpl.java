package com.hydravision.service.user.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hydravision.common.exception.BusinessException;
import com.hydravision.common.result.ResultCode;
import com.hydravision.dto.user.DepartmentCreateDTO;
import com.hydravision.dto.user.DepartmentUpdateDTO;
import com.hydravision.entity.user.Department;
import com.hydravision.mapper.user.DepartmentMapper;
import com.hydravision.service.user.DepartmentService;
import com.hydravision.vo.user.DepartmentVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 部门服务实现类
 */
@Service
public class DepartmentServiceImpl extends ServiceImpl<DepartmentMapper, Department> implements DepartmentService {

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long createDepartment(DepartmentCreateDTO dto) {
        // 检查部门编码是否存在
        if (baseMapper.selectByDeptCode(dto.getDeptCode()) != null) {
            throw new BusinessException(ResultCode.PARAMS_ERROR.getCode(), "部门编码已存在");
        }

        Department department = new Department();
        BeanUtil.copyProperties(dto, department);
        department.setStatus(1);
        baseMapper.insert(department);
        return department.getId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateDepartment(DepartmentUpdateDTO dto) {
        Department department = baseMapper.selectById(dto.getId());
        if (department == null) {
            throw new BusinessException(ResultCode.PARAMS_ERROR.getCode(), "部门不存在");
        }

        BeanUtil.copyProperties(dto, department, "id", "deptCode");
        baseMapper.updateById(department);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteDepartment(Long id) {
        Department department = baseMapper.selectById(id);
        if (department == null) {
            throw new BusinessException(ResultCode.PARAMS_ERROR.getCode(), "部门不存在");
        }

        // 检查是否有子部门
        LambdaQueryWrapper<Department> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Department::getParentId, id);
        long count = baseMapper.selectCount(wrapper);
        if (count > 0) {
            throw new BusinessException(ResultCode.PARAMS_ERROR.getCode(), "存在子部门，无法删除");
        }

        baseMapper.deleteById(id);
    }

    @Override
    public DepartmentVO getDepartmentDetail(Long id) {
        Department department = baseMapper.selectById(id);
        if (department == null) {
            throw new BusinessException(ResultCode.PARAMS_ERROR.getCode(), "部门不存在");
        }
        return convertToVO(department);
    }

    @Override
    public List<DepartmentVO> listDepartments() {
        LambdaQueryWrapper<Department> wrapper = new LambdaQueryWrapper<>();
        wrapper.orderByAsc(Department::getSortOrder);
        List<Department> list = baseMapper.selectList(wrapper);
        return list.stream().map(this::convertToVO).collect(Collectors.toList());
    }

    @Override
    public List<DepartmentVO> getDepartmentTree() {
        return listDepartments();
    }

    private DepartmentVO convertToVO(Department department) {
        DepartmentVO vo = new DepartmentVO();
        BeanUtil.copyProperties(department, vo);
        return vo;
    }
}
