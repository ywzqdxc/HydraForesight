-- =====================================================
-- 预警管理模块表结构
-- =====================================================
USE hydra_foresight;

-- -----------------------------------------------------
-- 预警规则表 (hf_alert_rule)
-- 定义预警触发规则
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_alert_rule;
CREATE TABLE hf_alert_rule (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    rule_code VARCHAR(50) NOT NULL COMMENT '规则编码',
    rule_name VARCHAR(100) NOT NULL COMMENT '规则名称',
    rule_type TINYINT UNSIGNED NOT NULL COMMENT '规则类型: 1-降水预警, 2-水位预警, 3-内涝预警, 4-设备预警',
    area_id BIGINT UNSIGNED DEFAULT 0 COMMENT '适用区域ID(0表示全局)',
    alert_level TINYINT UNSIGNED NOT NULL COMMENT '预警级别: 1-蓝色, 2-黄色, 3-橙色, 4-红色',
    condition_type TINYINT UNSIGNED DEFAULT 1 COMMENT '条件类型: 1-阈值, 2-变化率, 3-持续时间',
    threshold_value DECIMAL(10, 3) DEFAULT 0 COMMENT '阈值',
    threshold_unit VARCHAR(20) DEFAULT '' COMMENT '阈值单位',
    duration_minutes INT UNSIGNED DEFAULT 0 COMMENT '持续时间(分钟)',
    alert_message VARCHAR(500) DEFAULT '' COMMENT '预警消息模板',
    notify_channels VARCHAR(100) DEFAULT '' COMMENT '通知渠道(逗号分隔): sms,email,push,wechat',
    notify_users VARCHAR(500) DEFAULT '' COMMENT '通知用户ID(逗号分隔)',
    is_auto_release TINYINT UNSIGNED DEFAULT 0 COMMENT '是否自动解除: 0-否, 1-是',
    release_threshold DECIMAL(10, 3) DEFAULT 0 COMMENT '解除阈值',
    priority INT UNSIGNED DEFAULT 0 COMMENT '优先级',
    status TINYINT UNSIGNED DEFAULT 1 COMMENT '状态: 0-禁用, 1-启用',
    is_deleted TINYINT UNSIGNED DEFAULT 0 COMMENT '是否删除: 0-否, 1-是',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_rule_code (rule_code),
    KEY idx_rule_type (rule_type),
    KEY idx_area_id (area_id),
    KEY idx_alert_level (alert_level),
    KEY idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='预警规则表';

-- -----------------------------------------------------
-- 预警记录表 (hf_alert_record)
-- 存储预警发布记录
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_alert_record;
CREATE TABLE hf_alert_record (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    alert_id VARCHAR(50) NOT NULL COMMENT '预警唯一标识',
    rule_id BIGINT UNSIGNED DEFAULT 0 COMMENT '触发规则ID',
    alert_type TINYINT UNSIGNED NOT NULL COMMENT '预警类型: 1-暴雨预警, 2-洪水预警, 3-内涝预警, 4-雷电预警, 5-道路积水',
    alert_level TINYINT UNSIGNED NOT NULL COMMENT '预警级别: 1-蓝色, 2-黄色, 3-橙色, 4-红色',
    area_id BIGINT UNSIGNED NOT NULL COMMENT '预警区域ID',
    area_name VARCHAR(100) DEFAULT '' COMMENT '预警区域名称',
    title VARCHAR(200) NOT NULL COMMENT '预警标题',
    content TEXT NOT NULL COMMENT '预警内容',
    trigger_value DECIMAL(10, 3) DEFAULT 0 COMMENT '触发值',
    trigger_time DATETIME NOT NULL COMMENT '触发时间',
    publish_time DATETIME DEFAULT NULL COMMENT '发布时间',
    expected_end_time DATETIME DEFAULT NULL COMMENT '预计结束时间',
    actual_end_time DATETIME DEFAULT NULL COMMENT '实际结束时间',
    status TINYINT UNSIGNED DEFAULT 1 COMMENT '状态: 0-待发布, 1-已发布, 2-已解除, 3-已过期, 4-已取消',
    publisher_id BIGINT UNSIGNED DEFAULT 0 COMMENT '发布人ID',
    publisher_name VARCHAR(50) DEFAULT '' COMMENT '发布人姓名',
    release_reason VARCHAR(500) DEFAULT '' COMMENT '解除原因',
    is_public TINYINT UNSIGNED DEFAULT 1 COMMENT '是否公开: 0-否, 1-是',
    view_count INT UNSIGNED DEFAULT 0 COMMENT '查看次数',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_alert_id (alert_id),
    KEY idx_rule_id (rule_id),
    KEY idx_alert_type (alert_type),
    KEY idx_alert_level (alert_level),
    KEY idx_area_id (area_id),
    KEY idx_trigger_time (trigger_time),
    KEY idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='预警记录表';

-- -----------------------------------------------------
-- 预警通知记录表 (hf_alert_notification)
-- 记录预警通知发送情况
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_alert_notification;
CREATE TABLE hf_alert_notification (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    alert_record_id BIGINT UNSIGNED NOT NULL COMMENT '预警记录ID',
    user_id BIGINT UNSIGNED NOT NULL COMMENT '接收用户ID',
    notify_channel TINYINT UNSIGNED NOT NULL COMMENT '通知渠道: 1-短信, 2-邮件, 3-APP推送, 4-微信',
    notify_target VARCHAR(100) DEFAULT '' COMMENT '通知目标(手机号/邮箱等)',
    notify_content TEXT COMMENT '通知内容',
    send_time DATETIME DEFAULT NULL COMMENT '发送时间',
    send_status TINYINT UNSIGNED DEFAULT 0 COMMENT '发送状态: 0-待发送, 1-已发送, 2-发送失败',
    read_time DATETIME DEFAULT NULL COMMENT '阅读时间',
    is_read TINYINT UNSIGNED DEFAULT 0 COMMENT '是否已读: 0-否, 1-是',
    error_message VARCHAR(255) DEFAULT '' COMMENT '错误信息',
    retry_count TINYINT UNSIGNED DEFAULT 0 COMMENT '重试次数',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_alert_record_id (alert_record_id),
    KEY idx_user_id (user_id),
    KEY idx_send_status (send_status),
    KEY idx_send_time (send_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='预警通知记录表';

-- -----------------------------------------------------
-- 预警响应记录表 (hf_alert_response)
-- 记录预警处置响应情况
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_alert_response;
CREATE TABLE hf_alert_response (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    alert_record_id BIGINT UNSIGNED NOT NULL COMMENT '预警记录ID',
    response_type TINYINT UNSIGNED DEFAULT 1 COMMENT '响应类型: 1-确认收到, 2-现场处置, 3-上报情况, 4-处置完成',
    response_content TEXT COMMENT '响应内容',
    responder_id BIGINT UNSIGNED NOT NULL COMMENT '响应人ID',
    responder_name VARCHAR(50) DEFAULT '' COMMENT '响应人姓名',
    responder_dept VARCHAR(100) DEFAULT '' COMMENT '响应人部门',
    response_time DATETIME NOT NULL COMMENT '响应时间',
    attachment_urls VARCHAR(1000) DEFAULT '' COMMENT '附件URL(逗号分隔)',
    location_lng DECIMAL(10, 7) DEFAULT NULL COMMENT '响应位置经度',
    location_lat DECIMAL(10, 7) DEFAULT NULL COMMENT '响应位置纬度',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_alert_record_id (alert_record_id),
    KEY idx_responder_id (responder_id),
    KEY idx_response_time (response_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='预警响应记录表';
