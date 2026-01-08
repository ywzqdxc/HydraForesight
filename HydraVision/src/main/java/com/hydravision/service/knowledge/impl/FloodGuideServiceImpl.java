package com.hydravision.service.knowledge.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hydravision.dto.knowledge.FloodGuideDTO;
import com.hydravision.entity.knowledge.FloodGuide;
import com.hydravision.mapper.knowledge.FloodGuideMapper;
import com.hydravision.service.knowledge.FloodGuideService;
import com.hydravision.vo.knowledge.FloodGuideVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * 防汛指南服务实现类
 */
@Service
@RequiredArgsConstructor
public class FloodGuideServiceImpl implements FloodGuideService {

    private final FloodGuideMapper floodGuideMapper;

    @Override
    public Page<FloodGuideVO> getFloodGuidePage(int pageNum, int pageSize, String keyword, Integer guideLevel, Integer publishStatus) {
        Page<FloodGuide> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<FloodGuide> queryWrapper = new LambdaQueryWrapper<>();
        
        if (keyword != null && !keyword.trim().isEmpty()) {
            queryWrapper.and(wrapper -> wrapper
                .like(FloodGuide::getTitle, keyword)
                .or()
                .like(FloodGuide::getDescription, keyword));
        }
        
        if (guideLevel != null) {
            queryWrapper.eq(FloodGuide::getGuideLevel, guideLevel);
        }
        
        if (publishStatus != null) {
            queryWrapper.eq(FloodGuide::getPublishStatus, publishStatus);
        }
        
        queryWrapper.orderByDesc(FloodGuide::getSortOrder)
                   .orderByDesc(FloodGuide::getCreateTime);
        
        Page<FloodGuide> resultPage = floodGuideMapper.selectPage(page, queryWrapper);
        
        Page<FloodGuideVO> voPage = new Page<>(resultPage.getCurrent(), resultPage.getSize(), resultPage.getTotal());
        voPage.setRecords(resultPage.getRecords().stream().map(this::convertToVO).collect(Collectors.toList()));
        
        return voPage;
    }

    @Override
    public List<FloodGuideVO> getPublishedGuides() {
        System.out.println("[v0 Debug] FloodGuideService - 开始查询已发布的防汛指南");
        LambdaQueryWrapper<FloodGuide> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(FloodGuide::getPublishStatus, 1)
                   .orderByDesc(FloodGuide::getSortOrder)
                   .orderByDesc(FloodGuide::getPublishTime);
        
        System.out.println("[v0 Debug] FloodGuideService - 执行数据库查询");
        List<FloodGuide> guides = floodGuideMapper.selectList(queryWrapper);
        System.out.println("[v0 Debug] FloodGuideService - 数据库返回记录数: " + guides.size());
        
        if (!guides.isEmpty()) {
            System.out.println("[v0 Debug] FloodGuideService - 第一条记录: ID=" + guides.get(0).getId() + ", 标题=" + guides.get(0).getTitle() + ", 状态=" + guides.get(0).getPublishStatus());
        }
        
        List<FloodGuideVO> result = guides.stream().map(this::convertToVO).collect(Collectors.toList());
        System.out.println("[v0 Debug] FloodGuideService - 转换完成，返回VO数量: " + result.size());
        return result;
    }

    @Override
    public FloodGuideVO getFloodGuideById(Long id) {
        FloodGuide guide = floodGuideMapper.selectById(id);
        return guide != null ? convertToVO(guide) : null;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public FloodGuideVO createFloodGuide(FloodGuideDTO dto) {
        FloodGuide guide = new FloodGuide();
        BeanUtils.copyProperties(dto, guide);
        guide.setGuideId(UUID.randomUUID().toString().replace("-", ""));
        guide.setViewCount(0);
        guide.setLikeCount(0);
        
        if (guide.getPublishStatus() == null) {
            guide.setPublishStatus(0); // 默认草稿状态
        }
        
        if (guide.getPublishStatus() == 1) {
            guide.setPublishTime(LocalDateTime.now());
        }
        
        floodGuideMapper.insert(guide);
        return convertToVO(guide);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public FloodGuideVO updateFloodGuide(Long id, FloodGuideDTO dto) {
        FloodGuide guide = floodGuideMapper.selectById(id);
        if (guide == null) {
            throw new RuntimeException("防汛指南不存在");
        }
        
        BeanUtils.copyProperties(dto, guide, "id", "guideId", "viewCount", "likeCount", "createTime");
        
        // 如果从草稿变为发布状态，设置发布时间
        if (guide.getPublishStatus() != 1 && dto.getPublishStatus() == 1) {
            guide.setPublishTime(LocalDateTime.now());
        }
        
        floodGuideMapper.updateById(guide);
        return convertToVO(guide);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean deleteFloodGuide(Long id) {
        return floodGuideMapper.deleteById(id) > 0;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean publishGuide(Long id) {
        FloodGuide guide = floodGuideMapper.selectById(id);
        if (guide == null) {
            return false;
        }
        
        guide.setPublishStatus(1);
        guide.setPublishTime(LocalDateTime.now());
        return floodGuideMapper.updateById(guide) > 0;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void incrementViewCount(Long id) {
        FloodGuide guide = floodGuideMapper.selectById(id);
        if (guide != null) {
            guide.setViewCount(guide.getViewCount() + 1);
            floodGuideMapper.updateById(guide);
        }
    }

    private FloodGuideVO convertToVO(FloodGuide guide) {
        FloodGuideVO vo = new FloodGuideVO();
        BeanUtils.copyProperties(guide, vo);
        
        // 设置难度级别名称
        switch (guide.getGuideLevel()) {
            case 1:
                vo.setGuideLevelName("基础");
                break;
            case 2:
                vo.setGuideLevelName("中级");
                break;
            case 3:
                vo.setGuideLevelName("高级");
                break;
            default:
                vo.setGuideLevelName("未知");
        }
        
        // 设置发布状态名称
        switch (guide.getPublishStatus()) {
            case 0:
                vo.setPublishStatusName("草稿");
                break;
            case 1:
                vo.setPublishStatusName("已发布");
                break;
            case 2:
                vo.setPublishStatusName("已下架");
                break;
            default:
                vo.setPublishStatusName("未知");
        }
        
        return vo;
    }
}
