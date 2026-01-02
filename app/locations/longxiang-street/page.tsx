import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { CloudRain, Droplets, AlertTriangle, ArrowLeft, MapPin, Clock, Car } from "lucide-react"
import Link from "next/link"

export default function LongxiangStreetPage() {
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
              <div className="p-1 bg-yellow-100 rounded-full text-yellow-600">
                <MapPin className="h-5 w-5" />
              </div>
              王浩儿街
              <Badge variant="warning">黄色预警</Badge>
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
                    <span className="font-medium text-yellow-600">35mm/h (中雨)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">积水深度:</span>
                    </div>
                    <span className="font-medium text-yellow-600">20cm (轻微积水)</span>
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
                    <span className="text-sm">乐山市市中区王浩儿街</span>
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
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium text-yellow-800">道路积水黄色预警</span>
                    </div>
                    <p className="text-sm text-yellow-700">王浩儿街部分路段已出现积水，深度约20厘米，请注意安全驾驶。</p>
                    <div className="text-xs text-yellow-600 mt-1">发布时间: 今天 08:30</div>
                  </div>

                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium text-yellow-800">交通缓行黄色预警</span>
                    </div>
                    <p className="text-sm text-yellow-700">由于道路积水，王浩儿街与致江路交叉口交通缓行，请耐心驾驶。</p>
                    <div className="text-xs text-yellow-600 mt-1">发布时间: 今天 08:45</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="map" className="w-full">
            <TabsList>
              <TabsTrigger value="map">实时地图</TabsTrigger>
              <TabsTrigger value="data">监测数据</TabsTrigger>
              <TabsTrigger value="traffic">交通状况</TabsTrigger>
              <TabsTrigger value="reports">公众上报</TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="mt-4">
              <div className="relative w-full h-[400px] bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                <div className="absolute inset-0">
                  <img
                    src="/locations/wanghaoer_street.png"
                    alt="王浩儿街地图"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1/3 left-1/2">
                    <div className="p-1 bg-yellow-500 rounded-full animate-pulse">
                      <Droplets className="h-5 w-5 text-white" />
                    </div>
                    <div className="mt-1 px-2 py-1 bg-white rounded text-xs">王浩儿街积水点</div>
                  </div>
                  <div className="absolute top-1/2 left-1/4">
                    <div className="p-1 bg-yellow-500 rounded-full">
                      <Car className="h-5 w-5 text-white" />
                    </div>
                    <div className="mt-1 px-2 py-1 bg-white rounded text-xs">交通缓行</div>
                  </div>
                  <div className="absolute top-1/4 right-1/3">
                    <div className="p-1 bg-blue-500 rounded-full">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div className="mt-1 px-2 py-1 bg-white rounded text-xs">王浩儿街监测站</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center gap-1 px-2 py-1 bg-red-100 rounded-md">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs">严重积水</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 rounded-md">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs">轻微积水</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 rounded-md">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs">交通缓行</span>
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
                  <CardDescription>王浩儿街监测站</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">积水深度</h4>
                        <div className="flex items-end gap-2">
                          <div className="text-3xl font-bold">20cm</div>
                          <div className="text-sm text-yellow-500">轻微积水</div>
                        </div>
                        <div className="mt-2 h-[100px] w-full bg-gradient-to-b from-white to-blue-500 rounded-md relative">
                          <div
                            className="absolute left-0 right-0 border-t border-dashed border-red-500"
                            style={{ top: "20%" }}
                          >
                            <div className="absolute -top-3 right-0 text-xs text-red-500 bg-white px-1">
                              严重积水(50cm)
                            </div>
                          </div>
                          <div
                            className="absolute left-0 right-0 border-t border-dashed border-yellow-500"
                            style={{ top: "60%" }}
                          >
                            <div className="absolute -top-3 right-0 text-xs text-yellow-500 bg-white px-1">
                              轻微积水(20cm)
                            </div>
                          </div>
                          <div className="absolute left-0 right-0 border-t-2 border-blue-700" style={{ top: "60%" }}>
                            <div className="absolute -top-3 left-0 text-xs text-blue-700 bg-white px-1">当前: 20cm</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">降雨强度</h4>
                        <div className="flex items-end gap-2">
                          <div className="text-3xl font-bold">35mm/h</div>
                          <div className="text-sm text-yellow-500">中雨</div>
                        </div>
                        <div className="mt-2 h-[100px] w-full bg-gradient-to-r from-blue-100 via-blue-300 to-blue-600 rounded-md relative">
                          <div className="absolute inset-x-0 bottom-0 h-[55%] bg-blue-400 bg-opacity-50 rounded-b-md"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">其他监测指标</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-3 bg-gray-50 rounded-md">
                        <div className="text-sm text-muted-foreground">气温</div>
                        <div className="text-lg font-medium">28°C</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-md">
                        <div className="text-sm text-muted-foreground">湿度</div>
                        <div className="text-lg font-medium">85%</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-md">
                        <div className="text-sm text-muted-foreground">风速</div>
                        <div className="text-lg font-medium">3级</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-md">
                        <div className="text-sm text-muted-foreground">能见度</div>
                        <div className="text-lg font-medium">1200m</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="traffic" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">交通状况</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <Car className="h-5 w-5 text-yellow-600" />
                        <h4 className="font-medium text-yellow-800">交通缓行情况</h4>
                      </div>
                      <p className="text-sm text-yellow-700 mb-3">
                        由于道路积水，王浩儿街与致江路交叉口交通缓行，车辆通行速度降低。建议车辆减速慢行，注意安全。
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 bg-white rounded-md border">
                          <div className="text-sm font-medium mb-1">王浩儿街与致江路交叉口</div>
                          <div className="flex items-center gap-1 text-yellow-500">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span className="text-xs">交通缓行</span>
                          </div>
                        </div>
                        <div className="p-3 bg-white rounded-md border">
                          <div className="text-sm font-medium mb-1">王浩儿街中段</div>
                          <div className="flex items-center gap-1 text-yellow-500">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span className="text-xs">轻微拥堵</span>
                          </div>
                        </div>
                        <div className="p-3 bg-white rounded-md border">
                          <div className="text-sm font-medium mb-1">王浩儿街北段</div>
                          <div className="flex items-center gap-1 text-green-500">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs">通行正常</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative w-full h-[250px] bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <div className="absolute inset-0">
                        <img
                          src="/placeholder.svg?height=250&width=800"
                          alt="交通状况地图"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-sm font-medium">实时交通状况地图</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              红色表示拥堵，黄色表示缓行，绿色表示畅通
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <h4 className="font-medium text-blue-800">绕行建议</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mt-0.5">
                            1
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">从王浩儿街前往嘉州花城，建议走百禄路 → 嘉定北路 → 嘉定中路 → 里仁街</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mt-0.5">
                            2
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">从劼人街前往王浩儿街，建议走滨江路中段 → 百禄路</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">公众上报信息</CardTitle>
                  <CardDescription>王浩儿街区域的公众上报</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          王
                        </div>
                        <div>
                          <div className="font-medium">王先生</div>
                          <div className="text-xs text-muted-foreground">20分钟前</div>
                        </div>
                        <Badge variant="outline" className="ml-auto">
                          已核实
                        </Badge>
                      </div>
                      <h4 className="font-medium mb-1">王浩儿街积水情况</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                      王浩儿街与致江路交叉口积水约20厘米，小车可以通行但需要减速，请注意安全。
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>乐山市市中区区王浩儿街</span>
                      </div>
                    </div>

                    <div className="p-4 border rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          李
                        </div>
                        <div>
                          <div className="font-medium">李女士</div>
                          <div className="text-xs text-muted-foreground">35分钟前</div>
                        </div>
                        <Badge variant="outline" className="ml-auto">
                          已核实
                        </Badge>
                      </div>
                      <h4 className="font-medium mb-1">王浩儿街交通缓行</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                      王浩儿街中段交通缓行，车辆行驶速度较慢，建议有条件的车辆绕行。
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>乐山市市中区王浩儿街中段</span>
                      </div>
                    </div>

                    <div className="p-4 border rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          张
                        </div>
                        <div>
                          <div className="font-medium">张先生</div>
                          <div className="text-xs text-muted-foreground">50分钟前</div>
                        </div>
                        <Badge variant="outline" className="ml-auto">
                          已核实
                        </Badge>
                      </div>
                      <h4 className="font-medium mb-1">王浩儿街北段路况良好</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                      王浩儿街北段目前路况良好，无明显积水，车辆可以正常通行。
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>乐山市市中区王浩儿街北段</span>
                      </div>
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
