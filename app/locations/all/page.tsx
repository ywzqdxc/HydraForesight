import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { CloudRain, MapIcon, Search, Filter, ArrowUpDown, AlertTriangle, Droplets } from "lucide-react"
import Link from "next/link"

export default function AllLocationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">监测区域</h1>
              <p className="text-muted-foreground">乐山市所有监测点位置和状态</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="搜索区域..." className="pl-8 w-[200px]" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">全部区域</TabsTrigger>
              <TabsTrigger value="warning">预警区域</TabsTrigger>
              <TabsTrigger value="normal">正常区域</TabsTrigger>
              <TabsTrigger value="favorites">收藏区域</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <LocationCard
                  title="黄石坡"
                  description="黄石坡区域的降水和积水情况监测"
                  status="danger"
                  icon={<CloudRain className="h-5 w-5" />}
                  alerts={[
                    { type: "暴雨", severity: "红色预警" },
                    { type: "内涝", severity: "橙色预警" },
                  ]}
                  rainfall="45mm/h"
                  waterLevel="4.2m"
                  href="/locations/longzihu-center"
                />

                <LocationCard
                  title="月弦坝"
                  description="月弦坝水位监测和预警信息"
                  status="danger"
                  icon={<CloudRain className="h-5 w-5" />}
                  alerts={[{ type: "洪水", severity: "红色预警" }]}
                  rainfall="42mm/h"
                  waterLevel="3.9m"
                  href="/locations/dongfengqu"
                />

                <LocationCard
                  title="嘉州大道"
                  description="嘉州大道沿线的积水点和交通状况"
                  status="warning"
                  icon={<MapIcon className="h-5 w-5" />}
                  alerts={[{ type: "积水", severity: "黄色预警" }]}
                  rainfall="38mm/h"
                  waterLevel="N/A"
                  href="/locations/science-avenue"
                />

                <LocationCard
                  title="市中区"
                  description="市中区整体降水和内涝监测"
                  status="normal"
                  icon={<MapIcon className="h-5 w-5" />}
                  alerts={[]}
                  rainfall="25mm/h"
                  waterLevel="N/A"
                  href="/locations/zhengdong"
                />

                <LocationCard
                  title="柏杨中路"
                  description="柏杨中路交通和积水情况实时监测"
                  status="warning"
                  icon={<MapIcon className="h-5 w-5" />}
                  alerts={[{ type: "积水", severity: "黄色预警" }]}
                  rainfall="32mm/h"
                  waterLevel="N/A"
                  href="/locations/longhu-avenue"
                />

                <LocationCard
                  title="周河坎"
                  description="周河坎水位和周边区域降水监测"
                  status="normal"
                  icon={<CloudRain className="h-5 w-5" />}
                  alerts={[]}
                  rainfall="22mm/h"
                  waterLevel="2.3m"
                  href="/locations/ruyi-lake"
                />

                <LocationCard
                  title="王浩儿街"
                  description="王浩儿街沿线积水和交通状况"
                  status="warning"
                  icon={<MapIcon className="h-5 w-5" />}
                  alerts={[{ type: "积水", severity: "黄色预警" }]}
                  rainfall="35mm/h"
                  waterLevel="N/A"
                  href="/locations/longxiang-street"
                />

                <LocationCard
                  title="碧山路"
                  description="碧山路交通和积水情况监测"
                  status="normal"
                  icon={<MapIcon className="h-5 w-5" />}
                  alerts={[]}
                  rainfall="25mm/h"
                  waterLevel="N/A"
                  href="/locations/hanghai-road"
                />
              </div>
            </TabsContent>

            <TabsContent value="warning" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <LocationCard
                  title="黄石坡"
                  description="黄石坡区域的降水和积水情况监测"
                  status="danger"
                  icon={<CloudRain className="h-5 w-5" />}
                  alerts={[
                    { type: "暴雨", severity: "红色预警" },
                    { type: "内涝", severity: "橙色预警" },
                  ]}
                  rainfall="45mm/h"
                  waterLevel="4.2m"
                  href="/locations/longzihu-center"
                />

                <LocationCard
                  title="月弦坝"
                  description="月弦坝水位监测和预警信息"
                  status="danger"
                  icon={<CloudRain className="h-5 w-5" />}
                  alerts={[{ type: "洪水", severity: "红色预警" }]}
                  rainfall="42mm/h"
                  waterLevel="3.9m"
                  href="/locations/dongfengqu"
                />

                <LocationCard
                  title="嘉州大道"
                  description="嘉州大道沿线的积水点和交通状况"
                  status="warning"
                  icon={<MapIcon className="h-5 w-5" />}
                  alerts={[{ type: "积水", severity: "黄色预警" }]}
                  rainfall="38mm/h"
                  waterLevel="N/A"
                  href="/locations/science-avenue"
                />

                <LocationCard
                  title="柏杨中路"
                  description="柏杨中路交通和积水情况实时监测"
                  status="warning"
                  icon={<MapIcon className="h-5 w-5" />}
                  alerts={[{ type: "积水", severity: "黄色预警" }]}
                  rainfall="32mm/h"
                  waterLevel="N/A"
                  href="/locations/longhu-avenue"
                />

                <LocationCard
                  title="王浩儿街"
                  description="王浩儿街沿线积水和交通状况"
                  status="warning"
                  icon={<MapIcon className="h-5 w-5" />}
                  alerts={[{ type: "积水", severity: "黄色预警" }]}
                  rainfall="35mm/h"
                  waterLevel="N/A"
                  href="/locations/longxiang-street"
                />
              </div>
            </TabsContent>

            <TabsContent value="normal" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <LocationCard
                  title="市中区"
                  description="市中区整体降水和内涝监测"
                  status="normal"
                  icon={<MapIcon className="h-5 w-5" />}
                  alerts={[]}
                  rainfall="25mm/h"
                  waterLevel="N/A"
                  href="/locations/zhengdong"
                />

                <LocationCard
                  title="周河坎"
                  description="周河坎水位和周边区域降水监测"
                  status="normal"
                  icon={<CloudRain className="h-5 w-5" />}
                  alerts={[]}
                  rainfall="22mm/h"
                  waterLevel="2.3m"
                  href="/locations/ruyi-lake"
                />

                <LocationCard
                  title="碧山路"
                  description="碧山路交通和积水情况监测"
                  status="normal"
                  icon={<MapIcon className="h-5 w-5" />}
                  alerts={[]}
                  rainfall="25mm/h"
                  waterLevel="N/A"
                  href="/locations/hanghai-road"
                />
              </div>
            </TabsContent>

            <TabsContent value="favorites" className="mt-4">
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">暂无收藏区域</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-4">
                  您可以通过点击区域卡片上的星标图标来收藏常用的监测区域
                </p>
                <Button variant="outline">开始收藏区域</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

