"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, getUserRoles as fetchUserRoles } from "@/lib/api"

interface AdminGuardProps {
  children: React.ReactNode
}

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const user = await getCurrentUser()
      const roles = await fetchUserRoles(user.id)

      if (roles.includes("admin") || roles.includes("super_admin")) {
        setIsAdmin(true)
      } else {
        router.push("/")
      }
    } catch (error) {
      console.error("检查管理员权限失败:", error)
      router.push("/")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>加载中...</div>
  }

  if (!isAdmin) {
    return null
  }

  return <>{children}</>
}
