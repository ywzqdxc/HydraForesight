/**
 * 预警相关API
 */
import { apiClient, type ApiResponse, type PageResult } from "./request"

// 预警记录接口
export interface AlertRecord {
  id: number
  alertId: string
  ruleId?: number
  alertType: number
  alertLevel: number
  areaId?: number
  areaName: string
  title: string
  content: string
  triggerValue?: number
  triggerTime: string
  publishTime?: string
  expectedEndTime?: string
  actualEndTime?: string
  status: number
  publisherId?: number
  publisherName?: string
  releaseReason?: string
  isPublic?: number
  viewCount: number
  createTime: string
}

// 预警规则接口
export interface AlertRule {
  id: number
  ruleCode: string
  ruleName: string
  ruleType: number
  ruleTypeName?: string
  areaId?: number
  areaName?: string
  alertLevel: number
  alertLevelName?: string
  conditionType?: number
  thresholdValue?: number
  thresholdUnit?: string
  durationMinutes?: number
  alertMessage?: string
  notifyChannels?: string
  isAutoRelease?: number
  releaseThreshold?: number
  priority?: number
  status: number
  createTime: string
}

// 预警通知接口
export interface AlertNotification {
  id: number
  alertRecordId: number
  alertTitle?: string
  alertLevel?: number
  alertLevelName?: string
  alertType?: number
  alertTypeName?: string
  areaName?: string
  userId?: number
  notifyChannel: number
  notifyChannelName?: string
  notifyTarget?: string
  notifyContent: string
  sendTime?: string
  sendStatus: number
  sendStatusName?: string
  isRead?: number
  createTime: string
}

// 预警响应接口
export interface AlertResponse {
  id: number
  alertRecordId: number
  responseType: number
  responseTypeName?: string
  responseContent?: string
  responderId: number
  responderName?: string
  responderDept?: string
  responseTime: string
  attachmentUrls?: string
  attachments?: Array<{
    fileName: string
    filePath: string
    fileSize: number
    fileType: string
  }>
  locationLng?: number
  locationLat?: number
  createTime: string
}

export interface AlertStatistics {
  totalCount: number
  blueCount: number
  yellowCount: number
  orangeCount: number
  redCount: number
  pendingCount: number
  publishedCount: number
  releasedCount: number
}

export interface AlertQueryParams {
  alertType?: number
  alertLevel?: number
  areaId?: number
  status?: number
  startTime?: string
  endTime?: string
  current?: number
  size?: number
}

// 预警类型映射
export const ALERT_TYPE_MAP: Record<number, string> = {
  1: "暴雨预警",
  2: "洪水预警",
  3: "内涝预警",
  4: "雷电预警",
  5: "道路积水",
}

// 预警级别映射
export const ALERT_LEVEL_MAP: Record<number, { name: string; color: string }> = {
  1: { name: "蓝色", color: "blue" },
  2: { name: "黄色", color: "yellow" },
  3: { name: "橙色", color: "orange" },
  4: { name: "红色", color: "red" },
}

// 预警状态映射
export const ALERT_STATUS_MAP: Record<number, string> = {
  0: "待发布",
  1: "已发布",
  2: "已解除",
  3: "已过期",
  4: "已取消",
}

// 响应类型映射
export const RESPONSE_TYPE_MAP: Record<number, string> = {
  1: "确认收到",
  2: "现场处置",
  3: "上报情况",
  4: "处置完成",
}

/**
 * 获取预警统计数据
 */
export async function getAlertStatistics(): Promise<ApiResponse<AlertStatistics>> {
  return apiClient.get<AlertStatistics>("/alert/statistics")
}

/**
 * 获取活跃预警列表
 */
export async function getActiveAlerts(): Promise<ApiResponse<AlertRecord[]>> {
  return apiClient.get<AlertRecord[]>("/alert/active")
}

/**
 * 获取最新预警列表
 */
export async function getLatestAlerts(limit = 10): Promise<ApiResponse<AlertRecord[]>> {
  return apiClient.get<AlertRecord[]>("/alert/latest", { limit })
}

/**
 * 分页查询预警记录
 */
export async function pageAlerts(params: AlertQueryParams): Promise<ApiResponse<PageResult<AlertRecord>>> {
  return apiClient.get<PageResult<AlertRecord>>("/alert/page", params)
}

/**
 * 获取预警详情
 */
export async function getAlertDetail(id: number): Promise<ApiResponse<AlertRecord>> {
  return apiClient.get<AlertRecord>(`/alert/${id}`)
}

/**
 * 创建预警
 */
export async function createAlert(data: Partial<AlertRecord>): Promise<ApiResponse<number>> {
  return apiClient.post<number>("/alert", data)
}

/**
 * 发布预警
 */
export async function publishAlert(id: number): Promise<ApiResponse<void>> {
  return apiClient.put<void>(`/alert/${id}/publish`)
}

/**
 * 解除预警
 */
export async function releaseAlert(id: number, reason: string): Promise<ApiResponse<void>> {
  return apiClient.put<void>(`/alert/${id}/release`, null, { reason })
}

