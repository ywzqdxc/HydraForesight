package com.hydravision.service.region.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hydravision.common.exception.BusinessException;
import com.hydravision.common.result.PageResult;
import com.hydravision.common.result.ResultCode;
import com.hydravision.entity.region.MonitorArea;
import com.hydravision.mapper.region.MonitorAreaMapper;
import com.hydravision.service.region.MonitorAreaService;
import com.hydravision.vo.region.MonitorAreaVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 监测区域服务实现类
 */
@Service
@RequiredArgsConstructor
public class MonitorAreaServiceImpl extends ServiceImpl<MonitorAreaMapper, MonitorArea> implements MonitorAreaService {

    @Override
    public List<MonitorAreaVO> getAllAreas() {
        LambdaQueryWrapper<MonitorArea> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(MonitorArea::getStatus, 1)
                .orderByAsc(MonitorArea::getId);
        return baseMapper.selectList(wrapper).stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
    }

    @Override
    public MonitorAreaVO getAreaDetail(Long id) {
        MonitorArea area = baseMapper.selectById(id);
        if (area == null) {
            throw new BusinessException(ResultCode.DATA_NOT_FOUND);
        }
        return convertToVO(area);
    }

    @Override
    public MonitorAreaVO getAreaByCode(String areaCode) {
        LambdaQueryWrapper<MonitorArea> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(MonitorArea::getAreaCode, areaCode);
        MonitorArea area = baseMapper.selectOne(wrapper);
        if (area == null) {
            throw new BusinessException(ResultCode.DATA_NOT_FOUND);
        }
        return convertToVO(area);
    }

    @Override
    public PageResult<MonitorAreaVO> pageAreas(Integer current, Integer size) {
        LambdaQueryWrapper<MonitorArea> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(MonitorArea::getStatus, 1)
                .orderByDesc(MonitorArea::getCreateTime);

        IPage<MonitorArea> page = baseMapper.selectPage(new Page<>(current, size), wrapper);

        List<MonitorAreaVO> voList = page.getRecords().stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());

        return PageResult.of(page.getCurrent(), page.getSize(), page.getTotal(), voList);
    }

    private MonitorAreaVO convertToVO(MonitorArea area) {
        MonitorAreaVO vo = new MonitorAreaVO();
        BeanUtil.copyProperties(area, vo);
        return vo;
    }
}
