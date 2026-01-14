"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// 天气数据接口
interface WeatherData {
  city: string
  realtime: {
    temperature: string
    humidity: string
    info: string
    wid: string
    direct: string
    power: string
    aqi: string
  }
  future?: Array<{
    date: string
    temperature: string
    weather: string
    wid: {
      day: string
      night: string
    }
    direct: string
  }>
}

interface WeatherResponse {
  error_code: number
  reason: string
  result: WeatherData
}

interface WeatherContextType {
  weatherData: WeatherData | null
  loading: boolean
  error: string | null
  changeCity: (city: string) => void
  currentCity: string
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentCity, setCurrentCity] = useState("乐山")

  const fetchWeatherData = async (city: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`, {
        method: "GET",
      })

      if (response.ok) {
        const data = (await response.json()) as WeatherResponse
        if (data.error_code === 0) {
          setWeatherData(data.result)
        } else {
          setError(`请求错误: ${data.reason}`)
        }
      } else {
        setError("请求异常")
      }
    } catch (err) {
      console.error("获取天气数据失败:", err)
      setError("网络请求失败，请稍后重试")
    } finally {
      setLoading(false)
    }
  }

  const changeCity = (city: string) => {
    setCurrentCity(city)
  }

  useEffect(() => {
    fetchWeatherData(currentCity)
  }, [currentCity])

  return (
      <WeatherContext.Provider value={{ weatherData, loading, error, changeCity, currentCity }}>
        {children}
      </WeatherContext.Provider>
  )
}

export function useWeather() {
  const context = useContext(WeatherContext)
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider")
  }
  return context
}
