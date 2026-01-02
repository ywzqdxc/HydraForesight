-- =====================================================
-- 系统管理模块表结构
-- =====================================================
USE hydra_foresight;

-- -----------------------------------------------------
-- 系统配置表 (hf_system_config)
-- 存储系统配置参数
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_system_config;
CREATE TABLE hf_system_config (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    config_key VARCHAR(100) NOT NULL COMMENT '配置键',
    config_value TEXT COMMENT '配置值',
    config_type TINYINT UNSIGNED DEFAULT 1 COMMENT '配置类型: 1-字符串, 2-数字, 3-布尔, 4-JSON',
    config_group VARCHAR(50) DEFAULT 'default' COMMENT '配置分组',
    config_desc VARCHAR(255) DEFAULT '' COMMENT '配置描述',
    is_public TINYINT UNSIGNED DEFAULT 0 COMMENT '是否公开: 0-否, 1-是',
    is_system TINYINT UNSIGNED DEFAULT 0 COMMENT '是否系统配置: 0-否, 1-是',
    sort_order INT UNSIGNED DEFAULT 0 COMMENT '排序号',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_config_key (config_key),
    KEY idx_config_group (config_group)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统配置表';

-- -----------------------------------------------------
-- 数据字典表 (hf_dictionary)
-- 存储系统字典数据
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_dictionary;
CREATE TABLE hf_dictionary (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    dict_code VARCHAR(50) NOT NULL COMMENT '字典编码',
    dict_name VARCHAR(100) NOT NULL COMMENT '字典名称',
    dict_type VARCHAR(50) NOT NULL COMMENT '字典类型',
    parent_id BIGINT UNSIGNED DEFAULT 0 COMMENT '父字典ID',
    dict_value VARCHAR(255) DEFAULT '' COMMENT '字典值',
    dict_label VARCHAR(100) DEFAULT '' COMMENT '字典标签',
    sort_order INT UNSIGNED DEFAULT 0 COMMENT '排序号',
    css_class VARCHAR(100) DEFAULT '' COMMENT 'CSS样式类',
    status TINYINT UNSIGNED DEFAULT 1 COMMENT '状态: 0-禁用, 1-正常',
    is_default TINYINT UNSIGNED DEFAULT 0 COMMENT '是否默认: 0-否, 1-是',
    remark VARCHAR(255) DEFAULT '' COMMENT '备注',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    KEY idx_dict_type (dict_type),
    KEY idx_parent_id (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='数据字典表';

-- -----------------------------------------------------
-- 通知模板表 (hf_notification_template)
-- 存储通知消息模板
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_notification_template;
CREATE TABLE hf_notification_template (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    template_code VARCHAR(50) NOT NULL COMMENT '模板编码',
    template_name VARCHAR(100) NOT NULL COMMENT '模板名称',
    template_type TINYINT UNSIGNED NOT NULL COMMENT '模板类型: 1-短信, 2-邮件, 3-APP推送, 4-微信',
    subject VARCHAR(200) DEFAULT '' COMMENT '标题模板',
    content TEXT NOT NULL COMMENT '内容模板',
    variables VARCHAR(500) DEFAULT '' COMMENT '变量说明(JSON)',
    status TINYINT UNSIGNED DEFAULT 1 COMMENT '状态: 0-禁用, 1-正常',
    is_deleted TINYINT UNSIGNED DEFAULT 0 COMMENT '是否删除: 0-否, 1-是',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_template_code (template_code),
    KEY idx_template_type (template_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='通知模板表';

-- -----------------------------------------------------
-- 操作日志表 (hf_operation_log)
-- 记录用户操作日志
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_operation_log;
CREATE TABLE hf_operation_log (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    user_id BIGINT UNSIGNED DEFAULT 0 COMMENT '用户ID',
    username VARCHAR(50) DEFAULT '' COMMENT '用户名',
    operation_type VARCHAR(50) NOT NULL COMMENT '操作类型',
    operation_desc VARCHAR(255) DEFAULT '' COMMENT '操作描述',
    request_method VARCHAR(10) DEFAULT '' COMMENT '请求方法',
    request_url VARCHAR(500) DEFAULT '' COMMENT '请求URL',
    request_params TEXT COMMENT '请求参数',
    response_data TEXT COMMENT '响应数据',
    ip_address VARCHAR(50) DEFAULT '' COMMENT 'IP地址',
    user_agent VARCHAR(500) DEFAULT '' COMMENT '用户代理',
    execution_time INT UNSIGNED DEFAULT 0 COMMENT '执行耗时(ms)',
    status TINYINT UNSIGNED DEFAULT 1 COMMENT '状态: 0-失败, 1-成功',
    error_message TEXT COMMENT '错误信息',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_user_id (user_id),
    KEY idx_operation_type (operation_type),
    KEY idx_create_time (create_time),
    KEY idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='操作日志表';

-- -----------------------------------------------------
-- 登录日志表 (hf_login_log)
-- 记录用户登录日志
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_login_log;
CREATE TABLE hf_login_log (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    user_id BIGINT UNSIGNED DEFAULT 0 COMMENT '用户ID',
    username VARCHAR(50) DEFAULT '' COMMENT '用户名',
    login_type TINYINT UNSIGNED DEFAULT 1 COMMENT '登录类型: 1-账号密码, 2-手机验证码, 3-微信, 4-钉钉',
    login_time DATETIME NOT NULL COMMENT '登录时间',
    logout_time DATETIME DEFAULT NULL COMMENT '登出时间',
    ip_address VARCHAR(50) DEFAULT '' COMMENT 'IP地址',
    ip_location VARCHAR(100) DEFAULT '' COMMENT 'IP归属地',
    device_type VARCHAR(50) DEFAULT '' COMMENT '设备类型',
    browser VARCHAR(100) DEFAULT '' COMMENT '浏览器',
    os VARCHAR(100) DEFAULT '' COMMENT '操作系统',
    user_agent VARCHAR(500) DEFAULT '' COMMENT '用户代理',
    status TINYINT UNSIGNED DEFAULT 1 COMMENT '状态: 0-失败, 1-成功',
    fail_reason VARCHAR(255) DEFAULT '' COMMENT '失败原因',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_user_id (user_id),
    KEY idx_username (username),
    KEY idx_login_time (login_time),
    KEY idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='登录日志表';

-- -----------------------------------------------------
-- 系统日志表 (hf_system_log)
-- 记录系统运行日志
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_system_log;
CREATE TABLE hf_system_log (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    log_level TINYINT UNSIGNED DEFAULT 1 COMMENT '日志级别: 1-DEBUG, 2-INFO, 3-WARN, 4-ERROR',
    log_type VARCHAR(50) DEFAULT '' COMMENT '日志类型',
    log_source VARCHAR(100) DEFAULT '' COMMENT '日志来源',
    log_message TEXT COMMENT '日志消息',
    stack_trace TEXT COMMENT '堆栈跟踪',
    server_name VARCHAR(100) DEFAULT '' COMMENT '服务器名称',
    server_ip VARCHAR(50) DEFAULT '' COMMENT '服务器IP',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_log_level (log_level),
    KEY idx_log_type (log_type),
    KEY idx_create_time (create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统日志表';

-- -----------------------------------------------------
-- API调用日志表 (hf_api_log)
-- 记录API接口调用日志
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_api_log;
CREATE TABLE hf_api_log (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    api_name VARCHAR(100) DEFAULT '' COMMENT 'API名称',
    api_url VARCHAR(500) NOT NULL COMMENT 'API地址',
    request_method VARCHAR(10) DEFAULT '' COMMENT '请求方法',
    request_headers TEXT COMMENT '请求头',
    request_body TEXT COMMENT '请求体',
    response_status INT UNSIGNED DEFAULT 0 COMMENT '响应状态码',
    response_body TEXT COMMENT '响应体',
    client_ip VARCHAR(50) DEFAULT '' COMMENT '客户端IP',
    user_id BIGINT UNSIGNED DEFAULT 0 COMMENT '用户ID',
    execution_time INT UNSIGNED DEFAULT 0 COMMENT '执行耗时(ms)',
    status TINYINT UNSIGNED DEFAULT 1 COMMENT '状态: 0-失败, 1-成功',
    error_message VARCHAR(500) DEFAULT '' COMMENT '错误信息',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_api_name (api_name),
    KEY idx_user_id (user_id),
    KEY idx_create_time (create_time),
    KEY idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='API调用日志表';

-- -----------------------------------------------------
-- 数据导出记录表 (hf_export_record)
-- 记录数据导出历史
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_export_record;
CREATE TABLE hf_export_record (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    export_type VARCHAR(50) NOT NULL COMMENT '导出类型',
    export_name VARCHAR(200) NOT NULL COMMENT '导出名称',
    file_name VARCHAR(255) DEFAULT '' COMMENT '文件名',
    file_url VARCHAR(500) DEFAULT '' COMMENT '文件URL',
    file_size BIGINT UNSIGNED DEFAULT 0 COMMENT '文件大小(字节)',
    data_count INT UNSIGNED DEFAULT 0 COMMENT '数据条数',
    export_params TEXT COMMENT '导出参数(JSON)',
    user_id BIGINT UNSIGNED NOT NULL COMMENT '导出用户ID',
    username VARCHAR(50) DEFAULT '' COMMENT '导出用户名',
    status TINYINT UNSIGNED DEFAULT 0 COMMENT '状态: 0-处理中, 1-已完成, 2-失败',
    error_message VARCHAR(500) DEFAULT '' COMMENT '错误信息',
    start_time DATETIME DEFAULT NULL COMMENT '开始时间',
    end_time DATETIME DEFAULT NULL COMMENT '结束时间',
    expire_time DATETIME DEFAULT NULL COMMENT '过期时间',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_export_type (export_type),
    KEY idx_user_id (user_id),
    KEY idx_status (status),
    KEY idx_create_time (create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='数据导出记录表';
