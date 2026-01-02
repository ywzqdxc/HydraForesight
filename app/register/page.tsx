"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()

  useEffect(() => {
    // 重定向到登录页面的注册标签
    router.replace("/login")
  }, [router])

  return null
}
