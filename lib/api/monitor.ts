/**
 * 监测数据相关API
 */
import { apiClient, type ApiResponse, type PageResult } from "./request"

export interface DashboardData {
  totalDevices: number
  onlineDevices: number
  warningDevices: number
  activeAlerts: number
  todayReports: number
  todayRainfall: number
  monthRainfall: number
}

export interface MonitorArea {
  id: number
  areaCode: string
  areaName: string
  areaNameEn?: string
  areaType: number
  riskLevel: number
  centerLng: number
  centerLat: number
  description?: string
  warningThreshold1?: number
  warningThreshold2?: number
  warningThreshold3?: number
  warningThreshold4?: number
  responsiblePerson?: string
  status: number
}

export interface RainfallData {
  id: number
  deviceId: number
  areaId: number
  rainfallValue: number
  rainfallIntensity: number
  rainfallType: number
  temperature?: number
  humidity?: number
  recordTime: string
}

export interface RainfallStatistics {
  totalRainfall: number
  maxRainfall: number
  avgRainfall: number
  monthRainfall: number
}

/**
 * 获取仪表盘数据
 */
export async function getDashboardData(): Promise<ApiResponse<DashboardData>> {
  return apiClient.get<DashboardData>("/monitor/dashboard")
}

/**
 * 获取所有监测区域
 */
export async function getAllAreas(): Promise<ApiResponse<MonitorArea[]>> {
  return apiClient.get<MonitorArea[]>("/monitor/areas")
}

/**
 * 获取监测区域详情
 */
export async function getAreaDetail(id: number): Promise<ApiResponse<MonitorArea>> {
  return apiClient.get<MonitorArea>(`/monitor/areas/${id}`)
}

/**
 * 获取最新降水数据
 */
export async function getLatestRainfallData(limit = 10): Promise<ApiResponse<RainfallData[]>> {
  return apiClient.get<RainfallData[]>("/monitor/rainfall/latest", { limit })
}

/**
 * 获取区域降水数据
 */
export async function getAreaRainfallData(
  areaId: number,
  startDate: string,
  endDate: string,
): Promise<ApiResponse<RainfallData[]>> {
  return apiClient.get<RainfallData[]>(`/monitor/rainfall/area/${areaId}`, { startDate, endDate })
}

/**
 * 获取降水统计数据
 */
export async function getRainfallStatistics(areaId?: number, days = 7): Promise<ApiResponse<RainfallStatistics>> {
  return apiClient.get<RainfallStatistics>("/monitor/rainfall/statistics", { areaId, days })
}

/**
 * 分页查询降水数据
 */
export async function pageRainfallData(
  areaId?: number,
  current = 1,
  size = 10,
): Promise<ApiResponse<PageResult<RainfallData>>> {
  return apiClient.get<PageResult<RainfallData>>("/monitor/rainfall/page", { areaId, current, size })
}
