package com.hydravision.controller.device;

import com.hydravision.common.result.PageResult;
import com.hydravision.common.result.Result;
import com.hydravision.dto.device.DeviceCreateDTO;
import com.hydravision.dto.device.DeviceQueryDTO;
import com.hydravision.dto.device.DeviceUpdateDTO;
import com.hydravision.service.device.DeviceService;
import com.hydravision.vo.device.DeviceStatisticsVO;
import com.hydravision.vo.device.DeviceVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 设备管理控制器
 */
@Tag(name = "设备管理", description = "设备相关接口")
@RestController
@RequestMapping("/device")
@RequiredArgsConstructor
public class DeviceController {

    private final DeviceService deviceService;

    @Operation(summary = "创建设备")
    @PostMapping
    public Result<Long> createDevice(@Valid @RequestBody DeviceCreateDTO dto) {
        return Result.success(deviceService.createDevice(dto));
    }

    @Operation(summary = "更新设备")
    @PutMapping
    public Result<Void> updateDevice(@Valid @RequestBody DeviceUpdateDTO dto) {
        deviceService.updateDevice(dto);
        return Result.success();
    }

    @Operation(summary = "删除设备")
    @DeleteMapping("/{id}")
    public Result<Void> deleteDevice(@Parameter(description = "设备ID") @PathVariable Long id) {
        deviceService.deleteDevice(id);
        return Result.success();
    }

    @Operation(summary = "获取设备详情")
    @GetMapping("/{id}")
    public Result<DeviceVO> getDeviceDetail(@Parameter(description = "设备ID") @PathVariable Long id) {
        return Result.success(deviceService.getDeviceDetail(id));
    }

    @Operation(summary = "分页查询设备")
    @GetMapping("/page")
    public Result<PageResult<DeviceVO>> pageDevices(DeviceQueryDTO query) {
        return Result.success(deviceService.pageDevices(query));
    }

    @Operation(summary = "获取设备统计")
    @GetMapping("/statistics")
    public Result<DeviceStatisticsVO> getStatistics() {
        return Result.success(deviceService.getStatistics());
    }

    @Operation(summary = "获取在线设备列表")
    @GetMapping("/online")
    public Result<List<DeviceVO>> getOnlineDevices() {
        return Result.success(deviceService.getOnlineDevices());
    }

    @Operation(summary = "更新设备状态")
    @PutMapping("/{id}/status/{status}")
    public Result<Void> updateDeviceStatus(
            @Parameter(description = "设备ID") @PathVariable Long id,
            @Parameter(description = "状态") @PathVariable Integer status) {
        deviceService.updateDeviceStatus(id, status);
        return Result.success();
    }
}
