"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  BarChart3,
  Battery,
  CheckCircle2,
  ChevronDown,
  Droplets,
  Filter,
  MapPin,
  Plus,
  Search,
  Settings,
  Signal,
  Thermometer,
  Wifi,
  XCircle,
  AlertCircle,
  ArrowUpDown,
  CloudRain,
  CameraIcon,
  Clock,
} from "lucide-react"
import { Header } from "@/components/header"

// 设备类型
type DeviceType = "all" | "rainfall" | "water-level" | "flow" | "weather" | "camera"

// 设备区域
type DeviceArea =
  | "all"
  | "longzihu"
  | "dongfengqu"
  | "science-avenue"
  | "longhu-avenue"
  | "ruyi-lake"
  | "longxiang-street"
  | "hanhai-road"

// 设备状态
type DeviceStatus = "all" | "online" | "offline" | "warning" | "maintenance"

// 设备接口
interface Device {
  id: string
  name: string
  type: Exclude<DeviceType, "all">
  area: Exclude<DeviceArea, "all">
  status: Exclude<DeviceStatus, "all">
  location: string
  lastUpdate: string
  battery?: number
  signal?: number
  readings?: {
    [key: string]: string | number
  }
  maintenance?: {
    scheduled?: string
    lastMaintenance?: string
  }
}

