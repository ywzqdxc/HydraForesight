"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { pageUsers, getCurrentUser, setUserRole, removeUserRole, pageRoles } from "@/lib/api"
import { Loader2 } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  const [users, setUsers] = useState<any[]>([])
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [userRoles, setUserRoles] = useState<string[]>([])
  const [showUserRoleDialog, setShowUserRoleDialog] = useState(false)
  const [roles, setRoles] = useState<any[]>([])
  const [availableRoles, setAvailableRoles] = useState<any[]>([])

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const user = await getCurrentUser()
      const userRoles = await getUserRoles(user.id)

      if (userRoles.includes("admin") || userRoles.includes("super_admin")) {
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
      const usersResult = await pageUsers({ current: 1, size: 100 })
      setUsers(usersResult.records)

      const rolesResult = await pageRoles({ current: 1, size: 100 })
      setRoles(rolesResult.records)
      setAvailableRoles(rolesResult.records)
    } catch (error) {
      toast({
        title: "加载数据失败",
        description: error instanceof Error ? error.message : "请重试",
        variant: "destructive",
      })
    }
  }

  const getUserRoles = async (userId: number) => {
    const roles = await import("@/lib/api").then((m) => m.getUserRoles(userId))
    return roles || []
  }

  const handleSetUserRole = async (roleId: number) => {
    if (!selectedUser) return
    try {
      await setUserRole(selectedUser.id, roleId)
      toast({
        title: "成功",
        description: "用户角色设置成功",
      })
      setShowUserRoleDialog(false)
      await loadData()
    } catch (error) {
      toast({
        title: "设置失败",
        description: error instanceof Error ? error.message : "请重试",
        variant: "destructive",
      })
    }
  }

  const handleRemoveUserRole = async (roleId: number) => {
    if (!selectedUser) return
    try {
      await removeUserRole(selectedUser.id, roleId)
      toast({
        title: "成功",
        description: "用户角色移除成功",
      })
      setShowUserRoleDialog(false)
      await loadData()
    } catch (error) {
      toast({
        title: "移除失败",
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

  if (!isAdmin) {
    return null
  }

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

          {/* 用户管理标签页 */}
          <TabsContent value="users" className="space-y-4">
            <div className="grid gap-4">
              {users.map((user) => (
                <Card key={user.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{user.realName || user.username}</h3>
                      <p className="text-sm text-muted-foreground">ID: {user.userId}</p>
                      <p className="text-sm text-muted-foreground">邮箱: {user.email}</p>
                    </div>
                    <Button
                      onClick={() => {
                        setSelectedUser(user)
                        setShowUserRoleDialog(true)
                      }}
                    >
                      配置角色
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 角色管理标签页 */}
          <TabsContent value="roles" className="space-y-4">
            <div className="grid gap-4">
              {roles.map((role) => (
                <Card key={role.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{role.roleName}</h3>
                      <p className="text-sm text-muted-foreground">{role.roleDesc}</p>
                      <p className="text-sm text-muted-foreground">编码: {role.roleCode}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 部门管理标签页 */}
          <TabsContent value="departments" className="space-y-4">
            <div className="text-muted-foreground">部门管理功能即将推出</div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 用户角色编辑对话框 */}
      <Dialog open={showUserRoleDialog} onOpenChange={setShowUserRoleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>配置用户角色</DialogTitle>
            <DialogDescription>为 {selectedUser?.realName || selectedUser?.username} 配置角色</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">可用角色</h4>
              <div className="space-y-2">
                {availableRoles.map((role) => (
                  <div key={role.id} className="flex items-center justify-between p-2 border rounded">
                    <span>{role.roleName}</span>
                    {userRoles.includes(role.roleCode) ? (
                      <Button size="sm" variant="outline" onClick={() => handleRemoveUserRole(role.id)}>
                        移除
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => handleSetUserRole(role.id)}>
                        添加
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
