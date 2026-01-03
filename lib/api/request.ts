/**
 * 统一请求封装
 */
import { API_BASE_URL, TOKEN_KEY, REFRESH_TOKEN_KEY } from "./config"

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  timestamp: number
}

export interface PageResult<T> {
  current: number
  size: number
  total: number
  records: T[]
}

class RequestClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEY)
    }
    return null
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      if (response.status === 401) {
        // Token过期，清除登录状态
        if (typeof window !== "undefined") {
          localStorage.removeItem(TOKEN_KEY)
          localStorage.removeItem(REFRESH_TOKEN_KEY)
          localStorage.removeItem("isLoggedIn")
          window.location.href = "/login"
        }
      }
      const error = await response.json().catch(() => ({ message: "请求失败" }))
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }
    return response.json()
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }
    const token = this.getToken()
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
    return headers
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    let fullUrl = `${this.baseURL}${url}`
    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      const queryString = searchParams.toString()
      if (queryString) {
        fullUrl += `?${queryString}`
      }
    }

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: this.getHeaders(),
    })
    return this.handleResponse<T>(response)
  }

  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    })
    return this.handleResponse<T>(response)
  }

  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    })
    return this.handleResponse<T>(response)
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    })
    return this.handleResponse<T>(response)
  }
}

export const apiClient = new RequestClient(API_BASE_URL)
