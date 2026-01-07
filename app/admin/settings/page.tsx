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
import { Textarea } from "@/components/ui/textarea"
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
import {
  pageReports,
  processReportWithRecord,
  getProcessRecords,
  type PublicReport,
  type ReportProcess,
} from "@/lib/api/report"
import { Loader2, Pencil, Trash2, UserPlus, Settings, CheckCircle2, Clock, AlertCircle, FileText } from "lucide-react"
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
  const [reports, setReports] = useState<PublicReport[]>([])
  const [selectedReport, setSelectedReport] = useState<PublicReport | null>(null)
  const [showProcessDialog, setShowProcessDialog] = useState(false)
  const [showRecordsDialog, setShowRecordsDialog] = useState(false)
  const [processRecords, setProcessRecords] = useState<ReportProcess[]>([])
  const [processForm, setProcessForm] = useState({
    processType: 1,
    processContent: "",
    processStatus: 1,
  })

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
      const [usersResult, rolesResult, deptResult, reportsResult] = await Promise.all([
        pageUsers({ current: 1, size: 100 }),
        pageRoles({ current: 1, size: 100 }),
        pageDepartments({ current: 1, size: 100 }),
        pageReports({ current: 1, size: 100 }),
      ])

      setUsers(usersResult.records)
      setRoles(rolesResult.records)
      setDepartments(deptResult.records)
      setReports(reportsResult.records)
    } catch (error) {
      toast({
        title: "加载数据失败",
        description: error instanceof Error ? error.message : "请重试",
        variant: "destructive",
      })
    }
  }

  const handleProcessReport = (report: PublicReport) => {
    setSelectedReport(report)
    setProcessForm({
      processType: 1,
      processContent: "",
      processStatus: report.processStatus === 0 ? 1 : report.processStatus,
    })
    setShowProcessDialog(true)
  }

  const handleViewRecords = async (report: PublicReport) => {
    setSelectedReport(report)
    try {
      const response = await getProcessRecords(report.id)
      if (response.code === 200 && response.data) {
        setProcessRecords(response.data)
        setShowRecordsDialog(true)
      }
    } catch (error) {
      toast({
        title: "加载失败",
        description: "无法加载处理记录",
        variant: "destructive",
      })
    }
  }

  const handleSubmitProcess = async () => {
    if (!selectedReport || !processForm.processContent) {
      toast({
        title: "提示",
        description: "请填写处理内容",
        variant: "destructive",
      })
      return
    }

    try {
      await processReportWithRecord({
        reportId: selectedReport.id,
        processType: processForm.processType,
        processContent: processForm.processContent,
        processStatus: processForm.processStatus,
      })

      toast({
        title: "成功",
        description: "上报处理成功",
      })

      setShowProcessDialog(false)
      await loadData()
    } catch (error) {
      toast({
        title: "处理失败",
        description: error instanceof Error ? error.message : "请重试",
        variant: "destructive",
      })
    }
  }

  const getReportTypeName = (type: number) => {
    const types: Record<number, string> = {
      1: "积水",
      2: "降雨",
      3: "交通",
      4: "灾害",
      5: "其他",
    }
    return types[type] || "未知"
  }

  const getSeverityName = (severity: number) => {
    const severities: Record<number, string> = {
      1: "轻微",
      2: "中等",
      3: "严重",
    }
    return severities[severity] || "未知"
  }

  const getVerifyStatusBadge = (status: number) => {
    if (status === 1) {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          已核实
        </Badge>
      )
    } else if (status === 2) {
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          不属实
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
        <Clock className="mr-1 h-3 w-3" />
        未核实
      </Badge>
    )
  }

  const getProcessStatusBadge = (status: number) => {
    if (status === 2) {
      return <Badge variant="default">已处理</Badge>
    } else if (status === 1) {
      return <Badge variant="secondary">处理中</Badge>
    } else if (status === 3) {
      return <Badge variant="outline">已关闭</Badge>
    }
    return <Badge variant="destructive">待处理</Badge>
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
            <TabsTrigger value="reports">公众上报处理</TabsTrigger>
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

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>上报ID</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>标题</TableHead>
                    <TableHead>位置</TableHead>
                    <TableHead>严重程度</TableHead>
                    <TableHead>核实状态</TableHead>
                    <TableHead>处理状态</TableHead>
                    <TableHead>上报时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                        暂无上报数据
                      </TableCell>
                    </TableRow>
                  ) : (
                    reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-mono text-xs">{report.reportId}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{getReportTypeName(report.reportType)}</Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">{report.title}</TableCell>
                        <TableCell className="max-w-[150px] truncate">{report.locationName}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              report.severity === 3 ? "destructive" : report.severity === 2 ? "secondary" : "outline"
                            }
                          >
                            {getSeverityName(report.severity)}
                          </Badge>
                        </TableCell>
                        <TableCell>{getVerifyStatusBadge(report.verifyStatus)}</TableCell>
                        <TableCell>{getProcessStatusBadge(report.processStatus)}</TableCell>
                        <TableCell className="text-sm">{report.reportTime}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewRecords(report)}
                              title="查看记录"
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => handleProcessReport(report)}
                              title="处理上报"
                            >
                              <CheckCircle2 className="h-4 w-4" />
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

      <Dialog open={showProcessDialog} onOpenChange={setShowProcessDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>处理上报</DialogTitle>
            <DialogDescription>核实并处理公众上报信息</DialogDescription>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-md">
                <div className="text-sm font-medium mb-1">{selectedReport.title}</div>
                <div className="text-xs text-muted-foreground">{selectedReport.locationName}</div>
                <div className="text-xs text-muted-foreground mt-1">{selectedReport.content}</div>
              </div>

              <div>
                <Label>处理类型</Label>
                <Select
                  value={String(processForm.processType)}
                  onValueChange={(val) => setProcessForm({ ...processForm, processType: Number(val) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">接收</SelectItem>
                    <SelectItem value="2">派单</SelectItem>
                    <SelectItem value="3">现场处理</SelectItem>
                    <SelectItem value="4">完成</SelectItem>
                    <SelectItem value="5">回访</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>处理状态</Label>
                <Select
                  value={String(processForm.processStatus)}
                  onValueChange={(val) => setProcessForm({ ...processForm, processStatus: Number(val) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">待处理</SelectItem>
                    <SelectItem value="1">处理中</SelectItem>
                    <SelectItem value="2">已处理</SelectItem>
                    <SelectItem value="3">已关闭</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>处理描述 *</Label>
                <Textarea
                  value={processForm.processContent}
                  onChange={(e) => setProcessForm({ ...processForm, processContent: e.target.value })}
                  placeholder="请详细描述处理过程和结果"
                  rows={4}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProcessDialog(false)}>
              取消
            </Button>
            <Button onClick={handleSubmitProcess}>提交处理</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showRecordsDialog} onOpenChange={setShowRecordsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>处理记录</DialogTitle>
            <DialogDescription>查看上报的所有处理记录</DialogDescription>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-md">
                <div className="text-sm font-medium mb-1">{selectedReport.title}</div>
                <div className="text-xs text-muted-foreground">{selectedReport.locationName}</div>
              </div>

              {processRecords.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertCircle className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>暂无处理记录</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {processRecords.map((record) => (
                    <div key={record.id} className="border rounded-lg p-3 bg-muted/30">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="outline">{record.processTypeName}</Badge>
                        <span className="text-xs text-muted-foreground">{record.processTime}</span>
                      </div>
                      <p className="text-sm mb-2">{record.processContent}</p>
                      <div className="text-xs text-muted-foreground">
                        处理人：{record.processorName} {record.processorDept && `(${record.processorDept})`}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
