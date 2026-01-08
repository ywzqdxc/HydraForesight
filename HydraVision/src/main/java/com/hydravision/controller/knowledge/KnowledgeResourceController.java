package com.hydravision.controller.knowledge;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hydravision.common.result.Result;
import com.hydravision.dto.knowledge.KnowledgeResourceDTO;
import com.hydravision.security.SecurityUtils;
import com.hydravision.service.knowledge.KnowledgeResourceService;
import com.hydravision.vo.knowledge.KnowledgeResourceVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 知识资源控制器
 */
@RestController
@RequestMapping("/api/knowledge/resource")
@RequiredArgsConstructor
public class KnowledgeResourceController {

    private final KnowledgeResourceService resourceService;
    private final SecurityUtils securityUtils;

    /**
     * 分页查询资源
     */
    @GetMapping("/page")
    public Result<Page<KnowledgeResourceVO>> getPage(
            @RequestParam(defaultValue = "1") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String fileType,
            @RequestParam(required = false) Integer publishStatus) {
        Page<KnowledgeResourceVO> page = resourceService.getResourcePage(pageNum, pageSize, keyword, fileType, publishStatus);
        return Result.success(page);
    }

    /**
     * 获取所有已发布的资源
     */
    @GetMapping("/published")
    public Result<List<KnowledgeResourceVO>> getPublished() {
        List<KnowledgeResourceVO> resources = resourceService.getPublishedResources();
        return Result.success(resources);
    }

    /**
     * 根据ID获取资源详情
     */
    @GetMapping("/{id}")
    public Result<KnowledgeResourceVO> getById(@PathVariable Long id) {
        KnowledgeResourceVO resource = resourceService.getResourceById(id);
        if (resource == null) {
            return Result.error("资源不存在");
        }
        return Result.success(resource);
    }

    /**
     * 创建资源
     */
    @PostMapping
    public Result<KnowledgeResourceVO> create(@RequestBody KnowledgeResourceDTO dto) {
        try {
            Long userId = securityUtils.getCurrentUserId();
            String username = securityUtils.getCurrentUser().getUsername();
            KnowledgeResourceVO resource = resourceService.createResource(dto, userId, username);
            return Result.success(resource);
        } catch (Exception e) {
            return Result.error("创建失败: " + e.getMessage());
        }
    }

    /**
     * 更新资源
     */
    @PutMapping("/{id}")
    public Result<KnowledgeResourceVO> update(@PathVariable Long id, @RequestBody KnowledgeResourceDTO dto) {
        try {
            KnowledgeResourceVO resource = resourceService.updateResource(id, dto);
            return Result.success(resource);
        } catch (Exception e) {
            return Result.error("更新失败: " + e.getMessage());
        }
    }

    /**
     * 删除资源
     */
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        boolean success = resourceService.deleteResource(id);
        return success ? Result.success() : Result.error("删除失败");
    }

    /**
     * 发布资源
     */
    @PostMapping("/{id}/publish")
    public Result<Void> publish(@PathVariable Long id) {
        boolean success = resourceService.publishResource(id);
        return success ? Result.success() : Result.error("发布失败");
    }

    /**
     * 增加下载次数
     */
    @PostMapping("/{id}/download")
    public Result<Void> incrementDownload(@PathVariable Long id) {
        resourceService.incrementDownloadCount(id);
        return Result.success();
    }

    /**
     * 增加浏览次数
     */
    @PostMapping("/{id}/view")
    public Result<Void> incrementView(@PathVariable Long id) {
        resourceService.incrementViewCount(id);
        return Result.success();
    }
}
