/**
 * 认证相关API
 */
import { apiClient, type ApiResponse } from "./request"
import { TOKEN_KEY, REFRESH_TOKEN_KEY, USER_INFO_KEY } from "./config"

export interface LoginRequest {
  username: string
  password: string
  rememberMe?: boolean
}

export interface RegisterRequest {
  username: string
  password: string
  email?: string
  phone?: string
  realName?: string
}

export interface UserInfo {
  id: number
  userId: string
  username: string
  realName?: string
  nickname?: string
  email?: string
  phone?: string
  avatarUrl?: string
  gender?: number
  status: number
  lastLoginTime?: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
  user: UserInfo
}

/**
 * 用户登录
 */
export async function login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
  const response = await apiClient.post<LoginResponse>("/auth/login", data)
  if (response.code === 200 && response.data) {
    // 保存token和用户信息
    localStorage.setItem(TOKEN_KEY, response.data.accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken)
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(response.data.user))
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("username", response.data.user.username)
  }
  return response
}

/**
 * 用户注册
 */
export async function register(data: RegisterRequest): Promise<ApiResponse<number>> {
  return apiClient.post<number>("/auth/register", data)
}

/**
 * 刷新令牌
 */
export async function refreshToken(token: string): Promise<ApiResponse<LoginResponse>> {
  const response = await apiClient.post<LoginResponse>("/auth/refresh", null)
  if (response.code === 200 && response.data) {
    localStorage.setItem(TOKEN_KEY, response.data.accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken)
  }
  return response
}

/**
 * 用户登出
 */
export async function logout(): Promise<void> {
  try {
    await apiClient.post("/auth/logout")
  } catch (e) {
    // 忽略错误
  } finally {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_INFO_KEY)
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("username")
  }
}

/**
 * 获取当前用户信息
 */
export function getCurrentUser(): UserInfo | null {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem(USER_INFO_KEY)
  if (userStr) {
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }
  return null
}

/**
 * 检查是否已登录
 */
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("isLoggedIn") === "true" && !!localStorage.getItem(TOKEN_KEY)
}
