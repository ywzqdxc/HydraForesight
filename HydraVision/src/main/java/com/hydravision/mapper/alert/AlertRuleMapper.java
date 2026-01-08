package com.hydravision.mapper.alert;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.hydravision.entity.alert.AlertRule;
import org.apache.ibatis.annotations.Mapper;

/**
 * 预警规则Mapper接口
 */
@Mapper
public interface AlertRuleMapper extends BaseMapper<AlertRule> {
}
