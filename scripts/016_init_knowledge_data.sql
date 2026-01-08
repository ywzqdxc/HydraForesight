-- =====================================================
-- 知识科普模块初始化数据
-- =====================================================
USE hydra_foresight;

-- 清空防汛指南表
DELETE FROM hf_flood_guide;
ALTER TABLE hf_flood_guide AUTO_INCREMENT = 1;

-- 清空知识资源表
DELETE FROM hf_knowledge_resource;
ALTER TABLE hf_knowledge_resource AUTO_INCREMENT = 1;

-- =====================================================
-- 插入防汛指南数据
-- =====================================================

-- 1. 家庭防汛应急准备指南
INSERT INTO hf_flood_guide (guide_id, title, description, content, cover_image, guide_level, target_audience, tags, view_count, like_count, sort_order, is_recommend, publish_status, publish_time, is_deleted, create_time, update_time)
VALUES (
    'guide_001',
    '家庭防汛应急准备指南',
    '详细介绍家庭防汛的物资准备、安全措施和应急预案，帮助家庭提前做好防汛准备。',
    '一、物资准备清单
1. 应急食品和饮用水（至少3天用量）
2. 应急照明设备（手电筒、应急灯、蜡烛）
3. 急救医药包（常用药品、绷带、消毒用品）
4. 通讯设备（手机、充电宝、收音机）
5. 防水物品（雨衣、雨鞋、防水袋）
6. 重要证件和现金（密封防水保存）

二、安全措施
1. 检查房屋排水系统是否畅通
2. 清理屋顶、阳台、下水道的杂物
3. 加固门窗，检查防水设施
4. 将贵重物品转移到高处
5. 熟悉社区避难场所位置

三、应急预案
1. 制定家庭应急联系方式
2. 确定紧急撤离路线
3. 定期进行应急演练
4. 关注气象预警信息
5. 学习自救互救知识',
    '/images/flood-guide-1.jpg',
    1,
    '普通家庭',
    '防汛,应急,家庭',
    156,
    42,
    1,
    1,
    1,
    NOW(),
    0,
    NOW(),
    NOW()
);

-- 2. 暴雨天气出行安全指南
INSERT INTO hf_flood_guide (guide_id, title, description, content, cover_image, guide_level, target_audience, tags, view_count, like_count, sort_order, is_recommend, publish_status, publish_time, is_deleted, create_time, update_time)
VALUES (
    'guide_002',
    '暴雨天气出行安全指南',
    '提供暴雨天气出行的安全建议，包括交通工具选择、路线规划和紧急情况处理。',
    '一、出行前准备
1. 关注天气预报和预警信息
2. 评估出行必要性，非必要不外出
3. 准备雨具和防水用品
4. 告知家人出行路线和预计返回时间
5. 充电手机保持通讯畅通

二、步行安全
1. 避开低洼地区和地下通道
2. 远离高压线、变压器等电力设施
3. 不要在大树、广告牌下避雨
4. 穿防滑鞋，注意脚下积水深度
5. 发现积水漫过脚踝立即返回

三、驾车安全
1. 减速慢行，保持安全车距
2. 遇到积水路段先观察再通过
3. 积水超过半个车轮不要强行通过
4. 车辆涉水熄火不要再次启动
5. 及时打开应急灯，提示其他车辆

四、公共交通安全
1. 优先选择地面公共交通
2. 避免乘坐地铁经过易积水区段
3. 注意站台积水情况
4. 听从工作人员指挥
5. 保管好随身物品',
    '/images/flood-guide-2.jpg',
    1,
    '通勤人员',
    '暴雨,出行,交通安全',
    234,
    67,
    2,
    1,
    1,
    NOW(),
    0,
    NOW(),
    NOW()
);

