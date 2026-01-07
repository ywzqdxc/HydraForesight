"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import {
  pageUsers,
  getCurrentUser,
  setUserRole,
  removeUserRole,
  pageRoles,
  createUser,
  updateUser,
  deleteUser,
} from "@/lib/api/user"
import { pageDepartments } from "@/lib/api/department"
import { Loader2, Pencil, Trash2, UserPlus, Settings } from "lucide-react"
import type { User, Role } from "@/lib/api/user"
import type { Department } from "@/lib/api/department"

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  const [users, setUsers] = useState<User[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [departments, setDepartments] = useState<Department[]>([])

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserDialog, setShowUserDialog] = useState(false)
  const [showUserRoleDialog, setShowUserRoleDialog] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
    realName: "",
    email: "",
    phone: "",
    deptId: "",
    selectedRoleIds: [] as number[],
  })

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const user = await getCurrentUser()
      const isAdminUser = user.roles?.some((r) => r.roleCode === "admin" || r.roleCode === "super_admin")

      if (isAdminUser) {
        setIsAdmin(true)
        await loadData()
      } else {
        toast({
          title: "权限不足",
          description: "只有超级管理员可访问系统设置",
          variant: "destructive",
        })
        router.push("/")
      }
    } catch (error) {
      console.error("检查权限失败:", error)
      router.push("/")
    } finally {
      setLoading(false)
    }
  }

  const loadData = async () => {
    try {
      const [usersResult, rolesResult, deptResult] = await Promise.all([
        pageUsers({ current: 1, size: 100 }),
        pageRoles({ current: 1, size: 100 }),
        pageDepartments({ current: 1, size: 100 }),
      ])

      setUsers(usersResult.records)
      setRoles(rolesResult.records)
      setDepartments(deptResult.records)
    } catch (error) {
      toast({
        title: "加载数据失败",
        description: error instanceof Error ? error.message : "请重试",
        variant: "destructive",
      })
    }
  }

  const handleCreateUser = () => {
    setIsEditMode(false)
    setUserForm({
      username: "",
      password: "",
      realName: "",
      email: "",
      phone: "",
      deptId: "",
      selectedRoleIds: [],
    })
    setShowUserDialog(true)
  }

  const handleEditUser = (user: User) => {
    setIsEditMode(true)
    setSelectedUser(user)
    setUserForm({
      username: user.username,
      password: "",
      realName: user.realName || "",
      email: user.email || "",
      phone: user.phone || "",
      deptId: user.deptId?.toString() || "",
      selectedRoleIds: user.roles?.map((r) => r.id) || [],
    })
    setShowUserDialog(true)
  }

  const handleSaveUser = async () => {
    try {
      if (isEditMode && selectedUser) {
        await updateUser({
          id: selectedUser.id,
          realName: userForm.realName,
          email: userForm.email,
          phone: userForm.phone,
          deptId: userForm.deptId ? Number.parseInt(userForm.deptId) : undefined,
        })

        const currentRoleIds = selectedUser.roles?.map((r) => r.id) || []
        const toAdd = userForm.selectedRoleIds.filter((id) => !currentRoleIds.includes(id))
        const toRemove = currentRoleIds.filter((id) => !userForm.selectedRoleIds.includes(id))

        for (const roleId of toAdd) {
          await setUserRole(selectedUser.id, roleId)
        }
        for (const roleId of toRemove) {
          await removeUserRole(selectedUser.id, roleId)
        }

        toast({ title: "成功", description: "用户更新成功" })
      } else {
        const userId = await createUser({
          username: userForm.username,
          password: userForm.password,
          realName: userForm.realName,
          email: userForm.email,
          phone: userForm.phone,
          deptId: userForm.deptId ? Number.parseInt(userForm.deptId) : undefined,
        })

        for (const roleId of userForm.selectedRoleIds) {
          await setUserRole(userId, roleId)
        }

        toast({ title: "成功", description: "用户创建成功" })
      }

      setShowUserDialog(false)
      await loadData()
    } catch (error) {
      toast({
        title: "操作失败",
        description: error instanceof Error ? error.message : "请重试",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("确定要删除该用户吗？")) return

    try {
      await deleteUser(userId)
      toast({ title: "成功", description: "用户已删除" })
      await loadData()
    } catch (error) {
      toast({
        title: "删除失败",
        description: error instanceof Error ? error.message : "请重试",
        variant: "destructive",
      })
    }
  }

  const handleConfigureRoles = (user: User) => {
    setSelectedUser(user)
    setShowUserRoleDialog(true)
  }

  const handleToggleRole = async (roleId: number) => {
    if (!selectedUser) return

    const hasRole = selectedUser.roles?.some((r) => r.id === roleId)

    try {
      if (hasRole) {
        await removeUserRole(selectedUser.id, roleId)
        toast({ title: "成功", description: "角色已移除" })
      } else {
        await setUserRole(selectedUser.id, roleId)
        toast({ title: "成功", description: "角色已添加" })
      }

      await loadData()
      // 更新 selectedUser 以保持对话框内的数据同步
      const updatedUsers = await pageUsers({ current: 1, size: 100 })
      const updatedUser = updatedUsers.records.find((u) => u.id === selectedUser.id)
      if (updatedUser) setSelectedUser(updatedUser)
    } catch (error) {
      toast({
        title: "操作失败",
        description: error instanceof Error ? error.message : "请重试",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!isAdmin) return null

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">系统设置</h1>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">用户管理</TabsTrigger>
            <TabsTrigger value="roles">角色管理</TabsTrigger>
            <TabsTrigger value="departments">部门管理</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-end mb-4">
              <Button onClick={handleCreateUser}>
                <UserPlus className="mr-2 h-4 w-4" />
                添加用户
              </Button>
            </div>

            <Card>
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
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                        暂无用户数据
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell>{user.realName || "-"}</TableCell>
                        <TableCell>{user.email || "-"}</TableCell>
                        <TableCell>{user.phone || "-"}</TableCell>
                        <TableCell>{user.deptName || "-"}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {user.roles && user.roles.length > 0 ? (
                              user.roles.map((role) => (
                                <Badge key={role.id} variant="secondary" className="text-xs">
                                  {role.roleName}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-muted-foreground text-sm">未分配</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === 1 ? "default" : "destructive"}>
                            {user.status === 1 ? "正常" : "禁用"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleConfigureRoles(user)}
                              title="配置角色"
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleEditUser(user)} title="编辑用户">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteUser(user.id)}
                              title="删除用户"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-4">
            <div className="grid gap-4">
              {roles.map((role) => (
                <Card key={role.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{role.roleName}</h3>
                      <p className="text-sm text-muted-foreground">{role.roleDesc}</p>
                      <p className="text-sm text-muted-foreground">编码: {role.roleCode}</p>
                      {role.isSystem && <span className="text-xs text-amber-600">系统角色</span>}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-4">
            <div className="grid gap-4">
              {departments.map((dept) => (
                <Card key={dept.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{dept.deptName}</h3>
                      <p className="text-sm text-muted-foreground">{dept.deptDesc || "暂无描述"}</p>
                      <p className="text-sm text-muted-foreground">负责人: {dept.leader || "未设置"}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 添加/编辑用户对话框 */}
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "编辑用户" : "添加用户"}</DialogTitle>
            <DialogDescription>{isEditMode ? "修改用户信息和角色" : "创建新用户并分配角色"}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div>
              <Label>用户名 {!isEditMode && <span className="text-red-500">*</span>}</Label>
              <Input
                value={userForm.username}
                onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                disabled={isEditMode}
                placeholder="请输入用户名"
              />
            </div>

            {!isEditMode && (
              <div>
                <Label>
                  密码 <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="password"
                  value={userForm.password}
                  onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                  placeholder="请输入密码"
                />
              </div>
            )}

            <div>
              <Label>真实姓名</Label>
              <Input
                value={userForm.realName}
                onChange={(e) => setUserForm({ ...userForm, realName: e.target.value })}
                placeholder="请输入真实姓名"
              />
            </div>

            <div>
              <Label>邮箱</Label>
              <Input
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                placeholder="请输入邮箱"
              />
            </div>

            <div>
              <Label>手机号</Label>
              <Input
                value={userForm.phone}
                onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                placeholder="请输入手机号"
              />
            </div>

            <div>
              <Label>所属部门</Label>
              <Select value={userForm.deptId} onValueChange={(val) => setUserForm({ ...userForm, deptId: val })}>
                <SelectTrigger>
                  <SelectValue placeholder="选择部门" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id.toString()}>
                      {dept.deptName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>分配角色</Label>
              <div className="space-y-2 mt-2 border rounded-md p-3">
                {roles.length === 0 ? (
                  <p className="text-sm text-muted-foreground">暂无可分配的角色</p>
                ) : (
                  roles.map((role) => (
                    <div key={role.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`role-${role.id}`}
                        checked={userForm.selectedRoleIds.includes(role.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setUserForm({
                              ...userForm,
                              selectedRoleIds: [...userForm.selectedRoleIds, role.id],
                            })
                          } else {
                            setUserForm({
                              ...userForm,
                              selectedRoleIds: userForm.selectedRoleIds.filter((id) => id !== role.id),
                            })
                          }
                        }}
                      />
                      <Label htmlFor={`role-${role.id}`} className="cursor-pointer flex-1">
                        <span>{role.roleName}</span>
                        {role.roleDesc && <span className="text-xs text-muted-foreground ml-2">({role.roleDesc})</span>}
                      </Label>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUserDialog(false)}>
              取消
            </Button>
            <Button onClick={handleSaveUser}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 快速配置角色对话框 */}
      <Dialog open={showUserRoleDialog} onOpenChange={setShowUserRoleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>配置用户角色</DialogTitle>
            <DialogDescription>为 {selectedUser?.realName || selectedUser?.username} 配置角色</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            {roles.map((role) => {
              const hasRole = selectedUser?.roles?.some((r) => r.id === role.id)
              return (
                <div key={role.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium">{role.roleName}</div>
                    <div className="text-sm text-muted-foreground">{role.roleDesc}</div>
                  </div>
                  <Button
                    size="sm"
                    variant={hasRole ? "destructive" : "default"}
                    onClick={() => handleToggleRole(role.id)}
                  >
                    {hasRole ? "移除" : "添加"}
                  </Button>
                </div>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
