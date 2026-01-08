import { request } from "./request"

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
  getPage: (params: {
    pageNum?: number
    pageSize?: number
    keyword?: string
    guideLevel?: number
    publishStatus?: number
  }) => request.get<PageResult<FloodGuide>>("/api/knowledge/flood-guide/page", { params }),

  // 获取已发布列表
  getPublished: () => request.get<FloodGuide[]>("/api/knowledge/flood-guide/published"),

  // 获取详情
  getById: (id: number) => request.get<FloodGuide>(`/api/knowledge/flood-guide/${id}`),

  // 创建
  create: (data: Partial<FloodGuide>) => request.post<FloodGuide>("/api/knowledge/flood-guide", data),

  // 更新
  update: (id: number, data: Partial<FloodGuide>) => request.put<FloodGuide>(`/api/knowledge/flood-guide/${id}`, data),

  // 删除
  delete: (id: number) => request.delete(`/api/knowledge/flood-guide/${id}`),

  // 发布
  publish: (id: number) => request.post(`/api/knowledge/flood-guide/${id}/publish`),

  // 增加浏览次数
  incrementView: (id: number) => request.post(`/api/knowledge/flood-guide/${id}/view`),
}

// 知识资源API
export const knowledgeResourceApi = {
  // 分页查询
  getPage: (params: {
    pageNum?: number
    pageSize?: number
    keyword?: string
    fileType?: string
    publishStatus?: number
  }) => request.get<PageResult<KnowledgeResource>>("/api/knowledge/resource/page", { params }),

  // 获取已发布列表
  getPublished: () => request.get<KnowledgeResource[]>("/api/knowledge/resource/published"),

  // 获取详情
  getById: (id: number) => request.get<KnowledgeResource>(`/api/knowledge/resource/${id}`),

  // 创建
  create: (data: Partial<KnowledgeResource>) => request.post<KnowledgeResource>("/api/knowledge/resource", data),

  // 更新
  update: (id: number, data: Partial<KnowledgeResource>) =>
    request.put<KnowledgeResource>(`/api/knowledge/resource/${id}`, data),

  // 删除
  delete: (id: number) => request.delete(`/api/knowledge/resource/${id}`),

  // 发布
  publish: (id: number) => request.post(`/api/knowledge/resource/${id}/publish`),

  // 增加下载次数
  incrementDownload: (id: number) => request.post(`/api/knowledge/resource/${id}/download`),

  // 增加浏览次数
  incrementView: (id: number) => request.post(`/api/knowledge/resource/${id}/view`),
}

// 文件上传API（复用已有的）
export const uploadFile = async (file: File): Promise<any> => {
  const formData = new FormData()
  formData.append("file", file)

  const response = await request.upload("/api/common/upload", formData)
  return response
}