-- 3. 城市内涝自救互救技巧
INSERT INTO hf_flood_guide (guide_id, title, description, content, cover_image, guide_level, target_audience, tags, view_count, like_count, sort_order, is_recommend, publish_status, publish_time, is_deleted, create_time, update_time)
VALUES (
    'guide_003',
    '城市内涝自救互救技巧',
    '介绍在城市内涝情况下的自救互救方法，包括安全避险、求救信号和基本救援技能。',
    '一、自救方法
1. 立即向高处转移
   - 选择坚固建筑物的高层
   - 避免进入地下空间
   - 远离危险区域

2. 被困室内时
   - 关闭煤气、电源总阀
   - 将贵重物品转移到高处
   - 准备好求救信号
   - 不要盲目涉水外出

3. 被困车内时
   - 解开安全带
   - 尽快打开车门或车窗逃生
   - 利用安全锤击碎侧窗
   - 等水位上升至半窗再逃生

4. 涉水行走注意
   - 使用棍棒探路
   - 注意井盖和坑洞
   - 避开旋涡
   - 随时观察周围环境

二、互救技能
1. 发现被困人员
   - 立即拨打119或120
   - 向被困人员喊话安抚
   - 寻找救援工具
   - 不盲目下水救人

2. 救援原则
   - 先救近后救远
   - 先救易后救难
   - 先救多后救少
   - 确保自身安全

3. 救援技巧
   - 使用绳索、竹竿等工具
   - 多人协作，不要单独行动
   - 注意电力设施
   - 救上岸后立即施救

三、求救信号
1. 发光信号：手电筒、反光镜
2. 声音信号：哨子、敲击物品
3. 挥动信号：鲜艳衣物、旗帜
4. 通讯设备：手机、对讲机',
    '/images/flood-guide-3.jpg',
    2,
    '城市居民',
    '内涝,自救,互救,安全',
    412,
    128,
    3,
    1,
    1,
    NOW(),
    0,
    NOW(),
    NOW()
);

-- 4. 防汛物资储备清单
INSERT INTO hf_flood_guide (guide_id, title, description, content, cover_image, guide_level, target_audience, tags, view_count, like_count, sort_order, is_recommend, publish_status, publish_time, is_deleted, create_time, update_time)
VALUES (
    'guide_004',
    '防汛物资储备清单',
    '提供全面的防汛物资清单，包括必备物品、数量建议和储存方法，适合家庭和社区参考。',
    '一、生活必需品
□ 饮用水：每人每天3升，至少储备3天
□ 应急食品：方便面、罐头、压缩饼干等
□ 药品：常用药、急救药、慢性病药
□ 卫生用品：消毒液、纸巾、洗漱用品

二、照明通讯
□ 手电筒：至少2个，备用电池
□ 应急灯：充电式或电池式
□ 收音机：接收预警信息
□ 充电宝：保持通讯畅通
□ 哨子：发出求救信号

三、防护装备
□ 雨衣雨鞋：防水性能好
□ 救生衣：家庭成员每人一件
□ 防水袋：保护重要物品
□ 安全帽：防止坠物伤害
□ 安全绳：用于固定和救援

四、工具设备
□ 多功能刀：切割、开罐等
□ 扳手：关闭水电气阀门
□ 锤子：破窗逃生
□ 灭火器：防范火灾
□ 防水胶带：临时修补

五、重要物品
□ 身份证件：密封防水保存
□ 银行卡和现金：应急使用
□ 房产证、保险单等
□ 家庭通讯录
□ 电子设备充电线

六、储存建议
1. 定期检查物资有效期
2. 分类打包，便于取用
3. 存放在易于携带的位置
4. 制作物资清单标签
5. 每半年更新一次',
    '/images/flood-guide-4.jpg',
    1,
    '家庭、社区',
    '物资,储备,清单,准备',
    298,
    85,
    4,
    1,
    1,
    NOW(),
    0,
    NOW(),
    NOW()
);

-- 5. 洪水预警信号解读
INSERT INTO hf_flood_guide (guide_id, title, description, content, cover_image, guide_level, target_audience, tags, view_count, like_count, sort_order, is_recommend, publish_status, publish_time, is_deleted, create_time, update_time)
VALUES (
    'guide_005',
    '洪水预警信号解读',
    '详细解读各级洪水预警信号的含义、发布条件和相应的防范措施，帮助公众正确理解预警信息。',
    '一、预警级别说明
洪水预警分为四级：
Ⅰ级（红色）- 特别严重
Ⅱ级（橙色）- 严重
Ⅲ级（黄色）- 较重
Ⅳ级（蓝色）- 一般

二、各级预警含义

【蓝色预警】
发布条件：
- 江河水位接近警戒水位
- 降雨持续，可能发生洪涝
应对措施：
- 关注水情和气象信息
- 检查防汛物资和设备
- 做好应急准备
- 加强值班巡查

【黄色预警】
发布条件：
- 江河水位达到或超过警戒水位
- 部分地区可能发生洪涝灾害
应对措施：
- 24小时值班监测
- 检查重点防洪工程
- 转移危险区域人员
- 准备启动应急预案

【橙色预警】
发布条件：
- 江河水位明显超过警戒水位
- 多个地区发生严重洪涝
应对措施：
- 启动应急预案
- 组织大规模人员转移
- 紧急抢险救援
- 调配应急物资

【红色预警】
发布条件：
- 江河水位超过保证水位
- 发生特大洪水
- 威胁人民生命财产安全
应对措施：
- 启动最高级别应急响应
- 全面转移危险区域人员
- 实施交通管制
- 调动一切力量抢险救灾

三、公众应对要点
1. 及时接收预警信息
2. 根据预警级别采取相应措施
3. 服从政府和相关部门指挥
4. 不信谣、不传谣
5. 做好自我防护和家庭准备',
    '/images/flood-guide-5.jpg',
    2,
    '所有公众',
    '预警,信号,解读,应对',
    523,
    156,
    5,
    1,
    1,
    NOW(),
    0,
    NOW(),
    NOW()
);

