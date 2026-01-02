import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { CloudRain, Droplets, AlertTriangle, ArrowLeft, MapPin, Clock, BarChart } from "lucide-react"
import Link from "next/link"

export default function ZhengdongPage() {
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
              <div className="p-1 bg-green-100 rounded-full text-green-600">
                <CloudRain className="h-5 w-5" />
              </div>
              市中区
              <Badge variant="outline">正常</Badge>
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
                    <span className="font-medium text-green-600">25mm/h (中雨)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">平均水位:</span>
                    </div>
                    <span className="font-medium text-green-600">2.8m (正常)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">更新时间:</span>
                    </div>
                    <span className="text-sm">10分钟前</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">位置:</span>
                    </div>
                    <span className="text-sm">乐山市市中区</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">区域概况</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                  市中区是乐山市的核心城区之一，包含岷江、大渡河等多个水域。目前区域内降水强度为中雨，各监测点水位正常，暂无积水和内涝风险。
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    <div className="p-2 border rounded-md">
                      <div className="text-xs text-muted-foreground">监测点数量</div>
                      <div className="font-medium">12个</div>
                    </div>
                    <div className="p-2 border rounded-md">
                      <div className="text-xs text-muted-foreground">预警状态点</div>
                      <div className="font-medium">0个</div>
                    </div>
                    <div className="p-2 border rounded-md">
                      <div className="text-xs text-muted-foreground">积水点</div>
                      <div className="font-medium">2处</div>
                    </div>
                    <div className="p-2 border rounded-md">
                      <div className="text-xs text-muted-foreground">公众上报</div>
                      <div className="font-medium">5条</div>
                    </div>
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
                    src="/locations/downtown.png"
                    alt="市中区地图"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1/3 left-1/2">
                    <div className="p-1 bg-yellow-500 rounded-full">
                      <Droplets className="h-5 w-5 text-white" />
                    </div>
                    <div className="mt-1 px-2 py-1 bg-white rounded text-xs">轻微积水点</div>
                  </div>
                  <div className="absolute top-1/2 left-1/4">
                    <div className="p-1 bg-yellow-500 rounded-full">
                      <Droplets className="h-5 w-5 text-white" />
                    </div>
                    <div className="mt-1 px-2 py-1 bg-white rounded text-xs">轻微积水点</div>
                  </div>
                  <div className="absolute top-1/4 right-1/3">
                    <div className="p-1 bg-blue-500 rounded-full">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div className="mt-1 px-2 py-1 bg-white rounded text-xs">市中区监测站</div>
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
                  <span className="text-xs">监测站</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="data" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">实时监测数据</CardTitle>
                  <CardDescription>市中区各监测点数据汇总</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">区域平均水位</h4>
                        <div className="flex items-end gap-2">
                          <div className="text-3xl font-bold">2.8m</div>
                          <div className="text-sm text-green-500">正常水位</div>
                        </div>
                        <div className="mt-2 h-[100px] w-full bg-gradient-to-b from-white to-blue-500 rounded-md relative">
                          <div
                            className="absolute left-0 right-0 border-t border-dashed border-red-500"
                            style={{ top: "30%" }}
                          >
                            <div className="absolute -top-3 right-0 text-xs text-red-500 bg-white px-1">警戒水位</div>
                          </div>
                          <div className="absolute left-0 right-0 border-t-2 border-blue-700" style={{ top: "60%" }}>
                            <div className="absolute -top-3 left-0 text-xs text-blue-700 bg-white px-1">当前: 2.8m</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">区域平均降雨强度</h4>
                        <div className="flex items-end gap-2">
                          <div className="text-3xl font-bold">25mm/h</div>
                          <div className="text-sm text-yellow-500">中雨</div>
                        </div>
                        <div className="mt-2 h-[100px] w-full bg-gradient-to-r from-blue-100 via-blue-300 to-blue-600 rounded-md relative">
                          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-blue-400 bg-opacity-50 rounded-b-md"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">各监测点数据</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">监测点</th>
                            <th className="text-left py-2">水位</th>
                            <th className="text-left py-2">降雨量</th>
                            <th className="text-left py-2">状态</th>
                            <th className="text-left py-2">更新时间</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2">黄石坡</td>
                            <td className="py-2">4.2m</td>
                            <td className="py-2">45mm/h</td>
                            <td className="py-2">
                              <Badge variant="destructive">警戒</Badge>
                            </td>
                            <td className="py-2">5分钟前</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">月弦坝</td>
                            <td className="py-2">3.9m</td>
                            <td className="py-2">42mm/h</td>
                            <td className="py-2">
                              <Badge variant="destructive">警戒</Badge>
                            </td>
                            <td className="py-2">3分钟前</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">周河坎</td>
                            <td className="py-2">2.3m</td>
                            <td className="py-2">22mm/h</td>
                            <td className="py-2">
                              <Badge variant="outline" className="bg-green-100 text-green-800">
                                正常
                              </Badge>
                            </td>
                            <td className="py-2">12分钟前</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">市中区中心</td>
                            <td className="py-2">2.5m</td>
                            <td className="py-2">25mm/h</td>
                            <td className="py-2">
                              <Badge variant="outline" className="bg-green-100 text-green-800">
                                正常
                              </Badge>
                            </td>
                            <td className="py-2">8分钟前</td>
                          </tr>
                        </tbody>
                      </table>
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
                        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-r from-blue-100 to-blue-400 opacity-20"></div>
                        <div
                          className="absolute bottom-0 left-0 right-0 border-t border-blue-500"
                          style={{ height: "40%" }}
                        ></div>
                        <div className="absolute top-0 left-0 right-0 flex justify-between px-2">
                          <BarChart className="h-4 w-4 text-blue-500" />
                          <span className="text-xs">预计未来12小时降水量将达30-50毫米</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-blue-600" />
                      <h4 className="font-medium text-blue-800">预报信息</h4>
                    </div>
                    <p className="text-sm text-blue-700">
                      根据最新气象预报，市中区未来24小时内将持续有中雨，局部地区可能出现短时强降水。目前各监测点水位正常，暂无内涝风险，但请注意关注实时预警信息。
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
                      <div className="text-lg font-bold">3.8m</div>
                      <div className="text-xs text-muted-foreground">记录于 2023年7月20日</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="text-sm font-medium mb-1">历史最大降雨量</div>
                      <div className="text-lg font-bold">60mm/h</div>
                      <div className="text-xs text-muted-foreground">记录于 2023年7月19日</div>
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
