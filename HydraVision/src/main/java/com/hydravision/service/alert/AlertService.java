package com.hydravision.service.alert;

import com.baomidou.mybatisplus.extension.service.IService;
import com.hydravision.common.result.PageResult;
import com.hydravision.dto.alert.AlertCreateDTO;
import com.hydravision.dto.alert.AlertQueryDTO;
import com.hydravision.entity.alert.AlertRecord;
import com.hydravision.vo.alert.AlertRecordVO;
import com.hydravision.vo.alert.AlertStatisticsVO;

import java.util.List;

/**
 * 预警服务接口
 */
public interface AlertService extends IService<AlertRecord> {

    /**
     * 创建预警
     */
    Long createAlert(AlertCreateDTO dto);

    /**
     * 发布预警
     */
    void publishAlert(Long id);

    /**
     * 解除预警
     */
    void releaseAlert(Long id, String reason);

    /**
     * 获取预警详情
     */
    AlertRecordVO getAlertDetail(Long id);

    /**
     * 分页查询预警
     */
    PageResult<AlertRecordVO> pageAlerts(AlertQueryDTO query);

    /**
     * 获取最新预警列表
     */
    List<AlertRecordVO> getLatestAlerts(Integer limit);

    /**
     * 获取预警统计
     */
    AlertStatisticsVO getStatistics();

    /**
     * 获取当前生效的预警
     */
    List<AlertRecordVO> getActiveAlerts();
}
