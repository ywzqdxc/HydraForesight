import { apiClient } from "./request"

export interface FloodGuide {
  id: number
  guideId: string
  title: string
  description: string
  content: string
  coverImage: string
  guideLevel: number
  guideLevelName: string
  targetAudience: string
  tags: string
  viewCount: number
  likeCount: number
  sortOrder: number
  isRecommend: number
  publishStatus: number
  publishStatusName: string
  publishTime: string
  createTime: string
  updateTime: string
}

export interface KnowledgeResource {
  id: number
  resourceId: string
  categoryId: number
  title: string
  description: string
  fileUrl: string
  fileType: string
  fileSize: number
  fileSizeText: string
  coverImage: string
  uploaderId: number
  uploaderName: string
  tags: string
  downloadCount: number
  viewCount: number
  isRecommend: number
  publishStatus: number
  publishStatusName: string
  publishTime: string
  createTime: string
  updateTime: string
}

export interface PageResult<T> {
  records: T[]
  total: number
  size: number
  current: number
}

// 防汛指南API
export const floodGuideApi = {
  // 分页查询
  getPage: async (params: {
    pageNum?: number
    pageSize?: number
    keyword?: string
    guideLevel?: number
    publishStatus?: number
  }): Promise<PageResult<FloodGuide>> => {
    console.log("[v0] floodGuideApi.getPage - 开始请求", params)
    const response = await apiClient.get<PageResult<FloodGuide>>("/api/knowledge/flood-guide/page", params)
    console.log("[v0] floodGuideApi.getPage - 响应:", response)
    return response.data
  },

  // 获取已发布列表
  getPublished: async (): Promise<FloodGuide[]> => {
    console.log("[v0] floodGuideApi.getPublished - 开始请求")
    const response = await apiClient.get<FloodGuide[]>("/api/knowledge/flood-guide/published")
    console.log("[v0] floodGuideApi.getPublished - 响应码:", response.code)
    console.log("[v0] floodGuideApi.getPublished - 数据:", response.data)
    console.log("[v0] floodGuideApi.getPublished - 数据数量:", response.data?.length || 0)
    return response.data
  },

  // 获取详情
  getById: async (id: number): Promise<FloodGuide> => {
    const response = await apiClient.get<FloodGuide>(`/api/knowledge/flood-guide/${id}`)
    return response.data
  },

  // 创建
  create: async (data: Partial<FloodGuide>): Promise<FloodGuide> => {
    const response = await apiClient.post<FloodGuide>("/api/knowledge/flood-guide", data)
    return response.data
  },

  // 更新
  update: async (id: number, data: Partial<FloodGuide>): Promise<FloodGuide> => {
    const response = await apiClient.put<FloodGuide>(`/api/knowledge/flood-guide/${id}`, data)
    return response.data
  },

  // 删除
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/knowledge/flood-guide/${id}`)
  },

  // 发布
  publish: async (id: number): Promise<void> => {
    await apiClient.post(`/api/knowledge/flood-guide/${id}/publish`)
  },

  // 增加浏览次数
  incrementView: async (id: number): Promise<void> => {
    await apiClient.post(`/api/knowledge/flood-guide/${id}/view`)
  },
}

// 知识资源API
export const knowledgeResourceApi = {
  // 分页查询
  getPage: async (params: {
    pageNum?: number
    pageSize?: number
    keyword?: string
    fileType?: string
    publishStatus?: number
  }): Promise<PageResult<KnowledgeResource>> => {
    console.log("[v0] knowledgeResourceApi.getPage - 开始请求", params)
    const response = await apiClient.get<PageResult<KnowledgeResource>>("/api/knowledge/resource/page", params)
    console.log("[v0] knowledgeResourceApi.getPage - 响应:", response)
    return response.data
  },

  // 获取已发布列表
  getPublished: async (): Promise<KnowledgeResource[]> => {
    console.log("[v0] knowledgeResourceApi.getPublished - 开始请求")
    const response = await apiClient.get<KnowledgeResource[]>("/api/knowledge/resource/published")
    console.log("[v0] knowledgeResourceApi.getPublished - 响应码:", response.code)
    console.log("[v0] knowledgeResourceApi.getPublished - 数据:", response.data)
    console.log("[v0] knowledgeResourceApi.getPublished - 数据数量:", response.data?.length || 0)
    return response.data
  },

  // 获取详情
  getById: async (id: number): Promise<KnowledgeResource> => {
    const response = await apiClient.get<KnowledgeResource>(`/api/knowledge/resource/${id}`)
    return response.data
  },

  // 创建
  create: async (data: Partial<KnowledgeResource>): Promise<KnowledgeResource> => {
    console.log("[v0] knowledgeResourceApi.create - 开始请求")
    console.log("[v0] knowledgeResourceApi.create - 请求数据:", data)
    const response = await apiClient.post<KnowledgeResource>("/api/knowledge/resource", data)
    console.log("[v0] knowledgeResourceApi.create - 响应:", response)
    return response.data
  },

  // 更新
  update: async (id: number, data: Partial<KnowledgeResource>): Promise<KnowledgeResource> => {
    console.log("[v0] knowledgeResourceApi.update - 开始请求")
    console.log("[v0] knowledgeResourceApi.update - 资源ID:", id)
    console.log("[v0] knowledgeResourceApi.update - 请求数据:", data)
    const response = await apiClient.put<KnowledgeResource>(`/api/knowledge/resource/${id}`, data)
    console.log("[v0] knowledgeResourceApi.update - 响应:", response)
    return response.data
  },

  // 删除
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/knowledge/resource/${id}`)
  },

  // 发布
  publish: async (id: number): Promise<void> => {
    await apiClient.post(`/api/knowledge/resource/${id}/publish`)
  },

  // 增加下载次数
  incrementDownload: async (id: number): Promise<void> => {
    await apiClient.post(`/api/knowledge/resource/${id}/download`)
  },

  // 增加浏览次数
  incrementView: async (id: number): Promise<void> => {
    await apiClient.post(`/api/knowledge/resource/${id}/view`)
  },
}

// 文件上传API（复用已有的）
export const uploadFile = async (file: File): Promise<any> => {
  const formData = new FormData()
  formData.append("file", file)

  const response = await apiClient.upload("/api/common/upload", formData)
  return response.data
}
