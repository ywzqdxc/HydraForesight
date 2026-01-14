"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  role: "user" | "assistant"
  content: string
  reasoning?: string
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "您好! 我是智水先知智能助手，可以回答您关于降雨、防洪、水资源等方面的问题。有什么可以帮助您的吗?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 预设问题
  const suggestedQuestions = [
    "发生暴雨灾害时如何自救?",
    "城市洪涝问题的现状如何？",
    "如何提升水库的调蓄作用？",
    "人员调度如何进行？",
  ]

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    // 添加用户消息
    const userMessage: Message = { role: "user", content }
    setMessages((prev) => [...prev, userMessage])

    // 清空输入框并设置加载状态
    setInput("")
    setIsLoading(true)

    // 添加临时加载消息
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "正在思考中...",
      },
    ])

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
        }),
      })

      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`)
      }

      const data = await response.json()

      // 移除加载消息并添加真实回复
      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.content !== "正在思考中...")
        return [
          ...filtered,
          {
            role: "assistant",
            content: data.content || "抱歉，我无法回答这个问题。",
            reasoning: data.reasoning || "",
          },
        ]
      })
    } catch (error) {
      console.error("聊天请求失败:", error)
      // 移除加载消息并添加错误消息
      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.content !== "正在思考中...")
        return [
          ...filtered,
          {
            role: "assistant",
            content: "抱歉，我遇到了一些问题。请稍后再试。",
          },
        ]
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-lg">雨安盾智能助手</CardTitle>
            </div>
            <Badge variant="outline" className="text-xs">
              AI 驱动
            </Badge>
          </div>
          <CardDescription className="text-xs">可以回答您关于降雨、防洪、水资源等方面的问题</CardDescription>
        </CardHeader>

        <Tabs defaultValue="对话" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="对话">对话</TabsTrigger>
            <TabsTrigger value="帮助">帮助</TabsTrigger>
          </TabsList>

          <TabsContent value="对话" className="mt-0">
            <CardContent className="p-4">
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                        <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                                message.role === "assistant" ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
                            }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                            <span className="text-xs font-medium">
                          {message.role === "assistant" ? "雨安盾助手" : "您"}
                        </span>
                          </div>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 p-4 pt-0">
              {suggestedQuestions.length > 0 && (
                  <div className="flex flex-wrap gap-2 w-full">
                    {suggestedQuestions.map((question, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 bg-transparent"
                            onClick={() => handleSendMessage(question)}
                            disabled={isLoading}
                        >
                          {question}
                        </Button>
                    ))}
                  </div>
              )}

              <div className="flex w-full items-center gap-2">
                <div className="relative flex-1">
                  <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage(input)
                        }
                      }}
                      placeholder="输入您的问题..."
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={isLoading}
                  />
                </div>
                <Button size="icon" onClick={() => handleSendMessage(input)} disabled={isLoading || !input.trim()}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  <span className="sr-only">发送</span>
                </Button>
              </div>
            </CardFooter>
          </TabsContent>

          <TabsContent value="帮助" className="mt-0">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">我能帮您解答什么问题?</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>降水预报和实时降水情况</li>
                    <li>防洪防涝知识和应急措施</li>
                    <li>水资源保护和利用</li>
                    <li>城市内涝防范指南</li>
                    <li>暴雨天气应对方法</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-1">使用提示</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>提问越具体，回答越准确</li>
                    <li>可以点击下方的快捷问题</li>
                    <li>如需紧急救援，请拨打应急电话</li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md border border-blue-100 dark:border-blue-800">
                  <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 text-sm font-medium">
                    <Bot className="h-4 w-4" />
                    <span>雨安盾智能助手由百炼AI提供技术支持</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
  )
}
