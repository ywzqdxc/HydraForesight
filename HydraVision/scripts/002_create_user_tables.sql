-- =====================================================
-- 用户管理模块表结构
-- =====================================================
USE hydra_foresight;

-- -----------------------------------------------------
-- 用户表 (hf_user)
-- 存储系统用户基本信息
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_user;
CREATE TABLE hf_user (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    user_id VARCHAR(32) NOT NULL COMMENT '用户唯一标识(业务主键)',
    username VARCHAR(50) NOT NULL COMMENT '用户名(登录账号)',
    password_hash VARCHAR(255) NOT NULL COMMENT '密码哈希值(BCrypt加密)',
    salt VARCHAR(32) NOT NULL COMMENT '密码盐值',
    real_name VARCHAR(50) DEFAULT '' COMMENT '真实姓名',
    nickname VARCHAR(50) DEFAULT '' COMMENT '昵称',
    email VARCHAR(100) DEFAULT '' COMMENT '电子邮箱',
    phone VARCHAR(20) DEFAULT '' COMMENT '手机号码',
    avatar_url VARCHAR(500) DEFAULT '' COMMENT '头像URL',
    gender TINYINT UNSIGNED DEFAULT 0 COMMENT '性别: 0-未知, 1-男, 2-女',
    birthday DATE DEFAULT NULL COMMENT '出生日期',
    dept_id BIGINT UNSIGNED DEFAULT 0 COMMENT '所属部门ID',
    status TINYINT UNSIGNED DEFAULT 1 COMMENT '状态: 0-禁用, 1-正常, 2-锁定',
    last_login_time DATETIME DEFAULT NULL COMMENT '最后登录时间',
    last_login_ip VARCHAR(50) DEFAULT '' COMMENT '最后登录IP',
    login_count INT UNSIGNED DEFAULT 0 COMMENT '登录次数',
    is_deleted TINYINT UNSIGNED DEFAULT 0 COMMENT '是否删除: 0-否, 1-是',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    remark VARCHAR(500) DEFAULT '' COMMENT '备注',
    PRIMARY KEY (id),
    UNIQUE KEY uk_user_id (user_id),
    UNIQUE KEY uk_username (username),
    KEY idx_phone (phone),
    KEY idx_email (email),
    KEY idx_dept_id (dept_id),
    KEY idx_status (status),
    KEY idx_create_time (create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户信息表';

-- -----------------------------------------------------
-- 角色表 (hf_role)
-- 存储系统角色信息
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_role;
CREATE TABLE hf_role (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    role_code VARCHAR(50) NOT NULL COMMENT '角色编码',
    role_name VARCHAR(100) NOT NULL COMMENT '角色名称',
    role_desc VARCHAR(255) DEFAULT '' COMMENT '角色描述',
    sort_order INT UNSIGNED DEFAULT 0 COMMENT '排序号',
    status TINYINT UNSIGNED DEFAULT 1 COMMENT '状态: 0-禁用, 1-正常',
    is_system TINYINT UNSIGNED DEFAULT 0 COMMENT '是否系统角色: 0-否, 1-是',
    is_deleted TINYINT UNSIGNED DEFAULT 0 COMMENT '是否删除: 0-否, 1-是',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_role_code (role_code),
    KEY idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色信息表';

-- -----------------------------------------------------
-- 权限表 (hf_permission)
-- 存储系统权限信息
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_permission;
CREATE TABLE hf_permission (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    perm_code VARCHAR(100) NOT NULL COMMENT '权限编码',
    perm_name VARCHAR(100) NOT NULL COMMENT '权限名称',
    perm_type TINYINT UNSIGNED DEFAULT 1 COMMENT '权限类型: 1-菜单, 2-按钮, 3-接口',
    parent_id BIGINT UNSIGNED DEFAULT 0 COMMENT '父权限ID',
    path VARCHAR(255) DEFAULT '' COMMENT '路由路径',
    icon VARCHAR(100) DEFAULT '' COMMENT '图标',
    sort_order INT UNSIGNED DEFAULT 0 COMMENT '排序号',
    status TINYINT UNSIGNED DEFAULT 1 COMMENT '状态: 0-禁用, 1-正常',
    is_deleted TINYINT UNSIGNED DEFAULT 0 COMMENT '是否删除: 0-否, 1-是',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_perm_code (perm_code),
    KEY idx_parent_id (parent_id),
    KEY idx_perm_type (perm_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='权限信息表';

-- -----------------------------------------------------
-- 用户角色关联表 (hf_user_role)
-- 用户和角色的多对多关系
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_user_role;
CREATE TABLE hf_user_role (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    user_id BIGINT UNSIGNED NOT NULL COMMENT '用户ID',
    role_id BIGINT UNSIGNED NOT NULL COMMENT '角色ID',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_user_role (user_id, role_id),
    KEY idx_user_id (user_id),
    KEY idx_role_id (role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户角色关联表';

-- -----------------------------------------------------
-- 角色权限关联表 (hf_role_permission)
-- 角色和权限的多对多关系
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_role_permission;
CREATE TABLE hf_role_permission (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    role_id BIGINT UNSIGNED NOT NULL COMMENT '角色ID',
    perm_id BIGINT UNSIGNED NOT NULL COMMENT '权限ID',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_role_perm (role_id, perm_id),
    KEY idx_role_id (role_id),
    KEY idx_perm_id (perm_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色权限关联表';

-- -----------------------------------------------------
-- 部门表 (hf_department)
-- 存储组织部门信息
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_department;
CREATE TABLE hf_department (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    dept_code VARCHAR(50) NOT NULL COMMENT '部门编码',
    dept_name VARCHAR(100) NOT NULL COMMENT '部门名称',
    parent_id BIGINT UNSIGNED DEFAULT 0 COMMENT '父部门ID',
    leader_id BIGINT UNSIGNED DEFAULT 0 COMMENT '负责人用户ID',
    phone VARCHAR(20) DEFAULT '' COMMENT '联系电话',
    email VARCHAR(100) DEFAULT '' COMMENT '邮箱',
    sort_order INT UNSIGNED DEFAULT 0 COMMENT '排序号',
    status TINYINT UNSIGNED DEFAULT 1 COMMENT '状态: 0-禁用, 1-正常',
    is_deleted TINYINT UNSIGNED DEFAULT 0 COMMENT '是否删除: 0-否, 1-是',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_dept_code (dept_code),
    KEY idx_parent_id (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='部门信息表';
