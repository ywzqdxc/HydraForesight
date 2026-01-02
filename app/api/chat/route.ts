import { NextResponse } from "next/server"
import OpenAI from "openai"

// 创建OpenAI客户端实例
const openai = new OpenAI({
  apiKey: "sk-1d195b5799804dc799fc25ddd3069d7f ",
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
})

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    // 调用百炼API
    const completion = await openai.chat.completions.create({
      model: "deepseek-v3",
      messages: [
        {
          role: "system",
          content: "你是“雨安盾”洪涝监测与预警平台的智能助手，专注于城市内涝防治领域。具备多源数据融合分析、实时预警推演、应急决策辅助等专业能力，能够基于气象数据、水文监测、设备状态等信息，为用户提供精准的内涝风险评估、区域积水分布查询、防灾减灾建议等服务。回答需结合平台技术优势（如AI大模型预测、WebGL可视化、公众协同机制等），确保信息准确、专业且具备实践指导价值。",
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

export const runtime = 'edge';