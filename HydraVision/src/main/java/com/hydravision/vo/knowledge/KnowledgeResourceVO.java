package com.hydravision.vo.knowledge;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 知识资源VO
 */
@Data
public class KnowledgeResourceVO {
    private Long id;
    private String resourceId;
    private Long categoryId;
    private String title;
    private String description;
    private String fileUrl;
    private String fileType;
    private Long fileSize;
    private String fileSizeText; // 格式化的文件大小
    private String coverImage;
    private Long uploaderId;
    private String uploaderName;
    private String tags;
    private Integer downloadCount;
    private Integer viewCount;
    private Integer isRecommend;
    private Integer publishStatus;
    private String publishStatusName;
    private LocalDateTime publishTime;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
