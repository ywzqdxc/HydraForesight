"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Shield, Building2 } from "lucide-react"
import DepartmentManagement from "@/components/settings/department-management"
import UserManagement from "@/components/settings/user-management"
import RoleManagement from "@/components/settings/role-management"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">系统设置</h1>
            <p className="text-muted-foreground">管理系统的用户、角色和部门</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
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
          </Tabs>
        </div>
      </main>
    </div>
  )
}
