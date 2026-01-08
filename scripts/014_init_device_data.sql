-- =====================================================
-- 设备管理初始化数据
-- 插入监测设备基础数据
-- =====================================================
USE hydra_foresight;

-- 清空旧数据
TRUNCATE TABLE hf_device_status;
TRUNCATE TABLE hf_device_maintenance;
TRUNCATE TABLE hf_device;

-- 重置自增ID
ALTER TABLE hf_device AUTO_INCREMENT = 1;
ALTER TABLE hf_device_status AUTO_INCREMENT = 1;
ALTER TABLE hf_device_maintenance AUTO_INCREMENT = 1;

-- 插入设备基础数据
-- 黄石坡区域设备
INSERT INTO hf_device (device_id, device_name, device_type, device_model, manufacturer, area_id, location_name, longitude, latitude, altitude, install_date, data_interval, communication_type, power_type, status, remark) VALUES
('DEV001', '黄石坡 雷达雨量计', 1, 'RG-100型', '华云科技', 1, '绿心公园西侧', 103.7650, 29.5520, 380, '2024-01-15', 300, 1, 2, 1, '雷达雨量监测设备'),
('DEV008', '黄石坡 东岸摄像头', 5, 'HD-2000', '海康威视', 1, '黄石坡东岸观景平台', 103.7658, 29.5525, 385, '2024-02-20', 60, 1, 1, 1, '高清监控设备'),
('DEV015', '黄石坡 西岸摄像头', 5, 'HD-2000', '海康威视', 1, '黄石坡西岸观景台', 103.7642, 29.5518, 382, '2024-03-10', 60, 1, 1, 0, '设备离线待维护');

-- 月弦坝区域设备
INSERT INTO hf_device (device_id, device_name, device_type, device_model, manufacturer, area_id, location_name, longitude, latitude, altitude, install_date, data_interval, communication_type, power_type, status, remark) VALUES
('DEV002', '月弦坝 浮子式水位计', 2, 'WL-500', '水文仪器厂', 2, '大佛坝村大渡河南岸', 103.7720, 29.5580, 360, '2024-01-20', 300, 1, 1, 2, '接近警戒水位'),
('DEV009', '月弦坝 闸口流量计', 3, 'FL-800', '水利仪表', 2, '月弦坝北段闸口', 103.7725, 29.5585, 362, '2024-02-15', 300, 1, 1, 3, '定期维护中'),
('DEV016', '月弦坝 摄像头', 1, 'RG-80型', '气象设备厂', 2, '大佛坝村北岸', 103.7718, 29.5588, 365, '2024-03-01', 300, 1, 2, 1, '雨量监测');

-- 嘉州大道区域设备
INSERT INTO hf_device (device_id, device_name, device_type, device_model, manufacturer, area_id, location_name, longitude, latitude, altitude, install_date, data_interval, communication_type, power_type, status, remark) VALUES
('DEV003', '嘉州大道 地埋式道路积水监测仪', 3, 'FL-600', '智慧城市科技', 3, '嘉州大道排水管网监测点', 103.7590, 29.5480, 375, '2024-01-25', 300, 4, 1, 1, '管网流量监测'),
('DEV010', '嘉州大道 OTT Pluvio²称重式雨量计', 4, 'Pluvio²', 'OTT', 3, '嘉州大道中段绿化带', 103.7595, 29.5485, 376, '2024-02-25', 300, 1, 2, 1, '精密雨量监测'),
('DEV017', '嘉州大道桥下水位站', 2, 'WL-600', '水文仪器厂', 3, '嘉州大道跨河桥下', 103.7600, 29.5490, 358, '2024-03-15', 300, 1, 1, 2, '接近警戒水位');

-- 柏杨中路区域设备
INSERT INTO hf_device (device_id, device_name, device_type, device_model, manufacturer, area_id, location_name, longitude, latitude, altitude, install_date, data_interval, communication_type, power_type, status, remark) VALUES
('DEV004', '柏杨中路 多普勒超声波在线监测设备', 4, 'AWS-3000', '气象仪器', 4, '柏杨中路与嘉州大道交叉口', 103.7680, 29.5540, 378, '2024-01-28', 300, 1, 1, 1, '多参数气象监测'),
('DEV011', '柏杨中路 X波段雷达雨量监测系统', 1, 'XR-2000', '雷达科技', 4, '柏杨中路东段', 103.7685, 29.5545, 380, '2024-02-28', 300, 1, 2, 1, 'X波段雷达'),
('DEV018', '柏杨中路 摄像头', 3, 'FL-700', '智慧监测', 4, '柏杨中路与天星路交叉口', 103.7690, 29.5550, 379, '2024-03-20', 300, 1, 1, 1, '流量监测');

-- 周河坎区域设备
INSERT INTO hf_device (device_id, device_name, device_type, device_model, manufacturer, area_id, location_name, longitude, latitude, altitude, install_date, data_interval, communication_type, power_type, status, remark) VALUES
('DEV005', '周河坎 监控摄像头', 5, 'HD-2500', '海康威视', 5, '周河坎南岸观景台', 103.7700, 29.5560, 383, '2024-02-01', 60, 1, 1, 0, '设备离线待维护'),
('DEV012', '周河坎 U-son11标准型超声波液位计', 2, 'U-son11', '超声波仪器', 5, '周河坎溢洪道', 103.7705, 29.5565, 370, '2024-03-01', 300, 1, 1, 2, '水位上涨警告'),
('DEV019', '周河坎 多普勒流量计（ADCP）', 5, 'ADCP-1200', '水文测量', 5, '周河坎东岸', 103.7710, 29.5570, 372, '2024-03-18', 300, 1, 1, 3, '定期维护');

