/**
 * 公众上报相关API
 */
import { apiClient, type ApiResponse, type PageResult } from "./request"

export interface PublicReport {
  id: number
  reportId: string
  reportType: number
  title: string
  content: string
  locationName: string
  longitude?: number
  latitude?: number
  areaId?: number
  severity: number
  imageUrls?: string
  videoUrl?: string
  reporterName?: string
  reporterPhone?: string
  reportTime: string
  verifyStatus: number
  verifyTime?: string
  verifierName?: string
  verifyRemark?: string
  processStatus: number
  processResult?: string
  upvoteCount: number
  viewCount: number
  createTime: string
}

export interface ReportStatistics {
  totalCount: number
  pendingCount: number
  processingCount: number
  processedCount: number
  typeStatistics: Array<{ reportType: number; count: number }>
}

export interface ReportQueryParams {
  reportType?: number
  severity?: number
  verifyStatus?: number
  processStatus?: number
  areaId?: number
  current?: number
  size?: number
}

export interface CreateReportRequest {
  reportType: number
  title: string
  content: string
  locationName: string
  longitude?: number
  latitude?: number
  severity?: number
  imageUrls?: string
  reporterName?: string
  reporterPhone?: string
}

/**
 * 获取上报统计数据
 */
export async function getReportStatistics(): Promise<ApiResponse<ReportStatistics>> {
  return apiClient.get<ReportStatistics>("/report/statistics")
}

/**
 * 获取最新上报列表
 */
export async function getLatestReports(limit = 10): Promise<ApiResponse<PublicReport[]>> {
  return apiClient.get<PublicReport[]>("/report/latest", { limit })
}

/**
 * 分页查询公众上报
 */
export async function pageReports(params: ReportQueryParams): Promise<ApiResponse<PageResult<PublicReport>>> {
  return apiClient.get<PageResult<PublicReport>>("/report/page", params)
}

/**
 * 获取上报详情
 */
export async function getReportDetail(id: number): Promise<ApiResponse<PublicReport>> {
  return apiClient.get<PublicReport>(`/report/${id}`)
}

/**
 * 创建公众上报
 */
export async function createReport(data: CreateReportRequest): Promise<ApiResponse<number>> {
  return apiClient.post<number>("/report", data)
}

/**
 * 点赞上报
 */
export async function upvoteReport(id: number): Promise<ApiResponse<void>> {
  return apiClient.post<void>(`/report/${id}/upvote`)
}
