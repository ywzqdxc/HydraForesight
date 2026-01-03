/**
 * 上报类型映射工具
 */

// 上报类型映射：前端 -> 后端
export const REPORT_TYPE_MAP: Record<string, number> = {
  flooding: 1, // 积水
  rainfall: 2, // 降雨
  traffic: 3, // 交通
  disaster: 4, // 灾害
  other: 5, // 其他
}

// 上报类型映射：后端 -> 前端
export const REPORT_TYPE_REVERSE_MAP: Record<number, string> = {
  1: "flooding",
  2: "rainfall",
  3: "traffic",
  4: "disaster",
  5: "other",
}

// 严重程度映射：前端 -> 后端
export const SEVERITY_MAP: Record<string, number> = {
  low: 1, // 轻微
  medium: 2, // 中等
  high: 3, // 严重
}

// 严重程度映射：后端 -> 前端
export const SEVERITY_REVERSE_MAP: Record<number, string> = {
  1: "low",
  2: "medium",
  3: "high",
}

// 核实状态映射：前端 -> 后端
export const VERIFY_STATUS_MAP: Record<string, number> = {
  unverified: 0, // 未核实
  verified: 1, // 已核实
  rejected: 2, // 已驳回
}

// 核实状态映射：后端 -> 前端
export const VERIFY_STATUS_REVERSE_MAP: Record<number, string> = {
  0: "unverified",
  1: "verified",
  2: "rejected",
}