-- 6. 防汛减灾知识问答
INSERT INTO hf_flood_guide (guide_id, title, description, content, cover_image, guide_level, target_audience, tags, view_count, like_count, sort_order, is_recommend, publish_status, publish_time, is_deleted, create_time, update_time)
VALUES (
    'guide_006',
    '防汛减灾知识问答',
    '以问答形式整理常见的防汛减灾知识，涵盖预防、应对和恢复等各个阶段的关键问题。',
    'Q1: 什么是汛期？
A: 汛期是指江河水位有规律显著上涨的时期。我国汛期主要集中在5-9月，其中6-8月为主汛期。

Q2: 暴雨来临前应该做哪些准备？
A: 
- 关注天气预报和预警信息
- 检查房屋门窗是否牢固
- 清理排水管道，确保畅通
- 准备应急物资和食品
- 将贵重物品转移到高处

Q3: 被洪水围困时如何求救？
A: 
- 立即拨打110、119或12345求救
- 通过手电筒、哨子等发出信号
- 挥动鲜艳衣物引起注意
- 在手机有信号时发送位置信息
- 等待救援时保持冷静

Q4: 车辆涉水熄火后应该怎么办？
A: 
- 不要尝试再次启动发动机
- 立即离开车辆到安全地带
- 拨打保险公司和救援电话
- 拍照记录现场情况
- 等待专业救援

Q5: 如何判断积水路段是否安全通过？
A: 
- 观察积水深度（不超过半个车轮）
- 查看水流速度（缓慢才能通过）
- 确认路面无障碍物
- 低档匀速通过
- 如有疑虑不要强行通过

Q6: 洪水过后需要注意什么？
A: 
- 不要急于返回家中
- 检查房屋结构是否安全
- 清理淤泥和消毒
- 不饮用未经处理的水
- 警惕触电和疫病

Q7: 如何储存应急饮用水？
A: 
- 选用干净密封容器
- 使用瓶装水或煮沸的水
- 避光阴凉处保存
- 定期更换（6个月）
- 每人每天储备3升

Q8: 遇到泥石流应该怎么办？
A: 
- 向两侧高处快速撤离
- 不要顺沟向下或向上跑
- 不要躲在树上或建筑物内
- 抱紧大树等固定物
- 脱离后立即报警

Q9: 如何辨别危险区域？
A: 
- 低洼地带容易积水
- 地下空间易被淹没
- 山谷沟口有泥石流风险
- 河道岸边易被冲刷
- 老旧建筑物易倒塌

Q10: 防汛应急包应该放在哪里？
A: 
- 家中易于取用的位置
- 避免放在地下室或低处
- 所有家庭成员都知道位置
- 车内也应配备一套
- 定期检查更新',
    '/images/flood-guide-6.jpg',
    1,
    '所有公众',
    '知识,问答,防汛,减灾',
    367,
    94,
    6,
    1,
    1,
    NOW(),
    0,
    NOW(),
    NOW()
);

-- =====================================================
-- 插入知识资源数据
-- =====================================================

-- 1. 防汛应急手册
INSERT INTO hf_knowledge_resource (resource_id, category_id, title, description, file_url, file_type, file_size, cover_image, uploader_id, uploader_name, tags, download_count, view_count, is_recommend, publish_status, publish_time, is_deleted, create_time, update_time)
VALUES (
    'resource_001',
    0,
    '防汛应急手册',
    '全面的防汛应急指南，包含预警信息解读、安全避险、自救互救等内容，适合家庭和社区使用。涵盖了暴雨、洪水、内涝等各类灾害的应对措施。',
    '/resources/flood-emergency-manual.pdf',
    'PDF',
    2621440,
    '/images/resource-1.jpg',
    1,
    '系统管理员',
    '防汛,应急,手册,指南',
    3245,
    4567,
    1,
    1,
    NOW(),
    0,
    NOW(),
    NOW()
);

