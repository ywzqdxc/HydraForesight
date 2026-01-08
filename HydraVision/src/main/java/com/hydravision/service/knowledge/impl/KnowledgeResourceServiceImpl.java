package com.hydravision.service.knowledge.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hydravision.dto.knowledge.KnowledgeResourceDTO;
import com.hydravision.entity.knowledge.KnowledgeResource;
import com.hydravision.mapper.knowledge.KnowledgeResourceMapper;
import com.hydravision.service.knowledge.KnowledgeResourceService;
import com.hydravision.vo.knowledge.KnowledgeResourceVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * 知识资源服务实现类
 */
@Service
@RequiredArgsConstructor
public class KnowledgeResourceServiceImpl implements KnowledgeResourceService {

    private final KnowledgeResourceMapper resourceMapper;

    @Override
    public Page<KnowledgeResourceVO> getResourcePage(int pageNum, int pageSize, String keyword, String fileType, Integer publishStatus) {
        Page<KnowledgeResource> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<KnowledgeResource> queryWrapper = new LambdaQueryWrapper<>();
        
        if (keyword != null && !keyword.trim().isEmpty()) {
            queryWrapper.and(wrapper -> wrapper
                .like(KnowledgeResource::getTitle, keyword)
                .or()
                .like(KnowledgeResource::getDescription, keyword));
        }
        
        if (fileType != null && !fileType.trim().isEmpty()) {
            queryWrapper.eq(KnowledgeResource::getFileType, fileType);
        }
        
        if (publishStatus != null) {
            queryWrapper.eq(KnowledgeResource::getPublishStatus, publishStatus);
        }
        
        queryWrapper.orderByDesc(KnowledgeResource::getCreateTime);
        
        Page<KnowledgeResource> resultPage = resourceMapper.selectPage(page, queryWrapper);
        
        Page<KnowledgeResourceVO> voPage = new Page<>(resultPage.getCurrent(), resultPage.getSize(), resultPage.getTotal());
        voPage.setRecords(resultPage.getRecords().stream().map(this::convertToVO).collect(Collectors.toList()));
        
        return voPage;
    }

    @Override
    public List<KnowledgeResourceVO> getPublishedResources() {
        LambdaQueryWrapper<KnowledgeResource> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(KnowledgeResource::getPublishStatus, 1)
                   .orderByDesc(KnowledgeResource::getPublishTime);
        
        List<KnowledgeResource> resources = resourceMapper.selectList(queryWrapper);
        return resources.stream().map(this::convertToVO).collect(Collectors.toList());
    }

    @Override
    public KnowledgeResourceVO getResourceById(Long id) {
        KnowledgeResource resource = resourceMapper.selectById(id);
        return resource != null ? convertToVO(resource) : null;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public KnowledgeResourceVO createResource(KnowledgeResourceDTO dto, Long uploaderId, String uploaderName) {
        KnowledgeResource resource = new KnowledgeResource();
        BeanUtils.copyProperties(dto, resource);
        resource.setResourceId(UUID.randomUUID().toString().replace("-", ""));
        resource.setUploaderId(uploaderId);
        resource.setUploaderName(uploaderName);
        resource.setDownloadCount(0);
        resource.setViewCount(0);
        
        if (resource.getPublishStatus() == null) {
            resource.setPublishStatus(0);
        }
        
        if (resource.getPublishStatus() == 1) {
            resource.setPublishTime(LocalDateTime.now());
        }
        
        resourceMapper.insert(resource);
        return convertToVO(resource);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public KnowledgeResourceVO updateResource(Long id, KnowledgeResourceDTO dto) {
        KnowledgeResource resource = resourceMapper.selectById(id);
        if (resource == null) {
            throw new RuntimeException("资源不存在");
        }
        
        BeanUtils.copyProperties(dto, resource, "id", "resourceId", "uploaderId", "uploaderName", "downloadCount", "viewCount", "createTime");
        
        if (resource.getPublishStatus() != 1 && dto.getPublishStatus() == 1) {
            resource.setPublishTime(LocalDateTime.now());
        }
        
        resourceMapper.updateById(resource);
        return convertToVO(resource);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean deleteResource(Long id) {
        return resourceMapper.deleteById(id) > 0;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean publishResource(Long id) {
        KnowledgeResource resource = resourceMapper.selectById(id);
        if (resource == null) {
            return false;
        }
        
        resource.setPublishStatus(1);
        resource.setPublishTime(LocalDateTime.now());
        return resourceMapper.updateById(resource) > 0;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void incrementDownloadCount(Long id) {
        KnowledgeResource resource = resourceMapper.selectById(id);
        if (resource != null) {
            resource.setDownloadCount(resource.getDownloadCount() + 1);
            resourceMapper.updateById(resource);
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void incrementViewCount(Long id) {
        KnowledgeResource resource = resourceMapper.selectById(id);
        if (resource != null) {
            resource.setViewCount(resource.getViewCount() + 1);
            resourceMapper.updateById(resource);
        }
    }

    private KnowledgeResourceVO convertToVO(KnowledgeResource resource) {
        KnowledgeResourceVO vo = new KnowledgeResourceVO();
        BeanUtils.copyProperties(resource, vo);
        
        // 格式化文件大小
        vo.setFileSizeText(formatFileSize(resource.getFileSize()));
        
        // 设置发布状态名称
        switch (resource.getPublishStatus()) {
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

    private String formatFileSize(Long bytes) {
        if (bytes == null || bytes == 0) {
            return "0B";
        }
        
        final String[] units = {"B", "KB", "MB", "GB", "TB"};
        int unitIndex = 0;
        double size = bytes.doubleValue();
        
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        
        return String.format("%.1f%s", size, units[unitIndex]);
    }
}
