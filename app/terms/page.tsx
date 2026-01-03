"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, Droplets } from "lucide-react"

export default function TermsPage() {
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
            <CardTitle className="text-2xl font-bold">用户协议</CardTitle>
            <p className="text-sm text-muted-foreground">智水先知智能降水检测预警系统</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold">1. 服务条款</h3>
              <p className="text-sm text-muted-foreground">
                欢迎使用智水先知智能降水检测预警系统。通过访问和使用本系统，您同意遵守以下条款和条件。
              </p>

              <h3 className="text-lg font-semibold">2. 服务描述</h3>
              <p className="text-sm text-muted-foreground">
                智水先知系统提供实时降水监测、预警信息发布、数据分析等服务，旨在帮助用户及时了解降水情况并做好防范措施。
              </p>

              <h3 className="text-lg font-semibold">3. 用户责任</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 提供真实、准确的注册信息</li>
                <li>• 妥善保管账户信息，不得与他人共享</li>
                <li>• 合理使用系统资源，不得进行恶意操作</li>
                <li>• 遵守相关法律法规</li>
              </ul>

              <h3 className="text-lg font-semibold">4. 数据使用</h3>
              <p className="text-sm text-muted-foreground">
                系统收集的数据仅用于提供降水监测和预警服务，我们承诺保护用户隐私，不会将数据用于其他商业目的。
              </p>

              <h3 className="text-lg font-semibold">5. 免责声明</h3>
              <p className="text-sm text-muted-foreground">
                本系统提供的预警信息仅供参考，用户应结合实际情况做出判断。对于因使用本系统而产生的任何损失，我们不承担责任。
              </p>

              <h3 className="text-lg font-semibold">6. 服务变更</h3>
              <p className="text-sm text-muted-foreground">
                我们保留随时修改或终止服务的权利，重要变更将提前通知用户。
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t">
              <Link href="/login">
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <ArrowLeft className="h-4 w-4" />
                  返回登录
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground">最后更新：2026年1月1日</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
