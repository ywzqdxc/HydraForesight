import { apiClient } from "./request"

export interface Role {
  id: number
  roleCode: string
  roleName: string
  roleDesc?: string
  sortOrder?: number
  status: number
  isSystem: number
  createTime: string
}

export interface CreateRoleRequest {
  roleCode: string
  roleName: string
  roleDesc?: string
  sortOrder?: number
}

export interface UpdateRoleRequest {
  id: number
  roleName?: string
  roleDesc?: string
  sortOrder?: number
  status?: number
}

export async function listRoles(): Promise<Role[]> {
  const response = await apiClient.get("/role/list")
  return response.data
}

export async function getRole(id: number): Promise<Role> {
  const response = await apiClient.get(`/role/${id}`)
  return response.data
}

export async function getRolesByUserId(userId: number): Promise<Role[]> {
  const response = await apiClient.get(`/role/user/${userId}`)
  return response.data
}

export async function createRole(data: CreateRoleRequest): Promise<number> {
  const response = await apiClient.post("/role", data)
  return response.data
}

export async function updateRole(data: UpdateRoleRequest): Promise<void> {
  await apiClient.put("/role", data)
}

export async function deleteRole(id: number): Promise<void> {
  await apiClient.delete(`/role/${id}`)
}

export async function pageRoles(params: { current: number; size: number }) {
  const response = await apiClient.get("/role/page", { params })
  return response.data
}