// ==================== 预警规则相关 ====================

/**
 * 分页查询预警规则
 */
export async function pageAlertRules(params: {
  ruleType?: number
  alertLevel?: number
  status?: number
  current?: number
  size?: number
}): Promise<ApiResponse<PageResult<AlertRule>>> {
  return apiClient.get<PageResult<AlertRule>>("/alert/rule/page", params)
}

/**
 * 获取预警规则详情
 */
export async function getAlertRuleDetail(id: number): Promise<ApiResponse<AlertRule>> {
  return apiClient.get<AlertRule>(`/alert/rule/${id}`)
}

/**
 * 创建预警规则
 */
export async function createAlertRule(data: Partial<AlertRule>): Promise<ApiResponse<number>> {
  return apiClient.post<number>("/alert/rule", data)
}

/**
 * 更新预警规则
 */
export async function updateAlertRule(data: Partial<AlertRule>): Promise<ApiResponse<void>> {
  return apiClient.put<void>("/alert/rule", data)
}

/**
 * 删除预警规则
 */
export async function deleteAlertRule(id: number): Promise<ApiResponse<void>> {
  return apiClient.delete<void>(`/alert/rule/${id}`)
}

/**
 * 启用/禁用预警规则
 */
export async function toggleAlertRuleStatus(id: number, status: number): Promise<ApiResponse<void>> {
  return apiClient.put<void>(`/alert/rule/${id}/status`, null, { status })
}

// ==================== 预警通知相关 ====================

/**
 * 获取首页横幅通知
 */
export async function getBannerNotification(): Promise<ApiResponse<AlertNotification | null>> {
  return apiClient.get<AlertNotification | null>("/alert/notification/banner")
}

/**
 * 获取所有有效的首页横幅通知
 */
export async function getActiveBannerNotifications(): Promise<ApiResponse<AlertNotification[]>> {
  return apiClient.get<AlertNotification[]>("/alert/notification/banner/list")
}

/**
 * 分页查询预警通知
 */
export async function pageAlertNotifications(params: {
  notifyChannel?: number
  sendStatus?: number
  current?: number
  size?: number
}): Promise<ApiResponse<PageResult<AlertNotification>>> {
  return apiClient.get<PageResult<AlertNotification>>("/alert/notification/page", params)
}

/**
 * 获取通知详情
 */
export async function getAlertNotificationDetail(id: number): Promise<ApiResponse<AlertNotification>> {
  return apiClient.get<AlertNotification>(`/alert/notification/${id}`)
}

/**
 * 创建并发送预警通知
 */
export async function createAndSendNotification(data: {
  alertRecordId?: number
  alertType: number
  alertLevel: number
  areaName: string
  title: string
  content: string
  notifyChannel?: number
}): Promise<ApiResponse<number>> {
  return apiClient.post<number>("/alert/notification", data)
}

/**
 * 撤销预警通知
 */
export async function revokeNotification(id: number): Promise<ApiResponse<void>> {
  return apiClient.put<void>(`/alert/notification/${id}/revoke`)
}

/**
 * 标记通知为已读
 */
export async function markNotificationAsRead(id: number): Promise<ApiResponse<void>> {
  return apiClient.put<void>(`/alert/notification/${id}/read`)
}

// ==================== 预警响应相关 ====================

/**
 * 获取预警的所有响应记录
 */
export async function getAlertResponses(alertRecordId: number): Promise<ApiResponse<AlertResponse[]>> {
  return apiClient.get<AlertResponse[]>(`/alert/response/alert/${alertRecordId}`)
}

/**
 * 分页查询响应记录
 */
export async function pageAlertResponses(params: {
  alertRecordId?: number
  responseType?: number
  current?: number
  size?: number
}): Promise<ApiResponse<PageResult<AlertResponse>>> {
  return apiClient.get<PageResult<AlertResponse>>("/alert/response/page", params)
}

/**
 * 获取响应详情
 */
export async function getAlertResponseDetail(id: number): Promise<ApiResponse<AlertResponse>> {
  return apiClient.get<AlertResponse>(`/alert/response/${id}`)
}

/**
 * 创建预警响应
 */
export async function createAlertResponse(data: {
  alertRecordId: number
  responseType: number
  responseContent?: string
  attachmentUrls?: string
  locationLng?: number
  locationLat?: number
}): Promise<ApiResponse<number>> {
  return apiClient.post<number>("/alert/response", data)
}

// ==================== 文件上传相关 ====================

/**
 * 上传预警响应附件
 */
export async function uploadAlertResponseFile(file: File): Promise<
  ApiResponse<{
    id?: string
    fileName?: string
    name?: string
    filePath?: string
    path?: string
    url?: string
    fileSize?: number
    size?: number
    fileType?: string
    type?: string
    uploadTime?: string
  }>
> {
  const formData = new FormData()
  formData.append("file", file)
  return apiClient.upload("/file/upload/alert-response", formData)
}
