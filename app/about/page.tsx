import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Info, CloudRain, Users, Cpu, BarChart, Shield, Code, Server, Database } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Info className="h-8 w-8 text-blue-500" />
              关于系统
            </h1>
            <p className="text-muted-foreground">了解智水先知监测与预警系统</p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">系统概述</TabsTrigger>
              <TabsTrigger value="features">功能特点</TabsTrigger>
              <TabsTrigger value="architecture">系统架构</TabsTrigger>
              <TabsTrigger value="team">开发团队</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <CloudRain className="h-6 w-6 text-blue-500" />
                    智水先知监测与预警系统
                  </CardTitle>
                  <CardDescription>智能化监测与预警平台，保障城市安全</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    智水先知监测与预警系统是一套基于物联网、大数据和人工智能技术的综合性监测与预警平台。系统通过部署的多个监测点，实时采集降水量、水位、气象等数据，结合气象预报和历史数据分析，为城市防汛减灾提供科学决策支持。
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">系统目标</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>实时监测区域降水情况和水位变化</li>
                        <li>提供精准的降水预报和积水预警</li>
                        <li>辅助城市防汛减灾决策</li>
                        <li>提高公众防灾意识和自救能力</li>
                        <li>建立社会参与的防汛信息共享机制</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">系统优势</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>多源数据融合，提高预警准确性</li>
                        <li>智能算法分析，实现精准预测</li>
                        <li>多级预警机制，分级响应处置</li>
                        <li>公众参与平台，汇集社会力量</li>
                        <li>可视化展示，直观了解情况</li>
                      </ul>
                    </div>
                  </div>

                  {/* <div className="relative w-full h-[300px] bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden mt-6">
                    <div className="absolute inset-0">
                      <img
                        src="/placeholder.svg?height=300&width=800"
                        alt="系统概览图"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div> */}

                  <div className="flex justify-center mt-4">
                    <Button>了解更多系统详情</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CloudRain className="h-5 w-5 text-blue-500" />
                      实时监测
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      通过区域的多个监测点，实时采集降水量、水位、气象等数据，为预警分析提供基础数据支持。系统支持高频率数据采集，确保监测数据的实时性和准确性。
                    </p>
                    <ul className="list-disc pl-5 mt-4 text-sm space-y-1">
                      <li>多点位监测，覆盖关键区域</li>
                      <li>多参数采集，全面掌握情况</li>
                      <li>高频率更新，确保数据实时性</li>
                      <li>自动校准，保证数据准确性</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart className="h-5 w-5 text-purple-500" />
                      智能预警
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      基于大数据分析和人工智能算法，结合历史数据和气象预报，对未来降水趋势和可能发生的内涝风险进行预测，并按照不同等级发布预警信息，指导防汛减灾工作。
                    </p>
                    <ul className="list-disc pl-5 mt-4 text-sm space-y-1">
                      <li>多级预警机制，分级响应</li>
                      <li>智能算法分析，提高准确性</li>
                      <li>历史数据对比，科学研判</li>
                      <li>多渠道发布，确保及时性</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-green-500" />
                      公众参与
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      建立公众参与平台，允许市民上报积水点、道路状况等信息，形成社会共治的防汛信息网络。同时提供防汛知识科普，提高公众防灾意识和自救能力。
                    </p>
                    <ul className="list-disc pl-5 mt-4 text-sm space-y-1">
                      <li>便捷上报，汇集社会力量</li>
                      <li>信息核验，确保可靠性</li>
                      <li>知识科普，提高防灾意识</li>
                      <li>互动交流，形成共治机制</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cpu className="h-5 w-5 text-amber-500" />
                      设备管理
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      提供全面的监测设备管理功能，包括设备状态监控、故障报警、维护管理等，确保监测网络的稳定运行和数据采集的连续性。
                    </p>
                    <ul className="list-disc pl-5 mt-4 text-sm space-y-1">
                      <li>状态监控，实时掌握设备情况</li>
                      <li>故障报警，及时发现问题</li>
                      <li>远程控制，提高管理效率</li>
                      <li>维护记录，规范设备管理</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-red-500" />
                      应急指挥
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      为应急管理部门提供决策支持，包括风险区域识别、资源调配建议、疏散路线规划等，提高应急响应效率和科学决策水平。
                    </p>
                    <ul className="list-disc pl-5 mt-4 text-sm space-y-1">
                      <li>风险评估，科学研判形势</li>
                      <li>资源调配，优化应急响应</li>
                      <li>路线规划，指导安全疏散</li>
                      <li>情景模拟，提前演练预案</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart className="h-5 w-5 text-blue-500" />
                      数据分析
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      基于历史数据和实时监测数据，提供多维度的数据分析功能，包括趋势分析、对比分析、关联分析等，为防汛规划和城市建设提供数据支持。
                    </p>
                    <ul className="list-disc pl-5 mt-4 text-sm space-y-1">
                      <li>多维分析，挖掘数据价值</li>
                      <li>可视化展示，直观理解数据</li>
                      <li>报告生成，支持决策参考</li>
                      <li>数据共享，促进跨部门协作</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="architecture" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">系统架构</CardTitle>
                  <CardDescription>基于云原生架构的智能监测预警平台</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* <div className="relative w-full h-[300px] bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                    <div className="absolute inset-0">
                      <img
                        src="/placeholder.svg?height=300&width=800"
                        alt="系统架构图"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div> */}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-5 w-5 text-blue-500" />
                        <h3 className="text-lg font-medium">感知层</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        由分区域的各类传感器和监测设备组成，包括雨量计、水位计、气象站等，负责实时采集环境数据。
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Server className="h-5 w-5 text-green-500" />
                        <h3 className="text-lg font-medium">传输层</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        基于5G、NB-IoT等物联网通信技术，构建高可靠、低延迟的数据传输网络，确保监测数据的实时传输。
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Database className="h-5 w-5 text-purple-500" />
                        <h3 className="text-lg font-medium">数据层</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        采用分布式数据库和大数据存储技术，实现海量监测数据的存储、管理和处理，为上层应用提供数据支持。
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <BarChart className="h-5 w-5 text-amber-500" />
                        <h3 className="text-lg font-medium">分析层</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        基于机器学习和深度学习算法，对监测数据进行智能分析和预测，识别潜在风险并生成预警信息。
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Code className="h-5 w-5 text-red-500" />
                        <h3 className="text-lg font-medium">应用层</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        提供Web门户、移动应用等多种访问方式，实现监测数据展示、预警发布、公众参与等功能。
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-blue-500" />
                        <h3 className="text-lg font-medium">安全层</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        贯穿系统各层级，提供身份认证、访问控制、数据加密等安全保障，确保系统和数据安全。
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">技术特点</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>采用微服务架构，提高系统可扩展性和维护性</li>
                      <li>基于容器技术，实现应用的快速部署和弹性伸缩</li>
                      <li>使用分布式存储和计算，提高数据处理能力</li>
                      <li>应用人工智能算法，提升预测和分析能力</li>
                      <li>采用响应式设计，支持多终端访问</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">开发团队</CardTitle>
                  <CardDescription>专业的技术团队，致力于智慧城市建设</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p>
                      智水先知监测与预警系统由一支跨学科的专业团队开发，团队成员来自水利工程、软件工程等多个领域，拥有丰富的理论知识和实践经验。
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                      <div className="text-center">
                        <img
                          src="team/cx.png"
                          alt="崔鑫"
                          className="w-18 h-24 rounded-full bg-slate-200 mx-auto mb-4"
                        />
                        <h3 className="font-medium">崔鑫</h3>
                        <p className="text-sm text-muted-foreground">项目负责人</p>
                        <p className="text-sm text-muted-foreground"></p>
                      </div>

                      <div className="text-center">
                        <img
                          src="team/lyb.png"
                          alt="路玉彬"
                          className="w-18 h-24 rounded-full bg-slate-200 mx-auto mb-4"
                        />
                        <h3 className="font-medium">路玉彬</h3>
                        <p className="text-sm text-muted-foreground">软件工程师</p>
                        <p className="text-sm text-muted-foreground"></p>
                      </div>

                      <div className="text-center">
                        <img
                          src="team/llg.png"
                          alt="刘林国"
                          className="w-18 h-24 rounded-full bg-slate-200 mx-auto mb-4"
                        />
                        <h3 className="font-medium">刘林国</h3>
                        <p className="text-sm text-muted-foreground">页面设计师</p>
                      </div>

                      <div className="text-center">
                        <img
                          src="team/lan.png"
                          alt="李安宁"
                          className="w-18 h-24 rounded-full bg-slate-200 mx-auto mb-4"
                        />
                        <h3 className="font-medium">李安宁</h3>
                        <p className="text-sm text-muted-foreground">算法设计师</p>
                      </div>
                      <div className="text-center">
                        <img
                          src="team/zys.jpg"
                          alt="张艳双"
                          className="w-18 h-24 rounded-full bg-slate-200 mx-auto mb-4"
                        />
                        <h3 className="font-medium">张艳双</h3>
                        <p className="text-sm text-muted-foreground">水文学顾问</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">合作单位</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 border rounded-md text-center">
                          <img src="cma_logo.png" alt="XX市气象局" className="w-16 h-16 mx-auto mb-2 rounded" />
                          <p className="text-sm">XX市气象局</p>
                        </div>
                        <div className="p-4 border rounded-md text-center">
                          <img src="mwr_logo.png" alt="XX市水利局" className="w-16 h-16 mx-auto mb-2 rounded" />
                          <p className="text-sm">XX市水利局</p>
                        </div>
                        <div className="p-4 border rounded-md text-center">
                          <img src="mem_logo.png" alt="XX市应急管理局" className="w-16 h-16 mx-auto mb-2 rounded" />
                          <p className="text-sm">XX市应急管理局</p>
                        </div>
                        <div className="p-4 border rounded-md text-center">
                          <img src="ncwu_logo.png" alt="华北水利水电大学" className="w-16 h-16 mx-auto mb-2 rounded" />
                          <p className="text-sm">华北水利水电大学</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">联系我们</h3>
                      <p className="text-sm">如果您对系统有任何建议或问题，欢迎通过以下方式联系我们：</p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>电子邮件：contact@longzihu-system.com</li>
                        <li>电话：0371-12345678</li>
                        <li>地址：华北水利水电大学</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
