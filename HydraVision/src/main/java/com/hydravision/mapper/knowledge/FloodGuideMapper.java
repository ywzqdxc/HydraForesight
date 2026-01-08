package com.hydravision.mapper.knowledge;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.hydravision.entity.knowledge.FloodGuide;
import org.apache.ibatis.annotations.Mapper;

/**
 * 防汛指南Mapper接口
 */
@Mapper
public interface FloodGuideMapper extends BaseMapper<FloodGuide> {
}