-- 2. 暴雨灾害防范宣传海报
INSERT INTO hf_knowledge_resource (resource_id, category_id, title, description, file_url, file_type, file_size, cover_image, uploader_id, uploader_name, tags, download_count, view_count, is_recommend, publish_status, publish_time, is_deleted, create_time, update_time)
VALUES (
    'resource_002',
    0,
    '暴雨灾害防范宣传海报',
    '一套高清暴雨灾害防范宣传海报，包含安全知识、应急措施、求救方式等内容，适合学校、社区和公共场所张贴，提高公众防灾意识。',
    '/resources/rain-disaster-posters.zip',
    'ZIP',
    15728640,
    '/images/resource-2.jpg',
    1,
    '系统管理员',
    '暴雨,宣传,海报,防范',
    1876,
    2345,
    1,
    1,
    NOW(),
    0,
    NOW(),
    NOW()
);

-- 3. 水情监测数据分析工具
INSERT INTO hf_knowledge_resource (resource_id, category_id, title, description, file_url, file_type, file_size, cover_image, uploader_id, uploader_name, tags, download_count, view_count, is_recommend, publish_status, publish_time, is_deleted, create_time, update_time)
VALUES (
    'resource_003',
    0,
    '水情监测数据分析工具',
    '用于分析和可视化水情监测数据的专业工具软件，支持多种数据格式和分析方法，提供实时监测、历史数据对比、趋势预测等功能，适合专业人员使用。',
    '/resources/water-monitoring-tool.exe',
    'EXE',
    47185920,
    '/images/resource-3.jpg',
    1,
    '系统管理员',
    '水情,监测,分析,工具',
    985,
    1523,
    0,
    1,
    NOW(),
    0,
    NOW(),
    NOW()
);

-- 4. 防汛知识PPT模板
INSERT INTO hf_knowledge_resource (resource_id, category_id, title, description, file_url, file_type, file_size, cover_image, uploader_id, uploader_name, tags, download_count, view_count, is_recommend, publish_status, publish_time, is_deleted, create_time, update_time)
VALUES (
    'resource_004',
    0,
    '防汛知识PPT模板',
    '一套精美的防汛知识PPT模板，包含多种主题和版式，涵盖防汛基础知识、应急措施、案例分析等内容框架，适合教育培训和宣传活动使用。',
    '/resources/flood-prevention-ppt.pptx',
    'PPTX',
    8388608,
    '/images/resource-4.jpg',
    1,
    '系统管理员',
    '防汛,PPT,模板,培训',
    2134,
    3012,
    1,
    1,
    NOW(),
    0,
    NOW(),
    NOW()
);

-- 5. 城市内涝风险评估手册
INSERT INTO hf_knowledge_resource (resource_id, category_id, title, description, file_url, file_type, file_size, cover_image, uploader_id, uploader_name, tags, download_count, view_count, is_recommend, publish_status, publish_time, is_deleted, create_time, update_time)
VALUES (
    'resource_005',
    0,
    '城市内涝风险评估手册',
    '详细介绍城市内涝风险评估的方法、指标体系和评估流程，包含案例分析和实施指南，适合城市规划和防灾减灾工作参考使用。',
    '/resources/urban-flooding-assessment.pdf',
    'PDF',
    4404019,
    '/images/resource-5.jpg',
    1,
    '系统管理员',
    '内涝,风险评估,城市规划',
    1245,
    1876,
    1,
    1,
    NOW(),
    0,
    NOW(),
    NOW()
);

-- 6. 水资源保护教育视频集
INSERT INTO hf_knowledge_resource (resource_id, category_id, title, description, file_url, file_type, file_size, cover_image, uploader_id, uploader_name, tags, download_count, view_count, is_recommend, publish_status, publish_time, is_deleted, create_time, update_time)
VALUES (
    'resource_006',
    0,
    '水资源保护教育视频集',
    '一套水资源保护主题的教育视频，内容包括水资源现状、保护措施、节约用水等，画面精美，讲解生动，适合学校环保教育和公众宣传活动使用。',
    '/resources/water-protection-videos.mp4',
    'MP4',
    681574400,
    '/images/resource-6.jpg',
    1,
    '系统管理员',
    '水资源,保护,教育,视频',
    756,
    1234,
    0,
    1,
    NOW(),
    0,
    NOW(),
    NOW()
);

COMMIT;
