-- =====================================================
-- 公众参与模块表结构
-- =====================================================
USE hydra_foresight;

-- -----------------------------------------------------
-- 公众上报表 (hf_public_report)
-- 存储公众上报信息
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_public_report;
CREATE TABLE hf_public_report (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    report_id VARCHAR(50) NOT NULL COMMENT '上报唯一标识',
    report_type TINYINT UNSIGNED NOT NULL COMMENT '上报类型: 1-积水, 2-降雨, 3-交通, 4-灾害, 5-其他',
    title VARCHAR(200) NOT NULL COMMENT '上报标题',
    content TEXT NOT NULL COMMENT '上报内容',
    location_name VARCHAR(200) NOT NULL COMMENT '位置描述',
    longitude DECIMAL(10, 7) DEFAULT NULL COMMENT '经度',
    latitude DECIMAL(10, 7) DEFAULT NULL COMMENT '纬度',
    area_id BIGINT UNSIGNED DEFAULT 0 COMMENT '所属区域ID',
    severity TINYINT UNSIGNED DEFAULT 2 COMMENT '严重程度: 1-轻微, 2-中等, 3-严重',
    image_urls VARCHAR(2000) DEFAULT '' COMMENT '图片URL(逗号分隔)',
    video_url VARCHAR(500) DEFAULT '' COMMENT '视频URL',
    reporter_id BIGINT UNSIGNED DEFAULT 0 COMMENT '上报人ID(0表示匿名)',
    reporter_name VARCHAR(50) DEFAULT '' COMMENT '上报人姓名',
    reporter_phone VARCHAR(20) DEFAULT '' COMMENT '上报人电话',
    report_time DATETIME NOT NULL COMMENT '上报时间',
    verify_status TINYINT UNSIGNED DEFAULT 0 COMMENT '核实状态: 0-未核实, 1-已核实, 2-不属实',
    verify_time DATETIME DEFAULT NULL COMMENT '核实时间',
    verifier_id BIGINT UNSIGNED DEFAULT 0 COMMENT '核实人ID',
    verifier_name VARCHAR(50) DEFAULT '' COMMENT '核实人姓名',
    verify_remark VARCHAR(500) DEFAULT '' COMMENT '核实备注',
    process_status TINYINT UNSIGNED DEFAULT 0 COMMENT '处理状态: 0-待处理, 1-处理中, 2-已处理, 3-已关闭',
    process_result VARCHAR(500) DEFAULT '' COMMENT '处理结果',
    upvote_count INT UNSIGNED DEFAULT 0 COMMENT '点赞数',
    view_count INT UNSIGNED DEFAULT 0 COMMENT '浏览数',
    is_public TINYINT UNSIGNED DEFAULT 1 COMMENT '是否公开: 0-否, 1-是',
    is_deleted TINYINT UNSIGNED DEFAULT 0 COMMENT '是否删除: 0-否, 1-是',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_report_id (report_id),
    KEY idx_report_type (report_type),
    KEY idx_area_id (area_id),
    KEY idx_severity (severity),
    KEY idx_verify_status (verify_status),
    KEY idx_process_status (process_status),
    KEY idx_report_time (report_time),
    KEY idx_reporter_id (reporter_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='公众上报表';

-- -----------------------------------------------------
-- 上报处理记录表 (hf_report_process)
-- 记录上报处理过程
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_report_process;
CREATE TABLE hf_report_process (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    report_id BIGINT UNSIGNED NOT NULL COMMENT '上报记录ID',
    process_type TINYINT UNSIGNED DEFAULT 1 COMMENT '处理类型: 1-接收, 2-派单, 3-现场处理, 4-完成, 5-回访',
    process_content VARCHAR(500) NOT NULL COMMENT '处理内容',
    processor_id BIGINT UNSIGNED NOT NULL COMMENT '处理人ID',
    processor_name VARCHAR(50) DEFAULT '' COMMENT '处理人姓名',
    processor_dept VARCHAR(100) DEFAULT '' COMMENT '处理人部门',
    process_time DATETIME NOT NULL COMMENT '处理时间',
    attachment_urls VARCHAR(1000) DEFAULT '' COMMENT '附件URL(逗号分隔)',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_report_id (report_id),
    KEY idx_processor_id (processor_id),
    KEY idx_process_time (process_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='上报处理记录表';

-- -----------------------------------------------------
-- 上报点赞表 (hf_report_upvote)
-- 记录上报点赞信息
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_report_upvote;
CREATE TABLE hf_report_upvote (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    report_id BIGINT UNSIGNED NOT NULL COMMENT '上报记录ID',
    user_id BIGINT UNSIGNED NOT NULL COMMENT '用户ID',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_report_user (report_id, user_id),
    KEY idx_report_id (report_id),
    KEY idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='上报点赞表';

-- -----------------------------------------------------
-- 上报评论表 (hf_report_comment)
-- 存储上报评论信息
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_report_comment;
CREATE TABLE hf_report_comment (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    report_id BIGINT UNSIGNED NOT NULL COMMENT '上报记录ID',
    parent_id BIGINT UNSIGNED DEFAULT 0 COMMENT '父评论ID(0表示一级评论)',
    user_id BIGINT UNSIGNED NOT NULL COMMENT '评论人ID',
    user_name VARCHAR(50) DEFAULT '' COMMENT '评论人姓名',
    content VARCHAR(1000) NOT NULL COMMENT '评论内容',
    like_count INT UNSIGNED DEFAULT 0 COMMENT '点赞数',
    is_top TINYINT UNSIGNED DEFAULT 0 COMMENT '是否置顶: 0-否, 1-是',
    status TINYINT UNSIGNED DEFAULT 1 COMMENT '状态: 0-隐藏, 1-正常',
    is_deleted TINYINT UNSIGNED DEFAULT 0 COMMENT '是否删除: 0-否, 1-是',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    KEY idx_report_id (report_id),
    KEY idx_parent_id (parent_id),
    KEY idx_user_id (user_id),
    KEY idx_create_time (create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='上报评论表';
