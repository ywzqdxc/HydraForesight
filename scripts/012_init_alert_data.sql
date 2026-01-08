-- =====================================================
-- 预警管理模块初始化数据
-- 包含预警规则、预警记录、预警通知等初始数据
-- =====================================================
USE hydra_foresight;

-- -----------------------------------------------------
-- 初始化预警规则数据
-- -----------------------------------------------------
INSERT INTO hf_alert_rule (rule_code, rule_name, rule_type, area_id, alert_level, condition_type, threshold_value, threshold_unit, duration_minutes, alert_message, notify_channels, is_auto_release, release_threshold, priority, status) VALUES
('RULE_RAIN_BLUE', '暴雨蓝色预警规则', 1, 0, 1, 1, 50.000, 'mm/24h', 1440, '预计未来24小时降水量将达50-100毫米，请注意防范。', 'push,banner', 1, 30.000, 4, 1),
('RULE_RAIN_YELLOW', '暴雨黄色预警规则', 1, 0, 2, 1, 100.000, 'mm/24h', 1440, '预计未来24小时降水量将达100-200毫米，请注意防范。', 'sms,push,banner', 1, 50.000, 3, 1),
('RULE_RAIN_ORANGE', '暴雨橙色预警规则', 1, 0, 3, 1, 200.000, 'mm/24h', 720, '预计未来12小时降水量将达200-300毫米，请做好防范准备。', 'sms,push,banner', 1, 100.000, 2, 1),
('RULE_RAIN_RED', '暴雨红色预警规则', 1, 0, 4, 1, 300.000, 'mm/24h', 360, '预计未来6小时降水量将达300毫米以上，请立即做好防范。', 'sms,push,banner', 0, 0.000, 1, 1),
('RULE_WATERLOG_YELLOW', '内涝黄色预警规则', 3, 0, 2, 1, 20.000, 'cm', 60, '部分低洼地带已出现积水，请注意绕行。', 'push,banner', 1, 10.000, 3, 1),
('RULE_WATERLOG_ORANGE', '内涝橙色预警规则', 3, 0, 3, 1, 30.000, 'cm', 60, '多处低洼地带已出现积水，部分道路交通受阻，请注意绕行。', 'sms,push,banner', 1, 15.000, 2, 1),
('RULE_WATERLOG_RED', '内涝红色预警规则', 3, 0, 4, 1, 50.000, 'cm', 30, '严重积水，多处道路无法通行，请避免外出。', 'sms,push,banner', 0, 0.000, 1, 1),
('RULE_THUNDER_YELLOW', '雷电黄色预警规则', 4, 0, 2, 1, 1.000, '级', 360, '预计未来6小时将出现雷电活动，局部地区可能伴有短时强降水。', 'push,banner', 1, 0.000, 3, 1),
('RULE_THUNDER_ORANGE', '雷电橙色预警规则', 4, 0, 3, 1, 2.000, '级', 180, '预计未来3小时将出现强雷电活动，局部地区可能伴有短时强降水和大风。', 'sms,push,banner', 1, 0.000, 2, 1);

-- -----------------------------------------------------
-- 初始化预警记录数据（包含首页显示的预警）
-- -----------------------------------------------------
-- 删除现有数据，确保脚本可以重复执行
DELETE FROM hf_alert_response;
DELETE FROM hf_alert_notification;
DELETE FROM hf_alert_record;
DELETE FROM hf_alert_rule;

-- 重置自增ID
ALTER TABLE hf_alert_rule AUTO_INCREMENT = 1;
ALTER TABLE hf_alert_record AUTO_INCREMENT = 1;
ALTER TABLE hf_alert_notification AUTO_INCREMENT = 1;
ALTER TABLE hf_alert_response AUTO_INCREMENT = 1;

