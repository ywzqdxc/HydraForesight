"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { CloudRain, Droplets, AlertTriangle, Zap, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getLatestAlerts, type AlertRecord, ALERT_TYPE_MAP, ALERT_LEVEL_MAP } from "@/lib/api/alert"

// 图标映射
const ALERT_ICON_MAP: Record<number, React.ReactNode> = {
  1: <CloudRain className="h-4 w-4" />,
  2: <Droplets className="h-4 w-4" />,
  3: <Droplets className="h-4 w-4" />,
  4: <Zap className="h-4 w-4" />,
  5: <AlertTriangle className="h-4 w-4" />,
}

// 颜色映射
const LEVEL_COLOR_MAP: Record<number, string> = {
  1: "blue",
  2: "yellow",
  3: "orange",
  4: "red",
}

// 格式化时间
function formatAlertTime(timeStr: string): string {
  if (!timeStr) return ""
  const date = new Date(timeStr)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()

  if (isToday) {
    return `今天, ${date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}`
  }
  return date.toLocaleString("zh-CN", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })
}

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState<AlertRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAlerts()
  }, [])

  const fetchAlerts = async () => {
    try {
      const res = await getLatestAlerts(5)
      if (res.code === 200 && res.data) {
        setAlerts(res.data)
      }
    } catch (error) {
      console.error("获取预警列表失败:", error)
      // 如果API失败，使用默认数据
      setAlerts([
        {
          id: 1,
          alertId: "ALT001",
          alertType: 1,
          alertLevel: 4,
          areaName: "市中区",
          title: "暴雨红色预警",
          content: "预计未来6小时市中区将出现暴雨到大暴雨，累积降水量可达100-150毫米，请注意防范。",
          triggerTime: new Date().toISOString(),
          publishTime: new Date().toISOString(),
          status: 1,
          viewCount: 0,
          createTime: new Date().toISOString(),
        },
        {
          id: 2,
          alertId: "ALT002",
          alertType: 3,
          alertLevel: 2,
          areaName: "黄石坡",
          title: "内涝黄色预警",
          content: "黄石坡多处低洼地带已出现积水，部分道路交通受阻，请注意绕行。",
          triggerTime: new Date().toISOString(),
          publishTime: new Date().toISOString(),
          status: 1,
          viewCount: 0,
          createTime: new Date().toISOString(),
        },
        {
          id: 3,
          alertId: "ALT003",
          alertType: 4,
          alertLevel: 3,
          areaName: "乐山市",
          title: "雷电橙色预警",
          content: "预计未来6小时乐山市将出现强雷电活动，局部地区可能伴有短时强降水和大风。",
          triggerTime: new Date().toISOString(),
          publishTime: new Date().toISOString(),
          status: 1,
          viewCount: 0,
          createTime: new Date().toISOString(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (alerts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">暂无预警信息</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {alerts.map((alert) => {
        const color = LEVEL_COLOR_MAP[alert.alertLevel] || "gray"
        const icon = ALERT_ICON_MAP[alert.alertType] || <AlertTriangle className="h-4 w-4" />
        const typeName = ALERT_TYPE_MAP[alert.alertType] || "预警"
        const levelName = ALERT_LEVEL_MAP[alert.alertLevel]?.name || ""

        return (
          <div
            key={alert.id}
            className={`p-2 rounded-md ${
              color === "red"
                ? "bg-red-50 border border-red-100 dark:bg-red-900/20 dark:border-red-800"
                : color === "yellow"
                  ? "bg-yellow-50 border border-yellow-100 dark:bg-yellow-900/20 dark:border-yellow-800"
                  : color === "orange"
                    ? "bg-orange-50 border border-orange-100 dark:bg-orange-900/20 dark:border-orange-800"
                    : "bg-blue-50 border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <div
                  className={`p-1 rounded-full ${
                    color === "red"
                      ? "bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-300"
                      : color === "yellow"
                        ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-800 dark:text-yellow-300"
                        : color === "orange"
                          ? "bg-orange-100 text-orange-600 dark:bg-orange-800 dark:text-orange-300"
                          : "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300"
                  }`}
                >
                  {icon}
                </div>
                <div>
                  <div className="text-xs font-medium">{typeName}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {formatAlertTime(alert.publishTime || alert.triggerTime)}
                  </div>
                </div>
              </div>
              <Badge
                variant={color === "red" ? "destructive" : color === "yellow" ? "warning" : "destructive"}
                className="text-[10px] py-0 px-1 h-4"
              >
                {levelName}预警
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground line-clamp-2">{alert.content}</p>
          </div>
        )
      })}
      <div className="text-center pt-1">
        <a
          href="/alerts/dashboard"
          className="text-[11px] text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          查看更多预警信息
        </a>
      </div>
    </div>
  )
}
