"use client"

import { useState } from "react"
import { Search, MapPin, Droplets, AlertTriangle, Info, CloudRain } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DetectionPoints() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState("all")

  const detectionPoints = [
    {
      id: "DP001",
      name: "龙子湖中心监测站",
      status: "danger",
      waterLevel: "4.2m",
      rainfall: "45mm/h",
      lastUpdate: "5分钟前",
      location: "郑州市郑东新区龙子湖中心区域",
      coordinates: "34.7531° N, 113.8011° E",
      alert: true,
    },
    {
      id: "DP002",
      name: "东风渠监测站",
      status: "danger",
      waterLevel: "3.9m",
      rainfall: "42mm/h",
      lastUpdate: "3分钟前",
      location: "郑州市郑东新区东风渠附近",
      coordinates: "34.7498° N, 113.8056° E",
      alert: true,
    },
    {
      id: "DP003",
      name: "龙子湖北岸监测站",
      status: "warning",
      waterLevel: "3.5m",
      rainfall: "38mm/h",
      lastUpdate: "7分钟前",
      location: "郑州市郑东新区龙子湖北岸",
      coordinates: "34.7562° N, 113.8025° E",
      alert: true,
    },
    {
      id: "DP004",
      name: "科学大道监测站",
      status: "danger",
      waterLevel: "4.0m",
      rainfall: "48mm/h",
      lastUpdate: "2分钟前",
      location: "郑州市郑东新区科学大道",
      coordinates: "34.7515° N, 113.8103° E",
      alert: true,
    },
    {
      id: "DP005",
      name: "龙翔街监测站",
      status: "warning",
      waterLevel: "3.3m",
      rainfall: "35mm/h",
      lastUpdate: "10分钟前",
      location: "郑州市郑东新区龙翔街",
      coordinates: "34.7489° N, 113.7985° E",
      alert: true,
    },
    {
      id: "DP006",
      name: "瀚海路监测站",
      status: "normal",
      waterLevel: "2.5m",
      rainfall: "25mm/h",
      lastUpdate: "8分钟前",
      location: "郑州市郑东新区瀚海路",
      coordinates: "34.7542° N, 113.7956° E",
      alert: false,
    },
    {
      id: "DP007",
      name: "如意湖监测站",
      status: "normal",
      waterLevel: "2.3m",
      rainfall: "22mm/h",
      lastUpdate: "12分钟前",
      location: "郑州市郑东新区如意湖",
      coordinates: "34.7601° N, 113.8078° E",
      alert: false,
    },
    {
      id: "DP008",
      name: "龙湖大道监测站",
      status: "warning",
      waterLevel: "3.2m",
      rainfall: "32mm/h",
      lastUpdate: "6分钟前",
      location: "郑州市郑东新区龙湖大道",
      coordinates: "34.7512° N, 113.8145° E",
      alert: true,
    },
  ]

  const filteredPoints = detectionPoints.filter((point) => {
    const matchesSearch =
      point.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      point.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "alert" && point.alert) ||
      (filterStatus === "normal" && point.status === "normal") ||
      (filterStatus === "warning" && (point.status === "warning" || point.status === "danger"))

    return matchesSearch && matchesFilter
  })

  const selectedPointData = selectedPoint ? detectionPoints.find((point) => point.id === selectedPoint) : null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">乐山区监测点网络</h3>
        <div className="flex items-center gap-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="筛选状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="normal">正常</SelectItem>
              <SelectItem value="warning">预警</SelectItem>
              <SelectItem value="alert">有预警</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索监测点..."
              className="pl-8 w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 space-y-2 h-[500px] overflow-y-auto pr-2">
          {filteredPoints.map((point) => (
            <div
              key={point.id}
              className={`p-3 border rounded-md cursor-pointer transition-colors ${
                selectedPoint === point.id ? "bg-blue-50 border-blue-200" : ""
              }`}
              onClick={() => setSelectedPoint(point.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <MapPin
                    className={`h-5 w-5 ${
                      point.status === "normal"
                        ? "text-green-500"
                        : point.status === "warning"
                          ? "text-yellow-500"
                          : "text-red-500"
                    }`}
                  />
                  <div>
                    <div className="font-medium">{point.name}</div>
                    <div className="text-xs text-muted-foreground">{point.id}</div>
                  </div>
                </div>
                {point.alert && (
                  <Badge variant="destructive" className="text-xs">
                    预警
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span>水位: {point.waterLevel}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CloudRain className="h-4 w-4 text-blue-500" />
                  <span>降雨: {point.rainfall}</span>
                </div>
              </div>
              <div className="text-xs text-right text-muted-foreground mt-1">更新于 {point.lastUpdate}</div>
            </div>
          ))}
        </div>

        <div className="md:col-span-2">
          {selectedPointData ? (
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">详细信息</TabsTrigger>
                <TabsTrigger value="history">历史数据</TabsTrigger>
                <TabsTrigger value="map">地图位置</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin
                        className={`h-5 w-5 ${
                          selectedPointData.status === "normal"
                            ? "text-green-500"
                            : selectedPointData.status === "warning"
                              ? "text-yellow-500"
                              : "text-red-500"
                        }`}
                      />
                      {selectedPointData.name}
                      {selectedPointData.alert && (
                        <Badge variant="destructive" className="ml-2">
                          预警
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">监测站ID</div>
                        <div>{selectedPointData.id}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">最后更新</div>
                        <div>{selectedPointData.lastUpdate}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">位置</div>
                        <div>{selectedPointData.location}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">坐标</div>
                        <div>{selectedPointData.coordinates}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">当前水位</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end gap-2">
                        <div className="text-3xl font-bold">{selectedPointData.waterLevel}</div>
                        <div
                          className={`text-sm ${
                            selectedPointData.status === "normal"
                              ? "text-green-500"
                              : selectedPointData.status === "warning"
                                ? "text-yellow-500"
                                : "text-red-500"
                          }`}
                        >
                          {selectedPointData.status === "normal"
                            ? "正常水位"
                            : selectedPointData.status === "warning"
                              ? "接近警戒线"
                              : "超过警戒线"}
                        </div>
                      </div>
                      <div className="mt-4 h-[100px] w-full bg-gradient-to-b from-white to-blue-500 rounded-md relative">
                        <div
                          className="absolute left-0 right-0 border-t border-dashed border-red-500"
                          style={{ top: "30%" }}
                        >
                          <div className="absolute -top-3 right-0 text-xs text-red-500 bg-white px-1">警戒水位</div>
                        </div>
                        <div
                          className="absolute left-0 right-0 border-t border-dashed border-yellow-500"
                          style={{ top: "50%" }}
                        >
                          <div className="absolute -top-3 right-0 text-xs text-yellow-500 bg-white px-1">注意水位</div>
                        </div>
                        <div
                          className="absolute left-0 right-0 border-t-2 border-blue-700"
                          style={{
                            top: `${100 - Number.parseInt(selectedPointData.waterLevel) * 20}%`,
                            maxTop: "90%",
                            minTop: "10%",
                          }}
                        >
                          <div className="absolute -top-3 left-0 text-xs text-blue-700 bg-white px-1">
                            当前: {selectedPointData.waterLevel}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">降雨强度</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end gap-2">
                        <div className="text-3xl font-bold">{selectedPointData.rainfall}</div>
                        <div
                          className={`text-sm ${
                            Number.parseInt(selectedPointData.rainfall) < 20
                              ? "text-green-500"
                              : Number.parseInt(selectedPointData.rainfall) < 40
                                ? "text-yellow-500"
                                : "text-red-500"
                          }`}
                        >
                          {Number.parseInt(selectedPointData.rainfall) < 20
                            ? "小雨"
                            : Number.parseInt(selectedPointData.rainfall) < 40
                              ? "中雨"
                              : "大雨"}
                        </div>
                      </div>
                      <div className="mt-4 h-[100px] w-full bg-gradient-to-r from-blue-100 via-blue-300 to-blue-600 rounded-md relative">
                        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-blue-400 bg-opacity-50 rounded-b-md"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {selectedPointData.alert && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-800">洪水预警</h4>
                      <p className="text-sm text-red-700 mt-1">
                        该监测点水位已超过警戒线，请注意防范可能发生的内涝和洪水。建议避免前往低洼地区，并关注最新预警信息。
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="history" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-medium mb-4">过去24小时数据</h4>
                    <div className="h-[200px] w-full bg-white rounded-md relative">
                      {/* 这里会是一个图表 */}
                      <div className="absolute inset-0 flex flex-col">
                        <div className="text-center text-sm text-muted-foreground mb-2">水位和降雨量历史数据</div>
                        <div className="flex-1 border-b border-l relative">
                          <div
                            className="absolute left-0 right-0 border-t border-dashed border-red-300"
                            style={{ top: "30%" }}
                          >
                            <div className="absolute -top-3 right-0 text-xs text-red-500 bg-white px-1">警戒水位</div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-r from-blue-100 to-blue-400 opacity-20"></div>
                          <div
                            className="absolute bottom-0 left-0 right-0 border-t border-blue-500"
                            style={{ height: "60%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>24小时前</span>
                      <span>18小时前</span>
                      <span>12小时前</span>\<span>6小时前</span>
                      <span>现在</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="map" className="mt-4">
                <div className="relative w-full h-[400px] bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                  <div className="absolute inset-0">
                    <img
                      src="/placeholder.svg?height=400&width=800"
                      alt="监测点位置"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="p-1 bg-red-500 rounded-full animate-ping absolute inset-0"></div>
                      <div className="p-1 bg-red-500 rounded-full relative">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-sm text-center text-muted-foreground">
                  {selectedPointData.location} ({selectedPointData.coordinates})
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="h-full flex items-center justify-center border rounded-md p-8">
              <div className="text-center">
                <Info className="h-12 w-12 text-blue-200 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">选择监测点</h3>
                <p className="text-muted-foreground max-w-md">
                  从左侧列表中选择一个监测点以查看详细信息、历史数据和地图位置。
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
