package com.hydravision.service.knowledge;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hydravision.dto.knowledge.FloodGuideDTO;
import com.hydravision.vo.knowledge.FloodGuideVO;

import java.util.List;

/**
 * 防汛指南服务接口
 */
public interface FloodGuideService {
    /**
     * 分页查询防汛指南
     */
    Page<FloodGuideVO> getFloodGuidePage(int pageNum, int pageSize, String keyword, Integer guideLevel, Integer publishStatus);

    /**
     * 获取所有已发布的防汛指南
     */
    List<FloodGuideVO> getPublishedGuides();

    /**
     * 根据ID获取防汛指南详情
     */
    FloodGuideVO getFloodGuideById(Long id);

    /**
     * 创建防汛指南
     */
    FloodGuideVO createFloodGuide(FloodGuideDTO dto);

    /**
     * 更新防汛指南
     */
    FloodGuideVO updateFloodGuide(Long id, FloodGuideDTO dto);

    /**
     * 删除防汛指南
     */
    boolean deleteFloodGuide(Long id);

    /**
     * 发布防汛指南
     */
    boolean publishGuide(Long id);

    /**
     * 增加浏览次数
     */
    void incrementViewCount(Long id);
}
