"use client"

import { useState, useEffect, useRef } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MapPin, Droplets, Maximize2, Minimize2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AMapType {
  Map: new (container: string, options?: any) => any
  Marker: any
  TileLayer: any
  ToolBar: any
  Pixel: any
  createDefaultLayer: () => any
}

declare global {
  interface Window {
    AMap: AMapType
  }
}

interface Marker {
  id: string
  type: "flooding" | "detection" | "public"
  position: [number, number]
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

  const centerPosition = [103.7361, 29.569559]

  const markers: Marker[] = [
    // 积水点
    {
      id: "1",
      type: "flooding",
      position: [103.765277, 29.579667],
      title: "嘉定北路与柏杨东路交叉口严重积水",
      severity: "severe",
      details: "水深约30cm，车辆难以通行",
    },
    {
      id: "2",
      type: "flooding",
      position: [103.724953, 29.548151],
      title: "临江东路(鹰咀岩路口)中度积水",
      severity: "moderate",
      details: "水深约15cm，小型车辆通行受阻",
    },
    {
      id: "3",
      type: "flooding",
      position: [103.710062, 29.558163],
      title: "青江路南段",
      severity: "mild",
      details: "水深约5cm，通行基本正常",
    },
    {
      id: "4",
      type: "flooding",
      position: [103.733596, 29.555627],
      title: "肖坝路严重积水",
      severity: "severe",
      details: "水深约35cm，道路已封闭",
    },
    {
      id: "5",
      type: "flooding",
      position: [103.71434, 29.587026],
      title: "长青路(肖坝旅游车站)中度积水",
      severity: "moderate",
      details: "水深约20cm，通行受阻",
    },
    {
      id: "6",
      type: "flooding",
      position: [103.723742, 29.593938],
      title: "长青路(长征公园)中度积水",
      severity: "moderate",
      details: "水深约20cm，通行受阻",
    },
    {
      id: "7",
      type: "flooding",
      position: [103.747154, 29.588207],
      title: "柏杨中路(乐山广场交叉口)严重积水",
      severity: "severe",
      details: "水深约20cm，通行受阻",
    },
    {
      id: "8",
      type: "flooding",
      position: [103.752539, 29.611497],
      title: "滨江路（第七中学通江校区）轻度积水",
      severity: "mild",
      details: "水深约20cm，通行受阻",
    },
    {
      id: "9",
      type: "flooding",
      position: [103.769007, 29.551823],
      title: "滨江路南段观佛楼",
      severity: "mild",
      details: "水深约10cm，通行受阻",
    },
    {
      id: "10",
      type: "flooding",
      position: [103.765529, 29.583739],
      title: "嘉定北路与百禄路交叉口",
      severity: "mild",
      details: "水深约10cm，通行受阻",
    },
    {
      id: "11",
      type: "flooding",
      position: [103.775558, 29.575534],
      title: "碧山路（清雅茶苑）",
      severity: "mild",
      details: "水深约10cm，通行受阻",
    },
    {
      id: "12",
      type: "flooding",
      position: [103.770249, 29.598917],
      title: "云集大厦路口",
      severity: "mild",
      details: "水深约10cm，通行受阻",
    },
    {
      id: "13",
      type: "flooding",
      position: [103.755636, 29.578801],
      title: "朝霞路中度积水",
      severity: "moderate",
      details: "水深约20cm，通行受阻",
    },
    //以下为监测站
    {
      id: "14",
      type: "detection",
      position: [103.71516, 29.574426],
      title: "黄石坡监测站",
      details: "水位: 3.7m, 降雨: 40mm/h",
    },
    {
      id: "15",
      type: "detection",
      position: [103.734592, 29.570574],
      title: "熊湾监测站",
      details: "水位: 3.3m, 降雨: 37mm/h",
    },
    {
      id: "16",
      type: "detection",
      position: [103.753924, 29.564348],
      title: "鱼咡湾公园监测站",
      details: "水位: 3.6m, 降雨: 39mm/h",
    },
    {
      id: "17",
      type: "detection",
      position: [103.680122, 29.548271],
      title: "周河坎监测站",
      details: "水位: 3.4m, 降雨: 38mm/h",
    },
    {
      id: "18",
      type: "detection",
      position: [103.691071, 29.588397],
      title: "青衣江监测站（金沙半岛）",
      details: "水位: 3.1m, 降雨: 35mm/h",
    },
    {
      id: "19",
      type: "detection",
      position: [103.75323, 29.550605],
      title: "月弦坝监测站",
      details: "水位: 3.8m, 降雨: 41mm/h",
    },

    // 公众上报(河道水库)
    {
      id: "10",
      type: "public",
      position: [102.185281, 27.425523],
      title: "安宁河-德昌",
      details: "水位：xxxm 超警水位：xxxm 超保水位：xxxm 水势：落",
    },
    {
      id: "11",
      type: "public",
      position: [103.883126, 30.196936],
      title: "岷江-彭山(四)",
      details: "水位：xxxm 超警水位：xxxm 超保水位：xxxm 水势：落",
    },
    {
      id: "12",
      type: "public",
      position: [103.837312, 29.337965],
      title: "岷江-五通桥(二)",
      details: "水位：xxxm 超警水位：xxxm 超保水位：xxxm 水势：涨",
    },
    {
      id: "13",
      type: "public",
      position: [103.550165, 29.406229],
      title: "大渡河-沙湾",
      details: "水位：xxxm 超警水位：xxxm 超保水位：xxxm 水势：涨",
    },
    {
      id: "14",
      type: "public",
      position: [103.534291, 29.754983],
      title: "青衣江-夹江",
      details: "水位：xxxm 超警水位：xxxm 超保水位：xxxm 水势：落",
    },
    {
      id: "15",
      type: "public",
      position: [103.515248, 29.257318],
      title: "大渡河-龚嘴水库",
      details: "库水位：xxxm 入库流量：xxxm³/s 出库流量：xxxm³/s 蓄水量：xxxm³",
    },
    {
      id: "16",
      type: "public",
      position: [103.36378, 29.296485],
      title: "大渡河-铜街子水库",
      details: "库水位：xxxm 入库流量：xxxm³/s 出库流量：xxxm³/s 蓄水量：xxxm³",
    },
    {
      id: "17",
      type: "public",
      position: [103.59981, 29.324825],
      title: "大渡河-沙湾水库",
      details: "库水位：xxxm 入库流量：xxxm³/s 出库流量：xxxm³/s 蓄水量：xxxm³",
    },
    {
      id: "18",
      type: "public",
      position: [103.623506, 29.601019],
      title: "苏稽杨坪水库",
      details: "库水位：xxxm 入库流量：xxxm³/s 出库流量：xxxm³/s 蓄水量：xxxm³",
    },
    {
      id: "19",
      type: "public",
      position: [103.772747, 29.660811],
      title: "余沟水库",
      details: "库水位：xxxm 入库流量：xxxm³/s 出库流量：xxxm³/s 蓄水量：xxxm³",
    },
    {
      id: "20",
      type: "public",
      position: [103.84383, 29.565102],
      title: "山珍水库",
      details: "库水位：xxxm 入库流量：xxxm³/s 出库流量：xxxm³/s 蓄水量：xxxm³",
    },
  ]

