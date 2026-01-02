-- =====================================================
-- 初始化数据脚本
-- =====================================================
USE hydra_foresight;

-- -----------------------------------------------------
-- 初始化角色数据
-- -----------------------------------------------------
INSERT INTO hf_role (role_code, role_name, role_desc, sort_order, is_system) VALUES
('ROLE_SUPER_ADMIN', '超级管理员', '系统最高权限管理员', 1, 1),
('ROLE_ADMIN', '系统管理员', '系统管理员', 2, 1),
('ROLE_OPERATOR', '运维人员', '负责设备运维和数据监控', 3, 0),
('ROLE_ANALYST', '数据分析员', '负责数据分析和报表', 4, 0),
('ROLE_PUBLISHER', '信息发布员', '负责预警信息发布', 5, 0),
('ROLE_USER', '普通用户', '普通注册用户', 6, 0),
('ROLE_GUEST', '访客', '未登录访客', 7, 1);

-- -----------------------------------------------------
-- 初始化权限数据
-- -----------------------------------------------------
INSERT INTO hf_permission (perm_code, perm_name, perm_type, parent_id, path, icon, sort_order) VALUES
-- 一级菜单
('dashboard', '仪表盘', 1, 0, '/', 'LayoutDashboard', 1),
('monitor', '监测中心', 1, 0, '/locations', 'MapPin', 2),
('alerts', '预警中心', 1, 0, '/alerts', 'Bell', 3),
('devices', '设备管理', 1, 0, '/device-management', 'Cpu', 4),
('analytics', '数据分析', 1, 0, '/analytics', 'BarChart', 5),
('reports', '公众参与', 1, 0, '/public-reports', 'Users', 6),
('knowledge', '知识科普', 1, 0, '/knowledge', 'BookOpen', 7),
('system', '系统管理', 1, 0, '/system', 'Settings', 8),

-- 监测中心子菜单
('monitor:all', '全部监测点', 1, 2, '/locations/all', '', 1),
('monitor:longzihu', '龙子湖中心', 1, 2, '/locations/longzihu-center', '', 2),
('monitor:dongfengqu', '东风渠', 1, 2, '/locations/dongfengqu', '', 3),

-- 预警中心子菜单
('alerts:dashboard', '预警仪表盘', 1, 3, '/alerts/dashboard', '', 1),
('alerts:publish', '发布预警', 2, 3, '', '', 2),
('alerts:manage', '预警管理', 2, 3, '', '', 3),

-- 设备管理权限
('devices:view', '查看设备', 2, 4, '', '', 1),
('devices:add', '添加设备', 2, 4, '', '', 2),
('devices:edit', '编辑设备', 2, 4, '', '', 3),
('devices:delete', '删除设备', 2, 4, '', '', 4),
('devices:maintenance', '设备维护', 2, 4, '', '', 5),

-- 数据分析权限
('analytics:view', '查看分析', 2, 5, '', '', 1),
('analytics:export', '导出数据', 2, 5, '', '', 2),

-- 公众参与权限
('reports:view', '查看上报', 2, 6, '', '', 1),
('reports:verify', '核实上报', 2, 6, '', '', 2),
('reports:process', '处理上报', 2, 6, '', '', 3),

-- 系统管理权限
('system:user', '用户管理', 1, 8, '/system/users', '', 1),
('system:role', '角色管理', 1, 8, '/system/roles', '', 2),
('system:config', '系统配置', 1, 8, '/system/config', '', 3),
('system:log', '日志管理', 1, 8, '/system/logs', '', 4);

-- -----------------------------------------------------
-- 初始化部门数据
-- -----------------------------------------------------
INSERT INTO hf_department (dept_code, dept_name, parent_id, sort_order) VALUES
('HQ', '总部', 0, 1),
('TECH', '技术部', 1, 1),
('OPS', '运维部', 1, 2),
('DATA', '数据分析部', 1, 3),
('SERVICE', '客服部', 1, 4);

-- -----------------------------------------------------
-- 初始化监测区域数据
-- -----------------------------------------------------
INSERT INTO hf_monitor_area (area_code, area_name, area_name_en, area_type, risk_level, center_lng, center_lat, description, warning_threshold_1, warning_threshold_2, warning_threshold_3, warning_threshold_4) VALUES
('longzihu', '龙子湖中心', 'Longzihu Center', 1, 3, 113.9750, 34.8000, '龙子湖中心区域，人口密集，排水压力大', 20.0, 35.0, 50.0, 80.0),
('dongfengqu', '东风渠', 'Dongfengqu', 2, 4, 113.9650, 34.8100, '东风渠流域，雨季水位变化大', 15.0, 30.0, 45.0, 70.0),
('science-avenue', '科学大道', 'Science Avenue', 1, 2, 113.9550, 34.7950, '科学大道区域，道路排水能力较强', 25.0, 40.0, 55.0, 85.0),
('longhu-avenue', '龙湖大道', 'Longhu Avenue', 1, 2, 113.9800, 34.8050, '龙湖大道区域，交通要道', 25.0, 40.0, 55.0, 85.0),
('ruyi-lake', '如意湖', 'Ruyi Lake', 3, 3, 113.9900, 34.7900, '如意湖区域，水体较大', 20.0, 35.0, 50.0, 80.0),
('longxiang-street', '龙翔街', 'Longxiang Street', 1, 2, 113.9700, 34.8150, '龙翔街区域，商业中心', 25.0, 40.0, 55.0, 85.0),
('hanhai-road', '瀚海路', 'Hanhai Road', 4, 4, 113.9600, 34.8200, '瀚海路区域，有地下通道，易积水', 15.0, 25.0, 40.0, 60.0);

