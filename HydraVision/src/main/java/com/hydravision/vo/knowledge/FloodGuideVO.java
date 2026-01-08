package com.hydravision.vo.knowledge;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 防汛指南VO
 */
@Data
public class FloodGuideVO {
    private Long id;
    private String guideId;
    private String title;
    private String description;
    private String content;
    private String coverImage;
    private Integer guideLevel;
    private String guideLevelName; // 基础/中级/高级
    private String targetAudience;
    private String tags;
    private Integer viewCount;
    private Integer likeCount;
    private Integer sortOrder;
    private Integer isRecommend;
    private Integer publishStatus;
    private String publishStatusName; // 草稿/已发布/已下架
    private LocalDateTime publishTime;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
