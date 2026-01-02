-- =====================================================
-- HydraForesight 数据库设计总结
-- =====================================================

/*
=====================================================
数据库名称：hydra_foresight
字符集：utf8mb4
排序规则：utf8mb4_unicode_ci
存储引擎：InnoDB
=====================================================

一、数据库表统计（共32张表）
-----------------------------------------------------

【用户管理模块】6张表
1. hf_user - 用户信息表
2. hf_role - 角色信息表
3. hf_permission - 权限信息表
4. hf_user_role - 用户角色关联表
5. hf_role_permission - 角色权限关联表
6. hf_department - 部门信息表

【区域管理模块】2张表
7. hf_region - 行政区域表
8. hf_monitor_area - 监测区域表

【设备管理模块】3张表
9. hf_device - 设备信息表
10. hf_device_status - 设备状态记录表
11. hf_device_maintenance - 设备维护记录表

【监测数据模块】6张表
12. hf_rainfall_data - 降水数据表
13. hf_water_level_data - 水位数据表
14. hf_weather_data - 气象数据表
15. hf_pipe_flow_data - 管道流量数据表
16. hf_weather_forecast - 天气预报数据表
17. hf_monitor_statistics - 监测数据统计表

【预警管理模块】4张表
18. hf_alert_rule - 预警规则表
19. hf_alert_record - 预警记录表
20. hf_alert_notification - 预警通知记录表
21. hf_alert_response - 预警响应记录表

【公众参与模块】4张表
22. hf_public_report - 公众上报表
23. hf_report_process - 上报处理记录表
24. hf_report_upvote - 上报点赞表
25. hf_report_comment - 上报评论表

【知识科普模块】5张表
26. hf_knowledge_category - 知识分类表
27. hf_knowledge_article - 知识文章表
28. hf_knowledge_video - 知识视频表
29. hf_knowledge_resource - 知识资源表
30. hf_flood_guide - 防汛指南表

【系统管理模块】7张表
31. hf_system_config - 系统配置表
32. hf_dictionary - 数据字典表
33. hf_notification_template - 通知模板表
34. hf_operation_log - 操作日志表
35. hf_login_log - 登录日志表
36. hf_system_log - 系统日志表
37. hf_api_log - API调用日志表
38. hf_export_record - 数据导出记录表

=====================================================

二、设计规范说明
-----------------------------------------------------

1. 命名规范
   - 数据库名：业务系统名_子系统名（hydra_foresight）
   - 表名前缀：hf_（HydraForesight缩写）
   - 字段名：小写字母+下划线，见名知意
   - 索引命名：pk_主键、uk_唯一键、idx_普通索引

2. 字段规范
   - 主键：id bigint unsigned auto_increment
   - 时间：create_time、update_time（必备）
   - 删除：is_deleted（逻辑删除标识）
   - 状态：status（统一状态字段）

3. 索引规范
   - 每表必有主键
   - 业务唯一键使用uk_前缀
   - 普通索引使用idx_前缀
   - 联合索引区分度高的字段在前

4. 安全规范
   - 密码存储使用哈希+盐值
   - 敏感数据加密存储
   - 所有用户输入参数化查询

=====================================================

三、表关系说明
-----------------------------------------------------

用户权限体系：
hf_user <-> hf_user_role <-> hf_role
hf_role <-> hf_role_permission <-> hf_permission

监测数据链路：
hf_device -> hf_rainfall_data/hf_water_level_data/hf_weather_data
hf_monitor_area <- hf_device

预警处理链路：
hf_alert_rule -> hf_alert_record -> hf_alert_notification
hf_alert_record -> hf_alert_response

公众参与链路：
hf_public_report -> hf_report_process
hf_public_report <- hf_report_upvote
hf_public_report <- hf_report_comment

=====================================================
*/