-- -----------------------------------------------------
-- 初始化系统配置数据
-- -----------------------------------------------------
INSERT INTO hf_system_config (config_key, config_value, config_type, config_group, config_desc) VALUES
('system_name', '雨安盾监测系统', 1, 'basic', '系统名称'),
('system_version', '1.0.0', 1, 'basic', '系统版本'),
('data_refresh_interval', '300', 2, 'monitor', '数据刷新间隔(秒)'),
('alert_auto_release', 'true', 3, 'alert', '是否自动解除预警'),
('max_upload_size', '10485760', 2, 'upload', '最大上传文件大小(字节)'),
('allowed_file_types', '["jpg","jpeg","png","gif","pdf","doc","docx"]', 4, 'upload', '允许上传的文件类型');

-- -----------------------------------------------------
-- 初始化知识分类数据
-- -----------------------------------------------------
INSERT INTO hf_knowledge_category (category_code, category_name, parent_id, icon, sort_order) VALUES
('video', '视频教程', 0, 'Video', 1),
('article', '科普文章', 0, 'FileText', 2),
('guide', '防汛指南', 0, 'BookOpen', 3),
('resource', '资源下载', 0, 'Download', 4),
('video_safety', '安全知识', 1, '', 1),
('video_tech', '技术科普', 1, '', 2),
('article_weather', '气象知识', 2, '', 1),
('article_flood', '防洪知识', 2, '', 2);

-- -----------------------------------------------------
-- 初始化数据字典数据
-- -----------------------------------------------------
INSERT INTO hf_dictionary (dict_code, dict_name, dict_type, dict_value, dict_label, sort_order) VALUES
-- 设备类型
('device_type_1', '雨量站', 'device_type', '1', '雨量站', 1),
('device_type_2', '水位站', 'device_type', '2', '水位站', 2),
('device_type_3', '流量站', 'device_type', '3', '流量站', 3),
('device_type_4', '气象站', 'device_type', '4', '气象站', 4),
('device_type_5', '摄像头', 'device_type', '5', '摄像头', 5),
-- 设备状态
('device_status_0', '离线', 'device_status', '0', '离线', 1),
('device_status_1', '在线', 'device_status', '1', '在线', 2),
('device_status_2', '警告', 'device_status', '2', '警告', 3),
('device_status_3', '维护中', 'device_status', '3', '维护中', 4),
-- 预警级别
('alert_level_1', '蓝色预警', 'alert_level', '1', '蓝色', 1),
('alert_level_2', '黄色预警', 'alert_level', '2', '黄色', 2),
('alert_level_3', '橙色预警', 'alert_level', '3', '橙色', 3),
('alert_level_4', '红色预警', 'alert_level', '4', '红色', 4),
-- 上报类型
('report_type_1', '积水', 'report_type', '1', '积水', 1),
('report_type_2', '降雨', 'report_type', '2', '降雨', 2),
('report_type_3', '交通', 'report_type', '3', '交通', 3),
('report_type_4', '灾害', 'report_type', '4', '灾害', 4),
('report_type_5', '其他', 'report_type', '5', '其他', 5);

-- -----------------------------------------------------
-- 初始化通知模板数据
-- -----------------------------------------------------
INSERT INTO hf_notification_template (template_code, template_name, template_type, subject, content, variables) VALUES
('ALERT_SMS', '预警短信通知', 1, '', '【雨安盾】{alert_level}预警：{area_name}地区{alert_type}，请注意防范。详情请登录系统查看。', '{"alert_level":"预警级别","area_name":"区域名称","alert_type":"预警类型"}'),
('ALERT_EMAIL', '预警邮件通知', 2, '【雨安盾预警】{alert_level} - {title}', '尊敬的用户：\n\n{area_name}地区发布{alert_level}预警。\n\n预警详情：\n{content}\n\n发布时间：{publish_time}\n\n请注意防范，确保安全。\n\n雨安盾监测系统', '{"alert_level":"预警级别","area_name":"区域名称","title":"预警标题","content":"预警内容","publish_time":"发布时间"}'),
('REPORT_VERIFIED', '上报核实通知', 1, '', '【雨安盾】您提交的上报"{title}"已通过核实，感谢您的参与！', '{"title":"上报标题"}'),
('DEVICE_OFFLINE', '设备离线通知', 1, '', '【雨安盾】设备{device_name}({device_id})已离线，请及时检查处理。', '{"device_name":"设备名称","device_id":"设备ID"}');
