-- =====================================================
-- HydraForesight 智能降水检测预警系统数据库
-- 数据库创建脚本
-- 版本: 1.0.0
-- 创建日期: 2025-04-02
-- 遵循阿里巴巴数据库设计规范
-- =====================================================

-- 创建数据库
CREATE DATABASE IF NOT EXISTS hydra_foresight
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE hydra_foresight;

-- =====================================================
-- 说明：
-- 1. 所有表名、字段名使用小写字母和下划线
-- 2. 主键统一使用 id，类型为 bigint unsigned auto_increment
-- 3. 所有表包含 create_time 和 update_time 字段
-- 4. 所有字段尽量使用 NOT NULL，并设置默认值
-- 5. 使用 InnoDB 存储引擎
-- 6. 字符集统一使用 utf8mb4
-- 7. 索引命名：主键 pk_，唯一键 uk_，普通索引 idx_
-- =====================================================
