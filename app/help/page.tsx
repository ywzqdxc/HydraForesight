import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Search, FileText, Video, ArrowRight } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <HelpCircle className="h-8 w-8 text-blue-500" />
              帮助中心
            </h1>
            <p className="text-muted-foreground">获取系统使用帮助和常见问题解答</p>
          </div>

          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h2 className="text-xl font-medium">有什么可以帮助您？</h2>
                <div className="max-w-xl mx-auto relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9" placeholder="搜索帮助内容..." />
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button variant="outline" size="sm">系统使用</Button>
                  <Button variant="outline" size="sm">账号管理</Button>
                  <Button variant="outline" size="sm">数据查询</Button>
                  <Button variant="outline" size="sm">预警信息</Button>
                  <Button variant="outline" size="sm">设备管理</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="faq" className="w-full">
            <TabsList>
              <TabsTrigger value="faq">常见问题</TabsTrigger>
              <TabsTrigger value="guide">使用指南</TabsTrigger>
              <TabsTrigger value="video">视频教程</TabsTrigger>
              <TabsTrigger value="download">资料下载</TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>常见问题解答</CardTitle>
                  <CardDescription>关于系统使用的常见问题和解答</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>如何查看实时降水数据？</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          您可以在系统首页的"当前天气"卡片中查看实时降水数据，或者点击"降水地图"标签页查看更详细的降水分布情况。如果您需要查看特定区域的降水数据，可以在预警中心中选择对应的区域进行查看。
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger>如何接收预警通知？</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          系统支持多种预警通知方式，包括网站通知、短信、电子邮件等。您可以在"个人资料"页面的"通知设置"选项卡中设置您希望接收的通知类型和方式。当系统发布预警信息时，您将通过选定的方式接收通知。
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger>如何提交积水点上报？</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          您可以在"公众参与"页面中点击"我要上报"选项卡，填写积水点的位置、积水深度等信息，并可以上传现场照片。提交后，系统管理员会对信息进行核实，并在确认后将其显示在系统中，供其他用户参考。
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger>预警信号的等级和含义是什么？</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          系统使用四级预警信号：蓝色、黄色、橙色和红色，分别代表一般、较重、严重和特别严重的降水和积水情况。蓝色预警表示可能出现轻微积水；黄色预警表示可能出现一定程度的积水；橙色预警表示可能出现严重积水；红色预警表示可能出现特别严重的积水和洪涝灾害。
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger>如何查看历史降水数据？</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          您可以在"数据分析"页面中选择时间范围和区域，查看历史降水数据和趋势分析。系统提供多种图表和数据展示方式，包括折线图、柱状图、热力图等，帮助您更直观地了解降水情况的变化。
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6">
                      <AccordionTrigger>系统支持哪些设备访问？</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          系统采用响应式设计，支持包括台式电脑、笔记本电脑、平板电脑和智能手机在内的各种设备访问。您可以通过浏览器访问系统网站，也可以下载我们的移动应用，获得更便捷的访问体验。
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-7">
                      <AccordionTrigger>如何修改个人资料和密码？</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          您可以点击页面右上角的用户头像，在下拉菜单中选择"个人资料"，进入个人资料页面。在该页面中，您可以修改个人信息、联系方式等。如需修改密码，请点击"安全设置"选项卡，按照提示完成密码修改操作。
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-8">
                      <AccordionTrigger>如何查看设备状态和数据？</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          您可以在"设备管理"页面中查看所有监测设备的状态和数据。页面提供了设备列表和详细信息，包括设备类型、位置、状态、电量、信号强度等。点击设备卡片上的"查看详情"按钮，可以查看该设备的详细信息和历史数据。
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="guide" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      系统概述
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      了解系统的基本功能和使用流程，帮助您快速上手使用系统。
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">系统功能介绍</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">用户界面导航</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">账号注册与登录</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">基本操作指南</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full">查看详情</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      数据查询
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      学习如何查询和分析降水数据，包括实时数据和历史数据的查询方法。
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">实时数据查询</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">历史数据查询</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">数据筛选与过滤</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">数据导出功能</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full">查看详情</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      预警信息
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      了解预警信息的类型、等级和处理方法，以及如何设置预警通知。
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">预警类型与等级</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">预警通知设置</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">预警信息查看</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">预警响应指南</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full">查看详情</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      公众参与
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      学习如何参与公众上报，提交积水点信息和查看其他用户的上报。
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">上报功能使用</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">上报信息填写</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">照片上传指南</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">上报信息查看</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full">查看详情</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      设备管理
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      了解如何查看和管理监测设备，包括设备状态监控和数据查询。
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">设备列表查看</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">设备状态监控</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">设备数据查询</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">设备告警处理</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full">查看详情</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      账号管理
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      学习如何管理您的账号信息，包括个人资料修改和密码管理。
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">个人资料管理</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">密码修改</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">通知设置</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">账号安全</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full">查看详情</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="video" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <div className="relative">
                    <img src="/placeholder.svg?height=150&width=300" alt="视频缩略图" className="w-full h-[150px] object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Video className="h-12 w-12 text-white opacity-80" />
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">系统使用入门</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      本视频介绍系统的基本功能和使用方法，帮助新用户快速上手。
                    </p>
                    <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                      <span>时长: 10:25</span>
                      <span>观看次数: 1,245</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <div className="relative">
                    <img src="/placeholder.svg?height=150&width=300" alt="视频缩略图" className="w-full h-[150px] object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Video className="h-12 w-12 text-white opacity-80" />
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">数据查询与分析</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      详细讲解如何查询和分析降水数据，包括各种筛选和统计功能的使用方法。
                    </p>
                    <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                      <span>时长: 15:40</span>
                      <span>观看次数: 876</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <div className="relative">
                    <img src="/placeholder.svg?height=150&width=300" alt="视频缩略图" className="w-full h-[150px] object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Video className="h-12 w-12 text-white opacity-80" />
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">预警信息管理</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      介绍预警信息管理的详细内容。
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">管理内容1</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">管理内容2</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">管理内容3</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">管理内容4</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full">查看详情</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
export const metadata = {
  title: "帮助中心",
  description: "获取系统使用帮助和常见问题解答",
}
