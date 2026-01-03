/**
 * 预警相关API
 */
import { apiClient, type ApiResponse, type PageResult } from "./request"

export interface AlertRecord {
  id: number
  alertId: string
  alertType: number
  alertLevel: number
  areaId: number
  areaName: string
  title: string
  content: string
  triggerValue?: number
  triggerTime: string
  publishTime?: string
  expectedEndTime?: string
  actualEndTime?: string
  status: number
  publisherName?: string
  releaseReason?: string
  viewCount: number
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
