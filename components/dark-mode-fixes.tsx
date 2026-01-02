"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

export function DarkModeFixes() {
  const { theme } = useTheme()

  useEffect(() => {
    // 修复夜间模式下的图表和地图颜色
    const updateMapColors = () => {
      const isDark = document.documentElement.classList.contains("dark")

      // 找到所有地图和图表容器，调整背景色
      const mapContainers = document.querySelectorAll(".bg-slate-100")
      mapContainers.forEach((container) => {
        if (isDark) {
          container.classList.remove("bg-slate-100")
          container.classList.add("bg-slate-800")
        } else {
          container.classList.remove("bg-slate-800")
          container.classList.add("bg-slate-100")
        }
      })
    }

    // 主题变化时更新颜色
    updateMapColors()

    // 监听主题变化
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          updateMapColors()
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => {
      observer.disconnect()
    }
  }, [theme])

  return null
}
