import { NextResponse } from "next/server"
import axios from "axios"

// 创建一个API路由来保护API密钥
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get("city") || "郑州"

  try {
    const apiUrl = "http://apis.juhe.cn/simpleWeather/query"
    const apiKey = "26530c5a585788f5427fd368bd6466ea"

    const response = await axios.get(apiUrl, {
      params: {
        key: apiKey,
        city: city,
      },
    })

    return NextResponse.json(response.data)
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}

export const runtime = "nodejs"
