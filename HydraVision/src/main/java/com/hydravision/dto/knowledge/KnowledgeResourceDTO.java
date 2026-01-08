package com.hydravision.dto.knowledge;

import lombok.Data;

/**
 * 知识资源DTO
 */
@Data
public class KnowledgeResourceDTO {
    private Long id;
    private Long categoryId;
    private String title;
    private String description;
    private String fileUrl;
    private String fileType;
    private Long fileSize;
    private String coverImage;
    private String tags;
    private Integer isRecommend;
    private Integer publishStatus;
}
