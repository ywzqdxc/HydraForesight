package com.hydravision.entity.knowledge;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * 防汛指南实体类
 */
@Data
@TableName("hf_flood_guide")
public class FloodGuide {
    /**
     * 主键ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 指南唯一标识
     */
    @TableField("guide_id")
    private String guideId;

    /**
     * 指南标题
     */
    @TableField("title")
    private String title;

    /**
     * 指南描述
     */
    @TableField("description")
    private String description;

    /**
     * 指南内容(富文本)
     */
    @TableField("content")
    private String content;

    /**
     * 封面图片URL
     */
    @TableField("cover_image")
    private String coverImage;

    /**
     * 难度级别: 1-基础, 2-中级, 3-高级
     */
    @TableField("guide_level")
    private Integer guideLevel;

    /**
     * 目标受众
     */
    @TableField("target_audience")
    private String targetAudience;

    /**
     * 标签(逗号分隔)
     */
    @TableField("tags")
    private String tags;

    /**
     * 浏览次数
     */
    @TableField("view_count")
    private Integer viewCount;

    /**
     * 点赞次数
     */
    @TableField("like_count")
    private Integer likeCount;

    /**
     * 排序号
     */
    @TableField("sort_order")
    private Integer sortOrder;

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
