import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { CloudRain, Droplets, AlertTriangle, ArrowLeft, MapPin, Clock, Car, MapIcon } from "lucide-react"
import Link from "next/link"

export default function ScienceAvenuePage() {
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
                <MapIcon className="h-5 w-5" />
              </div>
              嘉州大道
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
                    <span className="font-medium text-yellow-600">38mm/h (中雨)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">积水深度:</span>
                    </div>
                    <span className="font-medium text-yellow-600">30cm (中度积水)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">更新时间:</span>
                    </div>
                    <span className="text-sm">2分钟前</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">位置:</span>
                    </div>
                    <span className="text-sm">乐山市市中区嘉州大道</span>
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
                    <p className="text-sm text-yellow-700">嘉州大道部分路段已出现积水，车辆通行受阻，请注意绕行。</p>
                    <div className="text-xs text-yellow-600 mt-1">发布时间: 今天 08:45</div>
                  </div>

                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium text-yellow-800">交通拥堵黄色预警</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      由于道路积水，嘉州大道与嘉定北路交叉口出现严重交通拥堵，请车辆绕行。
                    </p>
                    <div className="text-xs text-yellow-600 mt-1">发布时间: 今天 09:10</div>
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
                    src="/locations/jiazhou-ave.png"
                    alt="嘉州大道地图"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1/3 left-1/2">
                    <div className="p-1 bg-yellow-500 rounded-full animate-pulse">
                      <Droplets className="h-5 w-5 text-white" />
                    </div>
                    <div className="mt-1 px-2 py-1 bg-white rounded text-xs">嘉州大道积水点</div>
                  </div>
                  <div className="absolute top-1/2 left-1/4">
                    <div className="p-1 bg-yellow-500 rounded-full">
                      <Car className="h-5 w-5 text-white" />
                    </div>
                    <div className="mt-1 px-2 py-1 bg-white rounded text-xs">交通拥堵</div>
                  </div>
                  <div className="absolute top-1/4 right-1/3">
                    <div className="p-1 bg-blue-500 rounded-full">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div className="mt-1 px-2 py-1 bg-white rounded text-xs">嘉州大道监测站</div>
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
                  <span className="text-xs">中度积水</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 rounded-md">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs">交通拥堵</span>
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
                  <CardDescription>嘉州大道监测站</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">积水深度</h4>
                        <div className="flex items-end gap-2">
                          <div className="text-3xl font-bold">30cm</div>
                          <div className="text-sm text-yellow-500">中度积水</div>
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
                            style={{ top: "40%" }}
                          >
                            <div className="absolute -top-3 right-0 text-xs text-yellow-500 bg-white px-1">
                              中度积水(30cm)
                            </div>
                          </div>
                          <div className="absolute left-0 right-0 border-t-2 border-blue-700" style={{ top: "40%" }}>
                            <div className="absolute -top-3 left-0 text-xs text-blue-700 bg-white px-1">当前: 30cm</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">降雨强度</h4>
                        <div className="flex items-end gap-2">
                          <div className="text-3xl font-bold">38mm/h</div>
                          <div className="text-sm text-yellow-500">中雨</div>
                        </div>
                        <div className="mt-2 h-[100px] w-full bg-gradient-to-r from-blue-100 via-blue-300 to-blue-600 rounded-md relative">
                          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-blue-400 bg-opacity-50 rounded-b-md"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">其他监测指标</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-3 bg-gray-50 rounded-md">
                        <div className="text-sm text-muted-foreground">气温</div>
                        <div className="text-lg font-medium">29°C</div>
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
                        <div className="text-lg font-medium">800m</div>
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
                        <h4 className="font-medium text-yellow-800">交通拥堵情况</h4>
                      </div>
                      <p className="text-sm text-yellow-700 mb-3">
                        由于道路积水，嘉州大道与嘉定北路交叉口出现严重交通拥堵，车辆通行缓慢。建议车辆绕行柏杨东路或春华路。
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 bg-white rounded-md border">
                          <div className="text-sm font-medium mb-1">嘉州大道与嘉定北路交叉口</div>
                          <div className="flex items-center gap-1 text-red-500">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-xs">严重拥堵</span>
                          </div>
                        </div>
                        <div className="p-3 bg-white rounded-md border">
                          <div className="text-sm font-medium mb-1">嘉州大道中段</div>
                          <div className="flex items-center gap-1 text-yellow-500">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span className="text-xs">中度拥堵</span>
                          </div>
                        </div>
                        <div className="p-3 bg-white rounded-md border">
                          <div className="text-sm font-medium mb-1">嘉州大道北段</div>
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
                            <p className="text-sm">从东坡公园前往沟儿口村，建议走嘉定北路 → 致江路大桥路 → 碧山路</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mt-0.5">
                            2
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">
                              从东坡公园前往市汽车站，建议走东坡路 → 嘉祥路 → 天星路
                            </p>
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
                  <CardDescription>嘉州大道区域的公众上报</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          张
                        </div>
                        <div>
                          <div className="font-medium">张先生</div>
                          <div className="text-xs text-muted-foreground">15分钟前</div>
                        </div>
                        <Badge variant="outline" className="ml-auto">
                          已核实
                        </Badge>
                      </div>
                      <h4 className="font-medium mb-1">嘉州大道积水严重</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                      嘉州大道与嘉定北路交叉口积水严重，水深约50厘米，小车无法通行，请绕行。
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>乐山市市中区嘉州大道</span>
                      </div>
                    </div>

                    <div className="p-4 border rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          王
                        </div>
                        <div>
                          <div className="font-medium">王先生</div>
                          <div className="text-xs text-muted-foreground">30分钟前</div>
                        </div>
                        <Badge variant="outline" className="ml-auto">
                          已核实
                        </Badge>
                      </div>
                      <h4 className="font-medium mb-1">嘉州大道交通拥堵</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                      嘉州大道中段交通拥堵严重，车辆几乎无法移动，建议绕行其他道路。
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>乐山市市中区嘉州大道中段</span>
                      </div>
                    </div>

                    <div className="p-4 border rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          李
                        </div>
                        <div>
                          <div className="font-medium">李女士</div>
                          <div className="text-xs text-muted-foreground">45分钟前</div>
                        </div>
                        <Badge variant="outline" className="ml-auto">
                          已核实
                        </Badge>
                      </div>
                      <h4 className="font-medium mb-1">嘉州大道北段路况良好</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                      嘉州大道北段目前路况良好，积水已经排除，车辆可以正常通行。
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>乐山市市中区嘉州大道北段</span>
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
