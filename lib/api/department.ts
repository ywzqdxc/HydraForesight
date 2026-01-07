import { apiClient } from "./request"

export interface Department {
  id: number
  deptCode: string
  deptName: string
  parentId?: number
  leaderId?: number
  phone?: string
  email?: string
  sortOrder?: number
  status: number
  createTime: string
}

export interface CreateDepartmentRequest {
  deptCode: string
  deptName: string
  parentId?: number
  leaderId?: number
  phone?: string
  email?: string
  sortOrder?: number
}

export interface UpdateDepartmentRequest {
  id: number
  deptName?: string
  parentId?: number
  leaderId?: number
  phone?: string
  email?: string
  sortOrder?: number
  status?: number
}

export async function listDepartments(): Promise<Department[]> {
  const response = await apiClient.get("/department/list")
  return response.data
}

export async function getDepartment(id: number): Promise<Department> {
  const response = await apiClient.get(`/department/${id}`)
  return response.data
}

export async function createDepartment(data: CreateDepartmentRequest): Promise<number> {
  const response = await apiClient.post("/department", data)
  return response.data
}

export async function updateDepartment(data: UpdateDepartmentRequest): Promise<void> {
  await apiClient.put("/department", data)
}

export async function deleteDepartment(id: number): Promise<void> {
  await apiClient.delete(`/department/${id}`)
}
