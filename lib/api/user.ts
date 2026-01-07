import { request } from "./request"

export interface UserProfile {
  id: number
  userId: string
  username: string
  realName?: string
  nickname?: string
  email?: string
  phone?: string
  avatarUrl?: string
  gender?: number
  birthday?: string
  deptId?: number
  status: number
  lastLoginTime?: string
  lastLoginIp?: string
  loginCount: number
  createTime: string
  remark?: string
}

export interface UpdateProfileRequest {
  id: number
  realName?: string
  nickname?: string
  email?: string
  phone?: string
  avatarUrl?: string
  gender?: number
  remark?: string
}

export interface UpdatePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

// 获取当前用户信息
export const getCurrentUser = () => {
  return request<UserProfile>("/user/current", {
    method: "GET",
  })
}

// 更新用户信息
export const updateProfile = (data: UpdateProfileRequest) => {
  return request("/user", {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

// 修改密码
export const updatePassword = (data: UpdatePasswordRequest) => {
  return request("/user/password", {
    method: "PUT",
    body: JSON.stringify(data),
  })
}
