import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { BarChart, LineChart, PieChart, Calendar, Download, Filter, RefreshCw } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <BarChart className="h-8 w-8 text-blue-500" />
                数据分析
              </h1>
              <p className="text-muted-foreground">降水数据统计与分析</p>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="month">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="选择时间范围" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">最近一周</SelectItem>
                  <SelectItem value="month">最近一个月</SelectItem>
                  <SelectItem value="quarter">最近一季度</SelectItem>
                  <SelectItem value="year">最近一年</SelectItem>
                  <SelectItem value="custom">自定义范围</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                导出数据
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">总降水量</CardTitle>
                <CardDescription>最近30天</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">256.8mm</div>
                <p className="text-xs text-muted-foreground mt-1">较上月增加 12.5%</p>
                <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">最大日降水量</CardTitle>
                <CardDescription>最近30天</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">45.2mm</div>
                <p className="text-xs text-muted-foreground mt-1">发生于 2023-07-22</p>
                <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">降水天数</CardTitle>
                <CardDescription>最近30天</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">18天</div>
                <p className="text-xs text-muted-foreground mt-1">占比 60%</p>
                <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">预警次数</CardTitle>
                <CardDescription>最近30天</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12次</div>
                <p className="text-xs text-muted-foreground mt-1">较上月增加 50%</p>
                <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="rainfall" className="w-full">
            <TabsList>
              <TabsTrigger value="rainfall">降水分析</TabsTrigger>
              <TabsTrigger value="alerts">预警分析</TabsTrigger>
              <TabsTrigger value="devices">设备数据</TabsTrigger>
              <TabsTrigger value="reports">公众上报</TabsTrigger>
            </TabsList>

            <TabsContent value="rainfall" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-blue-500" />
                      降水量趋势
                    </CardTitle>
                    <CardDescription>最近30天每日降水量变化</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">降水量趋势图表</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-blue-500" />
                      降水强度分布
                    </CardTitle>
                    <CardDescription>按降水强度分类统计</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">降水强度分布图表</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      降水日历视图
                    </CardTitle>
                    <CardDescription>按日期查看降水情况</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">降水日历视图</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">预警类型分布</CardTitle>
                    <CardDescription>按预警类型统计</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">预警类型分布图表</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">预警时间分布</CardTitle>
                    <CardDescription>按时间段统计预警发生频率</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">预警时间分布图表</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">预警区域热力图</CardTitle>
                    <CardDescription>按地理位置展示预警密度</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">预警区域热力图</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="devices" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">设备状态统计</CardTitle>
                    <CardDescription>按设备状态分类统计</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">设备状态统计图表</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">设备数据采集量</CardTitle>
                    <CardDescription>按时间统计数据采集量</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">数据采集量图表</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">设备故障分析</CardTitle>
                    <CardDescription>按故障类型和频率分析</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">设备故障分析图表</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">公众上报类型分布</CardTitle>
                    <CardDescription>按上报类型统计</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">上报类型分布图表</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">上报区域分布</CardTitle>
                    <CardDescription>按地理位置统计上报数量</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">上报区域分布图表</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">上报时间趋势</CardTitle>
                    <CardDescription>按时间统计上报数量变化</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">上报时间趋势图表</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
