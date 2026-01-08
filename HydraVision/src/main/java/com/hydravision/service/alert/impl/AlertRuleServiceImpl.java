package com.hydravision.service.alert.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hydravision.common.exception.BusinessException;
import com.hydravision.common.result.PageResult;
import com.hydravision.dto.alert.AlertRuleDTO;
import com.hydravision.entity.alert.AlertRule;
import com.hydravision.mapper.alert.AlertRuleMapper;
import com.hydravision.service.alert.AlertRuleService;
import com.hydravision.vo.alert.AlertRuleVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 预警规则服务实现类
 */
@Service
public class AlertRuleServiceImpl extends ServiceImpl<AlertRuleMapper, AlertRule> implements AlertRuleService {

    private static final String[] RULE_TYPE_NAMES = {"", "降水预警", "水位预警", "内涝预警", "设备预警"};
    private static final String[] ALERT_LEVEL_NAMES = {"", "蓝色", "黄色", "橙色", "红色"};

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long createRule(AlertRuleDTO dto) {
        // 检查规则编码是否重复
        LambdaQueryWrapper<AlertRule> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(AlertRule::getRuleCode, dto.getRuleCode());
        if (baseMapper.selectCount(wrapper) > 0) {
            throw new BusinessException("规则编码已存在");
        }

        AlertRule rule = new AlertRule();
        BeanUtil.copyProperties(dto, rule);
        if (rule.getStatus() == null) {
            rule.setStatus(1); // 默认启用
        }
        baseMapper.insert(rule);
        return rule.getId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateRule(AlertRuleDTO dto) {
        if (dto.getId() == null) {
            throw new BusinessException("规则ID不能为空");
        }
        AlertRule rule = baseMapper.selectById(dto.getId());
        if (rule == null) {
            throw new BusinessException("规则不存在");
        }
        BeanUtil.copyProperties(dto, rule);
        baseMapper.updateById(rule);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteRule(Long id) {
        AlertRule rule = baseMapper.selectById(id);
        if (rule == null) {
            throw new BusinessException("规则不存在");
        }
        baseMapper.deleteById(id);
    }

    @Override
    public AlertRuleVO getRuleDetail(Long id) {
        AlertRule rule = baseMapper.selectById(id);
        if (rule == null) {
            throw new BusinessException("规则不存在");
        }
        return convertToVO(rule);
    }

    @Override
    public PageResult<AlertRuleVO> pageRules(Integer ruleType, Integer alertLevel, Integer status, Integer current, Integer size) {
        LambdaQueryWrapper<AlertRule> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ruleType != null, AlertRule::getRuleType, ruleType)
                .eq(alertLevel != null, AlertRule::getAlertLevel, alertLevel)
                .eq(status != null, AlertRule::getStatus, status)
                .orderByDesc(AlertRule::getCreateTime);

        IPage<AlertRule> page = baseMapper.selectPage(new Page<>(current, size), wrapper);
        List<AlertRuleVO> voList = page.getRecords().stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());

        return PageResult.of(page.getCurrent(), page.getSize(), page.getTotal(), voList);
    }

    @Override
    public List<AlertRuleVO> getEnabledRules() {
        LambdaQueryWrapper<AlertRule> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(AlertRule::getStatus, 1)
                .orderByAsc(AlertRule::getPriority);
        return baseMapper.selectList(wrapper).stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void toggleRuleStatus(Long id, Integer status) {
        AlertRule rule = baseMapper.selectById(id);
        if (rule == null) {
            throw new BusinessException("规则不存在");
        }
        rule.setStatus(status);
        baseMapper.updateById(rule);
    }

    private AlertRuleVO convertToVO(AlertRule rule) {
        AlertRuleVO vo = new AlertRuleVO();
        BeanUtil.copyProperties(rule, vo);
        if (rule.getRuleType() != null && rule.getRuleType() < RULE_TYPE_NAMES.length) {
            vo.setRuleTypeName(RULE_TYPE_NAMES[rule.getRuleType()]);
        }
        if (rule.getAlertLevel() != null && rule.getAlertLevel() < ALERT_LEVEL_NAMES.length) {
            vo.setAlertLevelName(ALERT_LEVEL_NAMES[rule.getAlertLevel()]);
        }
        return vo;
    }
}
