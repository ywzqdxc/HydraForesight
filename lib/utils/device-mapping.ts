/**
 * 设备类型和区域映射工具
 */

// 设备类型映射：前端 -> 后端
export const DEVICE_TYPE_MAP: Record<string, number> = {
  rainfall: 1, // 雨量监测
  "water-level": 2, // 水位监测
  flow: 3, // 流量监测
  weather: 4, // 气象监测
  camera: 5, // 监控摄像头
}

// 设备类型映射：后端 -> 前端
export const DEVICE_TYPE_REVERSE_MAP: Record<number, string> = {
  1: "rainfall",
  2: "water-level",
  3: "flow",
  4: "weather",
  5: "camera",
}

// 设备状态映射：前端 -> 后端
export const DEVICE_STATUS_MAP: Record<string, number> = {
  online: 1, // 在线
  offline: 2, // 离线
  warning: 3, // 警告
  maintenance: 4, // 维护中
}

// 设备状态映射：后端 -> 前端
export const DEVICE_STATUS_REVERSE_MAP: Record<number, string> = {
  1: "online",
  2: "offline",
  3: "warning",
  4: "maintenance",
}

// 区域映射：前端 -> 后端
export const AREA_MAP: Record<string, number> = {
  longzihu: 1, // 黄石坡
  dongfengqu: 2, // 月弦坝
  "science-avenue": 3, // 嘉州大道
  "longhu-avenue": 4, // 柏杨中路
  "ruyi-lake": 5, // 周河坎
  "longxiang-street": 6, // 王浩儿街
  "hanhai-road": 7, // 碧山路
}

// 区域映射：后端 -> 前端
export const AREA_REVERSE_MAP: Record<number, string> = {
  1: "longzihu",
  2: "dongfengqu",
  3: "science-avenue",
  4: "longhu-avenue",
  5: "ruyi-lake",
  6: "longxiang-street",
  7: "hanhai-road",
}

// 区域名称映射
export const AREA_NAME_MAP: Record<number, string> = {
  1: "黄石坡",
  2: "月弦坝",
  3: "嘉州大道",
  4: "柏杨中路",
  5: "周河坎",
  6: "王浩儿街",
  7: "碧山路",
}