export default function DeviceManagementPage() {
  // 模拟设备数据
  const [allDevices, setAllDevices] = useState<Device[]>([
    // 保持原有的设备数据不变
    {
      id: "DEV001",
      name: "黄石坡 雷达雨量计",
      type: "rainfall",
      area: "longzihu",
      status: "online",
      location: "绿心公园西侧",
      lastUpdate: "2025-04-24 10:15:23",
      battery: 85,
      signal: 90,
      readings: {
        rainfall: "45mm/h",
        temperature: "26°C",
        humidity: "95%",
      },
    },
    {
      id: "DEV002",
      name: "月弦坝 浮子式水位计",
      type: "water-level",
      area: "dongfengqu",
      status: "warning",
      location: "大佛坝村大渡河南岸",
      lastUpdate: "2025-04-24 10:12:45",
      battery: 62,
      signal: 75,
      readings: {
        waterLevel: "3.9m",
        flow: "2.8m³/s",
        warning: "接近警戒水位",
      },
    },
    {
      id: "DEV003",
      name: "嘉州大道 地埋式道路积水监测仪",
      type: "flow",
      area: "science-avenue",
      status: "online",
      location: "嘉州大道排水管网监测点",
      lastUpdate: "2025-04-24 10:10:12",
      battery: 90,
      signal: 85,
      readings: {
        flow: "3.2m³/s",
        pressure: "0.8MPa",
        turbidity: "中",
      },
    },
    {
      id: "DEV004",
      name: "柏杨中路 多普勒超声波在线监测设备",
      type: "weather",
      area: "longhu-avenue",
      status: "online",
      location: "柏杨中路与嘉州大道交叉口",
      lastUpdate: "2025-04-24 10:14:56",
      battery: 78,
      signal: 92,
      readings: {
        temperature: "25.8°C",
        humidity: "92%",
        windSpeed: "5.2m/s",
        windDirection: "东南",
        pressure: "1002hPa",
      },
    },
    {
      id: "DEV005",
      name: "周河坎 监控摄像头",
      type: "camera",
      area: "ruyi-lake",
      status: "offline",
      location: "周河坎南岸观景台",
      lastUpdate: "2025-04-24 09:45:30",
      battery: 0,
      signal: 0,
      maintenance: {
        scheduled: "2025-04-24",
        lastMaintenance: "2025-03-15",
      },
    },
    {
      id: "DEV006",
      name: "王浩儿街 压电式雨量计",
      type: "rainfall",
      area: "longxiang-street",
      status: "online",
      location: "王浩儿街与致江路交叉口",
      lastUpdate: "2025-04-24 10:13:42",
      battery: 72,
      signal: 88,
      readings: {
        rainfall: "42mm/h",
        temperature: "25.5°C",
        humidity: "94%",
      },
    },
    {
      id: "DEV007",
      name: "碧山路 一体式雷达液位计",
      type: "water-level",
      area: "hanhai-road",
      status: "warning",
      location: "碧山路下穿隧道入口",
      lastUpdate: "2025-04-24 10:11:18",
      battery: 65,
      signal: 80,
      readings: {
        waterLevel: "0.35m",
        flow: "积水",
        warning: "隧道积水警告",
      },
    },
    {
      id: "DEV008",
      name: "黄石坡 东岸摄像头",
      type: "camera",
      area: "longzihu",
      status: "online",
      location: "黄石坡东岸观景平台",
      lastUpdate: "2025-04-24 10:16:05",
      battery: 95,
      signal: 95,
      readings: {
        storage: "75%",
        resolution: "1080p",
        status: "正常录制中",
      },
    },
    {
      id: "DEV009",
      name: "月弦坝 闸口流量计",
      type: "flow",
      area: "dongfengqu",
      status: "maintenance",
      location: "月弦坝北段闸口",
      lastUpdate: "2025-04-24 15:30:22",
      maintenance: {
        scheduled: "2025-04-02",
        lastMaintenance: "2025-03-20",
      },
    },
    {
      id: "DEV010",
      name: "嘉州大道 OTT Pluvio²称重式雨量计",
      type: "weather",
      area: "science-avenue",
      status: "online",
      location: "嘉州大道中段绿化带",
      lastUpdate: "2025-04-24 10:14:30",
      battery: 88,
      signal: 90,
      readings: {
        temperature: "26.2°C",
        humidity: "93%",
        windSpeed: "4.8m/s",
        windDirection: "东南",
        pressure: "1001hPa",
      },
    },
    {
      id: "DEV011",
      name: "柏杨中路 X波段雷达雨量监测系统",
      type: "rainfall",
      area: "longhu-avenue",
      status: "online",
      location: "柏杨中路东段",
      lastUpdate: "2025-04-24 10:15:10",
      battery: 80,
      signal: 85,
      readings: {
        rainfall: "40mm/h",
        temperature: "25.9°C",
        humidity: "92%",
      },
    },
    {
      id: "DEV012",
      name: "周河坎 U-son11标准型超声波液位计",
      type: "water-level",
      area: "ruyi-lake",
      status: "warning",
      location: "周河坎溢洪道",
      lastUpdate: "2025-04-24 10:12:35",
      battery: 70,
      signal: 82,
      readings: {
        waterLevel: "2.8m",
        flow: "1.5m³/s",
        warning: "水位上涨",
      },
    },
    {
      id: "DEV013",
      name: "王浩儿街 声学多普勒流速仪(ADV)",
      type: "flow",
      area: "longxiang-street",
      status: "online",
      location: "王浩儿街排水管网监测点",
      lastUpdate: "2025-04-24 10:11:45",
      battery: 75,
      signal: 88,
      readings: {
        flow: "2.5m³/s",
        pressure: "0.75MPa",
        turbidity: "低",
      },
    },
    {
      id: "DEV014",
      name: "碧山路 立杆式积水监测仪",
      type: "weather",
      area: "hanhai-road",
      status: "online",
      location: "碧山路与致江路大桥交叉口",
      lastUpdate: "2025-04-24 10:13:50",
      battery: 82,
      signal: 87,
      readings: {
        temperature: "25.7°C",
        humidity: "93%",
        windSpeed: "5.5m/s",
        windDirection: "东南",
        pressure: "1000hPa",
      },
    },
    {
      id: "DEV015",
      name: "黄石坡 西岸摄像头",
      type: "camera",
      area: "longzihu",
      status: "offline",
      location: "黄石坡西岸观景台",
      lastUpdate: "2025-04-24 08:30:15",
      battery: 10,
      signal: 25,
      maintenance: {
        scheduled: "2025-04-02",
        lastMaintenance: "2025-03-10",
      },
    },
    {
      id: "DEV016",
      name: "月弦坝 摄像头",
      type: "rainfall",
      area: "dongfengqu",
      status: "online",
      location: "大佛坝村北岸",
      lastUpdate: "2025-04-24 10:14:22",
      battery: 78,
      signal: 83,
      readings: {
        rainfall: "38mm/h",
        temperature: "25.6°C",
        humidity: "91%",
      },
    },
    {
      id: "DEV017",
      name: "嘉州大道桥下水位站",
      type: "water-level",
      area: "science-avenue",
      status: "warning",
      location: "嘉州大道跨河桥下",
      lastUpdate: "2025-04-24 10:10:55",
      battery: 68,
      signal: 78,
      readings: {
        waterLevel: "3.2m",
        flow: "2.2m³/s",
        warning: "接近警戒水位",
      },
    },
    {
      id: "DEV018",
      name: "柏杨中路 摄像头",
      type: "flow",
      area: "longhu-avenue",
      status: "online",
      location: "柏杨中路与天星路交叉口",
      lastUpdate: "2025-04-24 10:12:18",
      battery: 85,
      signal: 90,
      readings: {
        flow: "2.8m³/s",
        pressure: "0.82MPa",
        turbidity: "中",
      },
    },
    {
      id: "DEV019",
      name: "周河坎 多普勒流量计（ADCP）",
      type: "camera",
      area: "ruyi-lake",
      status: "maintenance",
      location: "周河坎东岸",
      lastUpdate: "2025-04-24 16:45:30",
      maintenance: {
        scheduled: "2025-04-03",
        lastMaintenance: "2025-03-18",
      },
    },
    {
      id: "DEV020",
      name: "王浩儿街 摄像头",
      type: "weather",
      area: "longxiang-street",
      status: "online",
      location: "王浩儿街中段绿化带",
      lastUpdate: "2025-04-24 10:15:40",
      battery: 90,
      signal: 92,
      readings: {
        temperature: "26.0°C",
        humidity: "92%",
        windSpeed: "5.0m/s",
        windDirection: "东南",
        pressure: "1001hPa",
      },
    },
  ])

  // 状态管理
  const [activeTab, setActiveTab] = useState<DeviceStatus>("all")
  const [selectedType, setSelectedType] = useState<DeviceType>("all")
  const [selectedArea, setSelectedArea] = useState<DeviceArea>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "status" | "lastUpdate">("lastUpdate")
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false)
  const [newDevice, setNewDevice] = useState({
    name: "",
    type: "rainfall" as Exclude<DeviceType, "all">,
    area: "longzihu" as Exclude<DeviceArea, "all">,
    location: "",
  })
  const [showAddSuccess, setShowAddSuccess] = useState(false)

  // 筛选设备
  const filteredDevices = allDevices
    .filter((device) => {
      // 类型筛选
      if (selectedType !== "all" && device.type !== selectedType) return false

      // 区域筛选
      if (selectedArea !== "all" && device.area !== selectedArea) return false

      // 状态筛选
      if (activeTab !== "all" && device.status !== activeTab) return false

      // 搜索筛选
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          device.name.toLowerCase().includes(query) ||
          device.id.toLowerCase().includes(query) ||
          device.location.toLowerCase().includes(query)
        )
      }

      return true
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "status") {
        return a.status.localeCompare(b.status)
      } else {
        return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
      }
    })

  // 获取设备类型图标
  const getTypeIcon = (type: Exclude<DeviceType, "all">) => {
    switch (type) {
      case "rainfall":
        return <Droplets className="h-4 w-4 text-blue-500" />
      case "water-level":
        return <Thermometer className="h-4 w-4 text-blue-500" />
      case "flow":
        return <BarChart3 className="h-4 w-4 text-green-500" />
      case "weather":
        return <CloudRain className="h-4 w-4 text-purple-500" />
      case "camera":
        return <CameraIcon className="h-4 w-4 text-gray-500" />
    }
  }

  // 获取设备状态标签
  const getStatusBadge = (status: Exclude<DeviceStatus, "all">) => {
    switch (status) {
      case "online":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            在线
          </Badge>
        )
      case "offline":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            <XCircle className="mr-1 h-3 w-3" />
            离线
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertTriangle className="mr-1 h-3 w-3" />
            警告
          </Badge>
        )
      case "maintenance":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Settings className="mr-1 h-3 w-3" />
            维护中
          </Badge>
        )
    }
  }

  // 获取区域名称
  const getAreaName = (area: Exclude<DeviceArea, "all">) => {
    switch (area) {
      case "longzihu":
        return "黄石坡"
      case "dongfengqu":
        return "月弦坝"
      case "science-avenue":
        return "嘉州大道"
      case "longhu-avenue":
        return "柏杨中路"
      case "ruyi-lake":
        return "周河坎"
      case "longxiang-street":
        return "王浩儿街"
      case "hanhai-road":
        return "碧山路"
    }
  }

  // 处理添加设备
  const handleAddDevice = () => {
    // 这里实际应用中会发送请求到后端
    // 模拟添加成功
        if (!newDevice.name || !newDevice.location) {
      return // 简单验证
    }

    // 生成新设备ID
    const newId = `DEV${String(allDevices.length + 1).padStart(3, "0")}`

    // 创建新设备对象
    const deviceToAdd: Device = {
      id: newId,
      name: newDevice.name,
      type: newDevice.type,
      area: newDevice.area,
      status: "online", // 默认在线
      location: newDevice.location,
      lastUpdate: new Date().toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      battery: 100, // 新设备电量满
      signal: 95, // 新设备信号良好
      readings: getDefaultReadings(newDevice.type), // 根据类型设置默认读数
    }

    // 添加到设备列表
    setAllDevices((prev) => [...prev, deviceToAdd])

    // 关闭对话框并显示成功提示
    setIsAddDeviceOpen(false)
    setShowAddSuccess(true)

    // 3秒后隐藏成功提示
    setTimeout(() => {
      setShowAddSuccess(false)
    }, 3000)

    // 重置表单
    setNewDevice({
      name: "",
      type: "rainfall",
      area: "longzihu",
      location: "",
    })
  }

    // 添加获取默认读数的辅助函数
  const getDefaultReadings = (type: Exclude<DeviceType, "all">) => {
    switch (type) {
      case "rainfall":
        return {
          rainfall: "0mm/h",
          temperature: "25°C",
          humidity: "60%",
        }
      case "water-level":
        return {
          waterLevel: "1.2m",
          flow: "0.5m³/s",
          status: "正常",
        }
      case "flow":
        return {
          flow: "1.0m³/s",
          pressure: "0.5MPa",
          turbidity: "低",
        }
      case "weather":
        return {
          temperature: "25°C",
          humidity: "60%",
          windSpeed: "2.0m/s",
          windDirection: "北",
          pressure: "1013hPa",
        }
      case "camera":
        return {
          storage: "20%",
          resolution: "1080p",
          status: "正常录制中",
        }
      default:
        return {}
    }
  }

  // 计算设备状态统计
  const deviceStats = {
    total: allDevices.length,
    online: allDevices.filter((d) => d.status === "online").length,
    offline: allDevices.filter((d) => d.status === "offline").length,
    warning: allDevices.filter((d) => d.status === "warning").length,
    maintenance: allDevices.filter((d) => d.status === "maintenance").length,
  }

  // 计算区域设备统计
  const areaStats = [
    { area: "longzihu", name: "黄石坡", count: allDevices.filter((d) => d.area === "longzihu").length },
    { area: "dongfengqu", name: "月弦坝", count: allDevices.filter((d) => d.area === "dongfengqu").length },
    { area: "science-avenue", name: "嘉州大道", count: allDevices.filter((d) => d.area === "science-avenue").length },
    { area: "longhu-avenue", name: "柏杨中路", count: allDevices.filter((d) => d.area === "longhu-avenue").length },
    { area: "ruyi-lake", name: "周河坎", count: allDevices.filter((d) => d.area === "ruyi-lake").length },
    { area: "longxiang-street", name: "王浩儿街", count: allDevices.filter((d) => d.area === "longxiang-street").length },
    { area: "hanhai-road", name: "碧山路", count: allDevices.filter((d) => d.area === "hanhai-road").length },
  ].sort((a, b) => b.count - a.count)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">设备管理</h1>
              <p className="text-sm text-muted-foreground">管理和监控所有降水监测设备</p>
            </div>
            <Dialog open={isAddDeviceOpen} onOpenChange={setIsAddDeviceOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> 添加设备
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>添加新设备</DialogTitle>
                  <DialogDescription>填写以下信息添加新的监测设备到系统中</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      设备名称
                    </Label>
                    <Input
                      id="name"
                      value={newDevice.name}
                      onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      设备类型
                    </Label>
                    <Select
                      value={newDevice.type}
                      onValueChange={(value) =>
                        setNewDevice({ ...newDevice, type: value as Exclude<DeviceType, "all"> })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="选择设备类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rainfall">雨量监测</SelectItem>
                        <SelectItem value="water-level">水位监测</SelectItem>
                        <SelectItem value="flow">流量监测</SelectItem>
                        <SelectItem value="weather">积水监测</SelectItem>
                        <SelectItem value="camera">监控摄像头</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="area" className="text-right">
                      所属区域
                    </Label>
                    <Select
                      value={newDevice.area}
                      onValueChange={(value) =>
                        setNewDevice({ ...newDevice, area: value as Exclude<DeviceArea, "all"> })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="选择所属区域" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="longzihu">黄石坡</SelectItem>
                        <SelectItem value="dongfengqu">月弦坝</SelectItem>
                        <SelectItem value="science-avenue">嘉州大道</SelectItem>
                        <SelectItem value="longhu-avenue">柏杨中路</SelectItem>
                        <SelectItem value="ruyi-lake">周河坎</SelectItem>
                        <SelectItem value="longxiang-street">王浩儿街</SelectItem>
                        <SelectItem value="hanhai-road">碧山路</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      具体位置
                    </Label>
                    <Input
                      id="location"
                      value={newDevice.location}
                      onChange={(e) => setNewDevice({ ...newDevice, location: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="device-id" className="text-right">
                      设备ID
                    </Label>
                    <Input id="device-id" placeholder="例如: DEV-ZZ-LZH-001" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="api-key" className="text-right">
                      API密钥
                    </Label>
                    <Input id="api-key" placeholder="设备API访问密钥" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="serial-number" className="text-right">
                      序列号
                    </Label>
                    <Input id="serial-number" placeholder="设备序列号" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">取消</Button>
                  </DialogClose>
                  <Button onClick={handleAddDevice}>添加设备</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* 成功提示 */}
          {showAddSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
              <span>设备添加成功！新设备将在系统验证后显示。</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 设备概览卡片 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">设备概览</CardTitle>
                <CardDescription>所有监测设备的状态统计</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">总设备数:</span>
                    <span className="text-lg font-medium">{deviceStats.total}</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">在线设备:</span>
                    <span className="text-lg font-medium text-green-600">{deviceStats.online}</span>
                  </div>
                  <Progress
                    value={(deviceStats.online / deviceStats.total) * 100}
                    className="h-2 bg-gray-200 dark:bg-gray-700"
                  >
                    <div className="h-full bg-green-500 rounded-full" />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">警告状态:</span>
                    <span className="text-lg font-medium text-yellow-600">{deviceStats.warning}</span>
                  </div>
                  <Progress
                    value={(deviceStats.warning / deviceStats.total) * 100}
                    className="h-2 bg-gray-200 dark:bg-gray-700"
                  >
                    <div className="h-full bg-yellow-500 rounded-full" />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">离线设备:</span>
                    <span className="text-lg font-medium text-gray-600">{deviceStats.offline}</span>
                  </div>
                  <Progress
                    value={(deviceStats.offline / deviceStats.total) * 100}
                    className="h-2 bg-gray-200 dark:bg-gray-700"
                  >
                    <div className="h-full bg-gray-500 rounded-full" />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">维护中:</span>
                    <span className="text-lg font-medium text-blue-600">{deviceStats.maintenance}</span>
                  </div>
                  <Progress
                    value={(deviceStats.maintenance / deviceStats.total) * 100}
                    className="h-2 bg-gray-200 dark:bg-gray-700"
                  >
                    <div className="h-full bg-blue-500 rounded-full" />
                  </Progress>
                </div>
              </CardContent>
            </Card>

            {/* 区域统计卡片 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">区域统计</CardTitle>
                <CardDescription>各区域设备分布情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {areaStats.map((area) => (
                    <div key={area.area} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{area.name}:</span>
                        <span className="text-sm font-medium">{area.count} 台设备</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: `${(area.count / deviceStats.total) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          在线: {allDevices.filter((d) => d.area === area.area && d.status === "online").length}
                        </span>
                        <span>
                          警告: {allDevices.filter((d) => d.area === area.area && d.status === "warning").length}
                        </span>
                        <span>
                          离线:{" "}
                          {
                            allDevices.filter(
                              (d) => d.area === area.area && (d.status === "offline" || d.status === "maintenance"),
                            ).length
                          }
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 设备类型统计卡片 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">设备类型统计</CardTitle>
                <CardDescription>各类型设备数量及状态</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">雨量监测</span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {allDevices.filter((d) => d.type === "rainfall").length} 台设备
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <div
                        className="bg-green-500 h-2 rounded-l-full"
                        style={{
                          width: `${(allDevices.filter((d) => d.type === "rainfall" && d.status === "online").length / allDevices.filter((d) => d.type === "rainfall").length) * 100}%`,
                        }}
                      ></div>
                      <div
                        className="bg-yellow-500 h-2"
                        style={{
                          width: `${(allDevices.filter((d) => d.type === "rainfall" && d.status === "warning").length / allDevices.filter((d) => d.type === "rainfall").length) * 100}%`,
                        }}
                      ></div>
                      <div
                        className="bg-gray-500 h-2 rounded-r-full"
                        style={{
                          width: `${(allDevices.filter((d) => d.type === "rainfall" && (d.status === "offline" || d.status === "maintenance")).length / allDevices.filter((d) => d.type === "rainfall").length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">水位监测</span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {allDevices.filter((d) => d.type === "water-level").length} 台设备
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <div
                        className="bg-green-500 h-2 rounded-l-full"
                        style={{
                          width: `${(allDevices.filter((d) => d.type === "water-level" && d.status === "online").length / allDevices.filter((d) => d.type === "water-level").length) * 100}%`,
                        }}
                      ></div>
                      <div
                        className="bg-yellow-500 h-2"
                        style={{
                          width: `${(allDevices.filter((d) => d.type === "water-level" && d.status === "warning").length / allDevices.filter((d) => d.type === "water-level").length) * 100}%`,
                        }}
                      ></div>
                      <div
                        className="bg-gray-500 h-2 rounded-r-full"
                        style={{
                          width: `${(allDevices.filter((d) => d.type === "water-level" && (d.status === "offline" || d.status === "maintenance")).length / allDevices.filter((d) => d.type === "water-level").length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">流量监测</span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {allDevices.filter((d) => d.type === "flow").length} 台设备
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <div
                        className="bg-green-500 h-2 rounded-l-full"
                        style={{
                          width: `${(allDevices.filter((d) => d.type === "flow" && d.status === "online").length / allDevices.filter((d) => d.type === "flow").length) * 100}%`,
                        }}
                      ></div>
                      <div
                        className="bg-yellow-500 h-2"
                        style={{
                          width: `${(allDevices.filter((d) => d.type === "flow" && d.status === "warning").length / allDevices.filter((d) => d.type === "flow").length) * 100}%`,
                        }}
                      ></div>
                      <div
                        className="bg-gray-500 h-2 rounded-r-full"
                        style={{
                          width: `${(allDevices.filter((d) => d.type === "flow" && (d.status === "offline" || d.status === "maintenance")).length / allDevices.filter((d) => d.type === "flow").length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CloudRain className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">积水监测</span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {allDevices.filter((d) => d.type === "weather").length} 台设备
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <div
                        className="bg-green-500 h-2 rounded-l-full"
                        style={{
                          width: `${(allDevices.filter((d) => d.type === "weather" && d.status === "online").length / allDevices.filter((d) => d.type === "weather").length) * 100}%`,
                        }}
                      ></div>
                      <div
                        className="bg-yellow-500 h-2"
                        style={{
                          width: `${(allDevices.filter((d) => d.type === "weather" && d.status === "warning").length / allDevices.filter((d) => d.type === "weather").length) * 100}%`,
                        }}
                      ></div>
                      <div
                        className="bg-gray-500 h-2 rounded-r-full"
                        style={{
                          width: `${(allDevices.filter((d) => d.type === "weather" && (d.status === "offline" || d.status === "maintenance")).length / allDevices.filter((d) => d.type === "weather").length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CameraIcon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">监控摄像头</span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {allDevices.filter((d) => d.type === "camera").length} 台设备
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <div
                        className="bg-green-500 h-2 rounded-l-full"
                        style={{
                          width: `${(allDevices.filter((d) => d.type === "camera" && d.status === "online").length / allDevices.filter((d) => d.type === "camera").length) * 100}%`,
                        }}
                      ></div>
                      <div
                        className="bg-yellow-500 h-2"
                        style={{
                          width: `${(allDevices.filter((d) => d.type === "camera" && d.status === "warning").length / allDevices.filter((d) => d.type === "camera").length) * 100}%`,
                        }}
                      ></div>
                      <div
                        className="bg-gray-500 h-2 rounded-r-full"
                        style={{
                          width: `${(allDevices.filter((d) => d.type === "camera" && (d.status === "offline" || d.status === "maintenance")).length / allDevices.filter((d) => d.type === "camera").length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>设备列表</CardTitle>
              <CardDescription>管理和监控所有监测设备</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* 搜索和筛选 */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="搜索设备名称、ID或位置..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-[130px]">
                          <Filter className="ml-2 h-4 w-4" />
                          {selectedType === "all"
                            ? "全部类型"
                            : selectedType === "rainfall"
                              ? "雨量站"
                              : selectedType === "water-level"
                                ? "水位站"
                                : selectedType === "flow"
                                  ? "流量站"
                                  : selectedType === "weather"
                                    ? "气象站"
                                    : "监控摄像头"}
                          <ChevronDown className="mr-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedType("all")}>全部类型</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedType("rainfall")}>
                          <Droplets className="mr-2 h-4 w-4 text-blue-500" />
                          雨量站
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedType("water-level")}>
                          <Thermometer className="mr-2 h-4 w-4 text-blue-500" />
                          水位站
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedType("flow")}>
                          <BarChart3 className="mr-2 h-4 w-4 text-green-500" />
                          流量站
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedType("weather")}>
                          <CloudRain className="mr-2 h-4 w-4 text-purple-500" />
                          气象站
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedType("camera")}>
                          <CameraIcon className="mr-2 h-4 w-4 text-gray-500" />
                          监控摄像头
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-[130px]">
                          <MapPin className="ml-2 h-4 w-4" />
                          {selectedArea === "all"
                            ? "全部区域"
                            : getAreaName(selectedArea as Exclude<DeviceArea, "all">)}
                          <ChevronDown className="mr-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedArea("all")}>全部区域</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedArea("longzihu")}>黄石坡</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedArea("dongfengqu")}>月弦坝</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedArea("science-avenue")}>嘉州大道</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedArea("longhu-avenue")}>柏杨中路</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedArea("ruyi-lake")}>周河坎</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedArea("longxiang-street")}>王浩儿街</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedArea("hanhai-road")}>碧山路</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                      variant="outline"
                      size="icon"
                      className="w-auto"
                      onClick={() =>
                        setSortBy(sortBy === "lastUpdate" ? "name" : sortBy === "name" ? "status" : "lastUpdate")
                      }
                      title={
                        sortBy === "lastUpdate" ? "按更新时间排序" : sortBy === "name" ? "按名称排序" : "按状态排序"
                      }
                    >
                      <ArrowUpDown className="h-4 w-32 ml-2" />
                      <div className="mr-2">
                        {sortBy === "lastUpdate" ? "按更新时间排序" : sortBy === "name" ? "按名称排序" : "按状态排序"}
                      </div>
                    </Button>
                  </div>
                </div>

                {/* 设备列表 */}
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab as (value: string) => void}>
                  <TabsList className="grid grid-cols-5">
                    <TabsTrigger value="all">全部</TabsTrigger>
                    <TabsTrigger value="online">在线</TabsTrigger>
                    <TabsTrigger value="warning">警告</TabsTrigger>
                    <TabsTrigger value="offline">离线</TabsTrigger>
                    <TabsTrigger value="maintenance">维护中</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-4 space-y-4">
                    {filteredDevices.length > 0 ? (
                      filteredDevices.map((device) => (
                        <div key={device.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5">{getTypeIcon(device.type)}</div>
                              <div>
                                <div className="flex items-center flex-wrap gap-2">
                                  <h3 className="font-medium">{device.name}</h3>
                                  {getStatusBadge(device.status)}
                                  <span className="text-xs text-muted-foreground">ID: {device.id}</span>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground mt-1">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {device.location} ({getAreaName(device.area as Exclude<DeviceArea, "all">)})
                                </div>

                                {device.readings && (
                                  <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1">
                                    {Object.entries(device.readings).map(([key, value]) => (
                                      <div key={key} className="flex items-center text-xs">
                                        <span className="text-muted-foreground mr-1">{key}:</span>
                                        <span className="font-medium">{value}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                  <span>最后更新: {device.lastUpdate}</span>

                                  {device.battery !== undefined && (
                                    <div className="flex items-center">
                                      <Battery className="h-3 w-3 mr-1" />
                                      <span
                                        className={
                                          device.battery < 20
                                            ? "text-red-500"
                                            : device.battery < 50
                                              ? "text-yellow-500"
                                              : "text-green-500"
                                        }
                                      >
                                        {device.battery}%
                                      </span>
                                    </div>
                                  )}

                                  {device.signal !== undefined && (
                                    <div className="flex items-center">
                                      <Signal className="h-3 w-3 mr-1" />
                                      <span
                                        className={
                                          device.signal < 30
                                            ? "text-red-500"
                                            : device.signal < 60
                                              ? "text-yellow-500"
                                              : "text-green-500"
                                        }
                                      >
                                        {device.signal}%
                                      </span>
                                    </div>
                                  )}

                                  {device.maintenance?.scheduled && (
                                    <div className="flex items-center">
                                      <Settings className="h-3 w-3 mr-1" />
                                      <span>计划维护: {device.maintenance.scheduled}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 ml-auto">
                              <Button variant="outline" size="sm" className="h-8">
                                <Settings className="h-3.5 w-3.5 mr-1" />
                                配置
                              </Button>
                              <Button size="sm" className="h-8">
                                <Wifi className="h-3.5 w-3.5 mr-1" />
                                查看数据
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <AlertCircle className="mx-auto h-8 w-8 mb-2 opacity-50" />
                        <p>没有找到匹配的设备</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="online" className="mt-4 space-y-4">
                    {filteredDevices.filter((d) => d.status === "online").length > 0 ? (
                      filteredDevices
                        .filter((d) => d.status === "online")
                        .map((device) => (
                          <div key={device.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex items-start gap-3">
                                <div className="mt-0.5">{getTypeIcon(device.type)}</div>
                                <div>
                                  <div className="flex items-center flex-wrap gap-2">
                                    <h3 className="font-medium">{device.name}</h3>
                                    {getStatusBadge(device.status)}
                                    <span className="text-xs text-muted-foreground">ID: {device.id}</span>
                                  </div>
                                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {device.location} ({getAreaName(device.area as Exclude<DeviceArea, "all">)})
                                  </div>

                                  {device.readings && (
                                    <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1">
                                      {Object.entries(device.readings).map(([key, value]) => (
                                        <div key={key} className="flex items-center text-xs">
                                          <span className="text-muted-foreground mr-1">{key}:</span>
                                          <span className="font-medium">{value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                    <span>最后更新: {device.lastUpdate}</span>

                                    {device.battery !== undefined && (
                                      <div className="flex items-center">
                                        <Battery className="h-3 w-3 mr-1" />
                                        <span
                                          className={
                                            device.battery < 20
                                              ? "text-red-500"
                                              : device.battery < 50
                                                ? "text-yellow-500"
                                                : "text-green-500"
                                          }
                                        >
                                          {device.battery}%
                                        </span>
                                      </div>
                                    )}

                                    {device.signal !== undefined && (
                                      <div className="flex items-center">
                                        <Signal className="h-3 w-3 mr-1" />
                                        <span
                                          className={
                                            device.signal < 30
                                              ? "text-red-500"
                                              : device.signal < 60
                                                ? "text-yellow-500"
                                                : "text-green-500"
                                          }
                                        >
                                          {device.signal}%
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-2 ml-auto">
                                <Button variant="outline" size="sm" className="h-8">
                                  <Settings className="h-3.5 w-3.5 mr-1" />
                                  配置
                                </Button>
                                <Button size="sm" className="h-8">
                                  <Wifi className="h-3.5 w-3.5 mr-1" />
                                  查看数据
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <AlertTriangle className="mx-auto h-8 w-8 mb-2 opacity-50" />
                        <p>没有在线设备</p>
                      </div>
                    )}
                  </TabsContent>

                  {/* 其他标签页内容省略，结构类似 */}
                  <TabsContent value="warning" className="mt-4 space-y-4">
                    {filteredDevices.filter((d) => d.status === "warning").length > 0 ? (
                      filteredDevices
                        .filter((d) => d.status === "warning")
                        .map((device) => (
                          <div key={device.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex items-start gap-3">
                                <div className="mt-0.5">{getTypeIcon(device.type)}</div>
                                <div>
                                  <div className="flex items-center flex-wrap gap-2">
                                    <h3 className="font-medium">{device.name}</h3>
                                    {getStatusBadge(device.status)}
                                    <span className="text-xs text-muted-foreground">ID: {device.id}</span>
                                  </div>
                                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {device.location} ({getAreaName(device.area as Exclude<DeviceArea, "all">)})
                                  </div>

                                  {device.readings && (
                                    <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1">
                                      {Object.entries(device.readings).map(([key, value]) => (
                                        <div key={key} className="flex items-center text-xs">
                                          <span className="text-muted-foreground mr-1">{key}:</span>
                                          <span className="font-medium">{value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                    <span>最后更新: {device.lastUpdate}</span>

                                    {device.battery !== undefined && (
                                      <div className="flex items-center">
                                        <Battery className="h-3 w-3 mr-1" />
                                        <span
                                          className={
                                            device.battery < 20
                                              ? "text-red-500"
                                              : device.battery < 50
                                                ? "text-yellow-500"
                                                : "text-green-500"
                                          }
                                        >
                                          {device.battery}%
                                        </span>
                                      </div>
                                    )}

                                    {device.signal !== undefined && (
                                      <div className="flex items-center">
                                        <Signal className="h-3 w-3 mr-1" />
                                        <span
                                          className={
                                            device.signal < 30
                                              ? "text-red-500"
                                              : device.signal < 60
                                                ? "text-yellow-500"
                                                : "text-green-500"
                                          }
                                        >
                                          {device.signal}%
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-2 ml-auto">
                                <Button variant="outline" size="sm" className="h-8">
                                  <Settings className="h-3.5 w-3.5 mr-1" />
                                  配置
                                </Button>
                                <Button size="sm" className="h-8">
                                  <Wifi className="h-3.5 w-3.5 mr-1" />
                                  查看数据
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <AlertTriangle className="mx-auto h-8 w-8 mb-2 opacity-50" />
                        <p>没有找到警告状态的设备</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="offline" className="mt-4 space-y-4">
                    {filteredDevices.filter((d) => d.status === "offline").length > 0 ? (
                      filteredDevices
                        .filter((d) => d.status === "offline")
                        .map((device) => (
                          <div key={device.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex items-start gap-3">
                                <div className="mt-0.5">{getTypeIcon(device.type)}</div>
                                <div>
                                  <div className="flex items-center flex-wrap gap-2">
                                    <h3 className="font-medium">{device.name}</h3>
                                    {getStatusBadge(device.status)}
                                    <span className="text-xs text-muted-foreground">ID: {device.id}</span>
                                  </div>
                                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {device.location} ({getAreaName(device.area as Exclude<DeviceArea, "all">)})
                                  </div>

                                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                    <span>最后更新: {device.lastUpdate}</span>

                                    {device.battery !== undefined && (
                                      <div className="flex items-center">
                                        <Battery className="h-3 w-3 mr-1" />
                                        <span
                                          className={
                                            device.battery < 20
                                              ? "text-red-500"
                                              : device.battery < 50
                                                ? "text-yellow-500"
                                                : "text-green-500"
                                          }
                                        >
                                          {device.battery}%
                                        </span>
                                      </div>
                                    )}

                                    {device.signal !== undefined && (
                                      <div className="flex items-center">
                                        <Signal className="h-3 w-3 mr-1" />
                                        <span
                                          className={
                                            device.signal < 30
                                              ? "text-red-500"
                                              : device.signal < 60
                                                ? "text-yellow-500"
                                                : "text-green-500"
                                          }
                                        >
                                          {device.signal}%
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-2 ml-auto">
                                <Button variant="outline" size="sm" className="h-8">
                                  <Settings className="h-3.5 w-3.5 mr-1" />
                                  配置
                                </Button>
                                <Button size="sm" className="h-8">
                                  <Wifi className="h-3.5 w-3.5 mr-1" />
                                  重新连接
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <XCircle className="mx-auto h-8 w-8 mb-2 opacity-50" />
                        <p>没有找到离线设备</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="maintenance" className="mt-4 space-y-4">
                    {filteredDevices.filter((d) => d.status === "maintenance").length > 0 ? (
                      filteredDevices
                        .filter((d) => d.status === "maintenance")
                        .map((device) => (
                          <div key={device.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex items-start gap-3">
                                <div className="mt-0.5">{getTypeIcon(device.type)}</div>
                                <div>
                                  <div className="flex items-center flex-wrap gap-2">
                                    <h3 className="font-medium">{device.name}</h3>
                                    {getStatusBadge(device.status)}
                                    <span className="text-xs text-muted-foreground">ID: {device.id}</span>
                                  </div>
                                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {device.location} ({getAreaName(device.area as Exclude<DeviceArea, "all">)})
                                  </div>

                                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                    <span>最后更新: {device.lastUpdate}</span>

                                    {device.maintenance?.scheduled && (
                                      <div className="flex items-center">
                                        <Settings className="h-3 w-3 mr-1" />
                                        <span>计划维护: {device.maintenance.scheduled}</span>
                                      </div>
                                    )}

                                    {device.maintenance?.lastMaintenance && (
                                      <div className="flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        <span>上次维护: {device.maintenance.lastMaintenance}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-2 ml-auto">
                                <Button variant="outline" size="sm" className="h-8">
                                  <Settings className="h-3.5 w-3.5 mr-1" />
                                  维护记录
                                </Button>
                                <Button size="sm" className="h-8">
                                  <Wifi className="h-3.5 w-3.5 mr-1" />
                                  完成维护
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Settings className="mx-auto h-8 w-8 mb-2 opacity-50" />
                        <p>没有找到维护中的设备</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">刷新数据</Button>
              <Button>导出设备列表</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

