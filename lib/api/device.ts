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

export interface CreateDeviceRequest {
  deviceName: string
  deviceType: number
  deviceModel?: string
  manufacturer?: string
  areaId: number
  locationName: string
  longitude?: number
  latitude?: number
  altitude?: number
  installDate?: string
  dataInterval?: number
  communicationType?: number
  powerType?: number
  remark?: string
}

export interface UpdateDeviceRequest {
  id: number
  deviceName?: string
  deviceType?: number
  deviceModel?: string
  manufacturer?: string
  areaId?: number
  locationName?: string
  longitude?: number
  latitude?: number
  altitude?: number
  dataInterval?: number
  status?: number
  remark?: string
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

/**
 * 创建设备
 */
export async function createDevice(data: CreateDeviceRequest): Promise<ApiResponse<number>> {
  return apiClient.post<number>("/device", data)
}

/**
 * 更新设备
 */
export async function updateDevice(data: UpdateDeviceRequest): Promise<ApiResponse<void>> {
  return apiClient.put<void>("/device", data)
}

/**
 * 删除设备
 */
export async function deleteDevice(id: number): Promise<ApiResponse<void>> {
  return apiClient.delete<void>(`/device/${id}`)
}

/**
 * 更新设备状态
 */
export async function updateDeviceStatus(id: number, status: number): Promise<ApiResponse<void>> {
  return apiClient.put<void>(`/device/${id}/status/${status}`)
}
