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
        System.out.println("[v0 Debug] ========== 开始处理知识资源published请求 ==========");
        List<KnowledgeResourceVO> resources = resourceService.getPublishedResources();
        System.out.println("[v0 Debug] 查询到的知识资源数量: " + resources.size());
        if (!resources.isEmpty()) {
            System.out.println("[v0 Debug] 第一条记录: " + resources.get(0).getTitle());
        }
        System.out.println("[v0 Debug] ========== 知识资源published请求处理完成 ==========");
        return Result.success(resources);
    }

    /**
     * 根据ID获取资源详情
     */
    @GetMapping("/{id}")
    public Result<KnowledgeResourceVO> getById(@PathVariable Long id) {
        KnowledgeResourceVO resource = resourceService.getResourceById(id);
        if (resource == null) {
            return Result.fail("资源不存在");
        }
        return Result.success(resource);
    }

    /**
     * 创建资源
     */
    @PostMapping
    public Result<KnowledgeResourceVO> create(@RequestBody KnowledgeResourceDTO dto) {
        try {
            System.out.println("[v0 Debug] ========== 开始创建知识资源 ==========");
            System.out.println("[v0 Debug] 接收到的DTO: " + dto);
            System.out.println("[v0 Debug] 标题: " + dto.getTitle());
            System.out.println("[v0 Debug] 文件URL: " + dto.getFileUrl());
            System.out.println("[v0 Debug] 文件类型: " + dto.getFileType());
            System.out.println("[v0 Debug] 文件大小: " + dto.getFileSize());
            System.out.println("[v0 Debug] 发布状态: " + dto.getPublishStatus());
            
            Long userId = securityUtils.getCurrentUserId();
            String username = securityUtils.getCurrentUser().getUsername();
            System.out.println("[v0 Debug] 当前用户ID: " + userId + ", 用户名: " + username);
            
            KnowledgeResourceVO resource = resourceService.createResource(dto, userId, username);
            System.out.println("[v0 Debug] 资源创建成功，ID: " + resource.getId());
            System.out.println("[v0 Debug] ========== 知识资源创建完成 ==========");
            
            return Result.success(resource);
        } catch (Exception e) {
            System.err.println("[v0 Debug] 创建资源异常: " + e.getMessage());
            e.printStackTrace();
            return Result.fail("创建失败: " + e.getMessage());
        }
    }

    /**
     * 更新资源
     */
    @PutMapping("/{id}")
    public Result<KnowledgeResourceVO> update(@PathVariable Long id, @RequestBody KnowledgeResourceDTO dto) {
        try {
            System.out.println("[v0 Debug] ========== 开始更新知识资源 ==========");
            System.out.println("[v0 Debug] 资源ID: " + id);
            System.out.println("[v0 Debug] 接收到的DTO: " + dto);
            
            KnowledgeResourceVO resource = resourceService.updateResource(id, dto);
            System.out.println("[v0 Debug] 资源更新成功");
            System.out.println("[v0 Debug] ========== 知识资源更新完成 ==========");
            
            return Result.success(resource);
        } catch (Exception e) {
            System.err.println("[v0 Debug] 更新资源异常: " + e.getMessage());
            e.printStackTrace();
            return Result.fail("更新失败: " + e.getMessage());
        }
    }

    /**
     * 删除资源
     */
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        boolean success = resourceService.deleteResource(id);
        return success ? Result.success() : Result.fail("删除失败");
    }

    /**
     * 发布资源
     */
    @PostMapping("/{id}/publish")
    public Result<Void> publish(@PathVariable Long id) {
        boolean success = resourceService.publishResource(id);
        return success ? Result.success() : Result.fail("发布失败");
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
