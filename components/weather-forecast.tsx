"use client"

import { useState } from "react"
import { Cloud, CloudRain, CloudSun, Sun, Wind } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useWeather } from "./weather-service"

export default function WeatherForecast() {
  const [forecastType, setForecastType] = useState("daily")
  const { weatherData, loading, error } = useWeather()

  // 使用模拟数据作为备用
  const dailyForecast = weatherData?.future || [
    {
      date: "今天",
      temperature: "28°C/20°C",
      weather: "中雨",
      wid: { day: "07", night: "07" },
      direct: "东南风 4级",
    },
    {
      date: "周一",
      temperature: "30°C/22°C",
      weather: "大雨",
      wid: { day: "09", night: "09" },
      direct: "东南风 5级",
    },
    {
      date: "周二",
      temperature: "29°C/21°C",
      weather: "中雨",
      wid: { day: "08", night: "08" },
      direct: "南风 4级",
    },
    {
      date: "周三",
      temperature: "27°C/20°C",
      weather: "多云",
      wid: { day: "01", night: "01" },
      direct: "西南风 3级",
    },
    {
      date: "周四",
      temperature: "31°C/22°C",
      weather: "晴",
      wid: { day: "00", night: "00" },
      direct: "西风 2级",
    },
    {
      date: "周五",
      temperature: "32°C/24°C",
      weather: "晴",
      wid: { day: "00", night: "00" },
      direct: "西北风 2级",
    },
    {
      date: "周六",
      temperature: "30°C/22°C",
      weather: "多云",
      wid: { day: "01", night: "01" },
      direct: "北风 3级",
    },
  ]

  // 原始的小时预报数据
  const hourlyForecast = [
    { time: "现在", temp: "28°C", icon: <CloudRain className="h-5 w-5 text-blue-500" />, rain: "85%" },
    { time: "10:00", temp: "29°C", icon: <CloudRain className="h-5 w-5 text-blue-500" />, rain: "90%" },
    { time: "11:00", temp: "29°C", icon: <CloudRain className="h-5 w-5 text-blue-500" />, rain: "95%" },
    { time: "12:00", temp: "30°C", icon: <CloudRain className="h-5 w-5 text-blue-500" />, rain: "95%" },
    { time: "13:00", temp: "30°C", icon: <CloudRain className="h-5 w-5 text-blue-500" />, rain: "90%" },
    { time: "14:00", temp: "29°C", icon: <CloudRain className="h-5 w-5 text-blue-500" />, rain: "85%" },
    { time: "15:00", temp: "29°C", icon: <CloudRain className="h-5 w-5 text-blue-500" />, rain: "80%" },
    { time: "16:00", temp: "28°C", icon: <CloudRain className="h-5 w-5 text-blue-500" />, rain: "75%" },
    { time: "17:00", temp: "27°C", icon: <Cloud className="h-5 w-5 text-blue-500" />, rain: "70%" },
    { time: "18:00", temp: "26°C", icon: <Cloud className="h-5 w-5 text-blue-500" />, rain: "65%" },
    { time: "19:00", temp: "25°C", icon: <Cloud className="h-5 w-5 text-blue-500" />, rain: "60%" },
    { time: "20:00", temp: "24°C", icon: <Cloud className="h-5 w-5 text-blue-500" />, rain: "55%" },
  ]

  // 根据天气类型获取图标
  const getWeatherIcon = (weather: string, size: "sm" | "md" = "md") => {
    const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5"

    if (weather.includes("雨")) return <CloudRain className={`${iconSize} text-blue-500`} />
    if (weather.includes("云") || weather.includes("阴")) return <Cloud className={`${iconSize} text-gray-500`} />
    if (weather.includes("晴")) return <Sun className={`${iconSize} text-amber-500`} />
    return <CloudSun className={`${iconSize} text-amber-500`} />
  }

  if (loading) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-7 w-[120px]" />
        </div>
        <div className="grid grid-cols-5 gap-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="text-xs text-red-500 p-2 border border-red-200 rounded-md">{error}</div>
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-[20px] text-xs text-muted-foreground">{weatherData?.city || "乐山市"}</div>
        <Tabs value={forecastType} onValueChange={setForecastType} className="w-[120px]">
          <TabsList className="grid w-full grid-cols-2 h-10">
            <TabsTrigger value="daily" className="text-[14px] py-1.5">
              每日
            </TabsTrigger>
            <TabsTrigger value="hourly" className="text-[14px] py-0.5">
              每小时
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {forecastType === "daily" ? (
        <div className="grid grid-cols-5 gap-1">
          {dailyForecast.slice(0, 5).map((day, index) => (
            <div key={index} className="flex flex-col items-center p-1 border rounded-md">
              <div className="text-[14px] font-medium">{day.date.substring(5).replace("-", "/")}</div>
              {getWeatherIcon(day.weather)}
              <div className="text-xs font-bold mt-0.5">{day.temperature.split("/")[0]}</div>
              <div className="text-[14px] text-muted-foreground">{day.temperature.split("/")[1]}</div>
              <div className="text-[14px] mt-0.5">{day.weather}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto pb-1">
          <div className="flex gap-1 min-w-max">
            {hourlyForecast.map((hour, index) => (
              <div key={index} className="flex flex-col items-center p-1 border rounded-md w-[50px]">
                <div className="text-[10px] font-medium">{hour.time}</div>
                {hour.icon}
                <div className="text-xs font-bold mt-0.5">{hour.temp}</div>
                <div className="flex items-center text-[10px] text-blue-600">
                  <CloudRain className="h-2.5 w-2.5 mr-0.5" />
                  {hour.rain}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-[13px] text-muted-foreground pt-1 border-t">
        <div className="flex items-center gap-1">
          <Wind className="h-3 w-3" />
          <span>{dailyForecast[0].direct}</span>
        </div>
        <div>数据更新: 10分钟前</div>
      </div>
    </div>
  )
}
