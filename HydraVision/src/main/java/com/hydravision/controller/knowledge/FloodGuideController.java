package com.hydravision.controller.knowledge;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hydravision.common.result.Result;
import com.hydravision.dto.knowledge.FloodGuideDTO;
import com.hydravision.service.knowledge.FloodGuideService;
import com.hydravision.vo.knowledge.FloodGuideVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 防汛指南控制器
 */
@RestController
@RequestMapping("/api/knowledge/flood-guide")
@RequiredArgsConstructor
public class FloodGuideController {

    private final FloodGuideService floodGuideService;

    /**
     * 分页查询防汛指南
     */
    @GetMapping("/page")
    public Result<Page<FloodGuideVO>> getPage(
            @RequestParam(defaultValue = "1") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Integer guideLevel,
            @RequestParam(required = false) Integer publishStatus) {
        Page<FloodGuideVO> page = floodGuideService.getFloodGuidePage(pageNum, pageSize, keyword, guideLevel, publishStatus);
        return Result.success(page);
    }

    /**
     * 获取所有已发布的防汛指南
     */
    @GetMapping("/published")
    public Result<List<FloodGuideVO>> getPublished() {
        System.out.println("[v0 Debug] ========== 开始处理防汛指南published请求 ==========");
        List<FloodGuideVO> guides = floodGuideService.getPublishedGuides();
        System.out.println("[v0 Debug] 查询到的防汛指南数量: " + guides.size());
        if (!guides.isEmpty()) {
            System.out.println("[v0 Debug] 第一条记录: " + guides.get(0).getTitle());
        }
        System.out.println("[v0 Debug] ========== 防汛指南published请求处理完成 ==========");
        return Result.success(guides);
    }

    /**
     * 根据ID获取防汛指南详情
     */
    @GetMapping("/{id}")
    public Result<FloodGuideVO> getById(@PathVariable Long id) {
        FloodGuideVO guide = floodGuideService.getFloodGuideById(id);
        if (guide == null) {
            return Result.fail("防汛指南不存在");
        }
        return Result.success(guide);
    }

    /**
     * 创建防汛指南
     */
    @PostMapping
    public Result<FloodGuideVO> create(@RequestBody FloodGuideDTO dto) {
        try {
            FloodGuideVO guide = floodGuideService.createFloodGuide(dto);
            return Result.success(guide);
        } catch (Exception e) {
            return Result.fail("创建失败: " + e.getMessage());
        }
    }

    /**
     * 更新防汛指南
     */
    @PutMapping("/{id}")
    public Result<FloodGuideVO> update(@PathVariable Long id, @RequestBody FloodGuideDTO dto) {
        try {
            FloodGuideVO guide = floodGuideService.updateFloodGuide(id, dto);
            return Result.success(guide);
        } catch (Exception e) {
            return Result.fail("更新失败: " + e.getMessage());
        }
    }

    /**
     * 删除防汛指南
     */
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        boolean success = floodGuideService.deleteFloodGuide(id);
        return success ? Result.success() : Result.fail("删除失败");
    }

    /**
     * 发布防汛指南
     */
    @PostMapping("/{id}/publish")
    public Result<Void> publish(@PathVariable Long id) {
        boolean success = floodGuideService.publishGuide(id);
        return success ? Result.success() : Result.fail("发布失败");
    }

    /**
     * 增加浏览次数
     */
    @PostMapping("/{id}/view")
    public Result<Void> incrementView(@PathVariable Long id) {
        floodGuideService.incrementViewCount(id);
        return Result.success();
    }
}
