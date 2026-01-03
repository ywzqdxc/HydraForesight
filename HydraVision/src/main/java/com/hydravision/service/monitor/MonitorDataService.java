package com.hydravision.service.monitor;

import com.hydravision.common.result.PageResult;
import com.hydravision.vo.monitor.DashboardDataVO;
import com.hydravision.vo.monitor.RainfallDataVO;
import com.hydravision.vo.monitor.RainfallStatisticsVO;

import java.time.LocalDate;
import java.util.List;

/**
 * 监测数据服务接口
 */
public interface MonitorDataService {

    /**
     * 获取仪表盘数据
     */
    DashboardDataVO getDashboardData();

    /**
     * 获取最新降水数据
     */
    List<RainfallDataVO> getLatestRainfallData(Integer limit);

    /**
     * 获取区域降水数据
     */
    List<RainfallDataVO> getAreaRainfallData(Long areaId, LocalDate startDate, LocalDate endDate);

    /**
     * 获取降水统计数据
     */
    RainfallStatisticsVO getRainfallStatistics(Long areaId, Integer days);

    /**
     * 分页查询降水数据
     */
    PageResult<RainfallDataVO> pageRainfallData(Long areaId, Integer current, Integer size);
}
