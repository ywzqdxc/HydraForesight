"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { createDevice, pageDevices, type Device as BackendDevice } from "@/lib/api/device"

import { useEffect, useState } from "react"
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
  const [allDevices, setAllDevices] = useState<BackendDevice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedType, setSelectedType] = useState<DeviceType>("all")
  const [selectedArea, setSelectedArea] = useState<DeviceArea>("all")
  const [activeTab, setActiveTab] = useState<"all" | "online" | "offline" | "warning" | "maintenance">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "status" | "lastUpdate">("lastUpdate")
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false)

  const [newDevice, setNewDevice] = useState({
    deviceName: "",
    deviceType: 1 as number,
    areaId: 1 as number,
    locationName: "",
  })
  const [showAddSuccess, setShowAddSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchDevices()
  }, [])

  const fetchDevices = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await pageDevices({
        current: 1,
        size: 1000,
      })
      if (response.data) {
        setAllDevices(response.data.records || [])
      }
    } catch (err) {
      console.error("Failed to fetch devices:", err)
      setError("加载设备失败，请刷新重试")
    } finally {
      setLoading(false)
    }
  }

  // 辅助函数：根据设备类型获取名称
  const getDeviceTypeName = (type: number) => {
    const typeMap: Record<number, string> = {
      1: "雨量监测",
      2: "水位监测",
      3: "流量监测",
      4: "积水监测",
      5: "监控摄像头",
    }
    return typeMap[type] || "未知类型"
  }

  // 辅助函数：根据状态获取状态名称
  const getStatusName = (status: number) => {
    const statusMap: Record<number, string> = {
      1: "online",
      0: "offline",
      2: "warning",
      3: "maintenance",
    }
    return statusMap[status] || "offline"
  }

  // 辅助函数：获取区域名称
  const getAreaName = (area: Exclude<DeviceArea, "all">): string => {
    const areaMap: Record<Exclude<DeviceArea, "all">, string> = {
      longzihu: "黄石坡",
      dongfengqu: "月弦坝",
      "science-avenue": "嘉州大道",
      "longhu-avenue": "柏杨中路",
      "ruyi-lake": "周河坎",
      "longxiang-street": "王浩儿街",
      "hanhai-road": "碧山路",
    }
    return areaMap[area] || "未知区域"
  }

  // 辅助函数：根据设备类型获取图标
  const getTypeIcon = (type: Exclude<DeviceType, "all">) => {
    switch (type) {
      case "rainfall":
        return <Droplets className="h-5 w-5 text-blue-500" />
      case "water-level":
        return <Thermometer className="h-5 w-5 text-blue-500" />
      case "flow":
        return <BarChart3 className="h-5 w-5 text-green-500" />
      case "weather":
        return <CloudRain className="h-5 w-5 text-purple-500" />
      case "camera":
        return <CameraIcon className="h-5 w-5 text-gray-500" />
      default:
        return null
    }
  }

  // 辅助函数：根据状态获取状态徽章
  const getStatusBadge = (status: DeviceStatus) => {
    switch (status) {
      case "online":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-600 border-green-300">
            在线
          </Badge>
        )
      case "offline":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-300">
            离线
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-600 border-yellow-300">
            警告
          </Badge>
        )
      case "maintenance":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-600 border-blue-300">
            维护中
          </Badge>
        )
      default:
        return null
    }
  }

  // 筛选设备 - 更新过滤逻辑以适应后端数据结构
  const filteredDevices = allDevices
    .filter((device) => {
      // 类型筛选 (根据后端设备类型)
      if (selectedType !== "all") {
        const typeMap: Record<string, number> = {
          rainfall: 1,
          "water-level": 2,
          flow: 3,
          weather: 4,
          camera: 5,
        }
        if (device.deviceType !== typeMap[selectedType as Exclude<DeviceType, "all">]) return false
      }

      // 区域筛选
      if (selectedArea !== "all") {
        const areaMap: Record<string, number> = {
          longzihu: 1,
          dongfengqu: 2,
          "science-avenue": 3,
          "longhu-avenue": 4,
          "ruyi-lake": 5,
          "longxiang-street": 6,
          "hanhai-road": 7,
        }
        if (device.areaId !== areaMap[selectedArea as Exclude<DeviceArea, "all">]) return false
      }

      // 状态筛选
      if (activeTab !== "all") {
        const statusMap: Record<string, number> = {
          online: 1,
          offline: 0,
          warning: 2,
          maintenance: 3,
        }
        if (device.status !== statusMap[activeTab]) return false
      }

      // 搜索筛选
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          device.deviceName.toLowerCase().includes(query) ||
          device.deviceId.toLowerCase().includes(query) ||
          device.locationName.toLowerCase().includes(query)
        )
      }

      return true
    })
    .sort((a, b) => {
      if (sortBy === "lastUpdate") {
        return new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
      }
      // Add sorting by name and status
      if (sortBy === "name") {
        return a.deviceName.localeCompare(b.deviceName)
      }
      if (sortBy === "status") {
        return a.status - b.status // Assuming numerical status codes
      }
      return 0
    })

  const handleAddDevice = async () => {
    if (!newDevice.deviceName || !newDevice.locationName) {
      setError("请填写设备名称和位置")
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      const response = await createDevice({
        deviceName: newDevice.deviceName,
        deviceType: newDevice.deviceType,
        areaId: newDevice.areaId,
        locationName: newDevice.locationName,
      })

      if (response.data) {
        // 关闭对话框并显示成功提示
        setIsAddDeviceOpen(false)
        setShowAddSuccess(true)

        // 重置表单
        setNewDevice({
          deviceName: "",
          deviceType: 1,
          areaId: 1,
          locationName: "",
        })

        // 3秒后隐藏成功提示，并重新获取设备列表
        setTimeout(() => {
          setShowAddSuccess(false)
          fetchDevices()
        }, 3000)
      }
    } catch (err) {
      console.error("Failed to create device:", err)
      setError("添加设备失败，请重试")
    } finally {
      setIsSubmitting(false)
    }
  }

  // 计算设备状态统计
  const deviceStats = {
    total: allDevices.length,
    online: allDevices.filter((d) => d.status === 1).length,
    offline: allDevices.filter((d) => d.status === 0).length,
    warning: allDevices.filter((d) => d.status === 2).length,
    maintenance: allDevices.filter((d) => d.status === 3).length,
  }

  const displayDevices = filteredDevices.map((device) => ({
    id: device.id.toString(),
    name: device.deviceName,
    type: getDeviceTypeName(device.deviceType),
    area: getAreaName(device.areaId.toString() as Exclude<DeviceArea, "all">), // Use helper function
    status: getStatusName(device.status) as "online" | "offline" | "warning" | "maintenance",
    location: device.locationName,
    lastUpdate: device.createTime,
    battery: 100, // Placeholder, as battery is not available from backend
    signal: 95, // Placeholder, as signal is not available from backend
    readings: {}, // Placeholder, as readings are not available from backend
    maintenance: device.maintenance,
  }))

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>加载设备数据中...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="p-6 bg-background min-h-screen">
      <div className="max-w-full">
        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">设备管理</h1>
          <p className="text-muted-foreground">监控和管理系统中所有的监测设备</p>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 flex items-center mb-4">
            <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* 成功提示 */}
        {showAddSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 flex items-center mb-4">
            <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
            <span>设备添加成功！设备已保存到系统。</span>
          </div>
        )}

        {/* 工具栏 */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          {/* 搜索和筛选 */}
          <div className="flex gap-4 w-full md:w-auto">
            <Input
              placeholder="搜索设备名称、ID或位置..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64"
            />
            <Select value={selectedType} onValueChange={(value) => setSelectedType(value as DeviceType)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="设备类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                <SelectItem value="rainfall">雨量监测</SelectItem>
                <SelectItem value="water-level">水位监测</SelectItem>
                <SelectItem value="flow">流量监测</SelectItem>
                <SelectItem value="weather">积水监测</SelectItem>
                <SelectItem value="camera">监控摄像头</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedArea} onValueChange={(value) => setSelectedArea(value as DeviceArea)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="所属区域" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部区域</SelectItem>
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

          {/* 添加设备按钮 */}
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
                    value={newDevice.deviceName}
                    onChange={(e) => setNewDevice({ ...newDevice, deviceName: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    设备类型
                  </Label>
                  <Select
                    value={newDevice.deviceType.toString()}
                    onValueChange={(value) => setNewDevice({ ...newDevice, deviceType: Number.parseInt(value) })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="选择设备类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">雨量监测</SelectItem>
                      <SelectItem value="2">水位监测</SelectItem>
                      <SelectItem value="3">流量监测</SelectItem>
                      <SelectItem value="4">积水监测</SelectItem>
                      <SelectItem value="5">监控摄像头</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="area" className="text-right">
                    所属区域
                  </Label>
                  <Select
                    value={newDevice.areaId.toString()}
                    onValueChange={(value) => setNewDevice({ ...newDevice, areaId: Number.parseInt(value) })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="选择所属区域" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">黄石坡</SelectItem>
                      <SelectItem value="2">月弦坝</SelectItem>
                      <SelectItem value="3">嘉州大道</SelectItem>
                      <SelectItem value="4">柏杨中路</SelectItem>
                      <SelectItem value="5">周河坎</SelectItem>
                      <SelectItem value="6">王浩儿街</SelectItem>
                      <SelectItem value="7">碧山路</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    具体位置
                  </Label>
                  <Input
                    id="location"
                    value={newDevice.locationName}
                    onChange={(e) => setNewDevice({ ...newDevice, locationName: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">取消</Button>
                </DialogClose>
                <Button onClick={handleAddDevice} disabled={isSubmitting}>
                  {isSubmitting ? "添加中..." : "添加设备"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                  value={(deviceStats.online / deviceStats.total) * 100 || 0}
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
                  value={(deviceStats.warning / deviceStats.total) * 100 || 0}
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
                  value={(deviceStats.offline / deviceStats.total) * 100 || 0}
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
                  value={(deviceStats.maintenance / deviceStats.total) * 100 || 0}
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
                {/* This section needs to be updated to fetch actual area stats from backend */}
                {/* For now, it's a static representation. */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">黄石坡</span>
                    <span className="text-sm font-medium">10 台设备</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>在线: 8</span>
                    <span>警告: 1</span>
                    <span>离线: 1</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">月弦坝</span>
                    <span className="text-sm font-medium">8 台设备</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "32%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>在线: 6</span>
                    <span>警告: 1</span>
                    <span>离线: 1</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">嘉州大道</span>
                    <span className="text-sm font-medium">7 台设备</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "28%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>在线: 5</span>
                    <span>警告: 1</span>
                    <span>离线: 1</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">柏杨中路</span>
                    <span className="text-sm font-medium">6 台设备</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "24%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>在线: 5</span>
                    <span>警告: 0</span>
                    <span>离线: 1</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">周河坎</span>
                    <span className="text-sm font-medium">5 台设备</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "20%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>在线: 3</span>
                    <span>警告: 1</span>
                    <span>离线: 1</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">王浩儿街</span>
                    <span className="text-sm font-medium">4 台设备</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "16%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>在线: 3</span>
                    <span>警告: 0</span>
                    <span>离线: 1</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">碧山路</span>
                    <span className="text-sm font-medium">3 台设备</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "12%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>在线: 2</span>
                    <span>警告: 1</span>
                    <span>离线: 0</span>
                  </div>
                </div>
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
                      {allDevices.filter((d) => d.deviceType === 1).length} 台设备
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <div
                      className="bg-green-500 h-2 rounded-l-full"
                      style={{
                        width: `${(allDevices.filter((d) => d.deviceType === 1 && d.status === 1).length / allDevices.filter((d) => d.deviceType === 1).length) * 100 || 0}%`,
                      }}
                    ></div>
                    <div
                      className="bg-yellow-500 h-2"
                      style={{
                        width: `${(allDevices.filter((d) => d.deviceType === 1 && d.status === 2).length / allDevices.filter((d) => d.deviceType === 1).length) * 100 || 0}%`,
                      }}
                    ></div>
                    <div
                      className="bg-gray-500 h-2 rounded-r-full"
                      style={{
                        width: `${(allDevices.filter((d) => d.deviceType === 1 && (d.status === 0 || d.status === 3)).length / allDevices.filter((d) => d.deviceType === 1).length) * 100 || 0}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">水位监测</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {allDevices.filter((d) => d.deviceType === 2).length} 台设备
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <div
                      className="bg-green-500 h-2 rounded-l-full"
                      style={{
                        width: `${(allDevices.filter((d) => d.deviceType === 2 && d.status === 1).length / allDevices.filter((d) => d.deviceType === 2).length) * 100 || 0}%`,
                      }}
                    ></div>
                    <div
                      className="bg-yellow-500 h-2"
                      style={{
                        width: `${(allDevices.filter((d) => d.deviceType === 2 && d.status === 2).length / allDevices.filter((d) => d.deviceType === 2).length) * 100 || 0}%`,
                      }}
                    ></div>
                    <div
                      className="bg-gray-500 h-2 rounded-r-full"
                      style={{
                        width: `${(allDevices.filter((d) => d.deviceType === 2 && (d.status === 0 || d.status === 3)).length / allDevices.filter((d) => d.deviceType === 2).length) * 100 || 0}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">流量监测</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {allDevices.filter((d) => d.deviceType === 3).length} 台设备
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <div
                      className="bg-green-500 h-2 rounded-l-full"
                      style={{
                        width: `${(allDevices.filter((d) => d.deviceType === 3 && d.status === 1).length / allDevices.filter((d) => d.deviceType === 3).length) * 100 || 0}%`,
                      }}
                    ></div>
                    <div
                      className="bg-yellow-500 h-2"
                      style={{
                        width: `${(allDevices.filter((d) => d.deviceType === 3 && d.status === 2).length / allDevices.filter((d) => d.deviceType === 3).length) * 100 || 0}%`,
                      }}
                    ></div>
                    <div
                      className="bg-gray-500 h-2 rounded-r-full"
                      style={{
                        width: `${(allDevices.filter((d) => d.deviceType === 3 && (d.status === 0 || d.status === 3)).length / allDevices.filter((d) => d.deviceType === 3).length) * 100 || 0}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CloudRain className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">积水监测</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {allDevices.filter((d) => d.deviceType === 4).length} 台设备
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <div
                      className="bg-green-500 h-2 rounded-l-full"
                      style={{
                        width: `${(allDevices.filter((d) => d.deviceType === 4 && d.status === 1).length / allDevices.filter((d) => d.deviceType === 4).length) * 100 || 0}%`,
                      }}
                    ></div>
                    <div
                      className="bg-yellow-500 h-2"
                      style={{
                        width: `${(allDevices.filter((d) => d.deviceType === 4 && d.status === 2).length / allDevices.filter((d) => d.deviceType === 4).length) * 100 || 0}%`,
                      }}
                    ></div>
                    <div
                      className="bg-gray-500 h-2 rounded-r-full"
                      style={{
                        width: `${(allDevices.filter((d) => d.deviceType === 4 && (d.status === 0 || d.status === 3)).length / allDevices.filter((d) => d.deviceType === 4).length) * 100 || 0}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CameraIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">监控摄像头</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {allDevices.filter((d) => d.deviceType === 5).length} 台设备
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <div
                      className="bg-green-500 h-2 rounded-l-full"
                      style={{
                        width: `${(allDevices.filter((d) => d.deviceType === 5 && d.status === 1).length / allDevices.filter((d) => d.deviceType === 5).length) * 100 || 0}%`,
                      }}
                    ></div>
                    <div
                      className="bg-yellow-500 h-2"
                      style={{
                        width: `${(allDevices.filter((d) => d.deviceType === 5 && d.status === 2).length / allDevices.filter((d) => d.deviceType === 5).length) * 100 || 0}%`,
                      }}
                    ></div>
                    <div
                      className="bg-gray-500 h-2 rounded-r-full"
                      style={{
                        width: `${(allDevices.filter((d) => d.deviceType === 5 && (d.status === 0 || d.status === 3)).length / allDevices.filter((d) => d.deviceType === 5).length) * 100 || 0}%`,
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
                      <Button variant="outline" className="w-[130px] bg-transparent">
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
                      <Button variant="outline" className="w-[130px] bg-transparent">
                        <MapPin className="ml-2 h-4 w-4" />
                        {selectedArea === "all" ? "全部区域" : getAreaName(selectedArea as Exclude<DeviceArea, "all">)}
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
                    className="w-auto bg-transparent"
                    onClick={() =>
                      setSortBy(sortBy === "lastUpdate" ? "name" : sortBy === "name" ? "status" : "lastUpdate")
                    }
                    title={sortBy === "lastUpdate" ? "按更新时间排序" : sortBy === "name" ? "按名称排序" : "按状态排序"}
                  >
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    {sortBy === "lastUpdate" ? "更新时间" : sortBy === "name" ? "名称" : "状态"}
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
                  {displayDevices.length > 0 ? (
                    displayDevices.map((device) => (
                      <div key={device.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">{getTypeIcon(device.type as Exclude<DeviceType, "all">)}</div>
                            <div>
                              <div className="flex items-center flex-wrap gap-2">
                                <h3 className="font-medium">{device.name}</h3>
                                {getStatusBadge(device.status)}
                                <span className="text-xs text-muted-foreground">ID: {device.id}</span>
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {device.location} ({device.area})
                              </div>

                              {device.readings && Object.keys(device.readings).length > 0 && (
                                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1">
                                  {Object.entries(device.readings).map(([key, value]) => (
                                    <div key={key} className="flex items-center text-xs">
                                      <span className="text-muted-foreground mr-1">{key}:</span>
                                      <span className="font-medium">{String(value)}</span>
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
                            <Button variant="outline" size="sm" className="h-8 bg-transparent">
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
                  {displayDevices.filter((d) => d.status === "online").length > 0 ? (
                    displayDevices
                      .filter((d) => d.status === "online")
                      .map((device) => (
                        <div key={device.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5">{getTypeIcon(device.type as Exclude<DeviceType, "all">)}</div>
                              <div>
                                <div className="flex items-center flex-wrap gap-2">
                                  <h3 className="font-medium">{device.name}</h3>
                                  {getStatusBadge(device.status)}
                                  <span className="text-xs text-muted-foreground">ID: {device.id}</span>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground mt-1">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {device.location} ({device.area})
                                </div>

                                {device.readings && Object.keys(device.readings).length > 0 && (
                                  <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1">
                                    {Object.entries(device.readings).map(([key, value]) => (
                                      <div key={key} className="flex items-center text-xs">
                                        <span className="text-muted-foreground mr-1">{key}:</span>
                                        <span className="font-medium">{String(value)}</span>
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
                              <Button variant="outline" size="sm" className="h-8 bg-transparent">
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

                <TabsContent value="warning" className="mt-4 space-y-4">
                  {displayDevices.filter((d) => d.status === "warning").length > 0 ? (
                    displayDevices
                      .filter((d) => d.status === "warning")
                      .map((device) => (
                        <div key={device.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5">{getTypeIcon(device.type as Exclude<DeviceType, "all">)}</div>
                              <div>
                                <div className="flex items-center flex-wrap gap-2">
                                  <h3 className="font-medium">{device.name}</h3>
                                  {getStatusBadge(device.status)}
                                  <span className="text-xs text-muted-foreground">ID: {device.id}</span>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground mt-1">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {device.location} ({device.area})
                                </div>

                                {device.readings && Object.keys(device.readings).length > 0 && (
                                  <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1">
                                    {Object.entries(device.readings).map(([key, value]) => (
                                      <div key={key} className="flex items-center text-xs">
                                        <span className="text-muted-foreground mr-1">{key}:</span>
                                        <span className="font-medium">{String(value)}</span>
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
                              <Button variant="outline" size="sm" className="h-8 bg-transparent">
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
                  {displayDevices.filter((d) => d.status === "offline").length > 0 ? (
                    displayDevices
                      .filter((d) => d.status === "offline")
                      .map((device) => (
                        <div key={device.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5">{getTypeIcon(device.type as Exclude<DeviceType, "all">)}</div>
                              <div>
                                <div className="flex items-center flex-wrap gap-2">
                                  <h3 className="font-medium">{device.name}</h3>
                                  {getStatusBadge(device.status)}
                                  <span className="text-xs text-muted-foreground">ID: {device.id}</span>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground mt-1">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {device.location} ({device.area})
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
                              <Button variant="outline" size="sm" className="h-8 bg-transparent">
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
                  {displayDevices.filter((d) => d.status === "maintenance").length > 0 ? (
                    displayDevices
                      .filter((d) => d.status === "maintenance")
                      .map((device) => (
                        <div key={device.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5">{getTypeIcon(device.type as Exclude<DeviceType, "all">)}</div>
                              <div>
                                <div className="flex items-center flex-wrap gap-2">
                                  <h3 className="font-medium">{device.name}</h3>
                                  {getStatusBadge(device.status)}
                                  <span className="text-xs text-muted-foreground">ID: {device.id}</span>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground mt-1">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {device.location} ({device.area})
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
                              <Button variant="outline" size="sm" className="h-8 bg-transparent">
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
            <Button variant="outline" onClick={fetchDevices}>
              刷新数据
            </Button>
            <Button>导出设备列表</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
