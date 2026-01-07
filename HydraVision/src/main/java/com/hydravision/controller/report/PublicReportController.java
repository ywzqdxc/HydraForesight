package com.hydravision.controller.report;

import com.hydravision.common.result.PageResult;
import com.hydravision.common.result.Result;
import com.hydravision.dto.report.ReportCreateDTO;
import com.hydravision.dto.report.ReportProcessDTO;
import com.hydravision.dto.report.ReportQueryDTO;
import com.hydravision.dto.report.ReportVerifyDTO;
import com.hydravision.service.report.PublicReportService;
import com.hydravision.vo.report.PublicReportVO;
import com.hydravision.vo.report.ReportProcessVO;
import com.hydravision.vo.report.ReportStatisticsVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 公众上报控制器
 */
@Tag(name = "公众上报", description = "公众上报相关接口")
@RestController
@RequestMapping("/report")
@RequiredArgsConstructor
public class PublicReportController {

    private final PublicReportService reportService;

    @Operation(summary = "提交上报")
    @PostMapping
    public Result<Long> createReport(@Valid @RequestBody ReportCreateDTO dto) {
        return Result.success(reportService.createReport(dto));
    }

    @Operation(summary = "核实上报")
    @PutMapping("/verify")
    public Result<Void> verifyReport(@Valid @RequestBody ReportVerifyDTO dto) {
        reportService.verifyReport(dto);
        return Result.success();
    }

    @Operation(summary = "处理上报")
    @PutMapping("/{id}/process")
    public Result<Void> processReport(
            @Parameter(description = "上报ID") @PathVariable Long id,
            @Parameter(description = "处理结果") @RequestParam String result) {
        reportService.processReport(id, result);
        return Result.success();
    }

    @Operation(summary = "处理上报(含处理记录)")
    @PostMapping("/process")
    public Result<Void> processReportWithRecord(@Valid @RequestBody ReportProcessDTO dto) {
        reportService.processReportWithRecord(dto);
        return Result.success();
    }

    @Operation(summary = "获取上报详情")
    @GetMapping("/{id}")
    public Result<PublicReportVO> getReportDetail(@Parameter(description = "上报ID") @PathVariable Long id) {
        return Result.success(reportService.getReportDetail(id));
    }

    @Operation(summary = "分页查询上报")
    @GetMapping("/page")
    public Result<PageResult<PublicReportVO>> pageReports(ReportQueryDTO query) {
        return Result.success(reportService.pageReports(query));
    }

    @Operation(summary = "获取最新上报列表")
    @GetMapping("/latest")
    public Result<List<PublicReportVO>> getLatestReports(
            @Parameter(description = "数量") @RequestParam(defaultValue = "10") Integer limit) {
        return Result.success(reportService.getLatestReports(limit));
    }

    @Operation(summary = "获取上报统计")
    @GetMapping("/statistics")
    public Result<ReportStatisticsVO> getStatistics() {
        return Result.success(reportService.getStatistics());
    }

    @Operation(summary = "点赞上报")
    @PostMapping("/{id}/upvote")
    public Result<Void> upvoteReport(@Parameter(description = "上报ID") @PathVariable Long id) {
        reportService.upvoteReport(id);
        return Result.success();
    }

    @Operation(summary = "获取上报处理记录")
    @GetMapping("/{id}/process")
    public Result<List<ReportProcessVO>> getProcessRecords(@Parameter(description = "上报ID") @PathVariable Long id) {
        return Result.success(reportService.getProcessRecords(id));
    }
}
