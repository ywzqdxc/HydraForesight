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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Search, Edit, Trash2, Loader2, Shield } from "lucide-react"
import { pageUsers, createUser, updateUser, deleteUser, setUserRole, removeUserRole, type User } from "@/lib/api/user"
import { listDepartments, type Department } from "@/lib/api/department"
import { listRoles, type Role } from "@/lib/api/role"
import { useToast } from "@/hooks/use-toast"

export default function UserManagement() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([])

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    realName: "",
    email: "",
    phone: "",
    deptId: 0,
  })

  useEffect(() => {
    loadUsers()
    loadDepartments()
    loadRoles()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await pageUsers({ current: 1, size: 100 })
      setUsers(data.records)
    } catch (error: any) {
      toast({
        title: "加载失败",
        description: error.message || "无法加载用户列表",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const loadDepartments = async () => {
    try {
      const data = await listDepartments()
      setDepartments(data)
    } catch (error) {
      console.error("Failed to load departments:", error)
    }
  }

  const loadRoles = async () => {
    try {
      const data = await listRoles()
      setRoles(data)
    } catch (error) {
      console.error("Failed to load roles:", error)
    }
  }

  const handleRoleToggle = (roleId: number) => {
    setSelectedRoleIds((prev) => (prev.includes(roleId) ? prev.filter((id) => id !== roleId) : [...prev, roleId]))
  }

  const handleSubmit = async () => {
    try {
      if (editingUser) {
        await updateUser({ id: editingUser.id, ...formData })

        // 更新用户角色
        const currentRoleIds = editingUser.roles?.map((r) => r.id) || []
        const rolesToAdd = selectedRoleIds.filter((id) => !currentRoleIds.includes(id))
        const rolesToRemove = currentRoleIds.filter((id) => !selectedRoleIds.includes(id))

        for (const roleId of rolesToAdd) {
          await setUserRole(editingUser.id, roleId)
        }
        for (const roleId of rolesToRemove) {
          await removeUserRole(editingUser.id, roleId)
        }

        toast({ title: "更新成功", description: "用户信息已更新" })
      } else {
        const userId = await createUser({ ...formData, roleIds: selectedRoleIds })
        toast({ title: "创建成功", description: "用户已创建" })
      }
      setDialogOpen(false)
      resetForm()
      loadUsers()
    } catch (error: any) {
      toast({
        title: "操作失败",
        description: error.message || "操作失败，请稍后重试",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("确定要删除此用户吗？")) return

    try {
      await deleteUser(id)
      toast({ title: "删除成功", description: "用户已删除" })
      loadUsers()
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
      username: "",
      password: "",
      realName: "",
      email: "",
      phone: "",
      deptId: 0,
    })
    setEditingUser(null)
    setSelectedRoleIds([])
  }

  const getDeptName = (deptId: number) => {
    const dept = departments.find((d) => d.id === deptId)
    return dept?.deptName || "-"
  }

  const getRoleNames = (userRoles?: Role[]) => {
    if (!userRoles || userRoles.length === 0) return "-"
    return userRoles.map((r) => r.roleName).join(", ")
  }

  const isSuperAdmin = (userRoles?: Role[]) => {
    return userRoles?.some((r) => r.roleCode === "ROLE_SUPER_ADMIN") || false
  }

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.realName?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>用户管理</CardTitle>
            <CardDescription>管理系统用户账号和角色权限</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                添加用户
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingUser ? "编辑用户" : "添加用户"}</DialogTitle>
                <DialogDescription>填写用户信息并分配角色</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">用户名</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      disabled={!!editingUser}
                    />
                  </div>
                  {!editingUser && (
                    <div className="grid gap-2">
                      <Label htmlFor="password">密码</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </div>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="realName">真实姓名</Label>
                    <Input
                      id="realName"
                      value={formData.realName}
                      onChange={(e) => setFormData({ ...formData, realName: e.target.value })}
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
                    <Label htmlFor="phone">手机号</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="deptId">所属部门</Label>
                    <Select
                      value={formData.deptId.toString()}
                      onValueChange={(value) => setFormData({ ...formData, deptId: Number.parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">无部门</SelectItem>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id.toString()}>
                            {dept.deptName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    分配角色
                  </Label>
                  <div className="border rounded-lg p-4 space-y-3">
                    {roles.map((role) => (
                      <div key={role.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`role-${role.id}`}
                          checked={selectedRoleIds.includes(role.id)}
                          onCheckedChange={() => handleRoleToggle(role.id)}
                        />
                        <label
                          htmlFor={`role-${role.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                        >
                          <div className="flex items-center justify-between">
                            <span>{role.roleName}</span>
                            {role.roleCode === "ROLE_SUPER_ADMIN" && (
                              <Badge variant="destructive" className="ml-2">
                                超级管理员
                              </Badge>
                            )}
                            {role.isSystem === 1 && (
                              <Badge variant="secondary" className="ml-2">
                                系统角色
                              </Badge>
                            )}
                          </div>
                          {role.roleDesc && <p className="text-xs text-muted-foreground mt-1">{role.roleDesc}</p>}
                        </label>
                      </div>
                    ))}
                  </div>
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
              placeholder="搜索用户..."
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
                <TableHead>用户名</TableHead>
                <TableHead>真实姓名</TableHead>
                <TableHead>邮箱</TableHead>
                <TableHead>手机号</TableHead>
                <TableHead>部门</TableHead>
                <TableHead>角色</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {user.username}
                      {isSuperAdmin(user.roles) && <Shield className="h-4 w-4 text-destructive" />}
                    </div>
                  </TableCell>
                  <TableCell>{user.realName || "-"}</TableCell>
                  <TableCell>{user.email || "-"}</TableCell>
                  <TableCell>{user.phone || "-"}</TableCell>
                  <TableCell>{getDeptName(user.deptId)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.roles && user.roles.length > 0 ? (
                        user.roles.map((role) => (
                          <Badge
                            key={role.id}
                            variant={role.roleCode === "ROLE_SUPER_ADMIN" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {role.roleName}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">无角色</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 1 ? "default" : "secondary"}>
                      {user.status === 1 ? "正常" : "禁用"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingUser(user)
                          setFormData({
                            username: user.username,
                            password: "",
                            realName: user.realName || "",
                            email: user.email || "",
                            phone: user.phone || "",
                            deptId: user.deptId,
                          })
                          setSelectedRoleIds(user.roles?.map((r) => r.id) || [])
                          setDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
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
