import { CloudRain, Droplets, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AlertsPanel() {
  const alerts = [
    {
      id: 1,
      type: "暴雨",
      severity: "红色预警",
      time: "今天, 上午8:30",
      description: "预计未来6小时市中区将出现暴雨到大暴雨，累积降水量可达100-150毫米，请注意防范。",
      icon: <CloudRain className="h-4 w-4" />,
      color: "red",
    },
    {
      id: 2,
      type: "城市内涝",
      severity: "黄色预警",
      time: "今天, 上午9:00",
      description: "黄石坡多处低洼地带已出现积水，部分道路交通受阻，请注意绕行。",
      icon: <Droplets className="h-4 w-4" />,
      color: "yellow",
    },
    {
      id: 3,
      type: "雷电",
      severity: "橙色预警",
      time: "今天, 上午7:30",
      description: "预计未来6小时乐山市将出现雷电市将出现强雷电活动，局部地区可能伴有短时强降水和大风。",
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "orange",
    },
  ]

  return (
    <div className="space-y-2">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-2 rounded-md ${
            alert.color === "red"
              ? "bg-red-50 border border-red-100 dark:bg-red-900/20 dark:border-red-800"
              : alert.color === "yellow"
                ? "bg-yellow-50 border border-yellow-100 dark:bg-yellow-900/20 dark:border-yellow-800"
                : "bg-orange-50 border border-orange-100 dark:bg-orange-900/20 dark:border-orange-800"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <div
                className={`p-1 rounded-full ${
                  alert.color === "red"
                    ? "bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-300"
                    : alert.color === "yellow"
                      ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-800 dark:text-yellow-300"
                      : "bg-orange-100 text-orange-600 dark:bg-orange-800 dark:text-orange-300"
                }`}
              >
                {alert.icon}
              </div>
              <div>
                <div className="text-xs font-medium">{alert.type}</div>
                <div className="text-[10px] text-muted-foreground">{alert.time}</div>
              </div>
            </div>
            <Badge
              variant={alert.color === "red" ? "destructive" : alert.color === "yellow" ? "warning" : "destructive"}
              className="text-[10px] py-0 px-1 h-4"
            >
              {alert.severity}
            </Badge>
          </div>
          <p className="text-[11px] text-muted-foreground line-clamp-2">{alert.description}</p>
        </div>
      ))}
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

