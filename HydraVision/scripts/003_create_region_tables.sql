-- =====================================================
-- 区域管理模块表结构
-- =====================================================
USE hydra_foresight;

-- -----------------------------------------------------
-- 行政区域表 (hf_region)
-- 存储行政区域信息
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_region;
CREATE TABLE hf_region (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    region_code VARCHAR(20) NOT NULL COMMENT '区域编码',
    region_name VARCHAR(100) NOT NULL COMMENT '区域名称',
    region_type TINYINT UNSIGNED DEFAULT 1 COMMENT '区域类型: 1-省, 2-市, 3-区/县, 4-街道/乡镇',
    parent_code VARCHAR(20) DEFAULT '' COMMENT '父区域编码',
    full_name VARCHAR(255) DEFAULT '' COMMENT '区域全称',
    center_lng DECIMAL(10, 7) DEFAULT 0 COMMENT '中心经度',
    center_lat DECIMAL(10, 7) DEFAULT 0 COMMENT '中心纬度',
    boundary_geojson TEXT COMMENT '边界GeoJSON数据',
    area_size DECIMAL(12, 2) DEFAULT 0 COMMENT '面积(平方公里)',
    population INT UNSIGNED DEFAULT 0 COMMENT '人口数量',
    sort_order INT UNSIGNED DEFAULT 0 COMMENT '排序号',
    status TINYINT UNSIGNED DEFAULT 1 COMMENT '状态: 0-禁用, 1-正常',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_region_code (region_code),
    KEY idx_parent_code (parent_code),
    KEY idx_region_type (region_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='行政区域表';

-- -----------------------------------------------------
-- 监测区域表 (hf_monitor_area)
-- 存储降水监测区域信息
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_monitor_area;
CREATE TABLE hf_monitor_area (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    area_code VARCHAR(50) NOT NULL COMMENT '监测区域编码',
    area_name VARCHAR(100) NOT NULL COMMENT '监测区域名称',
    area_name_en VARCHAR(100) DEFAULT '' COMMENT '区域英文名称',
    region_id BIGINT UNSIGNED DEFAULT 0 COMMENT '所属行政区域ID',
    area_type TINYINT UNSIGNED DEFAULT 1 COMMENT '区域类型: 1-城区, 2-河流, 3-水库, 4-低洼地带',
    risk_level TINYINT UNSIGNED DEFAULT 1 COMMENT '风险等级: 1-低, 2-中, 3-高, 4-极高',
    center_lng DECIMAL(10, 7) NOT NULL COMMENT '中心经度',
    center_lat DECIMAL(10, 7) NOT NULL COMMENT '中心纬度',
    boundary_geojson TEXT COMMENT '边界GeoJSON数据',
    description VARCHAR(500) DEFAULT '' COMMENT '区域描述',
    warning_threshold_1 DECIMAL(8, 2) DEFAULT 0 COMMENT '蓝色预警阈值(mm)',
    warning_threshold_2 DECIMAL(8, 2) DEFAULT 0 COMMENT '黄色预警阈值(mm)',
    warning_threshold_3 DECIMAL(8, 2) DEFAULT 0 COMMENT '橙色预警阈值(mm)',
    warning_threshold_4 DECIMAL(8, 2) DEFAULT 0 COMMENT '红色预警阈值(mm)',
    responsible_person VARCHAR(50) DEFAULT '' COMMENT '责任人',
    responsible_phone VARCHAR(20) DEFAULT '' COMMENT '责任人电话',
    status TINYINT UNSIGNED DEFAULT 1 COMMENT '状态: 0-禁用, 1-正常',
    is_deleted TINYINT UNSIGNED DEFAULT 0 COMMENT '是否删除: 0-否, 1-是',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_area_code (area_code),
    KEY idx_region_id (region_id),
    KEY idx_risk_level (risk_level),
    KEY idx_area_type (area_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='监测区域表';
