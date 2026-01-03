package com.hydravision.service.report.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.IdUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hydravision.common.exception.BusinessException;
import com.hydravision.common.result.PageResult;
import com.hydravision.common.result.ResultCode;
import com.hydravision.dto.report.ReportCreateDTO;
import com.hydravision.dto.report.ReportQueryDTO;
import com.hydravision.dto.report.ReportVerifyDTO;
import com.hydravision.entity.report.PublicReport;
import com.hydravision.mapper.report.PublicReportMapper;
import com.hydravision.service.report.PublicReportService;
import com.hydravision.vo.report.PublicReportVO;
import com.hydravision.vo.report.ReportStatisticsVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 公众上报服务实现类
 */
@Service
public class PublicReportServiceImpl extends ServiceImpl<PublicReportMapper, PublicReport> implements PublicReportService {

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long createReport(ReportCreateDTO dto) {
        PublicReport report = new PublicReport();
        BeanUtil.copyProperties(dto, report);
        report.setReportId("RPT" + IdUtil.getSnowflakeNextIdStr());
        report.setReportTime(LocalDateTime.now());
        report.setVerifyStatus(0);
        report.setProcessStatus(0);
        report.setUpvoteCount(0);
        report.setViewCount(0);
        report.setIsPublic(1);

        baseMapper.insert(report);
        return report.getId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void verifyReport(ReportVerifyDTO dto) {
        PublicReport report = baseMapper.selectById(dto.getId());
        if (report == null) {
            throw new BusinessException(ResultCode.REPORT_NOT_FOUND);
        }

        report.setVerifyStatus(dto.getVerifyStatus());
        report.setVerifyTime(LocalDateTime.now());
        report.setVerifierId(dto.getVerifierId());
        report.setVerifierName(dto.getVerifierName());
        report.setVerifyRemark(dto.getVerifyRemark());

        baseMapper.updateById(report);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void processReport(Long id, String result) {
        PublicReport report = baseMapper.selectById(id);
        if (report == null) {
            throw new BusinessException(ResultCode.REPORT_NOT_FOUND);
        }

        report.setProcessStatus(2); // 已处理
        report.setProcessResult(result);
        baseMapper.updateById(report);
    }

    @Override
    public PublicReportVO getReportDetail(Long id) {
        PublicReport report = baseMapper.selectById(id);
        if (report == null) {
            throw new BusinessException(ResultCode.REPORT_NOT_FOUND);
        }

        // 增加浏览次数
        LambdaUpdateWrapper<PublicReport> updateWrapper = new LambdaUpdateWrapper<>();
        updateWrapper.eq(PublicReport::getId, id)
                .setSql("view_count = view_count + 1");
        baseMapper.update(null, updateWrapper);

        return convertToVO(report);
    }

    @Override
    public PageResult<PublicReportVO> pageReports(ReportQueryDTO query) {
        LambdaQueryWrapper<PublicReport> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(query.getReportType() != null, PublicReport::getReportType, query.getReportType())
                .eq(query.getSeverity() != null, PublicReport::getSeverity, query.getSeverity())
                .eq(query.getVerifyStatus() != null, PublicReport::getVerifyStatus, query.getVerifyStatus())
                .eq(query.getProcessStatus() != null, PublicReport::getProcessStatus, query.getProcessStatus())
                .like(StringUtils.hasText(query.getKeyword()), PublicReport::getTitle, query.getKeyword())
                .ge(query.getStartTime() != null, PublicReport::getReportTime, query.getStartTime())
                .le(query.getEndTime() != null, PublicReport::getReportTime, query.getEndTime())
                .orderByDesc(PublicReport::getCreateTime);

        IPage<PublicReport> page = baseMapper.selectPage(
                new Page<>(query.getCurrent(), query.getSize()),
                wrapper
        );

        List<PublicReportVO> voList = page.getRecords().stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());

        return PageResult.of(page.getCurrent(), page.getSize(), page.getTotal(), voList);
    }

    @Override
    public List<PublicReportVO> getLatestReports(Integer limit) {
        return baseMapper.selectLatestReports(limit).stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
    }

    @Override
    public ReportStatisticsVO getStatistics() {
        ReportStatisticsVO vo = new ReportStatisticsVO();

        // 总上报数
        vo.setTotalCount(baseMapper.selectCount(null));

        // 各类型统计
        List<Map<String, Object>> typeStats = baseMapper.countByType();
        vo.setTypeStatistics(typeStats);

        // 各处理状态统计
        List<Map<String, Object>> statusStats = baseMapper.countByProcessStatus();
        Map<Integer, Long> statusMap = new HashMap<>();
        for (Map<String, Object> stat : statusStats) {
            Integer status = ((Number) stat.get("processStatus")).intValue();
            Long count = ((Number) stat.get("count")).longValue();
            statusMap.put(status, count);
        }
        vo.setPendingCount(statusMap.getOrDefault(0, 0L));
        vo.setProcessingCount(statusMap.getOrDefault(1, 0L));
        vo.setProcessedCount(statusMap.getOrDefault(2, 0L));

        return vo;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void upvoteReport(Long id) {
        LambdaUpdateWrapper<PublicReport> updateWrapper = new LambdaUpdateWrapper<>();
        updateWrapper.eq(PublicReport::getId, id)
                .setSql("upvote_count = upvote_count + 1");
        baseMapper.update(null, updateWrapper);
    }

    private PublicReportVO convertToVO(PublicReport report) {
        PublicReportVO vo = new PublicReportVO();
        BeanUtil.copyProperties(report, vo);
        return vo;
    }
}
