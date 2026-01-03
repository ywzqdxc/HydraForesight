package com.hydravision.service.region;

import com.baomidou.mybatisplus.extension.service.IService;
import com.hydravision.common.result.PageResult;
import com.hydravision.entity.region.MonitorArea;
import com.hydravision.vo.region.MonitorAreaVO;

import java.util.List;

/**
 * 监测区域服务接口
 */
public interface MonitorAreaService extends IService<MonitorArea> {

    /**
     * 获取所有监测区域
     */
    List<MonitorAreaVO> getAllAreas();

    /**
     * 根据ID获取监测区域
     */
    MonitorAreaVO getAreaDetail(Long id);

    /**
     * 根据编码获取监测区域
     */
    MonitorAreaVO getAreaByCode(String areaCode);

    /**
     * 分页查询监测区域
     */
    PageResult<MonitorAreaVO> pageAreas(Integer current, Integer size);
}
