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
} from "lucide-react"
import RainfallMap from "@/components/rainfall-map"
import WeatherForecast from "@/components/weather-forecast"
import AlertsPanel from "@/components/alerts-panel"
import AlertBanner from "@/components/alert-banner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Header } from "@/components/header"
import { WeatherProvider } from "@/components/weather-service"
import { CitySelector } from "@/components/city-selector"
import { CurrentWeather } from "@/components/current-weather"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import AIAssistantButton from "@/components/ai-assistant-button"
import Chart from "@/components/Chart"
import { isAuthenticated } from "@/lib/api/auth"

// 使用 Input 1 (新版) 的图表配置数据
const options = {
  title: {
    text: "日降水量 (mm)",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    right: 10,
    top: "bottom",
    data: ["日降水量"],
  },
  grid: {
    left: "3%",
    right: "3%",
    bottom: "13%",
    top: "18%",
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    data: ["7/21", "7/22", "7/23", "7/24", "7/25", "7/26", "7/27"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "日降水量",
      data: [20, 0, 0, 10, 20, 35, 55],
      type: "bar",
    },
  ],
}

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // 检查用户是否已登录 (保留原逻辑)
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }
  }, [router])

  // 如果未登录，显示加载状态 (保留原逻辑)
  if (typeof window !== "undefined" && !isAuthenticated()) {
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
            {/* 页面标题和城市选择器 (采用旧版布局，去除图标，但保留新版标题文字) */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  智水先知——城市内涝智能感知预警与协同服务平台
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <CitySelector />
              </div>
            </div>

            {/* // 使用动态预警横幅组件替换硬编码 */}
            <AlertBanner />

            {/* 主要内容区域 - 核心网格布局 (采用旧版布局结构) */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* 第一列：当前天气和活跃预警 */}
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
                {/* <Card className="h-full"> */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        实时监测地图
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

              {/* 右侧：监测点状态和降水概率 */}
              <div className="md:col-span-3 lg:col-span-1">
                <div className="grid grid-cols-1 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-1.5">
                        <BarChart3 className="h-4 w-4 text-blue-500" />
                        监测点状态
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs">活跃监测点:</span>
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
                        <h4 className="text-xs font-medium">最新监测点数据</h4>
                        <div className="space-y-2">
                          <div className="p-2 border rounded-md">
                            <div className="flex justify-between items-center">
                              <div className="text-xs font-medium">鱼咡湾</div>
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
                              <div className="text-xs font-medium">青衣江</div>
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

            {/* 主要内容区域 - 中间部分：数据分析 (布局参考旧版，内容参考新版) */}
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
                <CardDescription className="text-xs">乐山市区域近7天降水量统计</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="h-[200px] w-full bg-slate-100 dark:bg-slate-800 rounded-md relative overflow-hidden">
                      <Chart options={options} height={200} />
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

            {/* 主要内容区域 - 下半部分：天气预报和预警历史 */}
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

            {/* 已移除"水雨知识科普"卡片 */}
          </div>
        </main>
      </WeatherProvider>
      <AIAssistantButton />
    </div>
  )
}