INSERT INTO hf_alert_record (alert_id, rule_id, alert_type, alert_level, area_id, area_name, title, content, trigger_value, trigger_time, publish_time, expected_end_time, status, publisher_id, publisher_name, is_public, view_count) VALUES
-- 暴雨红色预警（首页横幅显示）
('ALT20250108001', 4, 1, 4, 1, '乐山市区', '暴雨红色预警', '乐山市区域发布暴雨红色预警，预计未来3小时降水量将达80-100毫米，请注意防范。', 85.000, NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 6 HOUR), 1, 1, '系统管理员', 1, 156),
-- 内涝橙色预警
('ALT20250108002', 6, 3, 3, 1, '柏杨中路', '内涝橙色预警', '柏杨中路多处低洼地带已出现积水，部分道路交通受阻，请注意绕行。', 32.000, DATE_SUB(NOW(), INTERVAL 30 MINUTE), DATE_SUB(NOW(), INTERVAL 25 MINUTE), DATE_ADD(NOW(), INTERVAL 4 HOUR), 1, 1, '系统管理员', 1, 89),
-- 雷电黄色预警
('ALT20250108003', 8, 4, 2, 1, '市中区', '雷电黄色预警', '预计未来6小时乐山市将出现强雷电活动，局部地区可能伴有短时强降水和大风。', 1.500, DATE_SUB(NOW(), INTERVAL 120 MINUTE), DATE_SUB(NOW(), INTERVAL 110 MINUTE), DATE_ADD(NOW(), INTERVAL 5 HOUR), 1, 1, '系统管理员', 1, 67),
-- 内涝黄色预警（已解除）
('ALT20250107001', 5, 3, 2, 2, '黄石坡', '内涝黄色预警', '黄石坡多处低洼地带已出现积水，部分道路交通受阻，请注意绕行。', 22.000, DATE_SUB(NOW(), INTERVAL 1440 MINUTE), DATE_SUB(NOW(), INTERVAL 1380 MINUTE), DATE_SUB(NOW(), INTERVAL 720 MINUTE), 2, 1, '系统管理员', 1, 245),
-- 暴雨黄色预警（已解除）
('ALT20250106001', 2, 1, 2, 1, '乐山市区', '暴雨黄色预警', '预计未来24小时乐山市区降水量将达100-150毫米，请注意防范。', 120.000, DATE_SUB(NOW(), INTERVAL 2880 MINUTE), DATE_SUB(NOW(), INTERVAL 2820 MINUTE), DATE_SUB(NOW(), INTERVAL 1440 MINUTE), 2, 1, '系统管理员', 1, 312);

-- -----------------------------------------------------
-- 初始化预警通知记录（首页横幅通知）
-- -----------------------------------------------------
INSERT INTO hf_alert_notification (alert_record_id, user_id, notify_channel, notify_target, notify_content, send_time, send_status, is_read, retry_count, create_time) VALUES
-- 暴雨红色预警通知（当前显示在首页）
(1, 0, 5, '首页横幅', '紧急预警：乐山市区域发布暴雨红色预警，预计未来3小时降水量将达80-100毫米，请注意防范。', NOW(), 1, 0, 0, NOW()),
-- 内涝橙色预警通知
(2, 0, 5, '首页横幅', '内涝橙色预警：柏杨中路多处低洼地带已出现积水，部分道路交通受阻，请注意绕行。', DATE_SUB(NOW(), INTERVAL 25 MINUTE), 1, 0, 0, DATE_SUB(NOW(), INTERVAL 25 MINUTE)),
-- 雷电黄色预警通知
(3, 0, 5, '首页横幅', '雷电黄色预警：预计未来6小时乐山市将出现强雷电活动，局部地区可能伴有短时强降水和大风。', DATE_SUB(NOW(), INTERVAL 110 MINUTE), 1, 0, 0, DATE_SUB(NOW(), INTERVAL 110 MINUTE));

-- -----------------------------------------------------
-- 初始化预警响应记录示例
-- -----------------------------------------------------
INSERT INTO hf_alert_response (alert_record_id, response_type, response_content, responder_id, responder_name, responder_dept, response_time, attachment_urls, create_time) VALUES
-- 针对暴雨红色预警的响应
(1, 1, '收到预警通知，已通知相关部门做好防范准备。', 1, '系统管理员', '运维部', DATE_ADD(NOW(), INTERVAL 5 MINUTE), '[]', DATE_ADD(NOW(), INTERVAL 5 MINUTE)),
(1, 2, '已派人员前往重点区域进行巡查，目前暂无险情。', 2, '张三', '运维部', DATE_ADD(NOW(), INTERVAL 30 MINUTE), '[{"fileName":"巡查照片1.jpg","filePath":"alert-response/2025/01/08/photo1.jpg","fileSize":102400,"fileType":"jpg"}]', DATE_ADD(NOW(), INTERVAL 30 MINUTE)),
-- 针对内涝橙色预警的响应
(2, 1, '收到预警，已通知交通部门设置警示标志。', 1, '系统管理员', '运维部', DATE_SUB(NOW(), INTERVAL 20 MINUTE), '[]', DATE_SUB(NOW(), INTERVAL 20 MINUTE)),
(2, 3, '柏杨中路积水深度约35cm，已设置警示标志，建议车辆绕行。', 3, '李四', '数据分析部', DATE_SUB(NOW(), INTERVAL 10 MINUTE), '[{"fileName":"积水现场.jpg","filePath":"alert-response/2025/01/08/waterlog1.jpg","fileSize":204800,"fileType":"jpg"}]', DATE_SUB(NOW(), INTERVAL 10 MINUTE));
