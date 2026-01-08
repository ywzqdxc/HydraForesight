"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, FileText, Loader2 } from "lucide-react"
import { knowledgeResourceApi, type KnowledgeResource } from "@/lib/api/knowledge"
import { request } from "@/lib/api/request"
import { toast } from "sonner"

export default function ResourceManagement() {
  const [resources, setResources] = useState<KnowledgeResource[]>([])
  const [loading, setLoading] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingResource, setEditingResource] = useState<Partial<KnowledgeResource> | null>(null)
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState<Partial<KnowledgeResource>>({
    title: "",
    description: "",
    fileUrl: "",
    fileType: "",
    fileSize: 0,
    coverImage: "",
    tags: "",
    isRecommend: 0,
    publishStatus: 0,
  })

  useEffect(() => {
    loadResources()
  }, [searchKeyword, filterType, filterStatus])

  const loadResources = async () => {
    setLoading(true)
    try {
      const params: any = { pageNum: 1, pageSize: 100 }
      if (searchKeyword) params.keyword = searchKeyword
      if (filterType !== "all") params.fileType = filterType
      if (filterStatus !== "all") params.publishStatus = Number.parseInt(filterStatus)

      const response = await knowledgeResourceApi.getPage(params)
      setResources(response.records)
    } catch (error) {
      console.error("加载资源失败:", error)
      toast.error("加载失败")
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingResource(null)
    setFormData({
      title: "",
      description: "",
      fileUrl: "",
      fileType: "",
      fileSize: 0,
      coverImage: "",
      tags: "",
      isRecommend: 0,
      publishStatus: 0,
    })
    setDialogOpen(true)
  }

  const handleEdit = (resource: KnowledgeResource) => {
    setEditingResource(resource)
    setFormData(resource)
    setDialogOpen(true)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    console.log("[v0] 开始上传文件:", file.name, "大小:", file.size)

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("subDir", "knowledge-resources")

      console.log("[v0] 调用上传API: /file/upload")
      const response = await request.upload<{ url: string; fileName: string; fileSize: number }>(
        "/file/upload",
        formData,
      )

      console.log("[v0] 上传成功，响应:", response)

      // 自动识别文件类型
      const fileName = file.name.toLowerCase()
      let fileType = "FILE"

      if (fileName.endsWith(".pdf")) {
        fileType = "PDF"
      } else if (fileName.endsWith(".doc") || fileName.endsWith(".docx")) {
        fileType = "DOCX"
      } else if (fileName.endsWith(".xls") || fileName.endsWith(".xlsx")) {
        fileType = "XLSX"
      } else if (fileName.endsWith(".ppt") || fileName.endsWith(".pptx")) {
        fileType = "PPTX"
      } else if (fileName.endsWith(".zip") || fileName.endsWith(".rar") || fileName.endsWith(".7z")) {
        fileType = "ZIP"
      } else if (fileName.endsWith(".mp4") || fileName.endsWith(".avi") || fileName.endsWith(".mov")) {
        fileType = "MP4"
      } else if (fileName.endsWith(".mp3") || fileName.endsWith(".wav")) {
        fileType = "MP3"
      } else if (fileName.endsWith(".exe") || fileName.endsWith(".msi")) {
        fileType = "EXE"
      } else if (fileName.endsWith(".apk")) {
        fileType = "APK"
      } else if (fileName.endsWith(".txt")) {
        fileType = "TXT"
      }

      console.log("[v0] 识别的文件类型:", fileType)

      setFormData((prev) => ({
        ...prev,
        fileUrl: response.url,
        fileType: fileType,
        fileSize: response.fileSize || file.size,
      }))
      toast.success(`文件上传成功 (${fileType})`)
    } catch (error) {
      console.error("[v0] 文件上传失败:", error)
      toast.error("文件上传失败: " + (error instanceof Error ? error.message : "未知错误"))
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    console.log("[v0] ========== 开始保存资源 ==========")
    console.log("[v0] 表单数据:", formData)
    console.log("[v0] 标题:", formData.title)
    console.log("[v0] 文件URL:", formData.fileUrl)
    console.log("[v0] 文件类型:", formData.fileType)
    console.log("[v0] 文件大小:", formData.fileSize, "类型:", typeof formData.fileSize)
    console.log("[v0] 发布状态:", formData.publishStatus)

    if (!formData.title?.trim()) {
      toast.error("请填写标题")
      return
    }

    if (!formData.fileUrl) {
      toast.error("请上传文件")
      return
    }

    setLoading(true)
    try {
      const dataToSave = {
        ...formData,
        fileSize: Number(formData.fileSize) || 0,
      }

      console.log("[v0] 准备发送的数据:", dataToSave)

      if (editingResource?.id) {
        console.log("[v0] 执行更新操作，资源ID:", editingResource.id)
        const result = await knowledgeResourceApi.update(editingResource.id, dataToSave)
        console.log("[v0] 更新成功，返回结果:", result)
        toast.success("更新成功")
      } else {
        console.log("[v0] 执行创建操作")
        const result = await knowledgeResourceApi.create(dataToSave)
        console.log("[v0] 创建成功，返回结果:", result)
        toast.success("创建成功")
      }

      console.log("[v0] 关闭对话框并刷新列表")
      setDialogOpen(false)
      await loadResources()
      console.log("[v0] ========== 保存资源完成 ==========")
    } catch (error) {
      console.error("[v0] ========== 保存失败 ==========")
      console.error("[v0] 错误对象:", error)
      console.error("[v0] 错误消息:", error instanceof Error ? error.message : "未知错误")
      if (error instanceof Error) {
        console.error("[v0] 错误堆栈:", error.stack)
      }
      toast.error("保存失败: " + (error instanceof Error ? error.message : "未知错误"))
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("确定要删除这个资源吗？")) return

    try {
      await knowledgeResourceApi.delete(id)
      toast.success("删除成功")
      loadResources()
    } catch (error) {
      toast.error("删除失败")
    }
  }

  const handlePublish = async (id: number) => {
    try {
      await knowledgeResourceApi.publish(id)
      toast.success("发布成功")
      loadResources()
    } catch (error) {
      toast.error("发布失败")
    }
  }

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return "bg-gray-100 text-gray-800"
      case 1:
        return "bg-green-100 text-green-800"
      case 2:
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索资源标题或描述..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="文件类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              <SelectItem value="PDF">PDF</SelectItem>
              <SelectItem value="ZIP">ZIP</SelectItem>
              <SelectItem value="PPTX">PPTX</SelectItem>
              <SelectItem value="MP4">MP4</SelectItem>
              <SelectItem value="EXE">EXE</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="发布状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="0">草稿</SelectItem>
              <SelectItem value="1">已发布</SelectItem>
              <SelectItem value="2">已下架</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          新增资源
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>标题</TableHead>
              <TableHead>文件类型</TableHead>
              <TableHead>文件大小</TableHead>
              <TableHead>下载次数</TableHead>
              <TableHead>发布状态</TableHead>
              <TableHead>上传者</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  加载中...
                </TableCell>
              </TableRow>
            ) : resources.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">{resource.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{resource.fileType}</Badge>
                  </TableCell>
                  <TableCell>{resource.fileSizeText}</TableCell>
                  <TableCell>{resource.downloadCount}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(resource.publishStatus)}>{resource.publishStatusName}</Badge>
                  </TableCell>
                  <TableCell>{resource.uploaderName}</TableCell>
                  <TableCell>{new Date(resource.createTime).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(resource)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      {resource.publishStatus === 0 && (
                        <Button variant="ghost" size="sm" onClick={() => handlePublish(resource.id)}>
                          <FileText className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(resource.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 编辑对话框 */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingResource ? "编辑资源" : "新增资源"}</DialogTitle>
            <DialogDescription>上传文件并填写资源详细信息</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="file">上传文件 *</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.7z,.mp4,.avi,.mov,.mp3,.wav,.exe,.msi,.apk,.txt"
                />
                {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
              </div>
              {formData.fileUrl && (
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    文件类型: <Badge variant="outline">{formData.fileType}</Badge>
                  </p>
                  <p>文件大小: {formData.fileSize ? Math.round(formData.fileSize / 1024) : 0} KB</p>
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">标题 *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="请输入资源标题"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">描述</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="请输入资源描述"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">标签（逗号分隔）</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="防汛,应急,手册"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="publishStatus">发布状态</Label>
              <Select
                value={formData.publishStatus?.toString()}
                onValueChange={(value) => setFormData({ ...formData, publishStatus: Number.parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">草稿</SelectItem>
                  <SelectItem value="1">已发布</SelectItem>
                  <SelectItem value="2">已下架</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={uploading || loading}>
              取消
            </Button>
            <Button onClick={handleSave} disabled={uploading || loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  保存中...
                </>
              ) : (
                "保存"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
