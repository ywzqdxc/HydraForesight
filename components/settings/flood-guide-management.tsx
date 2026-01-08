"use client"

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
import { Plus, Search, Edit, Trash2, Eye, FileText } from "lucide-react"
import { floodGuideApi, type FloodGuide } from "@/lib/api/knowledge"
import { toast } from "sonner"

export default function FloodGuideManagement() {
  const [guides, setGuides] = useState<FloodGuide[]>([])
  const [loading, setLoading] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [filterLevel, setFilterLevel] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const [dialogOpen, setDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editingGuide, setEditingGuide] = useState<Partial<FloodGuide> | null>(null)
  const [viewingGuide, setViewingGuide] = useState<FloodGuide | null>(null)

  const [formData, setFormData] = useState<Partial<FloodGuide>>({
    title: "",
    description: "",
    content: "",
    coverImage: "",
    guideLevel: 1,
    targetAudience: "",
    tags: "",
    sortOrder: 0,
    isRecommend: 0,
    publishStatus: 0,
  })

  useEffect(() => {
    loadGuides()
  }, [searchKeyword, filterLevel, filterStatus])

  const loadGuides = async () => {
    setLoading(true)
    try {
      const params: any = { pageNum: 1, pageSize: 100 }
      if (searchKeyword) params.keyword = searchKeyword
      if (filterLevel !== "all") params.guideLevel = Number.parseInt(filterLevel)
      if (filterStatus !== "all") params.publishStatus = Number.parseInt(filterStatus)

      const response = await floodGuideApi.getPage(params)
      setGuides(response.records)
    } catch (error) {
      console.error("加载防汛指南失败:", error)
      toast.error("加载失败")
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingGuide(null)
    setFormData({
      title: "",
      description: "",
      content: "",
      coverImage: "",
      guideLevel: 1,
      targetAudience: "",
      tags: "",
      sortOrder: 0,
      isRecommend: 0,
      publishStatus: 0,
    })
    setDialogOpen(true)
  }

  const handleEdit = (guide: FloodGuide) => {
    setEditingGuide(guide)
    setFormData(guide)
    setDialogOpen(true)
  }

  const handleView = async (guide: FloodGuide) => {
    try {
      const detail = await floodGuideApi.getById(guide.id)
      setViewingGuide(detail)
      setViewDialogOpen(true)
    } catch (error) {
      toast.error("加载详情失败")
    }
  }

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      toast.error("请填写标题和内容")
      return
    }

    try {
      if (editingGuide) {
        await floodGuideApi.update(editingGuide.id!, formData)
        toast.success("更新成功")
      } else {
        await floodGuideApi.create(formData)
        toast.success("创建成功")
      }
      setDialogOpen(false)
      loadGuides()
    } catch (error) {
      toast.error("保存失败")
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("确定要删除这条防汛指南吗？")) return

    try {
      await floodGuideApi.delete(id)
      toast.success("删除成功")
      loadGuides()
    } catch (error) {
      toast.error("删除失败")
    }
  }

  const handlePublish = async (id: number) => {
    try {
      await floodGuideApi.publish(id)
      toast.success("发布成功")
      loadGuides()
    } catch (error) {
      toast.error("发布失败")
    }
  }

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-green-100 text-green-800"
      case 2:
        return "bg-yellow-100 text-yellow-800"
      case 3:
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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
              placeholder="搜索指南标题或描述..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={filterLevel} onValueChange={setFilterLevel}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="难度级别" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部级别</SelectItem>
              <SelectItem value="1">基础</SelectItem>
              <SelectItem value="2">中级</SelectItem>
              <SelectItem value="3">高级</SelectItem>
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
          新增指南
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>标题</TableHead>
              <TableHead>描述</TableHead>
              <TableHead>难度级别</TableHead>
              <TableHead>浏览次数</TableHead>
              <TableHead>发布状态</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  加载中...
                </TableCell>
              </TableRow>
            ) : guides.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              guides.map((guide) => (
                <TableRow key={guide.id}>
                  <TableCell className="font-medium">{guide.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{guide.description}</TableCell>
                  <TableCell>
                    <Badge className={getLevelColor(guide.guideLevel)}>{guide.guideLevelName}</Badge>
                  </TableCell>
                  <TableCell>{guide.viewCount}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(guide.publishStatus)}>{guide.publishStatusName}</Badge>
                  </TableCell>
                  <TableCell>{new Date(guide.createTime).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleView(guide)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(guide)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      {guide.publishStatus === 0 && (
                        <Button variant="ghost" size="sm" onClick={() => handlePublish(guide.id)}>
                          <FileText className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(guide.id)}>
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
            <DialogTitle>{editingGuide ? "编辑防汛指南" : "新增防汛指南"}</DialogTitle>
            <DialogDescription>填写防汛指南的详细信息</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">标题 *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="请输入指南标题"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">描述</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="请输入指南描述"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">内容 *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="请输入指南内容"
                rows={10}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="guideLevel">难度级别</Label>
                <Select
                  value={formData.guideLevel?.toString()}
                  onValueChange={(value) => setFormData({ ...formData, guideLevel: Number.parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">基础</SelectItem>
                    <SelectItem value="2">中级</SelectItem>
                    <SelectItem value="3">高级</SelectItem>
                  </SelectContent>
                </Select>
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
            <div className="grid gap-2">
              <Label htmlFor="tags">标签（逗号分隔）</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="防汛,自救,安全"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSave}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 查看对话框 */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewingGuide?.title}</DialogTitle>
            <DialogDescription>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getLevelColor(viewingGuide?.guideLevel || 1)}>{viewingGuide?.guideLevelName}</Badge>
                <Badge className={getStatusColor(viewingGuide?.publishStatus || 0)}>
                  {viewingGuide?.publishStatusName}
                </Badge>
                <span className="text-sm">浏览次数: {viewingGuide?.viewCount}</span>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">描述</h4>
              <p className="text-sm text-muted-foreground">{viewingGuide?.description}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">内容</h4>
              <div className="text-sm whitespace-pre-wrap bg-muted p-4 rounded-lg">{viewingGuide?.content}</div>
            </div>
            {viewingGuide?.tags && (
              <div>
                <h4 className="font-medium mb-2">标签</h4>
                <div className="flex flex-wrap gap-2">
                  {viewingGuide.tags.split(",").map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setViewDialogOpen(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
