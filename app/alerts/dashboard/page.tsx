import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { CloudRain, Droplets, AlertTriangle, MapPin, Bell, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function AlertsDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Bell className="h-6 w-6 text-red-500" />
                预警中心
              </h1>
              <p className="text-muted-foreground">管理和查看所有预警信息</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="搜索预警..." className="pl-8 w-[200px]" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">预警统计</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">红色预警:</span>
                    </div>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">橙色预警:</span>
                    </div>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">黄色预警:</span>
                    </div>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">蓝色预警:</span>
                    </div>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="pt-2 border-t flex justify-between items-center">
                    <span className="text-sm font-medium">总计:</span>
                    <span className="font-bold">5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">最新预警</CardTitle>
                <CardDescription>过去24小时内发布的预警信息</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <span className="font-medium text-red-800 dark:text-red-400">暴雨红色预警</span>
                      <Badge variant="destructive" className="ml-auto">
                        紧急
                      </Badge>
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      预计未来6小时黄石坡区域将出现暴雨到大暴雨，累积降水量可达100-150毫米，请注意防范。
                    </p>
                    <div className="text-xs text-red-600 dark:text-red-400 mt-1">发布时间: 今天 08:30</div>
                  </div>

                  <div className="p-3 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      <span className="font-medium text-orange-800 dark:text-orange-400">内涝橙色预警</span>
                    </div>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      柏杨中路多处低洼地带已出现积水，部分道路交通受阻，请注意绕行。
                    </p>
                    <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">发布时间: 今天 09:00</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">全部预警</TabsTrigger>
              <TabsTrigger value="rainfall">降水预警</TabsTrigger>
              <TabsTrigger value="flooding">内涝预警</TabsTrigger>
              <TabsTrigger value="traffic">交通预警</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CloudRain className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <div>
                        <div className="font-medium text-red-800 dark:text-red-400">暴雨红色预警</div>
                        <div className="text-xs text-muted-foreground">黄石坡</div>
                      </div>
                    </div>
                    <Badge variant="destructive">红色预警</Badge>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                    预计未来6小时黄石坡区域将出现暴雨到大暴雨，累积降水量可达 100-150毫米，请注意防范。
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div>发布时间: 今天 08:30</div>
                    <div>预计结束: 今天 14:30</div>
                  </div>
                </div>

                <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <div>
                        <div className="font-medium text-red-800 dark:text-red-400">洪水红色预警</div>
                        <div className="text-xs text-muted-foreground">月弦坝</div>
                      </div>
                    </div>
                    <Badge variant="destructive">红色预警</Badge>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                    月弦坝水位已超过警戒线，周边低洼地区可能发生洪水，请注意防范。
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div>发布时间: 今天 09:15</div>
                    <div>预计结束: 今天 21:00</div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      <div>
                        <div className="font-medium text-orange-800 dark:text-orange-400">内涝橙色预警</div>
                        <div className="text-xs text-muted-foreground">柏杨中路</div>
                      </div>
                    </div>
                    <Badge variant="warning">橙色预警</Badge>
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mb-2">
                    柏杨中路多处低洼地带已出现积水，部分道路交通受阻，请注意绕行。
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div>发布时间: 今天 09:00</div>
                    <div>预计结束: 今天 15:00</div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CloudRain className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      <div>
                        <div className="font-medium text-yellow-800 dark:text-yellow-400">雷电黄色预警</div>
                        <div className="text-xs text-muted-foreground">市中区</div>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                    >
                      黄色预警
                    </Badge>
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                    预计未来6小时乐山市将出现强雷电活动，局部地区可能伴有短时强降水和大风。
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div>发布时间: 今天 07:30</div>
                    <div>预计结束: 今天 13:30</div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      <div>
                        <div className="font-medium text-yellow-800 dark:text-yellow-400">道路积水黄色预警</div>
                        <div className="text-xs text-muted-foreground">嘉州大道</div>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                    >
                      黄色预警
                    </Badge>
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                    嘉州大道部分路段已出现积水，车辆通行受阻，请注意绕行。
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div>发布时间: 今天 08:45</div>
                    <div>预计结束: 今天 14:00</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rainfall" className="mt-4">
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CloudRain className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <div>
                        <div className="font-medium text-red-800 dark:text-red-400">暴雨红色预警</div>
                        <div className="text-xs text-muted-foreground">市中区</div>
                      </div>
                    </div>
                    <Badge variant="destructive">红色预警</Badge>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                    预计未来6小时市中心区域将出现暴雨到大暴雨，累积降水量可达 100-150毫米，请注意防范。
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div>发布时间: 今天 08:30</div>
                    <div>预计结束: 今天 14:30</div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CloudRain className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      <div>
                        <div className="font-medium text-yellow-800 dark:text-yellow-400">雷电黄色预警</div>
                        <div className="text-xs text-muted-foreground">乐山市</div>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                    >
                      黄色预警
                    </Badge>
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                    预计未来6小时乐山市将出现强雷电活动，局部地区可能伴有短时强降水和大风。
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div>发布时间: 今天 07:30</div>
                    <div>预计结束: 今天 13:30</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="flooding" className="mt-4">
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <div>
                        <div className="font-medium text-red-800 dark:text-red-400">洪水红色预警</div>
                        <div className="text-xs text-muted-foreground">月弦坝</div>
                      </div>
                    </div>
                    <Badge variant="destructive">红色预警</Badge>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                    月弦坝水位已超过警戒线，周边低洼地区可能发生洪水，请注意防范。
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div>发布时间: 今天 09:15</div>
                    <div>预计结束: 今天 21:00</div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      <div>
                        <div className="font-medium text-orange-800 dark:text-orange-400">内涝橙色预警</div>
                        <div className="text-xs text-muted-foreground">黄石坡区域</div>
                      </div>
                    </div>
                    <Badge variant="warning">橙色预警</Badge>
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mb-2">
                    黄石坡区域多处低洼地带已出现积水，部分道路交通受阻，请注意绕行。
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div>发布时间: 今天 09:00</div>
                    <div>预计结束: 今天 15:00</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="traffic" className="mt-4">
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      <div>
                        <div className="font-medium text-yellow-800 dark:text-yellow-400">道路积水黄色预警</div>
                        <div className="text-xs text-muted-foreground">嘉州大道</div>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                    >
                      黄色预警
                    </Badge>
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                    嘉州大道部分路段已出现积水，车辆通行受阻，请注意绕行。
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div>发布时间: 今天 08:45</div>
                    <div>预计结束: 今天 14:00</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
