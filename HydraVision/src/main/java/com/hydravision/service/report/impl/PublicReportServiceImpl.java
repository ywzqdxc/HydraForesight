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
import com.hydravision.dto.report.ReportProcessDTO;
import com.hydravision.dto.report.ReportQueryDTO;
import com.hydravision.dto.report.ReportVerifyDTO;
import com.hydravision.entity.report.PublicReport;
import com.hydravision.entity.report.ReportProcess;
import com.hydravision.entity.user.Department;
import com.hydravision.entity.user.User;
import com.hydravision.mapper.report.PublicReportMapper;
import com.hydravision.mapper.report.ReportProcessMapper;
import com.hydravision.mapper.user.DepartmentMapper;
import com.hydravision.mapper.user.UserMapper;
import com.hydravision.security.SecurityUtils;
import com.hydravision.service.report.PublicReportService;
import com.hydravision.vo.report.PublicReportVO;
import com.hydravision.vo.report.ReportProcessVO;
import com.hydravision.vo.report.ReportStatisticsVO;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private ReportProcessMapper processMapper;
    
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private DepartmentMapper departmentMapper;

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
    @Transactional(rollbackFor = Exception.class)
    public void processReportWithRecord(ReportProcessDTO dto) {
        PublicReport report = baseMapper.selectById(dto.getReportId());
        if (report == null) {
            throw new BusinessException(ResultCode.REPORT_NOT_FOUND);
        }

        // 获取当前用户信息
        Long userId = SecurityUtils.getCurrentUserId();
        User user = userMapper.selectById(userId);
        
        String deptName = "";
        if (user != null && user.getDeptId() != null) {
            Department dept = departmentMapper.selectById(user.getDeptId());
            if (dept != null) {
                deptName = dept.getDeptName();
            }
        }
        
        // 更新上报状态
        if (dto.getProcessStatus() != null) {
            report.setProcessStatus(dto.getProcessStatus());
            // 如果完成处理，自动核实
            if (dto.getProcessStatus() == 2) {
                report.setVerifyStatus(1);
                report.setVerifyTime(LocalDateTime.now());
                report.setVerifierId(userId);
                report.setVerifierName(user != null ? user.getRealName() : "");
            }
        }
        baseMapper.updateById(report);

        // 创建处理记录
        ReportProcess process = new ReportProcess();
        process.setReportId(dto.getReportId());
        process.setProcessType(dto.getProcessType());
        process.setProcessContent(dto.getProcessContent());
        process.setProcessorId(userId);
        process.setProcessorName(user != null ? user.getRealName() : "");
        process.setProcessorDept(deptName);
        process.setProcessTime(LocalDateTime.now());
        processMapper.insert(process);
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

    @Override
    public List<ReportProcessVO> getProcessRecords(Long reportId) {
        List<ReportProcess> processes = processMapper.selectByReportId(reportId);
        return processes.stream().map(this::convertProcessToVO).collect(Collectors.toList());
    }

    private PublicReportVO convertToVO(PublicReport report) {
        PublicReportVO vo = new PublicReportVO();
        BeanUtil.copyProperties(report, vo);
        return vo;
    }

    private ReportProcessVO convertProcessToVO(ReportProcess process) {
        ReportProcessVO vo = new ReportProcessVO();
        vo.setId(process.getId());
        vo.setReportId(process.getReportId());
        vo.setProcessType(process.getProcessType());
        vo.setProcessTypeName(getProcessTypeName(process.getProcessType()));
        vo.setProcessContent(process.getProcessContent());
        vo.setProcessorName(process.getProcessorName());
        vo.setProcessorDept(process.getProcessorDept());
        vo.setProcessTime(process.getProcessTime());
        return vo;
    }

    private String getProcessTypeName(Integer type) {
        if (type == null) return "";
        switch (type) {
            case 1: return "接收";
            case 2: return "派单";
            case 3: return "现场处理";
            case 4: return "完成";
            case 5: return "回访";
            default: return "";
        }
    }
}
