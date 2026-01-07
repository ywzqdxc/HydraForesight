package com.hydravision.service.report;

import com.baomidou.mybatisplus.extension.service.IService;
import com.hydravision.common.result.PageResult;
import com.hydravision.dto.report.ReportCreateDTO;
import com.hydravision.dto.report.ReportProcessDTO;
import com.hydravision.dto.report.ReportQueryDTO;
import com.hydravision.dto.report.ReportVerifyDTO;
import com.hydravision.entity.report.PublicReport;
import com.hydravision.vo.report.PublicReportVO;
import com.hydravision.vo.report.ReportProcessVO;
import com.hydravision.vo.report.ReportStatisticsVO;

import java.util.List;

/**
 * 公众上报服务接口
 */
public interface PublicReportService extends IService<PublicReport> {

    /**
     * 创建上报
     */
    Long createReport(ReportCreateDTO dto);

    /**
     * 核实上报
     */
    void verifyReport(ReportVerifyDTO dto);

    /**
     * 处理上报
     */
    void processReport(Long id, String result);

    /**
     * 处理上报并记录
     */
    void processReportWithRecord(ReportProcessDTO dto);

    /**
     * 获取上报详情
     */
    PublicReportVO getReportDetail(Long id);

    /**
     * 分页查询上报
     */
    PageResult<PublicReportVO> pageReports(ReportQueryDTO query);

    /**
     * 获取最新上报列表
     */
    List<PublicReportVO> getLatestReports(Integer limit);

    /**
     * 获取上报统计
     */
    ReportStatisticsVO getStatistics();

    /**
     * 点赞上报
     */
    void upvoteReport(Long id);

    /**
     * 获取处理记录
     */
    List<ReportProcessVO> getProcessRecords(Long reportId);
}
