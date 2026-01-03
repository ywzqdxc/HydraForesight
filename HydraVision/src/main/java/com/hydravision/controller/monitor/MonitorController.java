package com.hydravision.controller.monitor;

import com.hydravision.common.result.PageResult;
import com.hydravision.common.result.Result;
import com.hydravision.service.monitor.MonitorDataService;
import com.hydravision.service.region.MonitorAreaService;
import com.hydravision.vo.monitor.DashboardDataVO;
import com.hydravision.vo.monitor.RainfallDataVO;
import com.hydravision.vo.monitor.RainfallStatisticsVO;
import com.hydravision.vo.region.MonitorAreaVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

/**
 * 监测数据控制器
 */
@Tag(name = "监测数据", description = "监测数据相关接口")
@RestController
@RequestMapping("/monitor")
@RequiredArgsConstructor
public class MonitorController {

    private final MonitorDataService monitorDataService;
    private final MonitorAreaService monitorAreaService;

    @Operation(summary = "获取仪表盘数据")
    @GetMapping("/dashboard")
    public Result<DashboardDataVO> getDashboardData() {
        return Result.success(monitorDataService.getDashboardData());
    }

    @Operation(summary = "获取所有监测区域")
    @GetMapping("/areas")
    public Result<List<MonitorAreaVO>> getAllAreas() {
        return Result.success(monitorAreaService.getAllAreas());
    }

    @Operation(summary = "获取监测区域详情")
    @GetMapping("/areas/{id}")
    public Result<MonitorAreaVO> getAreaDetail(@Parameter(description = "区域ID") @PathVariable Long id) {
        return Result.success(monitorAreaService.getAreaDetail(id));
    }

    @Operation(summary = "根据编码获取监测区域")
    @GetMapping("/areas/code/{areaCode}")
    public Result<MonitorAreaVO> getAreaByCode(@Parameter(description = "区域编码") @PathVariable String areaCode) {
        return Result.success(monitorAreaService.getAreaByCode(areaCode));
    }

    @Operation(summary = "获取最新降水数据")
    @GetMapping("/rainfall/latest")
    public Result<List<RainfallDataVO>> getLatestRainfallData(
            @Parameter(description = "数量限制") @RequestParam(defaultValue = "10") Integer limit) {
        return Result.success(monitorDataService.getLatestRainfallData(limit));
    }

    @Operation(summary = "获取区域降水数据")
    @GetMapping("/rainfall/area/{areaId}")
    public Result<List<RainfallDataVO>> getAreaRainfallData(
            @Parameter(description = "区域ID") @PathVariable Long areaId,
            @Parameter(description = "开始日期") @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @Parameter(description = "结束日期") @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        return Result.success(monitorDataService.getAreaRainfallData(areaId, startDate, endDate));
    }

    @Operation(summary = "获取降水统计数据")
    @GetMapping("/rainfall/statistics")
    public Result<RainfallStatisticsVO> getRainfallStatistics(
            @Parameter(description = "区域ID") @RequestParam(required = false) Long areaId,
            @Parameter(description = "统计天数") @RequestParam(defaultValue = "7") Integer days) {
        return Result.success(monitorDataService.getRainfallStatistics(areaId, days));
    }

    @Operation(summary = "分页查询降水数据")
    @GetMapping("/rainfall/page")
    public Result<PageResult<RainfallDataVO>> pageRainfallData(
            @Parameter(description = "区域ID") @RequestParam(required = false) Long areaId,
            @Parameter(description = "当前页") @RequestParam(defaultValue = "1") Integer current,
            @Parameter(description = "每页数量") @RequestParam(defaultValue = "10") Integer size) {
        return Result.success(monitorDataService.pageRainfallData(areaId, current, size));
    }
}
