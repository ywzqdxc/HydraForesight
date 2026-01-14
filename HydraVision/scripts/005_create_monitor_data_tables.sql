-- =====================================================
-- 监测数据模块表结构
-- =====================================================
USE hydra_foresight;

-- -----------------------------------------------------
-- 降水数据表 (hf_rainfall_data)
-- 存储雨量监测数据
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_rainfall_data;
CREATE TABLE hf_rainfall_data (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    device_id BIGINT UNSIGNED NOT NULL COMMENT '设备ID',
    area_id BIGINT UNSIGNED NOT NULL COMMENT '监测区域ID',
    rainfall_value DECIMAL(8, 2) NOT NULL COMMENT '降水量(mm)',
    rainfall_intensity DECIMAL(8, 2) DEFAULT 0 COMMENT '降水强度(mm/h)',
    rainfall_duration INT UNSIGNED DEFAULT 0 COMMENT '累计降水时长(分钟)',
    rainfall_type TINYINT UNSIGNED DEFAULT 0 COMMENT '降水类型: 0-无, 1-小雨, 2-中雨, 3-大雨, 4-暴雨, 5-大暴雨',
    temperature DECIMAL(5, 2) DEFAULT NULL COMMENT '温度(℃)',
    humidity DECIMAL(5, 2) DEFAULT NULL COMMENT '湿度(%)',
    record_time DATETIME NOT NULL COMMENT '记录时间',
    data_quality TINYINT UNSIGNED DEFAULT 1 COMMENT '数据质量: 0-异常, 1-正常, 2-可疑',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_device_id (device_id),
    KEY idx_area_id (area_id),
    KEY idx_record_time (record_time),
    KEY idx_rainfall_type (rainfall_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='降水数据表';

-- -----------------------------------------------------
-- 水位数据表 (hf_water_level_data)
-- 存储水位监测数据
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_water_level_data;
CREATE TABLE hf_water_level_data (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    device_id BIGINT UNSIGNED NOT NULL COMMENT '设备ID',
    area_id BIGINT UNSIGNED NOT NULL COMMENT '监测区域ID',
    water_level DECIMAL(8, 3) NOT NULL COMMENT '水位高度(m)',
    water_level_change DECIMAL(8, 3) DEFAULT 0 COMMENT '水位变化(m/h)',
    warning_level DECIMAL(8, 3) DEFAULT 0 COMMENT '警戒水位(m)',
    danger_level DECIMAL(8, 3) DEFAULT 0 COMMENT '危险水位(m)',
    flow_rate DECIMAL(10, 3) DEFAULT 0 COMMENT '流量(m³/s)',
    flow_velocity DECIMAL(6, 3) DEFAULT 0 COMMENT '流速(m/s)',
    record_time DATETIME NOT NULL COMMENT '记录时间',
    data_quality TINYINT UNSIGNED DEFAULT 1 COMMENT '数据质量: 0-异常, 1-正常, 2-可疑',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_device_id (device_id),
    KEY idx_area_id (area_id),
    KEY idx_record_time (record_time),
    KEY idx_water_level (water_level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='水位数据表';

-- -----------------------------------------------------
-- 气象数据表 (hf_weather_data)
-- 存储气象监测数据
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_weather_data;
CREATE TABLE hf_weather_data (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    device_id BIGINT UNSIGNED NOT NULL COMMENT '设备ID',
    area_id BIGINT UNSIGNED NOT NULL COMMENT '监测区域ID',
    temperature DECIMAL(5, 2) DEFAULT NULL COMMENT '温度(℃)',
    humidity DECIMAL(5, 2) DEFAULT NULL COMMENT '湿度(%)',
    pressure DECIMAL(8, 2) DEFAULT NULL COMMENT '气压(hPa)',
    wind_speed DECIMAL(6, 2) DEFAULT 0 COMMENT '风速(m/s)',
    wind_direction VARCHAR(20) DEFAULT '' COMMENT '风向',
    wind_direction_degree INT UNSIGNED DEFAULT 0 COMMENT '风向角度(度)',
    visibility DECIMAL(8, 2) DEFAULT NULL COMMENT '能见度(km)',
    uv_index TINYINT UNSIGNED DEFAULT 0 COMMENT '紫外线指数',
    weather_condition VARCHAR(50) DEFAULT '' COMMENT '天气状况',
    record_time DATETIME NOT NULL COMMENT '记录时间',
    data_quality TINYINT UNSIGNED DEFAULT 1 COMMENT '数据质量: 0-异常, 1-正常, 2-可疑',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_device_id (device_id),
    KEY idx_area_id (area_id),
    KEY idx_record_time (record_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='气象数据表';

-- -----------------------------------------------------
-- 管道流量数据表 (hf_pipe_flow_data)
-- 存储排水管道流量监测数据
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_pipe_flow_data;
CREATE TABLE hf_pipe_flow_data (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    device_id BIGINT UNSIGNED NOT NULL COMMENT '设备ID',
    area_id BIGINT UNSIGNED NOT NULL COMMENT '监测区域ID',
    flow_rate DECIMAL(10, 3) NOT NULL COMMENT '流量(m³/s)',
    flow_velocity DECIMAL(6, 3) DEFAULT 0 COMMENT '流速(m/s)',
    water_depth DECIMAL(6, 3) DEFAULT 0 COMMENT '水深(m)',
    pipe_capacity DECIMAL(10, 3) DEFAULT 0 COMMENT '管道设计容量(m³/s)',
    fill_ratio DECIMAL(5, 2) DEFAULT 0 COMMENT '充满度(%)',
    pressure DECIMAL(8, 3) DEFAULT 0 COMMENT '压力(MPa)',
    turbidity TINYINT UNSIGNED DEFAULT 0 COMMENT '浑浊度: 0-清澈, 1-低, 2-中, 3-高',
    record_time DATETIME NOT NULL COMMENT '记录时间',
    data_quality TINYINT UNSIGNED DEFAULT 1 COMMENT '数据质量: 0-异常, 1-正常, 2-可疑',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_device_id (device_id),
    KEY idx_area_id (area_id),
    KEY idx_record_time (record_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管道流量数据表';

-- -----------------------------------------------------
-- 天气预报数据表 (hf_weather_forecast)
-- 存储第三方天气预报数据
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_weather_forecast;
CREATE TABLE hf_weather_forecast (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    area_id BIGINT UNSIGNED NOT NULL COMMENT '监测区域ID',
    forecast_date DATE NOT NULL COMMENT '预报日期',
    forecast_time_slot TINYINT UNSIGNED DEFAULT 0 COMMENT '预报时段: 0-全天, 1-上午, 2-下午, 3-夜间',
    weather_condition VARCHAR(50) DEFAULT '' COMMENT '天气状况',
    weather_icon VARCHAR(50) DEFAULT '' COMMENT '天气图标',
    temp_high DECIMAL(5, 2) DEFAULT NULL COMMENT '最高温度(℃)',
    temp_low DECIMAL(5, 2) DEFAULT NULL COMMENT '最低温度(℃)',
    humidity DECIMAL(5, 2) DEFAULT NULL COMMENT '湿度(%)',
    rainfall_probability TINYINT UNSIGNED DEFAULT 0 COMMENT '降水概率(%)',
    expected_rainfall DECIMAL(8, 2) DEFAULT 0 COMMENT '预计降水量(mm)',
    wind_direction VARCHAR(20) DEFAULT '' COMMENT '风向',
    wind_speed DECIMAL(6, 2) DEFAULT 0 COMMENT '风速(m/s)',
    wind_level VARCHAR(20) DEFAULT '' COMMENT '风力等级',
    data_source VARCHAR(50) DEFAULT '' COMMENT '数据来源',
    fetch_time DATETIME NOT NULL COMMENT '获取时间',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_area_id (area_id),
    KEY idx_forecast_date (forecast_date),
    KEY idx_fetch_time (fetch_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='天气预报数据表';

-- -----------------------------------------------------
-- 监测数据统计表 (hf_monitor_statistics)
-- 存储各类监测数据的统计汇总
-- -----------------------------------------------------
DROP TABLE IF EXISTS hf_monitor_statistics;
CREATE TABLE hf_monitor_statistics (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    area_id BIGINT UNSIGNED NOT NULL COMMENT '监测区域ID',
    stat_type TINYINT UNSIGNED NOT NULL COMMENT '统计类型: 1-小时, 2-日, 3-周, 4-月, 5-年',
    stat_date DATE NOT NULL COMMENT '统计日期',
    stat_hour TINYINT UNSIGNED DEFAULT 0 COMMENT '统计小时(0-23)',
    total_rainfall DECIMAL(10, 2) DEFAULT 0 COMMENT '累计降水量(mm)',
    max_rainfall_intensity DECIMAL(8, 2) DEFAULT 0 COMMENT '最大降水强度(mm/h)',
    avg_water_level DECIMAL(8, 3) DEFAULT 0 COMMENT '平均水位(m)',
    max_water_level DECIMAL(8, 3) DEFAULT 0 COMMENT '最高水位(m)',
    min_water_level DECIMAL(8, 3) DEFAULT 0 COMMENT '最低水位(m)',
    avg_temperature DECIMAL(5, 2) DEFAULT NULL COMMENT '平均温度(℃)',
    max_temperature DECIMAL(5, 2) DEFAULT NULL COMMENT '最高温度(℃)',
    min_temperature DECIMAL(5, 2) DEFAULT NULL COMMENT '最低温度(℃)',
    avg_humidity DECIMAL(5, 2) DEFAULT NULL COMMENT '平均湿度(%)',
    alert_count INT UNSIGNED DEFAULT 0 COMMENT '预警次数',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_area_stat (area_id, stat_type, stat_date, stat_hour),
    KEY idx_area_id (area_id),
    KEY idx_stat_type (stat_type),
    KEY idx_stat_date (stat_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='监测数据统计表';
