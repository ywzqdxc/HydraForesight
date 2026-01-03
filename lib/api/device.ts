/**
 * 设备相关API
 */
import { apiClient, type ApiResponse, type PageResult } from "./request"

export interface Device {
  id: number
  deviceId: string
  deviceName: string
  deviceType: number
  deviceModel?: string
  manufacturer?: string
  serialNumber?: string
  areaId: number
  locationName: string
  longitude: number
  latitude: number
  altitude?: number
  installDate?: string
  dataInterval?: number
  communicationType?: number
  powerType?: number
  status: number
  remark?: string
  createTime: string
}

export interface DeviceStatistics {
  totalCount: number
  onlineCount: number
  offlineCount: number
  warningCount: number
  maintenanceCount: number
  typeStatistics: Array<{ deviceType: number; count: number }>
  areaStatistics: Array<{ areaId: number; count: number }>
}

export interface DeviceQueryParams {
  deviceName?: string
  deviceId?: string
  deviceType?: number
  areaId?: number
  status?: number
  current?: number
  size?: number
}

/**
 * 获取设备统计数据
 */
export async function getDeviceStatistics(): Promise<ApiResponse<DeviceStatistics>> {
  return apiClient.get<DeviceStatistics>("/device/statistics")
}

/**
 * 获取在线设备列表
 */
export async function getOnlineDevices(): Promise<ApiResponse<Device[]>> {
  return apiClient.get<Device[]>("/device/online")
}

/**
 * 分页查询设备
 */
export async function pageDevices(params: DeviceQueryParams): Promise<ApiResponse<PageResult<Device>>> {
  return apiClient.get<PageResult<Device>>("/device/page", params)
}

/**
 * 获取设备详情
 */
export async function getDeviceDetail(id: number): Promise<ApiResponse<Device>> {
  return apiClient.get<Device>(`/device/${id}`)
}
