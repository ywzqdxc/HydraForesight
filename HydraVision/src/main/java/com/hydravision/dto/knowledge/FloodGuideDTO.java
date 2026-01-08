package com.hydravision.dto.knowledge;

import lombok.Data;

/**
 * 防汛指南DTO
 */
@Data
public class FloodGuideDTO {
    private Long id;
    private String title;
    private String description;
    private String content;
    private String coverImage;
    private Integer guideLevel;
    private String targetAudience;
    private String tags;
    private Integer sortOrder;
    private Integer isRecommend;
    private Integer publishStatus;
}
