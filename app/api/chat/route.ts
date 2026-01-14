import { NextResponse } from "next/server"

const API_KEY = "sk-1d195b5799804dc799fc25ddd3069d7f"
const BASE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1"

export async function POST(request: Request) {
  try {
    const { message } = await request.json()
    console.log("[v0] 收到聊天请求:", message)

    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-v3",
        messages: [
          {
            role: "system",
            content: "你是智水先知智能助手...",
          },
          { role: "user", content: message },
        ],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] API错误响应:", errorText)
      throw new Error(`API请求失败: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || "抱歉，我无法回答这个问题。"
    const reasoning = data.choices?.[0]?.message?.reasoning_content || ""

    return NextResponse.json({ content, reasoning })
  } catch (error) {
    console.error("[v0] Chat API错误:", error)
    return NextResponse.json(
        { error: "处理请求时出错", details: error instanceof Error ? error.message : "未知错误" },
        { status: 500 }
    )
  }
}

export const runtime = "nodejs"