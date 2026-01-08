-- =====================================================
-- 为预警记录表添加逻辑删除字段
-- =====================================================
USE hydra_foresight;

-- 为 hf_alert_record 表添加 is_deleted 字段
ALTER TABLE hf_alert_record 
ADD COLUMN is_deleted TINYINT UNSIGNED DEFAULT 0 COMMENT '是否删除: 0-否, 1-是' AFTER view_count;

-- 添加索引以提高查询性能
ALTER TABLE hf_alert_record 
ADD KEY idx_is_deleted (is_deleted);
