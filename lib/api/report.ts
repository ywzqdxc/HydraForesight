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

export interface ReportProcess {
  id: number
  reportId: number
  processType: number
  processTypeName: string
  processContent: string
  processorName: string
  processorDept: string
  processTime: string
}

export interface ProcessReportRequest {
  reportId: number
  processType: number
  processContent: string
  processStatus?: number
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

/**
 * 处理上报(含处理记录)
 */
export async function processReportWithRecord(data: ProcessReportRequest): Promise<ApiResponse<void>> {
  return apiClient.post<void>("/report/process", data)
}

/**
 * 获取处理记录
 */
export async function getProcessRecords(reportId: number): Promise<ApiResponse<ReportProcess[]>> {
  return apiClient.get<ReportProcess[]>(`/report/${reportId}/process`)
}
