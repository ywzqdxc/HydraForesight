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
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Loader2 } from "lucide-react"
import { listRoles, createRole, updateRole, deleteRole, type Role } from "@/lib/api/role"
import { useToast } from "@/hooks/use-toast"

export default function RoleManagement() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [roles, setRoles] = useState<Role[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)

  const [formData, setFormData] = useState({
    roleCode: "",
    roleName: "",
    roleDesc: "",
    sortOrder: 0,
  })

  useEffect(() => {
    loadRoles()
  }, [])

  const loadRoles = async () => {
    try {
      setLoading(true)
      const data = await listRoles()
      setRoles(data)
    } catch (error: any) {
      toast({
        title: "加载失败",
        description: error.message || "无法加载角色列表",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      if (editingRole) {
        await updateRole({ id: editingRole.id, ...formData })
        toast({ title: "更新成功", description: "角色信息已更新" })
      } else {
        await createRole(formData)
        toast({ title: "创建成功", description: "角色已创建" })
      }
      setDialogOpen(false)
      resetForm()
      loadRoles()
    } catch (error: any) {
      toast({
        title: "操作失败",
        description: error.message || "操作失败，请稍后重试",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number, isSystem: number) => {
    if (isSystem === 1) {
      toast({
        title: "无法删除",
        description: "系统角色不允许删除",
        variant: "destructive",
      })
      return
    }

    if (!confirm("确定要删除此角色吗？")) return

    try {
      await deleteRole(id)
      toast({ title: "删除成功", description: "角色已删除" })
      loadRoles()
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
      roleCode: "",
      roleName: "",
      roleDesc: "",
      sortOrder: 0,
    })
    setEditingRole(null)
  }

  const filteredRoles = roles.filter(
    (role) =>
      role.roleCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.roleName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>角色管理</CardTitle>
            <CardDescription>管理系统角色权限</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                添加角色
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingRole ? "编辑角色" : "添加角色"}</DialogTitle>
                <DialogDescription>填写角色信息</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="roleCode">角色编码</Label>
                  <Input
                    id="roleCode"
                    value={formData.roleCode}
                    onChange={(e) => setFormData({ ...formData, roleCode: e.target.value })}
                    disabled={!!editingRole}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="roleName">角色名称</Label>
                  <Input
                    id="roleName"
                    value={formData.roleName}
                    onChange={(e) => setFormData({ ...formData, roleName: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="roleDesc">角色描述</Label>
                  <Textarea
                    id="roleDesc"
                    value={formData.roleDesc}
                    onChange={(e) => setFormData({ ...formData, roleDesc: e.target.value })}
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
              placeholder="搜索角色..."
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
                <TableHead>角色编码</TableHead>
                <TableHead>角色名称</TableHead>
                <TableHead>角色描述</TableHead>
                <TableHead>排序</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.roleCode}</TableCell>
                  <TableCell>{role.roleName}</TableCell>
                  <TableCell>{role.roleDesc || "-"}</TableCell>
                  <TableCell>{role.sortOrder}</TableCell>
                  <TableCell>
                    <Badge variant={role.isSystem === 1 ? "secondary" : "outline"}>
                      {role.isSystem === 1 ? "系统角色" : "自定义"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={role.status === 1 ? "default" : "secondary"}>
                      {role.status === 1 ? "正常" : "禁用"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (role.isSystem === 1) {
                            toast({
                              title: "无法编辑",
                              description: "系统角色不允许编辑",
                              variant: "destructive",
                            })
                            return
                          }
                          setEditingRole(role)
                          setFormData({
                            roleCode: role.roleCode,
                            roleName: role.roleName,
                            roleDesc: role.roleDesc || "",
                            sortOrder: role.sortOrder || 0,
                          })
                          setDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(role.id, role.isSystem)}>
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
