"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Loader2 } from "lucide-react"
import {
  listDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  type Department,
} from "@/lib/api/department"
import { useToast } from "@/hooks/use-toast"

export default function DepartmentManagement() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [departments, setDepartments] = useState<Department[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingDept, setEditingDept] = useState<Department | null>(null)

  const [formData, setFormData] = useState({
    deptCode: "",
    deptName: "",
    phone: "",
    email: "",
    sortOrder: 0,
  })

  useEffect(() => {
    loadDepartments()
  }, [])

  const loadDepartments = async () => {
    try {
      setLoading(true)
      const data = await listDepartments()
      setDepartments(data)
    } catch (error: any) {
      toast({
        title: "加载失败",
        description: error.message || "无法加载部门列表",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      if (editingDept) {
        await updateDepartment({ id: editingDept.id, ...formData })
        toast({ title: "更新成功", description: "部门信息已更新" })
      } else {
        await createDepartment(formData)
        toast({ title: "创建成功", description: "部门已创建" })
      }
      setDialogOpen(false)
      resetForm()
      loadDepartments()
    } catch (error: any) {
      toast({
        title: "操作失败",
        description: error.message || "操作失败，请稍后重试",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("确定要删除此部门吗？")) return

    try {
      await deleteDepartment(id)
      toast({ title: "删除成功", description: "部门已删除" })
      loadDepartments()
    } catch (error: any) {
      toast({
        title: "删除失败",
        description: error.message || "删除失败，请稍后重试",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      deptCode: "",
      deptName: "",
      phone: "",
      email: "",
      sortOrder: 0,
    })
    setEditingDept(null)
  }

  const filteredDepts = departments.filter(
    (dept) =>
      dept.deptCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.deptName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>部门管理</CardTitle>
            <CardDescription>管理组织部门结构</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                添加部门
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingDept ? "编辑部门" : "添加部门"}</DialogTitle>
                <DialogDescription>填写部门信息</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="deptCode">部门编码</Label>
                  <Input
                    id="deptCode"
                    value={formData.deptCode}
                    onChange={(e) => setFormData({ ...formData, deptCode: e.target.value })}
                    disabled={!!editingDept}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="deptName">部门名称</Label>
                  <Input
                    id="deptName"
                    value={formData.deptName}
                    onChange={(e) => setFormData({ ...formData, deptName: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">联系电话</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sortOrder">排序号</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleSubmit}>确定</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索部门..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>部门编码</TableHead>
                <TableHead>部门名称</TableHead>
                <TableHead>联系电话</TableHead>
                <TableHead>邮箱</TableHead>
                <TableHead>排序</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepts.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell>{dept.deptCode}</TableCell>
                  <TableCell>{dept.deptName}</TableCell>
                  <TableCell>{dept.phone || "-"}</TableCell>
                  <TableCell>{dept.email || "-"}</TableCell>
                  <TableCell>{dept.sortOrder}</TableCell>
                  <TableCell>
                    <Badge variant={dept.status === 1 ? "default" : "secondary"}>
                      {dept.status === 1 ? "正常" : "禁用"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingDept(dept)
                          setFormData({
                            deptCode: dept.deptCode,
                            deptName: dept.deptName,
                            phone: dept.phone || "",
                            email: dept.email || "",
                            sortOrder: dept.sortOrder || 0,
                          })
                          setDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(dept.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
