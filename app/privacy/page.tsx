"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, Droplets } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 py-8">
      <div className="container max-w-4xl mx-4 md:mx-auto">
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                <Droplets className="h-6 w-6 text-cyan-500 absolute -top-1 -right-1" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">隐私政策</CardTitle>
            <p className="text-sm text-muted-foreground">智水先知智能降水检测预警系统</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold">1. 信息收集</h3>
              <p className="text-sm text-muted-foreground">
                我们收集您在注册和使用服务过程中提供的信息，包括但不限于用户名、邮箱地址、手机号码等。
              </p>

              <h3 className="text-lg font-semibold">2. 信息使用</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 提供和改进我们的服务</li>
                <li>• 发送重要的系统通知和预警信息</li>
                <li>• 进行数据分析以优化系统性能</li>
                <li>• 确保系统安全和防止滥用</li>
              </ul>

              <h3 className="text-lg font-semibold">3. 信息保护</h3>
              <p className="text-sm text-muted-foreground">
                我们采用行业标准的安全措施来保护您的个人信息，包括数据加密、访问控制和定期安全审计。
              </p>

              <h3 className="text-lg font-semibold">4. 信息共享</h3>
              <p className="text-sm text-muted-foreground">
                我们不会向第三方出售、交易或转让您的个人信息，除非获得您的明确同意或法律要求。
              </p>

              <h3 className="text-lg font-semibold">5. Cookie使用</h3>
              <p className="text-sm text-muted-foreground">
                我们使用Cookie来改善用户体验，您可以通过浏览器设置来管理Cookie偏好。
              </p>

              <h3 className="text-lg font-semibold">6. 用户权利</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 访问和更新您的个人信息</li>
                <li>• 删除您的账户和相关数据</li>
                <li>• 选择退出某些数据收集</li>
                <li>• 获取数据使用报告</li>
              </ul>

              <h3 className="text-lg font-semibold">7. 联系我们</h3>
              <p className="text-sm text-muted-foreground">
                如果您对本隐私政策有任何疑问，请通过系统内的联系方式与我们联系。
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t">
              <Link href="/login">
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <ArrowLeft className="h-4 w-4" />
                  返回登录
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground">最后更新：2024年1月1日</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
