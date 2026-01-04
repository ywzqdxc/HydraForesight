"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  Droplets,
  Plus,
  Search,
  Settings,
  Signal,
  Thermometer,
  XCircle,
  AlertCircle,
  CloudRain,
  CameraIcon,
  MapPin,
  Trash2,
  Edit,
  Eye,
} from "lucide-react"
import {
  createDevice,
  pageDevices,
  deleteDevice,
  updateDevice,
  getDeviceDetail,
  type Device as BackendDevice,
} from "@/lib/api/device"

export default function DeviceManagementPage() {
  const [allDevices, setAllDevices] = useState<BackendDevice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"all" | "online" | "offline" | "warning" | "maintenance">("all")
  const [selectedType, setSelectedType] = useState<number | "all">("all")
  const [selectedArea, setSelectedArea] = useState<number | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState<BackendDevice | null>(null)
  const [showAddSuccess, setShowAddSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [newDevice, setNewDevice] = useState({
    deviceId: "",
    deviceName: "",
    deviceType: 1,
    areaId: 1,
    locationName: "",
    latitude: 29.5629,
    longitude: 104.0657,
    deviceModel: "",
    manufacturer: "",
  })

  useEffect(() => {
    fetchDevices()
  }, [])

  const fetchDevices = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await pageDevices({ current: 1, size: 1000 })
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

  const getAreaName = (areaId: number): string => {
    const areaMap: Record<number, string> = {
      1: "黄石坡",
      2: "月弦坝",
      3: "嘉州大道",
      4: "柏杨中路",
      5: "周河坎",
      6: "王浩儿街",
      7: "碧山路",
    }
    return areaMap[areaId] || "未知区域"
  }

  const getTypeIcon = (type: number) => {
    switch (type) {
      case 1:
        return <Droplets className="h-4 w-4 text-blue-500" />
      case 2:
        return <Thermometer className="h-4 w-4 text-cyan-500" />
      case 3:
        return <BarChart3 className="h-4 w-4 text-green-500" />
      case 4:
        return <CloudRain className="h-4 w-4 text-purple-500" />
      case 5:
        return <CameraIcon className="h-4 w-4 text-gray-500" />
      default:
        return null
    }
  }

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

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 1:
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            在线
          </Badge>
        )
      case 0:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            <XCircle className="mr-1 h-3 w-3" />
            离线
          </Badge>
        )
      case 2:
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertTriangle className="mr-1 h-3 w-3" />
            警告
          </Badge>
        )
      case 3:
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Settings className="mr-1 h-3 w-3" />
            维护中
          </Badge>
        )
      default:
        return null
    }
  }

  const filteredDevices = allDevices.filter((device) => {
    if (selectedType !== "all" && device.deviceType !== selectedType) return false
    if (selectedArea !== "all" && device.areaId !== selectedArea) return false
    if (activeTab !== "all") {
      const statusMap = { online: 1, offline: 0, warning: 2, maintenance: 3 }
      if (device.status !== statusMap[activeTab]) return false
    }
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

  const handleAddDevice = async () => {
    if (!newDevice.deviceId || !newDevice.deviceName || !newDevice.locationName) {
      setError("请填写设备ID、设备名称和位置")
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)
      await createDevice(newDevice)
      setIsAddDeviceOpen(false)
      setShowAddSuccess(true)
      setNewDevice({
        deviceId: "",
        deviceName: "",
        deviceType: 1,
        areaId: 1,
        locationName: "",
        latitude: 29.5629,
        longitude: 104.0657,
        deviceModel: "",
        manufacturer: "",
      })
      setTimeout(() => {
        setShowAddSuccess(false)
        fetchDevices()
      }, 2000)
    } catch (err) {
      console.error("Failed to create device:", err)
      setError("添加设备失败，请重试")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteDevice = async (id: number) => {
    if (!confirm("确定要删除该设备吗？此操作不可恢复。")) return

    try {
      setError(null)
      await deleteDevice(id)
      setAllDevices((prev) => prev.filter((d) => d.id !== id))
    } catch (err) {
      console.error("Failed to delete device:", err)
      setError("删除设备失败，请重试")
    }
  }

  const handleViewDevice = async (device: BackendDevice) => {
    try {
      const response = await getDeviceDetail(device.id)
      if (response.data) {
        setSelectedDevice(response.data)
        setIsViewDialogOpen(true)
      }
    } catch (err) {
      console.error("Failed to fetch device detail:", err)
      setError("获取设备详情失败")
    }
  }

  const handleEditDevice = async (device: BackendDevice) => {
    setSelectedDevice(device)
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = async () => {
    if (!selectedDevice) return

    try {
      setIsSubmitting(true)
      setError(null)
      await updateDevice({
        id: selectedDevice.id,
        deviceName: selectedDevice.deviceName,
        deviceModel: selectedDevice.deviceModel,
        manufacturer: selectedDevice.manufacturer,
        areaId: selectedDevice.areaId,
        locationName: selectedDevice.locationName,
        latitude: selectedDevice.latitude,
        longitude: selectedDevice.longitude,
        status: selectedDevice.status,
        remark: selectedDevice.remark,
      })
      setIsEditDialogOpen(false)
      setSelectedDevice(null)
      fetchDevices()
    } catch (err) {
      console.error("Failed to update device:", err)
      setError("更新设备失败，请重试")
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateReadings = (device: BackendDevice) => {
    switch (device.deviceType) {
      case 1: // 雨量监测
        return {
          rainfall: `${(Math.random() * 50).toFixed(1)}mm/h`,
          temperature: `${(20 + Math.random() * 10).toFixed(1)}°C`,
          humidity: `${(80 + Math.random() * 20).toFixed(0)}%`,
        }
      case 2: // 水位监测
        return {
          waterLevel: `${(1 + Math.random() * 3).toFixed(2)}m`,
          flow: `${(0.5 + Math.random() * 2).toFixed(1)}m³/s`,
          status: device.status === 2 ? "接近警戒水位" : "正常",
        }
      case 3: // 流量监测
        return {
          flow: `${(1 + Math.random() * 3).toFixed(1)}m³/s`,
          pressure: `${(0.5 + Math.random() * 0.5).toFixed(2)}MPa`,
          turbidity: ["低", "中", "高"][Math.floor(Math.random() * 3)],
        }
      case 4: // 积水监测
        return {
          temperature: `${(20 + Math.random() * 10).toFixed(1)}°C`,
          humidity: `${(80 + Math.random() * 20).toFixed(0)}%`,
          windSpeed: `${(2 + Math.random() * 5).toFixed(1)}m/s`,
          windDirection: ["东", "南", "西", "北", "东南", "东北", "西南", "西北"][Math.floor(Math.random() * 8)],
          pressure: `${(995 + Math.random() * 20).toFixed(0)}hPa`,
        }
      case 5: // 摄像头
        return {
          storage: `${(20 + Math.random() * 60).toFixed(0)}%`,
          resolution: "1080p",
          status: device.status === 1 ? "正常录制中" : "离线",
        }
      default:
        return {}
    }
  }

  // 计算设备统计
  const deviceStats = {
    total: allDevices.length,
    online: allDevices.filter((d) => d.status === 1).length,
    offline: allDevices.filter((d) => d.status === 0).length,
    warning: allDevices.filter((d) => d.status === 2).length,
    maintenance: allDevices.filter((d) => d.status === 3).length,
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex items-center justify-center flex-1">
          <p>加载设备数据中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          {/* 页面标题 */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">设备管理</h1>
              <p className="text-sm text-muted-foreground mt-1">管理和监控所有降水监测设备</p>
            </div>
            <Dialog open={isAddDeviceOpen} onOpenChange={setIsAddDeviceOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> 添加设备
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>添加新设备</DialogTitle>
                  <DialogDescription>填写以下信息添加新的监测设备到系统中</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="deviceId" className="text-right">
                      设备ID <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="deviceId"
                      placeholder="例如：RAIN-001"
                      value={newDevice.deviceId}
                      onChange={(e) => setNewDevice({ ...newDevice, deviceId: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      设备名称 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="例如：黄石坡雨量计"
                      value={newDevice.deviceName}
                      onChange={(e) => setNewDevice({ ...newDevice, deviceName: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      设备类型 <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={newDevice.deviceType.toString()}
                      onValueChange={(value) => setNewDevice({ ...newDevice, deviceType: Number.parseInt(value) })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
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
                      所属区域 <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={newDevice.areaId.toString()}
                      onValueChange={(value) => setNewDevice({ ...newDevice, areaId: Number.parseInt(value) })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
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
                      具体位置 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="location"
                      placeholder="例如：河道左岸"
                      value={newDevice.locationName}
                      onChange={(e) => setNewDevice({ ...newDevice, locationName: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="longitude" className="text-right">
                      经度 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="0.0001"
                      value={newDevice.longitude}
                      onChange={(e) =>
                        setNewDevice({ ...newDevice, longitude: Number.parseFloat(e.target.value) || 0 })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="latitude" className="text-right">
                      纬度 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="0.0001"
                      value={newDevice.latitude}
                      onChange={(e) => setNewDevice({ ...newDevice, latitude: Number.parseFloat(e.target.value) || 0 })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="model" className="text-right">
                      设备型号
                    </Label>
                    <Input
                      id="model"
                      placeholder="可选"
                      value={newDevice.deviceModel}
                      onChange={(e) => setNewDevice({ ...newDevice, deviceModel: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="manufacturer" className="text-right">
                      生产厂家
                    </Label>
                    <Input
                      id="manufacturer"
                      placeholder="可选"
                      value={newDevice.manufacturer}
                      onChange={(e) => setNewDevice({ ...newDevice, manufacturer: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDeviceOpen(false)} disabled={isSubmitting}>
                    取消
                  </Button>
                  <Button onClick={handleAddDevice} disabled={isSubmitting}>
                    {isSubmitting ? "添加中..." : "确认添加"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* 成功提示 */}
          {showAddSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
              <span>设备添加成功！</span>
            </div>
          )}

          {/* 设备概览统计卡片 */}
          <div className="grid gap-4 md:grid-cols-5">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">总设备数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{deviceStats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">在线设备</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{deviceStats.online}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">离线设备</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">{deviceStats.offline}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">警告设备</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{deviceStats.warning}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">维护中</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{deviceStats.maintenance}</div>
              </CardContent>
            </Card>
          </div>

          {/* 筛选工具栏 */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索设备名称、ID或位置..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedType.toString()}
              onValueChange={(value) => setSelectedType(value === "all" ? "all" : Number.parseInt(value))}
            >
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="设备类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                <SelectItem value="1">雨量监测</SelectItem>
                <SelectItem value="2">水位监测</SelectItem>
                <SelectItem value="3">流量监测</SelectItem>
                <SelectItem value="4">积水监测</SelectItem>
                <SelectItem value="5">监控摄像头</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={selectedArea.toString()}
              onValueChange={(value) => setSelectedArea(value === "all" ? "all" : Number.parseInt(value))}
            >
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="所属区域" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部区域</SelectItem>
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

          {/* 设备列表标签页 */}
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">全部 ({deviceStats.total})</TabsTrigger>
              <TabsTrigger value="online">在线 ({deviceStats.online})</TabsTrigger>
              <TabsTrigger value="offline">离线 ({deviceStats.offline})</TabsTrigger>
              <TabsTrigger value="warning">警告 ({deviceStats.warning})</TabsTrigger>
              <TabsTrigger value="maintenance">维护中 ({deviceStats.maintenance})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4 mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredDevices.map((device) => {
                  const readings = generateReadings(device)
                  const battery = 60 + Math.random() * 40
                  const signal = 70 + Math.random() * 30

                  return (
                    <Card key={device.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2 flex-1">
                            {getTypeIcon(device.deviceType)}
                            <div className="flex-1">
                              <CardTitle className="text-base">{device.deviceName}</CardTitle>
                              <CardDescription className="text-xs mt-1">
                                {getStatusBadge(device.status)}
                              </CardDescription>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-sm space-y-1">
                          <div className="flex items-center text-muted-foreground">
                            <span className="font-medium">ID:</span>
                            <span className="ml-2">{device.deviceId}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>
                              {device.locationName} ({getAreaName(device.areaId)})
                            </span>
                          </div>
                        </div>

                        {Object.keys(readings).length > 0 && (
                          <div className="pt-2 border-t space-y-1">
                            {Object.entries(readings).map(([key, value]) => (
                              <div key={key} className="flex justify-between text-xs">
                                <span className="text-muted-foreground">{key}:</span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="pt-2 border-t text-xs text-muted-foreground flex items-center gap-1">
                          <span>最后更新:</span>
                          <span>{new Date(device.createTime).toLocaleString("zh-CN")}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground flex items-center gap-1">
                                <Battery className="h-3 w-3" />
                                电量
                              </span>
                              <span className="font-medium">{battery.toFixed(0)}%</span>
                            </div>
                            <Progress value={battery} className="h-1" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground flex items-center gap-1">
                                <Signal className="h-3 w-3" />
                                信号
                              </span>
                              <span className="font-medium">{signal.toFixed(0)}%</span>
                            </div>
                            <Progress value={signal} className="h-1" />
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-transparent"
                            onClick={() => handleViewDevice(device)}
                          >
                            <Eye className="mr-1 h-3 w-3" />
                            查看数据
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-transparent"
                            onClick={() => handleEditDevice(device)}
                          >
                            <Edit className="mr-1 h-3 w-3" />
                            配置
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                            onClick={() => handleDeleteDevice(device.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {filteredDevices.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p>暂无符合条件的设备</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>设备详细信息</DialogTitle>
          </DialogHeader>
          {selectedDevice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>设备名称</Label>
                  <p className="text-sm mt-1">{selectedDevice.deviceName}</p>
                </div>
                <div>
                  <Label>设备ID</Label>
                  <p className="text-sm mt-1">{selectedDevice.deviceId}</p>
                </div>
                <div>
                  <Label>设备类型</Label>
                  <p className="text-sm mt-1">{getDeviceTypeName(selectedDevice.deviceType)}</p>
                </div>
                <div>
                  <Label>所属区域</Label>
                  <p className="text-sm mt-1">{getAreaName(selectedDevice.areaId)}</p>
                </div>
                <div>
                  <Label>安装位置</Label>
                  <p className="text-sm mt-1">{selectedDevice.locationName}</p>
                </div>
                <div>
                  <Label>设备状态</Label>
                  <p className="text-sm mt-1">{getStatusBadge(selectedDevice.status)}</p>
                </div>
                <div>
                  <Label>经度</Label>
                  <p className="text-sm mt-1">{selectedDevice.longitude}</p>
                </div>
                <div>
                  <Label>纬度</Label>
                  <p className="text-sm mt-1">{selectedDevice.latitude}</p>
                </div>
                {selectedDevice.deviceModel && (
                  <div>
                    <Label>设备型号</Label>
                    <p className="text-sm mt-1">{selectedDevice.deviceModel}</p>
                  </div>
                )}
                {selectedDevice.manufacturer && (
                  <div>
                    <Label>生产厂家</Label>
                    <p className="text-sm mt-1">{selectedDevice.manufacturer}</p>
                  </div>
                )}
              </div>
              {selectedDevice.remark && (
                <div>
                  <Label>备注</Label>
                  <p className="text-sm mt-1">{selectedDevice.remark}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>编辑设备信息</DialogTitle>
          </DialogHeader>
          {selectedDevice && (
            <div className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">设备名称</Label>
                <Input
                  value={selectedDevice.deviceName}
                  onChange={(e) => setSelectedDevice({ ...selectedDevice, deviceName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">所属区域</Label>
                <Select
                  value={selectedDevice.areaId.toString()}
                  onValueChange={(value) => setSelectedDevice({ ...selectedDevice, areaId: Number.parseInt(value) })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
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
                <Label className="text-right">安装位置</Label>
                <Input
                  value={selectedDevice.locationName}
                  onChange={(e) => setSelectedDevice({ ...selectedDevice, locationName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">经度</Label>
                <Input
                  type="number"
                  step="0.0001"
                  value={selectedDevice.longitude}
                  onChange={(e) =>
                    setSelectedDevice({ ...selectedDevice, longitude: Number.parseFloat(e.target.value) })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">纬度</Label>
                <Input
                  type="number"
                  step="0.0001"
                  value={selectedDevice.latitude}
                  onChange={(e) =>
                    setSelectedDevice({ ...selectedDevice, latitude: Number.parseFloat(e.target.value) })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">设备型号</Label>
                <Input
                  value={selectedDevice.deviceModel || ""}
                  onChange={(e) => setSelectedDevice({ ...selectedDevice, deviceModel: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">生产厂家</Label>
                <Input
                  value={selectedDevice.manufacturer || ""}
                  onChange={(e) => setSelectedDevice({ ...selectedDevice, manufacturer: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">设备状态</Label>
                <Select
                  value={selectedDevice.status.toString()}
                  onValueChange={(value) => setSelectedDevice({ ...selectedDevice, status: Number.parseInt(value) })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">在线</SelectItem>
                    <SelectItem value="0">离线</SelectItem>
                    <SelectItem value="2">警告</SelectItem>
                    <SelectItem value="3">维护中</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">备注</Label>
                <Input
                  value={selectedDevice.remark || ""}
                  onChange={(e) => setSelectedDevice({ ...selectedDevice, remark: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isSubmitting}>
              取消
            </Button>
            <Button onClick={handleSaveEdit} disabled={isSubmitting}>
              {isSubmitting ? "保存中..." : "保存修改"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
