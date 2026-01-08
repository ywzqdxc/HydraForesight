package com.hydravision.service.alert.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hydravision.common.exception.BusinessException;
import com.hydravision.common.result.PageResult;
import com.hydravision.dto.alert.AlertResponseDTO;
import com.hydravision.entity.alert.AlertResponse;
import com.hydravision.mapper.alert.AlertResponseMapper;
import com.hydravision.service.alert.AlertResponseService;
import com.hydravision.vo.alert.AlertResponseVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 预警响应服务实现类
 */
@Service
public class AlertResponseServiceImpl extends ServiceImpl<AlertResponseMapper, AlertResponse> implements AlertResponseService {

    private static final String[] RESPONSE_TYPE_NAMES = {"", "确认收到", "现场处置", "上报情况", "处置完成"};
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long createResponse(AlertResponseDTO dto, Long responderId, String responderName, String responderDept) {
        AlertResponse response = new AlertResponse();
        BeanUtil.copyProperties(dto, response);
        response.setResponderId(responderId);
        response.setResponderName(responderName);
        response.setResponderDept(responderDept);
        response.setResponseTime(LocalDateTime.now());
        response.setCreateTime(LocalDateTime.now());

        baseMapper.insert(response);
        return response.getId();
    }

    @Override
    public List<AlertResponseVO> getResponsesByAlertId(Long alertRecordId) {
        LambdaQueryWrapper<AlertResponse> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(AlertResponse::getAlertRecordId, alertRecordId)
                .orderByDesc(AlertResponse::getResponseTime);
        return baseMapper.selectList(wrapper).stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
    }

    @Override
    public PageResult<AlertResponseVO> pageResponses(Long alertRecordId, Integer responseType, Integer current, Integer size) {
        LambdaQueryWrapper<AlertResponse> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(alertRecordId != null, AlertResponse::getAlertRecordId, alertRecordId)
                .eq(responseType != null, AlertResponse::getResponseType, responseType)
                .orderByDesc(AlertResponse::getResponseTime);

        IPage<AlertResponse> page = baseMapper.selectPage(new Page<>(current, size), wrapper);
        List<AlertResponseVO> voList = page.getRecords().stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());

        return PageResult.of(page.getCurrent(), page.getSize(), page.getTotal(), voList);
    }

    @Override
    public AlertResponseVO getResponseDetail(Long id) {
        AlertResponse response = baseMapper.selectById(id);
        if (response == null) {
            throw new BusinessException("响应记录不存在");
        }
        return convertToVO(response);
    }

    private AlertResponseVO convertToVO(AlertResponse response) {
        AlertResponseVO vo = new AlertResponseVO();
        BeanUtil.copyProperties(response, vo);

        if (response.getResponseType() != null && response.getResponseType() < RESPONSE_TYPE_NAMES.length) {
            vo.setResponseTypeName(RESPONSE_TYPE_NAMES[response.getResponseType()]);
        }

        // 解析附件JSON
        if (response.getAttachmentUrls() != null && !response.getAttachmentUrls().isEmpty()) {
            try {
                List<Map<String, Object>> attachments = objectMapper.readValue(
                        response.getAttachmentUrls(),
                        new TypeReference<List<Map<String, Object>>>() {}
                );
                vo.setAttachments(attachments);
            } catch (Exception e) {
                vo.setAttachments(new ArrayList<>());
            }
        }

        return vo;
    }
}
