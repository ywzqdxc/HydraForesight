"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Shield, Building2, FileText, Bell, BookOpen, Loader2 } from "lucide-react"
import DepartmentManagement from "@/components/settings/department-management"
import UserManagement from "@/components/settings/user-management"
import RoleManagement from "@/components/settings/role-management"
import ReportManagement from "@/components/settings/report-management"
import AlertManagement from "@/components/settings/alert-management"
import KnowledgeManagement from "@/components/settings/knowledge-management"
import { getCurrentUser } from "@/lib/api/user"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("users")
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)

  useEffect(() => {
    checkAccess()
  }, [])

  const checkAccess = async () => {
    try {
      const user = await getCurrentUser()

      if (!user.roles || user.roles.length === 0) {
        setHasAccess(false)
        return
      }

      const isSuperAdmin = user.roles.some((role) => role.roleCode === "ROLE_SUPER_ADMIN")
      const isAdmin = user.roles.some((role) => role.roleCode === "ROLE_ADMIN")

      setIsSuperAdmin(isSuperAdmin)
      setHasAccess(isSuperAdmin || isAdmin)
    } catch (error) {
      console.error("检查访问权限失败:", error)
      setHasAccess(false)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container py-6 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </main>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container py-6">
          <Alert variant="destructive">
            <Shield className="h-4 w-4" />
            <AlertDescription>您没有权限访问系统设置。只有超级管理员和系统管理员才能访问此页面。</AlertDescription>
          </Alert>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">系统设置</h1>
            <p className="text-muted-foreground">
              管理系统的用户、角色、部门、公众上报、预警和知识科普
              {isSuperAdmin && <span className="ml-2 text-destructive font-medium">（超级管理员权限）</span>}
            </p>
          </div>

          {/* // 添加知识科普管理标签页 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                用户管理
              </TabsTrigger>
              <TabsTrigger value="roles" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                角色管理
              </TabsTrigger>
              <TabsTrigger value="departments" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                部门管理
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                公众上报处理
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                预警管理
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                知识科普管理
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-6">
              <UserManagement />
            </TabsContent>

            <TabsContent value="roles" className="mt-6">
              <RoleManagement />
            </TabsContent>

            <TabsContent value="departments" className="mt-6">
              <DepartmentManagement />
            </TabsContent>

            <TabsContent value="reports" className="mt-6">
              <ReportManagement />
            </TabsContent>

            <TabsContent value="alerts" className="mt-6">
              <AlertManagement />
            </TabsContent>

            {/* // 新增知识科普管理内容区域 */}
            <TabsContent value="knowledge" className="mt-6">
              <KnowledgeManagement />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
