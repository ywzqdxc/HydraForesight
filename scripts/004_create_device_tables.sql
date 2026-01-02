-- =====================================================
-- 设备管理模块表结构
-- =====================================================
USE hydra_foresight;

-- -----------------------------------------------------
-- 设备信息表 (hf_device)
-- 存储监测设备基本信息
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_device;
CREATE TABLE hf_device (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    device_id VARCHAR(50) NOT NULL COMMENT '设备唯一标识',
    device_name VARCHAR(100) NOT NULL COMMENT '设备名称',
    device_type TINYINT UNSIGNED NOT NULL COMMENT '设备类型: 1-雨量站, 2-水位站, 3-流量站, 4-气象站, 5-摄像头',
    device_model VARCHAR(100) DEFAULT '' COMMENT '设备型号',
    manufacturer VARCHAR(100) DEFAULT '' COMMENT '生产厂家',
    serial_number VARCHAR(100) DEFAULT '' COMMENT '设备序列号',
    area_id BIGINT UNSIGNED NOT NULL COMMENT '所属监测区域ID',
    location_name VARCHAR(200) NOT NULL COMMENT '安装位置描述',
    longitude DECIMAL(10, 7) NOT NULL COMMENT '经度',
    latitude DECIMAL(10, 7) NOT NULL COMMENT '纬度',
    altitude DECIMAL(8, 2) DEFAULT 0 COMMENT '海拔高度(米)',
    install_date DATE DEFAULT NULL COMMENT '安装日期',
    warranty_date DATE DEFAULT NULL COMMENT '保修截止日期',
    data_interval INT UNSIGNED DEFAULT 300 COMMENT '数据采集间隔(秒)',
    communication_type TINYINT UNSIGNED DEFAULT 1 COMMENT '通讯方式: 1-4G, 2-5G, 3-LoRa, 4-NB-IoT, 5-有线',
    power_type TINYINT UNSIGNED DEFAULT 1 COMMENT '供电方式: 1-市电, 2-太阳能, 3-电池',
    status TINYINT UNSIGNED DEFAULT 1 COMMENT '设备状态: 0-离线, 1-在线, 2-警告, 3-维护中',
    is_deleted TINYINT UNSIGNED DEFAULT 0 COMMENT '是否删除: 0-否, 1-是',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    remark VARCHAR(500) DEFAULT '' COMMENT '备注',
    PRIMARY KEY (id),
    UNIQUE KEY uk_device_id (device_id),
    KEY idx_device_type (device_type),
    KEY idx_area_id (area_id),
    KEY idx_status (status),
    KEY idx_location (longitude, latitude)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='设备信息表';

-- -----------------------------------------------------
-- 设备状态记录表 (hf_device_status)
-- 记录设备运行状态历史
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_device_status;
CREATE TABLE hf_device_status (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    device_id BIGINT UNSIGNED NOT NULL COMMENT '设备ID',
    battery_level TINYINT UNSIGNED DEFAULT 0 COMMENT '电池电量百分比',
    signal_strength TINYINT UNSIGNED DEFAULT 0 COMMENT '信号强度百分比',
    temperature DECIMAL(5, 2) DEFAULT NULL COMMENT '设备温度(℃)',
    humidity DECIMAL(5, 2) DEFAULT NULL COMMENT '设备湿度(%)',
    status TINYINT UNSIGNED DEFAULT 1 COMMENT '状态: 0-离线, 1-在线, 2-警告, 3-故障',
    error_code VARCHAR(50) DEFAULT '' COMMENT '错误代码',
    error_message VARCHAR(255) DEFAULT '' COMMENT '错误信息',
    last_heartbeat DATETIME DEFAULT NULL COMMENT '最后心跳时间',
    record_time DATETIME NOT NULL COMMENT '记录时间',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_device_id (device_id),
    KEY idx_record_time (record_time),
    KEY idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='设备状态记录表';

-- -----------------------------------------------------
-- 设备维护记录表 (hf_device_maintenance)
-- 记录设备维护保养信息
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_device_maintenance;
CREATE TABLE hf_device_maintenance (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    device_id BIGINT UNSIGNED NOT NULL COMMENT '设备ID',
    maintenance_type TINYINT UNSIGNED DEFAULT 1 COMMENT '维护类型: 1-日常维护, 2-故障维修, 3-定期检修, 4-升级更换',
    maintenance_content VARCHAR(500) NOT NULL COMMENT '维护内容',
    maintenance_result VARCHAR(500) DEFAULT '' COMMENT '维护结果',
    maintainer_id BIGINT UNSIGNED DEFAULT 0 COMMENT '维护人员ID',
    maintainer_name VARCHAR(50) DEFAULT '' COMMENT '维护人员姓名',
    maintenance_cost DECIMAL(10, 2) DEFAULT 0 COMMENT '维护费用',
    scheduled_date DATE DEFAULT NULL COMMENT '计划维护日期',
    actual_start_time DATETIME DEFAULT NULL COMMENT '实际开始时间',
    actual_end_time DATETIME DEFAULT NULL COMMENT '实际结束时间',
    status TINYINT UNSIGNED DEFAULT 0 COMMENT '状态: 0-待处理, 1-进行中, 2-已完成, 3-已取消',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    remark VARCHAR(500) DEFAULT '' COMMENT '备注',
    PRIMARY KEY (id),
    KEY idx_device_id (device_id),
    KEY idx_maintenance_type (maintenance_type),
    KEY idx_status (status),
    KEY idx_scheduled_date (scheduled_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='设备维护记录表';
