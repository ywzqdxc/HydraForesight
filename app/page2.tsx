"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  CloudRain,
  Droplets,
  Bell,
  ArrowRight,
  MapPin,
  BarChart3,
  Thermometer,
  Info,
  Zap,
  AreaChart,
  Layers,
} from "lucide-react"
import RainfallMap from "@/components/rainfall-map"
import WeatherForecast from "@/components/weather-forecast"
import AlertsPanel from "@/components/alerts-panel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Header } from "@/components/header"
import { WeatherProvider } from "@/components/weather-service"
import { CitySelector } from "@/components/city-selector"
import { CurrentWeather } from "@/components/current-weather"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import AIAssistantButton from "@/components/ai-assistant-button"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // 检查用户是否已登录
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

    if (!isLoggedIn) {
      router.push("/login")
      return
    }
  }, [router])

  // 如果未登录，显示加载状态
  const isLoggedIn = typeof window !== "undefined" ? localStorage.getItem("isLoggedIn") === "true" : false

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">正在验证登录状态...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <WeatherProvider>
        <main className="flex-1 container py-4">
          <div className="flex flex-col gap-4">
            {/* 页面标题和城市选择器 */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">雨安盾监测系统</h1>
                <p className="text-sm text-muted-foreground">监测河南省郑州市龙子湖区域降水情况并接收预警信息</p>
              </div>
              <div className="flex items-center gap-2">
                <CitySelector />
              </div>
            </div>

            {/* 预警通知横幅 */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3 animate-pulse">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-red-600 dark:text-red-400" />
                <div className="font-medium text-red-800 dark:text-red-300">
                  紧急预警：龙子湖区域发布暴雨红色预警，预计未来3小时降水量将达80-100毫米，请注意防范。
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto text-xs h-7 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40 bg-transparent"
                >
                  查看详情
                </Button>
              </div>
            </div>

            {/* 主要内容区域 - 上半部分 */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* 左侧：当前天气和活跃预警 */}
              <div className="md:col-span-1">
                <div className="grid grid-cols-1 gap-4">
                  <CurrentWeather />

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium flex items-center gap-1.5">
                          <Bell className="h-4 w-4 text-red-500" />
                          活跃预警
                        </CardTitle>
                        <Button variant="ghost" size="sm" asChild className="h-6">
                          <a href="/alerts/dashboard" className="text-xs flex items-center">
                            查看全部
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-md">
                          <CloudRain className="h-4 w-4 text-red-600 dark:text-red-400" />
                          <div className="text-xs font-medium text-red-800 dark:text-red-300">
                            暴雨红色预警（未来6小时）
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-md">
                          <Droplets className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                          <div className="text-xs font-medium text-yellow-800 dark:text-yellow-300">
                            城市内涝黄色预警（持续中）
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 rounded-md">
                          <Zap className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                          <div className="text-xs font-medium text-orange-800 dark:text-orange-300">
                            雷电橙色预警（未来3小时）
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* 中间：实时降水地图 */}
              <div className="md:col-span-2 lg:col-span-2">
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        实时降水地图
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative">
                      <RainfallMap />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 右侧：检测点状态和降水概率 */}
              <div className="md:col-span-3 lg:col-span-1">
                <div className="grid grid-cols-1 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-1.5">
                        <BarChart3 className="h-4 w-4 text-blue-500" />
                        检测点状态
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs">活跃检测点:</span>
                            <span className="text-sm font-medium text-green-600">18/20</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "90%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs">超警戒水位:</span>
                            <span className="text-sm font-medium text-red-600">5</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div className="bg-red-500 h-1.5 rounded-full" style={{ width: "25%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs">公众上报:</span>
                            <span className="text-sm font-medium text-blue-600">24 条</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "60%" }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 space-y-2">
                        <h4 className="text-xs font-medium">最新检测点数据</h4>
                        <div className="space-y-2">
                          <div className="p-2 border rounded-md">
                            <div className="flex justify-between items-center">
                              <div className="text-xs font-medium">龙子湖中心</div>
                              <Badge variant="destructive" className="text-[10px] py-0 px-1 h-4">
                                警戒
                              </Badge>
                            </div>
                            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                              <span>水位: 4.2m</span>
                              <span>降雨: 45mm/h</span>
                            </div>
                          </div>

                          <div className="p-2 border rounded-md">
                            <div className="flex justify-between items-center">
                              <div className="text-xs font-medium">东风渠</div>
                              <Badge variant="destructive" className="text-[10px] py-0 px-1 h-4">
                                警戒
                              </Badge>
                            </div>
                            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                              <span>水位: 3.9m</span>
                              <span>降雨: 42mm/h</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="outline" size="sm" className="w-full text-xs h-7 bg-transparent" asChild>
                        <a href="/device-management">查看所有设备</a>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-1.5">
                        <Thermometer className="h-4 w-4 text-blue-500" />
                        降水概率
                      </CardTitle>
                      <CardDescription className="text-xs">未来24小时</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[80px] w-full bg-gradient-to-r from-blue-100 via-blue-400 to-blue-600 rounded-md relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">85%</div>
                            <div className="text-white text-xs">降雨概率</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 grid grid-cols-4 gap-1 text-center">
                        <div className="text-[10px]">
                          <div className="font-medium">今天</div>
                          <div>85%</div>
                        </div>
                        <div className="text-[10px]">
                          <div className="font-medium">明天</div>
                          <div>65%</div>
                        </div>
                        <div className="text-[10px]">
                          <div className="font-medium">后天</div>
                          <div>40%</div>
                        </div>
                        <div className="text-[10px]">
                          <div className="font-medium">大后天</div>
                          <div>20%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* 主要内容区域 - 中间部分：数据分析 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium flex items-center gap-1.5">
                    <AreaChart className="h-4 w-4 text-blue-500" />
                    降水数据分析
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild className="h-6">
                    <a href="/analytics" className="text-xs flex items-center">
                      查看详细分析
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>
                <CardDescription className="text-xs">龙子湖区域近7天降水量统计</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="h-[180px] w-full bg-slate-100 dark:bg-slate-800 rounded-md relative overflow-hidden">
                      <div className="absolute inset-x-0 bottom-0 h-[120px]">
                        <div className="relative h-full">
                          {/* 模拟柱状图 */}
                          <div
                            className="absolute bottom-0 left-[10%] w-[8%] bg-blue-500 rounded-t-sm"
                            style={{ height: "30%" }}
                          ></div>
                          <div
                            className="absolute bottom-0 left-[20%] w-[8%] bg-blue-500 rounded-t-sm"
                            style={{ height: "45%" }}
                          ></div>
                          <div
                            className="absolute bottom-0 left-[30%] w-[8%] bg-blue-500 rounded-t-sm"
                            style={{ height: "20%" }}
                          ></div>
                          <div
                            className="absolute bottom-0 left-[40%] w-[8%] bg-blue-500 rounded-t-sm"
                            style={{ height: "60%" }}
                          ></div>
                          <div
                            className="absolute bottom-0 left-[50%] w-[8%] bg-blue-500 rounded-t-sm"
                            style={{ height: "80%" }}
                          ></div>
                          <div
                            className="absolute bottom-0 left-[60%] w-[8%] bg-blue-500 rounded-t-sm"
                            style={{ height: "90%" }}
                          ></div>
                          <div
                            className="absolute bottom-0 left-[70%] w-[8%] bg-blue-500 rounded-t-sm"
                            style={{ height: "70%" }}
                          ></div>
                          <div
                            className="absolute bottom-0 left-[80%] w-[8%] bg-red-500 rounded-t-sm animate-pulse"
                            style={{ height: "95%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 w-full flex justify-between px-4 pb-1 text-[10px] text-gray-500">
                        <span>4/25</span>
                        <span>4/26</span>
                        <span>4/27</span>
                        <span>4/28</span>
                        <span>4/29</span>
                        <span>4/30</span>
                        <span>5/1</span>
                        <span>今天</span>
                      </div>
                      <div className="absolute top-2 left-2 text-xs font-medium">日降水量 (mm)</div>
                      <div className="absolute top-2 right-2 text-xs font-medium text-red-500">今日: 95mm</div>
                    </div>
                    <div className="mt-2 text-xs text-center text-muted-foreground">
                      今日降水量已超过警戒线(50mm)，请注意防范
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-xs font-medium">本月累计降水量</div>
                        <div className="text-xs font-medium">245mm / 300mm</div>
                      </div>
                      <Progress value={82} className="h-2" />
                      <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                        <span>已达历史同期82%</span>
                        <span>距警戒值还有55mm</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-xs font-medium">主要河道水位</div>
                        <div className="text-xs font-medium">4.2m / 5.0m</div>
                      </div>
                      <Progress value={84} className="h-2" />
                      <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                        <span>距警戒水位还有0.8m</span>
                        <span>上涨趋势</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-xs font-medium">排水系统负荷</div>
                        <div className="text-xs font-medium">85%</div>
                      </div>
                      <Progress value={85} className="h-2" />
                      <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                        <span>接近满负荷运行</span>
                        <span>已启动应急预案</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-md">
                      <div className="flex items-center gap-1.5">
                        <Info className="h-4 w-4 text-yellow-600" />
                        <span className="text-xs font-medium text-yellow-800 dark:text-yellow-300">
                          降水量已达历史同期最高值
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-[10px] text-yellow-800 dark:text-yellow-300"
                      >
                        详情
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 主要内容区域 - 下半部分 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 天气预报 */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-1.5">
                    <CloudRain className="h-4 w-4 text-blue-500" />
                    天气预报
                  </CardTitle>
                  <CardDescription className="text-xs">未来天气情况</CardDescription>
                </CardHeader>
                <CardContent>
                  <WeatherForecast />
                </CardContent>
              </Card>

              {/* 预警历史 */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-1.5">
                    <Bell className="h-4 w-4 text-blue-500" />
                    预警历史
                  </CardTitle>
                  <CardDescription className="text-xs">最近发布的预警信息</CardDescription>
                </CardHeader>
                <CardContent>
                  <AlertsPanel />
                </CardContent>
              </Card>
            </div>

            {/* 底部：水文知识科普 */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium flex items-center gap-1.5">
                    <Info className="h-4 w-4 text-blue-500" />
                    水文知识科普
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild className="h-6">
                    <a href="/knowledge" className="text-xs flex items-center">
                      查看更多
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="flood" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="flood" className="text-xs">
                      防洪知识
                    </TabsTrigger>
                    <TabsTrigger value="rain" className="text-xs">
                      降雨知识
                    </TabsTrigger>
                    <TabsTrigger value="water" className="text-xs">
                      水资源保护
                    </TabsTrigger>
                    <TabsTrigger value="emergency" className="text-xs">
                      应急措施
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="flood" className="mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-1">
                        <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                          <div className="text-center">
                            <Layers className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                            <span className="text-xs">防洪知识视频</span>
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <h3 className="text-sm font-medium">城市内涝防范指南</h3>
                        <p className="text-xs text-muted-foreground">
                          城市内涝是指由于强降水超过城市排水系统的排水能力，或者排水系统不完善，导致城市内出现积水灾害的现象。在暴雨季节，市民应当了解以下防范知识...
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-[10px]">
                            暴雨自救
                          </Badge>
                          <Badge variant="outline" className="text-[10px]">
                            排水系统
                          </Badge>
                          <Badge variant="outline" className="text-[10px]">
                            安全撤离
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs h-7 w-full md:w-auto bg-transparent">
                          阅读完整指南
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="rain" className="mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-1">
                        <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                          <div className="text-center">
                            <CloudRain className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                            <span className="text-xs">降雨知识视频</span>
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <h3 className="text-sm font-medium">降雨量等级与影响</h3>
                        <p className="text-xs text-muted-foreground">
                          降雨量是指在一定时间内降落到地面上的雨量，通常以毫米(mm)为单位。根据中国气象局标准，降雨量分为小雨、中雨、大雨、暴雨、大暴雨和特大暴雨六个等级...
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-[10px]">
                            降雨等级
                          </Badge>
                          <Badge variant="outline" className="text-[10px]">
                            暴雨预警
                          </Badge>
                          <Badge variant="outline" className="text-[10px]">
                            气象知识
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs h-7 w-full md:w-auto bg-transparent">
                          了解更多
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="water" className="mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-1">
                        <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                          <div className="text-center">
                            <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                            <span className="text-xs">水资源保护视频</span>
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <h3 className="text-sm font-medium">水资源保护与可持续利用</h3>
                        <p className="text-xs text-muted-foreground">
                          水资源是人类生存和发展的基础，保护水资源是每个公民的责任。合理利用雨水资源，减少水污染，提高水资源利用效率，对于实现水资源的可持续利用具有重要意义...
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-[10px]">
                            雨水收集
                          </Badge>
                          <Badge variant="outline" className="text-[10px]">
                            水污染防治
                          </Badge>
                          <Badge variant="outline" className="text-[10px]">
                            节水技术
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs h-7 w-full md:w-auto bg-transparent">
                          了解更多
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="emergency" className="mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-1">
                        <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                          <div className="text-center">
                            <Bell className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                            <span className="text-xs">应急措施视频</span>
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <h3 className="text-sm font-medium">暴雨灾害应急措施</h3>
                        <p className="text-xs text-muted-foreground">
                          面对暴雨灾害，正确的应急措施可以有效减少人员伤亡和财产损失。本指南提供了暴雨来临前、暴雨期间和暴雨过后的应急措施，帮助市民安全度过暴雨灾害...
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-[10px]">
                            应急避险
                          </Badge>
                          <Badge variant="outline" className="text-[10px]">
                            自救互救
                          </Badge>
                          <Badge variant="outline" className="text-[10px]">
                            灾后恢复
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs h-7 w-full md:w-auto bg-transparent">
                          查看应急指南
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </WeatherProvider>
      <AIAssistantButton />
    </div>
  )
}