interface LocationCardProps {
  title: string
  description: string
  status: "danger" | "warning" | "normal"
  icon: React.ReactNode
  alerts: { type: string; severity: string }[]
  rainfall: string
  waterLevel: string
  href: string
}

function LocationCard({ title, description, status, icon, alerts, rainfall, waterLevel, href }: LocationCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div
              className={`p-1.5 rounded-full ${
                status === "danger"
                  ? "bg-red-100 text-red-600"
                  : status === "warning"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
              }`}
            >
              {icon}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <div
            className={`w-3 h-3 rounded-full ${
              status === "danger" ? "bg-red-500" : status === "warning" ? "bg-yellow-500" : "bg-green-500"
            }`}
          />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <CloudRain className="h-4 w-4 text-blue-500" />
              <span className="text-sm">降雨量:</span>
            </div>
            <span className="font-medium">{rainfall}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-sm">水位:</span>
            </div>
            <span className="font-medium">{waterLevel}</span>
          </div>

          {alerts.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {alerts.map((alert, index) => (
                <Badge
                  key={index}
                  variant={
                    alert.severity.includes("红色")
                      ? "destructive"
                      : alert.severity.includes("橙色")
                        ? "destructive"
                        : alert.severity.includes("黄色")
                          ? "warning"
                          : "outline"
                  }
                  className="text-xs"
                >
                  {alert.type} {alert.severity}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-1 text-green-600 text-sm mt-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>正常状态，无预警</span>
            </div>
          )}

          <Link
            href={href}
            className="block w-full text-center text-sm text-blue-600 hover:text-blue-800 mt-2 pt-2 border-t"
          >
            查看详情
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
