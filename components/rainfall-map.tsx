"use client"

import { useState, useEffect, useRef } from "react"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MapPin, Droplets, AlertTriangle, Maximize2, Minimize2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// 定义标记点类型
interface Marker {
  id: string
  type: "flooding" | "detection" | "public"
  position: [number, number] // 经纬度
  title: string
  severity?: "severe" | "moderate" | "mild"
  details?: string
}

export default function RainfallMap() {
  const [timeOffset, setTimeOffset] = useState(0)
  const [mapType, setMapType] = useState("rainfall")
  const [showFloodingMarkers, setShowFloodingMarkers] = useState(true)
  const [showDetectionPoints, setShowDetectionPoints] = useState(true)
  const [showPublicReports, setShowPublicReports] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [mapInstance, setMapInstance] = useState<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null)
  const mapContainer = useRef<HTMLDivElement>(null)

  // 龙子湖区域中心坐标（郑州市龙子湖高校园区附近）
  const centerPosition = [113.8011, 34.8215]

  // 模拟标记点数据
  const markers: Marker[] = [
    // 积水点
    {
      id: "1",
      type: "flooding",
      position: [113.8091, 34.8275],
      title: "科学大道严重积水",
      severity: "severe",
      details: "水深约30cm，车辆难以通行",
    },
    {
      id: "2",
      type: "flooding",
      position: [113.7951, 34.8195],
      title: "龙子湖北路中度积水",
      severity: "moderate",
      details: "水深约15cm，小型车辆通行受阻",
    },
    {
      id: "3",
      type: "flooding",
      position: [113.8131, 34.8145],
      title: "瀚海北路轻微积水",
      severity: "mild",
      details: "水深约5cm，通行基本正常",
    },
    {
      id: "4",
      type: "flooding",
      position: [113.8171, 34.8115],
      title: "龙翔三路严重积水",
      severity: "severe",
      details: "水深约35cm，道路已封闭",
    },
    {
      id: "5",
      type: "flooding",
      position: [113.7931, 34.8235],
      title: "文苑西路中度积水",
      severity: "moderate",
      details: "水深约20cm，通行受阻",
    },

    // 检测点 - 增加更多检测点覆盖龙子湖附近的学校
    {
      id: "6",
      type: "detection",
      position: [113.8051, 34.8265],
      title: "龙子湖检测站",
      details: "水位: 4.2m, 降雨: 45mm/h",
    },
    {
      id: "7",
      type: "detection",
      position: [113.7911, 34.8155],
      title: "东风渠检测站",
      details: "水位: 3.9m, 降雨: 42mm/h",
    },
    {
      id: "8",
      type: "detection",
      position: [113.8151, 34.8205],
      title: "郑东新区检测站",
      details: "水位: 3.5m, 降雨: 38mm/h",
    },
    {
      id: "9",
      type: "detection",
      position: [113.8011, 34.8115],
      title: "龙湖检测站",
      details: "水位: 2.8m, 降雨: 30mm/h",
    },
    // 新增检测点
    {
      id: "13",
      type: "detection",
      position: [113.8121, 34.8235],
      title: "郑州大学检测站",
      details: "水位: 3.2m, 降雨: 36mm/h",
    },
    {
      id: "14",
      type: "detection",
      position: [113.7981, 34.8305],
      title: "河南工业大学检测站",
      details: "水位: 3.7m, 降雨: 40mm/h",
    },
    {
      id: "15",
      type: "detection",
      position: [113.8231, 34.8175],
      title: "河南财经政法大学检测站",
      details: "水位: 3.3m, 降雨: 37mm/h",
    },
    {
      id: "16",
      type: "detection",
      position: [113.7871, 34.8185],
      title: "信息工程大学检测站",
      details: "水位: 3.6m, 降雨: 39mm/h",
    },
    {
      id: "17",
      type: "detection",
      position: [113.8091, 34.8345],
      title: "河南农业大学检测站",
      details: "水位: 3.4m, 降雨: 38mm/h",
    },
    {
      id: "18",
      type: "detection",
      position: [113.8201, 34.8125],
      title: "河南中医药大学检测站",
      details: "水位: 3.1m, 降雨: 35mm/h",
    },
    {
      id: "19",
      type: "detection",
      position: [113.7941, 34.8275],
      title: "华北水利水电大学检测站",
      details: "水位: 3.8m, 降雨: 41mm/h",
    },
    {
      id: "20",
      type: "detection",
      position: [113.8161, 34.8295],
      title: "郑州轻工业大学检测站",
      details: "水位: 3.5m, 降雨: 39mm/h",
    },

    // 公众上报
    {
      id: "10",
      type: "public",
      position: [113.8071, 34.8185],
      title: "公众上报-积水",
      details: "道路积水严重，车辆无法通行",
    },
    {
      id: "11",
      type: "public",
      position: [113.7971, 34.8225],
      title: "公众上报-排水不畅",
      details: "下水道堵塞，导致积水无法排出",
    },
    {
      id: "12",
      type: "public",
      position: [113.8111, 34.8165],
      title: "公众上报-交通拥堵",
      details: "因积水导致交通严重拥堵",
    },
  ]

  // 初始化高德地图
  useEffect(() => {
    // 检查是否已加载高德地图脚本
    if (!document.getElementById("amap-script") && !window.AMap) {
      const script = document.createElement("script")
      script.id = "amap-script"
      script.src = `https://webapi.amap.com/maps?v=2.0&key=0387fb68e296464d50b65478193f3504&plugin=AMap.Scale,AMap.ToolBar,AMap.HeatMap`
      script.async = true
      script.onload = initMap
      document.head.appendChild(script)
    } else if (window.AMap && !mapInstance) {
      initMap()
    }

    return () => {
      if (mapInstance) {
        mapInstance.destroy()
      }
    }
  }, [mapInstance])

  // 监听标记点显示状态变化
  useEffect(() => {
    if (mapInstance && mapLoaded) {
      updateMarkers()
    }
  }, [showFloodingMarkers, showDetectionPoints, showPublicReports, mapLoaded, mapInstance])

  // 监听标签页切换
  useEffect(() => {
    if (mapInstance && mapLoaded) {
      // 延迟一下以确保DOM已更新
      setTimeout(() => {
        mapInstance.resize()
      }, 100)
    }
  }, [mapType, mapInstance, mapLoaded])

  // 初始化地图
  const initMap = () => {
    if (!mapContainer.current || !window.AMap) return

    const map = new window.AMap.Map(mapContainer.current, {
      zoom: 14,
      center: centerPosition,
      mapStyle: "amap://styles/normal",
      viewMode: "2D",
    })

    // 添加控件
    map.addControl(new window.AMap.Scale())
    map.addControl(
      new window.AMap.ToolBar({
        position: "RB",
      }),
    )

    // 添加图层切换控件
    const layers = {
      base: new window.AMap.TileLayer(),
      satellite: new window.AMap.TileLayer.Satellite(),
      roadNet: new window.AMap.TileLayer.RoadNet(),
    }

    // 默认显示基础图层
    map.add([layers.base])

    // 监听地图加载完成事件
    map.on("complete", () => {
      setMapLoaded(true)
      setMapInstance(map)

      // 添加降水热力图层
      addRainfallHeatmap(map)
    })
  }

  // 添加降水热力图
  const addRainfallHeatmap = (map: any) => {
    // 模拟降水数据点
    const heatmapData = []

    // 生成随机降水点
    for (let i = 0; i < 200; i++) {
      // 在中心点周围随机生成点
      const lng = centerPosition[0] + (Math.random() - 0.5) * 0.05
      const lat = centerPosition[1] + (Math.random() - 0.5) * 0.05

      // 越靠近中心点，降水量越大
      const distance = Math.sqrt(Math.pow(lng - centerPosition[0], 2) + Math.pow(lat - centerPosition[1], 2))

      // 计算权重（降水量）
      const weight = Math.max(0, 1 - distance * 50)

      heatmapData.push({
        lng,
        lat,
        count: weight * 100, // 将权重转换为降水量
      })
    }

    // 创建热力图实例
    const heatmap = new window.AMap.HeatMap(map, {
      radius: 25, // 热力图半径
      opacity: [0.1, 0.8], // 热力图透明度
      gradient: {
        0.1: "rgba(0, 0, 255, 0.5)",
        0.3: "rgba(0, 255, 255, 0.5)",
        0.5: "rgba(0, 255, 0, 0.5)",
        0.7: "rgba(255, 255, 0, 0.5)",
        0.9: "rgba(255, 0, 0, 0.5)",
      },
    })

    // 设置数据
    heatmap.setDataSet({
      data: heatmapData,
      max: 100,
    })
  }

  // 更新标记点
  const updateMarkers = () => {
    if (!mapInstance) return

    // 清除所有标记
    mapInstance.clearMap()

    // 重新添加热力图
    addRainfallHeatmap(mapInstance)

    // 添加标记点
    markers.forEach((marker) => {
      // 根据类型和显示设置过滤标记点
      if (
        (marker.type === "flooding" && !showFloodingMarkers) ||
        (marker.type === "detection" && !showDetectionPoints) ||
        (marker.type === "public" && !showPublicReports)
      ) {
        return
      }

      // 根据类型设置图标样式
      let content = ""
      if (marker.type === "flooding") {
        const color = marker.severity === "severe" ? "#ef4444" : marker.severity === "moderate" ? "#f97316" : "#eab308"
        content = `
          <div class="flex items-center justify-center w-8 h-8">
            <div class="absolute p-1 rounded-full animate-pulse" style="background-color: ${color}">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
              </svg>
            </div>
          </div>
        `
      } else if (marker.type === "detection") {
        content = `
          <div class="flex items-center justify-center w-8 h-8">
            <div class="absolute p-1 rounded-full" style="background-color: #3b82f6">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </div>
        `
      } else if (marker.type === "public") {
        content = `
          <div class="flex items-center justify-center w-8 h-8">
            <div class="absolute p-1 rounded-full" style="background-color: #a855f7">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
              </svg>
            </div>
          </div>
        `
      }

      // 创建标记
      const mapMarker = new window.AMap.Marker({
        position: marker.position,
        title: marker.title,
        content: content,
        offset: new window.AMap.Pixel(-15, -15),
        extData: marker,
      })

      // 添加点击事件
      mapMarker.on("click", () => {
        setSelectedMarker(marker)
      })

      // 添加到地图
      mapInstance.add(mapMarker)
    })
  }

  // 切换地图类型
  const handleMapTypeChange = (type: string) => {
    setMapType(type)

    if (!mapInstance) return

    // 获取所有图层并移除
    const layers = mapInstance.getLayers()
    mapInstance.remove(layers)

    // 根据类型添加图层
    if (type === "satellite") {
      mapInstance.add([new window.AMap.TileLayer.Satellite()])
      // 重新添加标记点
      updateMarkers()
    } else if (type === "hybrid") {
      mapInstance.add([new window.AMap.TileLayer.Satellite(), new window.AMap.TileLayer.RoadNet()])
      // 重新添加标记点
      updateMarkers()
    } else {
      // 默认基础图层
      mapInstance.add([new window.AMap.TileLayer()])
      // 重新添加标记点和热力图
      updateMarkers()
    }
  }

  // 切换全屏显示
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // 关闭标记详情
  const closeMarkerDetails = () => {
    setSelectedMarker(null)
  }

  return (
    <div className={`space-y-4 ${isFullscreen ? "fixed inset-0 z-50 bg-background p-4" : ""}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">龙子湖实时降水地图</h3>
        <div className="flex items-center gap-4">
          <Select value={mapType} onValueChange={handleMapTypeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="地图类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rainfall">降水量</SelectItem>
              <SelectItem value="satellite">卫星图</SelectItem>
              <SelectItem value="hybrid">混合视图</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="map"
        className="w-full"
        onValueChange={(value) => {
          if (value === "satellite" || value === "hybrid") {
            handleMapTypeChange(value)
          } else {
            handleMapTypeChange("rainfall")
          }
        }}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="map">地图</TabsTrigger>
          <TabsTrigger value="satellite">卫星图</TabsTrigger>
          <TabsTrigger value="hybrid">混合视图</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="mt-2">
          <div
            className={`relative w-full ${isFullscreen ? "h-[calc(100vh-200px)]" : "h-[400px]"} bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden`}
          >
            <div ref={mapContainer} className="absolute inset-0"></div>

            {/* 标记详情弹窗 */}
            {selectedMarker && (
              <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-72 bg-white dark:bg-gray-800 p-3 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {selectedMarker.type === "flooding" && <Droplets className="h-4 w-4 text-blue-500" />}
                    {selectedMarker.type === "detection" && <MapPin className="h-4 w-4 text-blue-500" />}
                    {selectedMarker.type === "public" && <AlertTriangle className="h-4 w-4 text-purple-500" />}
                    <h4 className="font-medium text-sm">{selectedMarker.title}</h4>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={closeMarkerDetails}>
                    <span className="sr-only">关闭</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </Button>
                </div>

                {selectedMarker.type === "flooding" && (
                  <Badge
                    variant={
                      selectedMarker.severity === "severe"
                        ? "destructive"
                        : selectedMarker.severity === "moderate"
                          ? "warning"
                          : "outline"
                    }
                    className="mb-2"
                  >
                    {selectedMarker.severity === "severe"
                      ? "严重积水"
                      : selectedMarker.severity === "moderate"
                        ? "中度积水"
                        : "轻微积水"}
                  </Badge>
                )}

                <p className="text-xs text-muted-foreground mb-2">{selectedMarker.details}</p>

                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    查看详情
                  </Button>
                  <Button size="sm" className="h-7 text-xs">
                    导航至此
                  </Button>
                </div>
              </div>
            )}

            {/* 图例 */}
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 p-2 rounded-md shadow-md border border-gray-200 dark:border-gray-700">
              <div className="text-xs font-medium mb-1">图例</div>
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs">严重积水</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-xs">中度积水</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs">轻微积水</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs">检测站</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-xs">公众上报</span>
                </div>
              </div>
            </div>

            {/* 降水强度图例 - 移到左上角 */}
            <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 p-2 rounded-md shadow-md border border-gray-200 dark:border-gray-700">
              <div className="text-xs font-medium mb-1">降水强度</div>
              <div className="w-32 h-2 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-full"></div>
              <div className="flex justify-between text-[10px] mt-1">
                <span>小</span>
                <span>中</span>
                <span>大</span>
                <span>暴</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="satellite" className="mt-2">
          <div
            className={`relative w-full ${isFullscreen ? "h-[calc(100vh-200px)]" : "h-[400px]"} bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden`}
          >
            <div ref={mapContainer} className="absolute inset-0"></div>

            {/* 降水强度图例 - 移到左上角 */}
            <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 p-2 rounded-md shadow-md border border-gray-200 dark:border-gray-700">
              <div className="text-xs font-medium mb-1">降水强度</div>
              <div className="w-32 h-2 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-full"></div>
              <div className="flex justify-between text-[10px] mt-1">
                <span>小</span>
                <span>中</span>
                <span>大</span>
                <span>暴</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="hybrid" className="mt-2">
          <div
            className={`relative w-full ${isFullscreen ? "h-[calc(100vh-200px)]" : "h-[400px]"} bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden`}
          >
            <div ref={mapContainer} className="absolute inset-0"></div>

            {/* 降水强度图例 - 移到左上角 */}
            <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 p-2 rounded-md shadow-md border border-gray-200 dark:border-gray-700">
              <div className="text-xs font-medium mb-1">降水强度</div>
              <div className="w-32 h-2 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-full"></div>
              <div className="flex justify-between text-[10px] mt-1">
                <span>小</span>
                <span>中</span>
                <span>大</span>
                <span>暴</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="space-y-2 flex-1 min-w-[200px]">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>现在</span>
            <span>+1小时</span>
            <span>+2小时</span>
            <span>+3小时</span>
          </div>
          <Slider value={[timeOffset]} min={0} max={3} step={0.5} onValueChange={(value) => setTimeOffset(value[0])} />
          <div className="text-center text-sm font-medium">
            显示预报: {timeOffset === 0 ? "现在" : `+${timeOffset} 小时`}
          </div>
        </div>

        <div className="flex flex-col gap-2 min-w-[200px]">
          <div className="flex items-center space-x-2">
            <Switch id="flooding" checked={showFloodingMarkers} onCheckedChange={setShowFloodingMarkers} />
            <Label htmlFor="flooding">显示道路积水</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="detection" checked={showDetectionPoints} onCheckedChange={setShowDetectionPoints} />
            <Label htmlFor="detection">显示检测点</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="public" checked={showPublicReports} onCheckedChange={setShowPublicReports} />
            <Label htmlFor="public">显示公众上报</Label>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        <div className="flex items-center gap-1 px-2 py-1 bg-red-100 rounded-md">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-xs">严重积水</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 rounded-md">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-xs">中度积水</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 rounded-md">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-xs">轻微积水</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-md">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-xs">检测站</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 rounded-md">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span className="text-xs">公众上报</span>
        </div>
      </div>
    </div>
  )
}