-- 王浩儿街区域设备
INSERT INTO hf_device (device_id, device_name, device_type, device_model, manufacturer, area_id, location_name, longitude, latitude, altitude, install_date, data_interval, communication_type, power_type, status, remark) VALUES
('DEV006', '王浩儿街 压电式雨量计', 1, 'PE-200', '气象设备', 6, '王浩儿街与致江路交叉口', 103.7620, 29.5500, 377, '2024-02-05', 300, 1, 2, 1, '压电式传感器'),
('DEV013', '王浩儿街 声学多普勒流速仪(ADV)', 3, 'ADV-500', '流速仪器', 6, '王浩儿街排水管网监测点', 103.7625, 29.5505, 374, '2024-03-05', 300, 4, 1, 1, '流速监测'),
('DEV020', '王浩儿街 摄像头', 4, 'AWS-2500', '气象监测', 6, '王浩儿街中段绿化带', 103.7630, 29.5510, 376, '2024-03-25', 300, 1, 2, 1, '气象监测站');

-- 碧山路区域设备
INSERT INTO hf_device (device_id, device_name, device_type, device_model, manufacturer, area_id, location_name, longitude, latitude, altitude, install_date, data_interval, communication_type, power_type, status, remark) VALUES
('DEV007', '碧山路 一体式雷达液位计', 2, 'RL-400', '液位仪表', 7, '碧山路下穿隧道入口', 103.7560, 29.5460, 368, '2024-02-10', 300, 1, 1, 2, '隧道积水警告'),
('DEV014', '碧山路 立杆式积水监测仪', 4, 'WM-300', '积水监测', 7, '碧山路与致江路大桥交叉口', 103.7565, 29.5465, 370, '2024-03-10', 300, 1, 1, 1, '积水监测');

-- 插入设备状态数据
INSERT INTO hf_device_status (device_id, battery_level, signal_strength, temperature, humidity, status, last_heartbeat, record_time) VALUES
-- 在线设备
(1, 85, 90, 28.5, 65, 1, NOW(), NOW()),
(3, 90, 85, 27.8, 62, 1, NOW(), NOW()),
(4, 78, 92, 29.2, 68, 1, NOW(), NOW()),
(6, 72, 88, 28.0, 64, 1, NOW(), NOW()),
(8, 95, 95, 26.5, 60, 1, NOW(), NOW()),
(10, 88, 90, 27.5, 63, 1, NOW(), NOW()),
(11, 80, 85, 28.8, 66, 1, NOW(), NOW()),
(13, 75, 88, 27.2, 61, 1, NOW(), NOW()),
(14, 82, 87, 28.3, 65, 1, NOW(), NOW()),
(16, 78, 83, 27.9, 64, 1, NOW(), NOW()),
(18, 85, 90, 28.1, 63, 1, NOW(), NOW()),
(20, 90, 92, 27.7, 62, 1, NOW(), NOW()),
-- 警告设备
(2, 62, 75, 30.5, 75, 2, NOW(), NOW()),
(7, 65, 80, 31.2, 78, 2, NOW(), NOW()),
(12, 70, 82, 29.8, 72, 2, NOW(), NOW()),
(17, 68, 78, 30.0, 74, 2, NOW(), NOW()),
-- 维护中设备
(9, 45, 60, 25.0, 55, 3, DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY)),
(19, 38, 55, 24.5, 52, 3, DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),
-- 离线设备
(5, 0, 0, NULL, NULL, 0, DATE_SUB(NOW(), INTERVAL 3 HOUR), DATE_SUB(NOW(), INTERVAL 3 HOUR)),
(15, 10, 25, NULL, NULL, 0, DATE_SUB(NOW(), INTERVAL 5 HOUR), DATE_SUB(NOW(), INTERVAL 5 HOUR));

-- 插入设备维护记录
INSERT INTO hf_device_maintenance (device_id, maintenance_type, maintenance_content, maintenance_result, maintainer_id, maintainer_name, maintenance_cost, scheduled_date, actual_start_time, actual_end_time, status, remark) VALUES
(5, 2, '摄像头电源故障，需更换电源模块', '已更换电源模块，设备恢复正常', 2, '张伟', 800.00, '2025-01-08', '2025-01-08 09:00:00', '2025-01-08 11:30:00', 2, '保修期内免费更换'),
(15, 2, '摄像头镜头模糊，电池电量不足', '清洁镜头，更换电池', 2, '张伟', 500.00, '2025-01-08', '2025-01-08 14:00:00', '2025-01-08 16:00:00', 2, '常规维护'),
(9, 3, '流量计定期检修校准', '校准完成，参数正常', 3, '李明', 1200.00, '2025-01-07', '2025-01-07 08:00:00', '2025-01-07 17:00:00', 2, '年度定期检修'),
(19, 3, 'ADCP设备定期维护', '设备清洁，参数校准完成', 3, '李明', 1500.00, '2025-01-07', '2025-01-07 09:00:00', NULL, 1, '维护进行中'),
(2, 1, '浮子式水位计日常巡检', '', 2, '张伟', 0, '2025-01-09', NULL, NULL, 0, '计划巡检'),
(7, 1, '一体式雷达液位计日常巡检', '', 2, '张伟', 0, '2025-01-09', NULL, NULL, 0, '计划巡检');
