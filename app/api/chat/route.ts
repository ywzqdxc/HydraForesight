import { NextResponse } from "next/server"
import OpenAI from "openai"

// 创建OpenAI客户端实例
const openai = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
})

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    // 调用百炼API
    const completion = await openai.chat.completions.create({
      model: "deepseek-r1",
      messages: [
        {
          role: "system",
          content: "你是雨安盾智能助手，专门回答关于降水、防洪、水资源等方面的问题。请提供专业、准确、简洁的回答。",
        },
        { role: "user", content: message },
      ],
    })

    // 获取回复内容
    const content = completion.choices[0].message.content || "抱歉，我无法回答这个问题。"
    const reasoning = completion.choices[0].message.reasoning_content || ""

    return NextResponse.json({ content, reasoning })
  } catch (error) {
    console.error("Chat API错误:", error)
    return NextResponse.json({ error: "处理请求时出错" }, { status: 500 })
  }
}
