import { request } from "./request"

export interface User {
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
  deptId: number
  status: number
  lastLoginTime?: string
  lastLoginIp?: string
  loginCount: number
  createTime: string
  remark?: string
}

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

export interface CreateUserRequest {
  username: string
  password: string
  realName?: string
  email?: string
  phone?: string
  deptId?: number
}

export interface UpdateUserRequest {
  id: number
  realName?: string
  nickname?: string
  email?: string
  phone?: string
  deptId?: number
  status?: number
}

export interface PageUsersRequest {
  current: number
  size: number
  username?: string
  realName?: string
  phone?: string
  status?: number
  deptId?: number
}

export interface PageResult<T> {
  current: number
  size: number
  total: number
  records: T[]
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

// 分页查询用户
export const pageUsers = (params: PageUsersRequest) => {
  return request<PageResult<User>>("/user/page", {
    method: "GET",
    params,
  })
}

// 创建用户
export const createUser = (data: CreateUserRequest) => {
  return request<number>("/user", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// 更新用户
export const updateUser = (data: UpdateUserRequest) => {
  return request("/user", {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

// 删除用户
export const deleteUser = (id: number) => {
  return request(`/user/${id}`, {
    method: "DELETE",
  })
}

// 获取用户详情
export const getUserDetail = (id: number) => {
  return request<User>(`/user/${id}`, {
    method: "GET",
  })
}
