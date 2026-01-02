import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { CloudRain, Droplets, AlertTriangle, ArrowLeft, MapPin, Clock, BarChart } from "lucide-react"
import Link from "next/link"

export default function DongfengquPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/locations/all">
                <ArrowLeft className="h-4 w-4 mr-1" />
                返回
              </Link>
            </Button>
            <div className="text-muted-foreground">|</div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <div className="p-1 bg-red-100 rounded-full text-red-600">
                <CloudRain className="h-5 w-5" />
              </div>
              月弦坝
              <Badge variant="destructive">红色预警</Badge>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">当前状态</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <CloudRain className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">降雨量:</span>
                    </div>
                    <span className="font-medium text-red-600">42mm/h (大暴雨)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">水位:</span>
                    </div>
                    <span className="font-medium text-red-600">3.9m (超警戒线)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">更新时间:</span>
                    </div>
                    <span className="text-sm">3分钟前</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">位置:</span>
                    </div>
                    <span className="text-sm">乐山市市中区大佛坝村附近</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">活跃预警</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <span className="font-medium text-red-800">洪水红色预警</span>
                      <Badge variant="destructive">紧急</Badge>
                    </div>
                    <p className="text-sm text-red-700">
                      月弦坝水位已超过警戒线，周边低洼地区可能发生洪水，请注意防范。
                    </p>
                    <div className="text-xs text-red-600 mt-1">发布时间: 今天 09:15</div>
                  </div>

                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium text-orange-800">暴雨橙色预警</span>
                    </div>
                    <p className="text-sm text-orange-700">
                      预计未来3小时月弦坝区域将持续强降雨，累积降水量可达50-80毫米。
                    </p>
                    <div className="text-xs text-orange-600 mt-1">发布时间: 今天 08:45</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="map" className="w-full">
            <TabsList>
              <TabsTrigger value="map">实时地图</TabsTrigger>
              <TabsTrigger value="data">监测数据</TabsTrigger>
              <TabsTrigger value="forecast">预报信息</TabsTrigger>
              <TabsTrigger value="history">历史记录</TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="mt-4">
              <div className="relative w-full h-[400px] bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                <div className="absolute inset-0">
                  <img
                    src="/locations/yuexianba.png"
                    alt="月弦坝地图"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1/3 left-1/2">
                    <div className="p-1 bg-red-500 rounded-full animate-pulse">
                      <Droplets className="h-5 w-5 text-white" />
                    </div>
                    <div className="mt-1 px-2 py-1 bg-white rounded text-xs">月弦坝水位超警戒</div>
                  </div>
                  <div className="absolute top-1/2 left-1/4">
                    <div className="p-1 bg-red-500 rounded-full">
                      <Droplets className="h-5 w-5 text-white" />
                    </div>
                    <div className="mt-1 px-2 py-1 bg-white rounded text-xs">周边低洼地区积水严重</div>
                  </div>
                  <div className="absolute top-1/4 right-1/3">
                    <div className="p-1 bg-blue-500 rounded-full">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div className="mt-1 px-2 py-1 bg-white rounded text-xs">月弦坝监测站</div>
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
                <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-md">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs">监测站</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="data" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">实时监测数据</CardTitle>
                  <CardDescription>月弦坝监测站</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">当前水位</h4>
                        <div className="flex items-end gap-2">
                          <div className="text-3xl font-bold">3.9m</div>
                          <div className="text-sm text-red-500">超过警戒线</div>
                        </div>
                        <div className="mt-2 h-[100px] w-full bg-gradient-to-b from-white to-blue-500 rounded-md relative">
                          <div
                            className="absolute left-0 right-0 border-t border-dashed border-red-500"
                            style={{ top: "30%" }}
                          >
                            <div className="absolute -top-3 right-0 text-xs text-red-500 bg-white px-1">警戒水位</div>
                          </div>
                          <div className="absolute left-0 right-0 border-t-2 border-blue-700" style={{ top: "20%" }}>
                            <div className="absolute -top-3 left-0 text-xs text-blue-700 bg-white px-1">当前: 3.9m</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">降雨强度</h4>
                        <div className="flex items-end gap-2">
                          <div className="text-3xl font-bold">42mm/h</div>
                          <div className="text-sm text-red-500">大暴雨</div>
                        </div>
                        <div className="mt-2 h-[100px] w-full bg-gradient-to-r from-blue-100 via-blue-300 to-blue-600 rounded-md relative">
                          <div className="absolute inset-x-0 bottom-0 h-[75%] bg-blue-400 bg-opacity-50 rounded-b-md"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">其他监测指标</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-3 bg-gray-50 rounded-md">
                        <div className="text-sm text-muted-foreground">气温</div>
                        <div className="text-lg font-medium">27°C</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-md">
                        <div className="text-sm text-muted-foreground">湿度</div>
                        <div className="text-lg font-medium">90%</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-md">
                        <div className="text-sm text-muted-foreground">风速</div>
                        <div className="text-lg font-medium">5级</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-md">
                        <div className="text-sm text-muted-foreground">气压</div>
                        <div className="text-lg font-medium">1002hPa</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="forecast" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">未来24小时预报</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full bg-white rounded-md relative mb-4">
                    <div className="absolute inset-0 flex flex-col">
                      <div className="text-center text-sm text-muted-foreground mb-2">降水量预报</div>
                      <div className="flex-1 border-b border-l relative">
                        <div className="absolute bottom-0 left-0 right-0 h-[75%] bg-gradient-to-r from-blue-100 to-blue-400 opacity-20"></div>
                        <div
                          className="absolute bottom-0 left-0 right-0 border-t border-blue-500"
                          style={{ height: "75%" }}
                        ></div>
                        <div className="absolute top-0 left-0 right-0 flex justify-between px-2">
                          <BarChart className="h-4 w-4 text-blue-500" />
                          <span className="text-xs">预计未来12小时降水量将达80-120毫米</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <h4 className="font-medium text-red-800">预警信息</h4>
                    </div>
                    <p className="text-sm text-red-700">
                      根据最新气象预报，月弦坝区域未来12小时内将持续有强降水，水位可能继续上涨。请密切关注预警信息，做好防范措施。建议周边居民暂时撤离至安全地区。
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">历史监测数据</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full bg-white rounded-md relative mb-4">
                    <div className="absolute inset-0 flex flex-col">
                      <div className="text-center text-sm text-muted-foreground mb-2">过去7天水位和降雨量</div>
                      <div className="flex-1 border-b border-l relative">
                        <div
                          className="absolute left-0 right-0 border-t border-dashed border-red-300"
                          style={{ top: "30%" }}
                        >
                          <div className="absolute -top-3 right-0 text-xs text-red-500 bg-white px-1">警戒水位</div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-r from-blue-100 to-blue-400 opacity-20"></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="text-sm font-medium mb-1">历史最高水位</div>
                      <div className="text-lg font-bold">4.2m</div>
                      <div className="text-xs text-muted-foreground">记录于 2023年7月23日</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="text-sm font-medium mb-1">历史最大降雨量</div>
                      <div className="text-lg font-bold">48mm/h</div>
                      <div className="text-xs text-muted-foreground">记录于 2023年7月22日</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
