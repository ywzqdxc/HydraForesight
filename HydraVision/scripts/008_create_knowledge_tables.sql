-- =====================================================
-- 知识科普模块表结构
-- =====================================================
USE hydra_foresight;

-- -----------------------------------------------------
-- 知识分类表 (hf_knowledge_category)
-- 存储知识内容分类
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_knowledge_category;
CREATE TABLE hf_knowledge_category (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    category_code VARCHAR(50) NOT NULL COMMENT '分类编码',
    category_name VARCHAR(100) NOT NULL COMMENT '分类名称',
    parent_id BIGINT UNSIGNED DEFAULT 0 COMMENT '父分类ID',
    icon VARCHAR(100) DEFAULT '' COMMENT '图标',
    sort_order INT UNSIGNED DEFAULT 0 COMMENT '排序号',
    status TINYINT UNSIGNED DEFAULT 1 COMMENT '状态: 0-禁用, 1-正常',
    is_deleted TINYINT UNSIGNED DEFAULT 0 COMMENT '是否删除: 0-否, 1-是',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_category_code (category_code),
    KEY idx_parent_id (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='知识分类表';

-- -----------------------------------------------------
-- 知识文章表 (hf_knowledge_article)
-- 存储科普文章内容
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_knowledge_article;
CREATE TABLE hf_knowledge_article (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    article_id VARCHAR(50) NOT NULL COMMENT '文章唯一标识',
    category_id BIGINT UNSIGNED NOT NULL COMMENT '分类ID',
    title VARCHAR(200) NOT NULL COMMENT '文章标题',
    summary VARCHAR(500) DEFAULT '' COMMENT '文章摘要',
    content MEDIUMTEXT NOT NULL COMMENT '文章内容(富文本)',
    cover_image VARCHAR(500) DEFAULT '' COMMENT '封面图片URL',
    author_id BIGINT UNSIGNED DEFAULT 0 COMMENT '作者ID',
    author_name VARCHAR(50) DEFAULT '' COMMENT '作者姓名',
    source VARCHAR(100) DEFAULT '' COMMENT '来源',
    tags VARCHAR(255) DEFAULT '' COMMENT '标签(逗号分隔)',
    read_time INT UNSIGNED DEFAULT 0 COMMENT '预计阅读时间(分钟)',
    view_count INT UNSIGNED DEFAULT 0 COMMENT '浏览次数',
    like_count INT UNSIGNED DEFAULT 0 COMMENT '点赞次数',
    comment_count INT UNSIGNED DEFAULT 0 COMMENT '评论次数',
    share_count INT UNSIGNED DEFAULT 0 COMMENT '分享次数',
    is_top TINYINT UNSIGNED DEFAULT 0 COMMENT '是否置顶: 0-否, 1-是',
    is_recommend TINYINT UNSIGNED DEFAULT 0 COMMENT '是否推荐: 0-否, 1-是',
    publish_status TINYINT UNSIGNED DEFAULT 0 COMMENT '发布状态: 0-草稿, 1-已发布, 2-已下架',
    publish_time DATETIME DEFAULT NULL COMMENT '发布时间',
    is_deleted TINYINT UNSIGNED DEFAULT 0 COMMENT '是否删除: 0-否, 1-是',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_article_id (article_id),
    KEY idx_category_id (category_id),
    KEY idx_author_id (author_id),
    KEY idx_publish_status (publish_status),
    KEY idx_publish_time (publish_time),
    KEY idx_is_top (is_top),
    FULLTEXT KEY ft_title_content (title, summary) WITH PARSER ngram
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='知识文章表';

-- -----------------------------------------------------
-- 知识视频表 (hf_knowledge_video)
-- 存储科普视频内容
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_knowledge_video;
CREATE TABLE hf_knowledge_video (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    video_id VARCHAR(50) NOT NULL COMMENT '视频唯一标识',
    category_id BIGINT UNSIGNED NOT NULL COMMENT '分类ID',
    title VARCHAR(200) NOT NULL COMMENT '视频标题',
    description VARCHAR(500) DEFAULT '' COMMENT '视频描述',
    video_url VARCHAR(500) NOT NULL COMMENT '视频URL',
    cover_image VARCHAR(500) DEFAULT '' COMMENT '封面图片URL',
    duration INT UNSIGNED DEFAULT 0 COMMENT '视频时长(秒)',
    file_size BIGINT UNSIGNED DEFAULT 0 COMMENT '文件大小(字节)',
    resolution VARCHAR(20) DEFAULT '' COMMENT '分辨率',
    author_id BIGINT UNSIGNED DEFAULT 0 COMMENT '作者ID',
    author_name VARCHAR(50) DEFAULT '' COMMENT '作者姓名',
    tags VARCHAR(255) DEFAULT '' COMMENT '标签(逗号分隔)',
    view_count INT UNSIGNED DEFAULT 0 COMMENT '播放次数',
    like_count INT UNSIGNED DEFAULT 0 COMMENT '点赞次数',
    comment_count INT UNSIGNED DEFAULT 0 COMMENT '评论次数',
    share_count INT UNSIGNED DEFAULT 0 COMMENT '分享次数',
    is_top TINYINT UNSIGNED DEFAULT 0 COMMENT '是否置顶: 0-否, 1-是',
    is_recommend TINYINT UNSIGNED DEFAULT 0 COMMENT '是否推荐: 0-否, 1-是',
    publish_status TINYINT UNSIGNED DEFAULT 0 COMMENT '发布状态: 0-草稿, 1-已发布, 2-已下架',
    publish_time DATETIME DEFAULT NULL COMMENT '发布时间',
    is_deleted TINYINT UNSIGNED DEFAULT 0 COMMENT '是否删除: 0-否, 1-是',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_video_id (video_id),
    KEY idx_category_id (category_id),
    KEY idx_author_id (author_id),
    KEY idx_publish_status (publish_status),
    KEY idx_publish_time (publish_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='知识视频表';

-- -----------------------------------------------------
-- 知识资源表 (hf_knowledge_resource)
-- 存储可下载资源
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_knowledge_resource;
CREATE TABLE hf_knowledge_resource (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    resource_id VARCHAR(50) NOT NULL COMMENT '资源唯一标识',
    category_id BIGINT UNSIGNED NOT NULL COMMENT '分类ID',
    title VARCHAR(200) NOT NULL COMMENT '资源标题',
    description VARCHAR(500) DEFAULT '' COMMENT '资源描述',
    file_url VARCHAR(500) NOT NULL COMMENT '文件URL',
    file_type VARCHAR(20) NOT NULL COMMENT '文件类型(PDF/ZIP/PPTX等)',
    file_size BIGINT UNSIGNED DEFAULT 0 COMMENT '文件大小(字节)',
    cover_image VARCHAR(500) DEFAULT '' COMMENT '封面图片URL',
    uploader_id BIGINT UNSIGNED DEFAULT 0 COMMENT '上传者ID',
    uploader_name VARCHAR(50) DEFAULT '' COMMENT '上传者姓名',
    tags VARCHAR(255) DEFAULT '' COMMENT '标签(逗号分隔)',
    download_count INT UNSIGNED DEFAULT 0 COMMENT '下载次数',
    view_count INT UNSIGNED DEFAULT 0 COMMENT '浏览次数',
    is_recommend TINYINT UNSIGNED DEFAULT 0 COMMENT '是否推荐: 0-否, 1-是',
    publish_status TINYINT UNSIGNED DEFAULT 0 COMMENT '发布状态: 0-草稿, 1-已发布, 2-已下架',
    publish_time DATETIME DEFAULT NULL COMMENT '发布时间',
    is_deleted TINYINT UNSIGNED DEFAULT 0 COMMENT '是否删除: 0-否, 1-是',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_resource_id (resource_id),
    KEY idx_category_id (category_id),
    KEY idx_file_type (file_type),
    KEY idx_publish_status (publish_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='知识资源表';

-- -----------------------------------------------------
-- 防汛指南表 (hf_flood_guide)
-- 存储防汛指南内容
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_flood_guide;
CREATE TABLE hf_flood_guide (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    guide_id VARCHAR(50) NOT NULL COMMENT '指南唯一标识',
    title VARCHAR(200) NOT NULL COMMENT '指南标题',
    description VARCHAR(500) DEFAULT '' COMMENT '指南描述',
    content MEDIUMTEXT NOT NULL COMMENT '指南内容(富文本)',
    cover_image VARCHAR(500) DEFAULT '' COMMENT '封面图片URL',
    guide_level TINYINT UNSIGNED DEFAULT 1 COMMENT '难度级别: 1-基础, 2-中级, 3-高级',
    target_audience VARCHAR(100) DEFAULT '' COMMENT '目标受众',
    tags VARCHAR(255) DEFAULT '' COMMENT '标签(逗号分隔)',
    view_count INT UNSIGNED DEFAULT 0 COMMENT '浏览次数',
    like_count INT UNSIGNED DEFAULT 0 COMMENT '点赞次数',
    sort_order INT UNSIGNED DEFAULT 0 COMMENT '排序号',
    is_recommend TINYINT UNSIGNED DEFAULT 0 COMMENT '是否推荐: 0-否, 1-是',
    publish_status TINYINT UNSIGNED DEFAULT 0 COMMENT '发布状态: 0-草稿, 1-已发布, 2-已下架',
    publish_time DATETIME DEFAULT NULL COMMENT '发布时间',
    is_deleted TINYINT UNSIGNED DEFAULT 0 COMMENT '是否删除: 0-否, 1-是',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_guide_id (guide_id),
    KEY idx_guide_level (guide_level),
    KEY idx_publish_status (publish_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='防汛指南表';
