package com.hydravision.service.knowledge;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hydravision.dto.knowledge.KnowledgeResourceDTO;
import com.hydravision.vo.knowledge.KnowledgeResourceVO;

import java.util.List;

/**
 * 知识资源服务接口
 */
public interface KnowledgeResourceService {
    /**
     * 分页查询资源
     */
    Page<KnowledgeResourceVO> getResourcePage(int pageNum, int pageSize, String keyword, String fileType, Integer publishStatus);

    /**
     * 获取所有已发布的资源
     */
    List<KnowledgeResourceVO> getPublishedResources();

    /**
     * 根据ID获取资源详情
     */
    KnowledgeResourceVO getResourceById(Long id);

    /**
     * 创建资源
     */
    KnowledgeResourceVO createResource(KnowledgeResourceDTO dto, Long uploaderId, String uploaderName);

    /**
     * 更新资源
     */
    KnowledgeResourceVO updateResource(Long id, KnowledgeResourceDTO dto);

    /**
     * 删除资源
     */
    boolean deleteResource(Long id);

    /**
     * 发布资源
     */
    boolean publishResource(Long id);

    /**
     * 增加下载次数
     */
    void incrementDownloadCount(Long id);

    /**
     * 增加浏览次数
     */
    void incrementViewCount(Long id);
}
