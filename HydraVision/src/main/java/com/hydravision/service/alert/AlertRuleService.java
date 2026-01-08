package com.hydravision.service.alert;

import com.baomidou.mybatisplus.extension.service.IService;
import com.hydravision.common.result.PageResult;
import com.hydravision.dto.alert.AlertRuleDTO;
import com.hydravision.entity.alert.AlertRule;
import com.hydravision.vo.alert.AlertRuleVO;

import java.util.List;

/**
 * 预警规则服务接口
 */
public interface AlertRuleService extends IService<AlertRule> {

    /**
     * 创建预警规则
     */
    Long createRule(AlertRuleDTO dto);

    /**
     * 更新预警规则
     */
    void updateRule(AlertRuleDTO dto);

    /**
     * 删除预警规则
     */
    void deleteRule(Long id);

    /**
     * 获取预警规则详情
     */
    AlertRuleVO getRuleDetail(Long id);

    /**
     * 分页查询预警规则
     */
    PageResult<AlertRuleVO> pageRules(Integer ruleType, Integer alertLevel, Integer status, Integer current, Integer size);

    /**
     * 获取所有启用的预警规则
     */
    List<AlertRuleVO> getEnabledRules();

    /**
     * 启用/禁用预警规则
     */
    void toggleRuleStatus(Long id, Integer status);
}
