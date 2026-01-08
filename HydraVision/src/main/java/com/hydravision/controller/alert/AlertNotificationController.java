package com.hydravision.controller.alert;

import com.hydravision.common.result.PageResult;
import com.hydravision.common.result.Result;
import com.hydravision.dto.alert.AlertNotificationDTO;
import com.hydravision.security.SecurityUtils;
import com.hydravision.service.alert.AlertNotificationService;
import com.hydravision.vo.alert.AlertNotificationVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 预警通知管理控制器
 */
@Tag(name = "预警通知管理", description = "预警通知相关接口")
@RestController
@RequestMapping("/alert/notification")
@RequiredArgsConstructor
public class AlertNotificationController {

    private final AlertNotificationService alertNotificationService;

    @Operation(summary = "创建并发送预警通知")
    @PostMapping
    public Result<Long> createAndSendNotification(@Valid @RequestBody AlertNotificationDTO dto) {
        Long userId = SecurityUtils.getCurrentUserId();
        String username = SecurityUtils.getCurrentUsername();
        return Result.success(alertNotificationService.createAndSendNotification(dto, userId, username));
    }

    @Operation(summary = "撤销预警通知")
    @PutMapping("/{id}/revoke")
    public Result<Void> revokeNotification(@Parameter(description = "通知ID") @PathVariable Long id) {
        alertNotificationService.revokeNotification(id);
        return Result.success();
    }

    @Operation(summary = "获取首页横幅通知")
    @GetMapping("/banner")
    public Result<AlertNotificationVO> getBannerNotification() {
        return Result.success(alertNotificationService.getBannerNotification());
    }

    @Operation(summary = "获取所有有效的首页横幅通知")
    @GetMapping("/banner/list")
    public Result<List<AlertNotificationVO>> getActiveBannerNotifications() {
        return Result.success(alertNotificationService.getActiveBannerNotifications());
    }

    @Operation(summary = "分页查询预警通知记录")
    @GetMapping("/page")
    public Result<PageResult<AlertNotificationVO>> pageNotifications(
            @Parameter(description = "通知渠道") @RequestParam(required = false) Integer notifyChannel,
            @Parameter(description = "发送状态") @RequestParam(required = false) Integer sendStatus,
            @Parameter(description = "当前页") @RequestParam(defaultValue = "1") Integer current,
            @Parameter(description = "每页数量") @RequestParam(defaultValue = "10") Integer size) {
        return Result.success(alertNotificationService.pageNotifications(notifyChannel, sendStatus, current, size));
    }

    @Operation(summary = "获取通知详情")
    @GetMapping("/{id}")
    public Result<AlertNotificationVO> getNotificationDetail(@Parameter(description = "通知ID") @PathVariable Long id) {
        return Result.success(alertNotificationService.getNotificationDetail(id));
    }

    @Operation(summary = "标记通知为已读")
    @PutMapping("/{id}/read")
    public Result<Void> markAsRead(@Parameter(description = "通知ID") @PathVariable Long id) {
        alertNotificationService.markAsRead(id);
        return Result.success();
    }
}
