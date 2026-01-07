"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Phone, Key, Save, Loader2, Settings, Shield } from "lucide-react"
import Link from "next/link"
import {
  getCurrentUser,
  updateProfile,
  updatePassword,
  type UserProfile,
  type UpdateProfileRequest,
  type UpdatePasswordRequest,
} from "@/lib/api/user"
import { useToast } from "@/hooks/use-toast"
import { getDepartment } from "@/lib/api/department"
import { getRolesByUserId } from "@/lib/api/role"

export default function ProfilePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [profileLoading, setProfileLoading] = useState(true)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [department, setDepartment] = useState<string>("")
  const [roles, setRoles] = useState<string[]>([])

  // 表单状态
  const [formData, setFormData] = useState({
    realName: "",
    nickname: "",
    email: "",
    phone: "",
    gender: 0,
  })

  // 密码表单状态
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = async () => {
    try {
      setProfileLoading(true)
      const data = await getCurrentUser()
      setUserProfile(data)
      setFormData({
        realName: data.realName || "",
        nickname: data.nickname || "",
        email: data.email || "",
        phone: data.phone || "",
        gender: data.gender || 0,
      })

      if (data.deptId) {
        try {
          const deptData = await getDepartment(data.deptId)
          setDepartment(deptData.deptName)
        } catch (error) {
          console.error("Failed to load department:", error)
        }
      }

      if (data.id) {
        try {
          const rolesData = await getRolesByUserId(data.id)
          setRoles(rolesData.map((r) => r.roleName))
        } catch (error) {
          console.error("Failed to load roles:", error)
        }
      }
    } catch (error) {
      toast({
        title: "加载失败",
        description: "无法加载用户信息，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setProfileLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    if (!userProfile) return

    try {
      setLoading(true)
      const updateData: UpdateProfileRequest = {
        id: userProfile.id,
        ...formData,
      }
      await updateProfile(updateData)
      toast({
        title: "保存成功",
        description: "个人信息已更新",
      })
      // 重新加载用户信息
      await loadUserProfile()
    } catch (error: any) {
      toast({
        title: "保存失败",
        description: error.message || "保存个人信息失败，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePassword = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast({
        title: "验证失败",
        description: "请填写所有密码字段",
        variant: "destructive",
      })
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "验证失败",
        description: "两次输入的新密码不一致",
        variant: "destructive",
      })
      return
    }

    if (passwordForm.newPassword.length < 6) {
      toast({
        title: "验证失败",
        description: "新密码长度不能少于6位",
        variant: "destructive",
      })
      return
    }

    try {
      setPasswordLoading(true)
      const data: UpdatePasswordRequest = {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
      }
      await updatePassword(data)
      toast({
        title: "修改成功",
        description: "密码已更新，请使用新密码登录",
      })
      // 清空表单
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error: any) {
      toast({
        title: "修改失败",
        description: error.message || "修改密码失败，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setPasswordLoading(false)
    }
  }

  // 性别选项映射
  const getGenderText = (gender?: number) => {
    switch (gender) {
      case 1:
        return "男"
      case 2:
        return "女"
      default:
        return "未知"
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">个人资料</h1>
            <p className="text-muted-foreground">查看和管理您的个人信息</p>
          </div>

          {profileLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Tabs defaultValue="profile" className="w-full">
              <TabsList>
                <TabsTrigger value="profile">基本信息</TabsTrigger>
                <TabsTrigger value="security">安全设置</TabsTrigger>
                <TabsTrigger value="notifications">通知设置</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>个人信息</CardTitle>
                    <CardDescription>更新您的个人信息和联系方式</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex flex-col items-center gap-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage
                            src={userProfile?.avatarUrl || "/placeholder.svg?height=96&width=96"}
                            alt="用户头像"
                          />
                          <AvatarFallback className="text-2xl">
                            {userProfile?.nickname?.charAt(0) || userProfile?.username.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm" disabled>
                          更换头像
                        </Button>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="username">用户名</Label>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <Input id="username" value={userProfile?.username || ""} disabled />
                            </div>
                            <p className="text-xs text-muted-foreground">用户名不可修改</p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="realName">真实姓名</Label>
                            <Input
                              id="realName"
                              value={formData.realName}
                              onChange={(e) => setFormData({ ...formData, realName: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="nickname">昵称</Label>
                            <Input
                              id="nickname"
                              value={formData.nickname}
                              onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="gender">性别</Label>
                            <Select
                              value={formData.gender.toString()}
                              onValueChange={(value) => setFormData({ ...formData, gender: Number.parseInt(value) })}
                            >
                              <SelectTrigger id="gender">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0">未知</SelectItem>
                                <SelectItem value="1">男</SelectItem>
                                <SelectItem value="2">女</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">电子邮箱</Label>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">手机号码</Label>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="department">所属部门</Label>
                            <Input id="department" value={department || "暂无部门"} disabled />
                            <p className="text-xs text-muted-foreground">部门不可修改</p>
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="roles">角色</Label>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Shield className="h-4 w-4 text-muted-foreground" />
                              {roles.length > 0 ? (
                                roles.map((role, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm"
                                  >
                                    {role}
                                  </span>
                                ))
                              ) : (
                                <span className="text-muted-foreground text-sm">暂无角色</span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">角色不可修改，请联系管理员</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSaveProfile} disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          保存中...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          保存更改
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>修改密码</CardTitle>
                    <CardDescription>更新您的登录密码</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">当前密码</Label>
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="current-password"
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">新密码</Label>
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="new-password"
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">密码长度不能少于6位</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">确认新密码</Label>
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirm-password"
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleUpdatePassword} disabled={passwordLoading}>
                      {passwordLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          更新中...
                        </>
                      ) : (
                        "更新密码"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>通知设置</CardTitle>
                    <CardDescription>管理您接收的通知类型和方式</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">此功能正在开发中，敬请期待...</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
          <div className="flex justify-end mt-4">
            <Link href="/settings">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                系统设置
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
