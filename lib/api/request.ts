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

  async upload<T>(url: string, formData: FormData): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {}
    const token = this.getToken()
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
    // 不设置Content-Type，让浏览器自动设置包含boundary的multipart/form-data

    const response = await fetch(`${this.baseURL}${url}`, {
      method: "POST",
      headers: headers,
      body: formData,
    })
    return this.handleResponse<T>(response)
  }
}

export const apiClient = new RequestClient(API_BASE_URL)

export async function request<T = any>(
  url: string,
  options?: {
    method?: "GET" | "POST" | "PUT" | "DELETE"
    body?: string
    params?: Record<string, any>
  },
): Promise<T> {
  const method = options?.method || "GET"

  let response: ApiResponse<T>

  switch (method) {
    case "GET":
      response = await apiClient.get<T>(url, options?.params)
      break
    case "POST":
      response = await apiClient.post<T>(url, options?.body ? JSON.parse(options.body) : undefined)
      break
    case "PUT":
      response = await apiClient.put<T>(url, options?.body ? JSON.parse(options.body) : undefined)
      break
    case "DELETE":
      response = await apiClient.delete<T>(url)
      break
    default:
      throw new Error(`Unsupported method: ${method}`)
  }

  if (response.code !== 200) {
    throw new Error(response.message || "请求失败")
  }

  return response.data
}

request.upload = async <T = any>(url: string, formData: FormData): Promise<T> => {
  const response = await apiClient.upload<T>(url, formData)
  if (response.code !== 200) {
    throw new Error(response.message || "上传失败")
  }
  return response.data
}
