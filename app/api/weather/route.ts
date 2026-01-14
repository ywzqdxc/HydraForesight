import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get("city") || "乐山"

  try {
    const apiKey = "26530c5a585788f5427fd368bd6466ea"
    // 修复点：添加反引号，并改用 https
    const apiUrl = `https://apis.juhe.cn/simpleWeather/query?key=${apiKey}&city=${encodeURIComponent(city)}`

    const response = await fetch(apiUrl, {
      method: "GET",
    })

    if (!response.ok) {
      throw new Error(`Weather API returned ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return NextResponse.json(
        { error_code: 500, reason: "获取天气数据失败", result: null },
        { status: 500 }
    )
  }
}

export const runtime = "nodejs"