  useEffect(() => {
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

  useEffect(() => {
    if (mapInstance && mapLoaded) {
      updateMarkers()
    }
  }, [showFloodingMarkers, showDetectionPoints, showPublicReports, mapLoaded, mapInstance])

  useEffect(() => {
    if (mapInstance && mapLoaded) {
      setTimeout(() => {
        mapInstance.resize()
      }, 100)
    }
  }, [mapType, mapInstance, mapLoaded])

  const initMap = () => {
    if (!mapContainer.current || !window.AMap) return

    const map = new window.AMap.Map(mapContainer.current, {
      zoom: 13,
      center: centerPosition,
      mapStyle: "amap://styles/normal",
      viewMode: "2D",
    })

    map.addControl(new window.AMap.Scale())
    map.addControl(
      new window.AMap.ToolBar({
        position: "RB",
      }),
    )

    const layers = {
      base: new window.AMap.TileLayer(),
      satellite: new window.AMap.TileLayer.Satellite(),
      roadNet: new window.AMap.TileLayer.RoadNet(),
    }

    map.add(window.AMap.createDefaultLayer())
    // map.add([layers.satellite])

    map.on("complete", () => {
      setMapLoaded(true)
      setMapInstance(map)
    })
  }

  const addRainfallHeatmap = (map: any) => {
    const heatmapData = []

    for (let i = 0; i < 200; i++) {
      const lng = centerPosition[0] + (Math.random() - 0.5) * 0.05
      const lat = centerPosition[1] + (Math.random() - 0.5) * 0.05

      const distance = Math.sqrt(Math.pow(lng - centerPosition[0], 2) + Math.pow(lat - centerPosition[1], 2))

      const weight = Math.max(0, 1 - distance * 50)

      heatmapData.push({
        lng,
        lat,
        count: weight * 100,
      })
    }

    const heatmap = new window.AMap.HeatMap(map, {
      radius: 25,
      opacity: [0.1, 0.8],
      gradient: {
        0.1: "rgba(0, 0, 255, 0.5)",
        0.3: "rgba(0, 255, 255, 0.5)",
        0.5: "rgba(0, 255, 0, 0.5)",
        0.7: "rgba(255, 255, 0, 0.5)",
        0.9: "rgba(255, 0, 0, 0.5)",
      },
    })

    heatmap.setDataSet({
      data: heatmapData,
      max: 100,
    })
  }

  const updateMarkers = () => {
    if (!mapInstance) return

    mapInstance.clearMap()

    markers.forEach((marker) => {
      if (
        (marker.type === "flooding" && !showFloodingMarkers) ||
        (marker.type === "detection" && !showDetectionPoints) ||
        (marker.type === "public" && !showPublicReports)
      ) {
        return
      }

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
              <svg t="1746197573907" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="33838" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20">
              <path d="M703.74312 37.376593A506.303367 506.303367 0 0 0 511.99936 0.00064C229.631713 0.00064 0 229.632353 0 512c0 218.623727 137.599828 405.631493 404.991494 478.847401l0.384 0.256c1.535998 0.639999 3.199996 1.151999 4.863994 1.791998l1.151998 0.383999c55.99993 20.351975 115.135856 30.719962 174.719782 30.719962a508.415364 508.415364 0 0 0 197.887753-39.80795C894.206882 906.751507 1023.99872 724.223735 1023.99872 512A512.447359 512.447359 0 0 0 703.74312 37.376593zM329.599588 907.007506A435.519456 435.519456 0 0 1 76.799904 512c0-229.887713 179.071776-418.559477 404.991494-434.175457L260.735674 480.768039A38.399952 38.399952 0 0 0 294.399632 537.599968h215.551731L329.599588 907.007506z m325.759593 15.87198a436.671454 436.671454 0 0 1-253.055684 10.367987l203.647746-417.151478a38.591952 38.591952 0 0 0-34.559957-55.295931H359.295551l82.559896-160.2558A435.647455 435.647455 0 0 1 947.198816 512a435.391456 435.391456 0 0 1-212.607734 373.887533z" 
              fill="#FFFFFF" p-id="33839"></path>
              </svg>
            </div>
          </div>
        `
      }

      const mapMarker = new window.AMap.Marker({
        position: marker.position,
        title: marker.title,
        content: content,
        offset: new window.AMap.Pixel(-15, -15),
        extData: marker,
      })

      mapMarker.on("click", () => {
        setSelectedMarker(marker)
      })

      mapInstance.add(mapMarker)
    })
  }

  const handleMapTypeChange = (type: string) => {
    setMapType(type)

    if (!mapInstance) return

    const layers = mapInstance.getLayers()
    mapInstance.remove(layers)

    if (type === "satellite") {
      mapInstance.add([new window.AMap.TileLayer.Satellite()])
      updateMarkers()
      // addRainfallHeatmap(mapInstance)
    } else if (type === "hybrid") {
      mapInstance.add([new window.AMap.TileLayer.Satellite(), new window.AMap.TileLayer.RoadNet()])
      updateMarkers()
      // addRainfallHeatmap(mapInstance)
    } else {
      mapInstance.add(window.AMap.createDefaultLayer())
      updateMarkers()
      // addRainfallHeatmap(mapInstance)
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const closeMarkerDetails = () => {
    setSelectedMarker(null)
  }

  return (
    <div className={`space-y-4 ${isFullscreen ? "fixed inset-0 z-50 bg-background p-4" : "h-auto"}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">&nbsp;&nbsp;&nbsp;&nbsp;乐山市实时监测地图</h3>
        <div className="flex items-center gap-4">
          <Select value={mapType} onValueChange={handleMapTypeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="地图类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rainfall">普通地图</SelectItem>
              <SelectItem value="satellite">卫星图</SelectItem>
              <SelectItem value="hybrid">混合视图</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="map" className="w-full">
        <TabsContent value="map" className="mt-2">
          <div
            className={`relative w-full ${isFullscreen ? "h-[calc(100vh-200px)]" : "h-[400px]"} bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden`}
          >
            <div ref={mapContainer} className="h-[400px] absolute inset-0"></div>

            {selectedMarker && (
              <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-72 bg-white dark:bg-gray-800 p-3 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {selectedMarker.type === "flooding" && <Droplets className="h-4 w-4 text-blue-500" />}
                    {selectedMarker.type === "detection" && <MapPin className="h-4 w-4 text-blue-500" />}
                    {selectedMarker.type === "public" && <MapPin className="h-4 w-4 text-purple-500" />}
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
                          : "low"
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
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                    查看详情
                  </Button>
                  <Button size="sm" className="h-7 text-xs">
                    导航至此
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex flex-wrap justify-between items-center">
        <div className="grid grid-cols-3 gap-1 ml-3 w-[400px]">
          <div className="ml-2">图例：</div>
          <div></div>
          <div></div>
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
            <span className="text-xs">监测点</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-md">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-xs">河道水库监测点</span>
          </div>
        </div>

        <div className="flex flex-col gap-1 ml-3 mt-2 min-w-[200px]">
          <div className="flex items-center space-x-2">
            <Switch id="flooding" checked={showFloodingMarkers} onCheckedChange={setShowFloodingMarkers} />
            <Label htmlFor="flooding">显示道路积水点</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="detection" checked={showDetectionPoints} onCheckedChange={setShowDetectionPoints} />
            <Label htmlFor="detection">显示监测点</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="public" checked={showPublicReports} onCheckedChange={setShowPublicReports} />
            <Label htmlFor="public">显示河道水库监测</Label>
          </div>
        </div>
      </div>
    </div>
  )
}
