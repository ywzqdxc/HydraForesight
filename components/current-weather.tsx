"use client"

import { CloudRain, Droplets, Wind, Gauge, Cloud, Sun, CloudSun } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useWeather } from "./weather-service"

export function CurrentWeather() {
  const { weatherData, loading, error } = useWeather()

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24 mt-1" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-8 w-16" />
            </div>
            <div className="text-right">
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">当前天气</CardTitle>
          <CardDescription className="text-xs">天气数据加载失败</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-red-500">{error}</div>
        </CardContent>
      </Card>
    )
  }

  if (!weatherData) {
    return null
  }

  // 根据天气info选择适当的图标
  const getWeatherIcon = (info: string) => {
    if (info.includes("雨")) return <CloudRain className="h-10 w-10 text-blue-500" />
    if (info.includes("云") || info.includes("阴")) return <Cloud className="h-10 w-10 text-gray-500" />
    if (info.includes("晴")) return <Sun className="h-10 w-10 text-amber-500" />
    return <CloudSun className="h-10 w-10 text-amber-500" />
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-1.5">
          <CloudSun className="h-4 w-4 text-blue-500" />
          当前天气
        </CardTitle>
        <CardDescription className="text-xs">{weatherData.city || "未知位置"}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getWeatherIcon(weatherData.realtime.info)}
            <div className="text-2xl font-bold">{weatherData.realtime.temperature}°C</div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-xs">
              <Droplets className="h-3.5 w-3.5 text-blue-500" />
              <span>湿度 {weatherData.realtime.humidity}%</span>
            </div>
            <div className="text-xs text-muted-foreground">{weatherData.realtime.info}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t">
          <div className="flex items-center gap-1 text-xs">
            <Wind className="h-3.5 w-3.5 text-gray-500" />
            <span>
              {weatherData.realtime.direct} {weatherData.realtime.power}
            </span>
          </div>
          {weatherData.realtime.aqi && (
            <div className="flex items-center gap-1 text-xs">
              <Gauge className="h-3.5 w-3.5 text-gray-500" />
              <span>空气质量: {weatherData.realtime.aqi}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
