package com.hydravision.service.alert;

import com.baomidou.mybatisplus.extension.service.IService;
import com.hydravision.common.result.PageResult;
import com.hydravision.dto.alert.AlertResponseDTO;
import com.hydravision.entity.alert.AlertResponse;
import com.hydravision.vo.alert.AlertResponseVO;

import java.util.List;

/**
 * 预警响应服务接口
 */
public interface AlertResponseService extends IService<AlertResponse> {

    /**
     * 创建预警响应
     */
    Long createResponse(AlertResponseDTO dto, Long responderId, String responderName, String responderDept);

    /**
     * 获取预警的所有响应记录
     */
    List<AlertResponseVO> getResponsesByAlertId(Long alertRecordId);

    /**
     * 分页查询响应记录
     */
    PageResult<AlertResponseVO> pageResponses(Long alertRecordId, Integer responseType, Integer current, Integer size);

    /**
     * 获取响应详情
     */
    AlertResponseVO getResponseDetail(Long id);
}
