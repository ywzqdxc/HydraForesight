package com.hydravision.entity.knowledge;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * 知识资源实体类
 */
@Data
@TableName("hf_knowledge_resource")
public class KnowledgeResource {
    /**
     * 主键ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 资源唯一标识
     */
    @TableField("resource_id")
    private String resourceId;

    /**
     * 分类ID
     */
    @TableField("category_id")
    private Long categoryId;

    /**
     * 资源标题
     */
    @TableField("title")
    private String title;

    /**
     * 资源描述
     */
    @TableField("description")
    private String description;

    /**
     * 文件URL
     */
    @TableField("file_url")
    private String fileUrl;

    /**
     * 文件类型(PDF/ZIP/PPTX等)
     */
    @TableField("file_type")
    private String fileType;

    /**
     * 文件大小(字节)
     */
    @TableField("file_size")
    private Long fileSize;

    /**
     * 封面图片URL
     */
    @TableField("cover_image")
    private String coverImage;

    /**
     * 上传者ID
     */
    @TableField("uploader_id")
    private Long uploaderId;

    /**
     * 上传者姓名
     */
    @TableField("uploader_name")
    private String uploaderName;

    /**
     * 标签(逗号分隔)
     */
    @TableField("tags")
    private String tags;

    /**
     * 下载次数
     */
    @TableField("download_count")
    private Integer downloadCount;

    /**
     * 浏览次数
     */
    @TableField("view_count")
    private Integer viewCount;

    /**
     * 是否推荐: 0-否, 1-是
     */
    @TableField("is_recommend")
    private Integer isRecommend;

    /**
     * 发布状态: 0-草稿, 1-已发布, 2-已下架
     */
    @TableField("publish_status")
    private Integer publishStatus;

    /**
     * 发布时间
     */
    @TableField("publish_time")
    private LocalDateTime publishTime;

    /**
     * 是否删除: 0-否, 1-是
     */
    @TableField("is_deleted")
    @TableLogic
    private Integer isDeleted;

    /**
     * 创建时间
     */
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    @TableField(value = "update_time", fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
