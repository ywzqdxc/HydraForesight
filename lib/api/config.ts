/**
 * API配置
 */

// 后端API基础URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

// 请求超时时间
export const REQUEST_TIMEOUT = 30000

// Token存储键名
export const TOKEN_KEY = "hydra_token"
export const REFRESH_TOKEN_KEY = "hydra_refresh_token"
export const USER_INFO_KEY = "hydra_user_info"
