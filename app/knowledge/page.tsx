import type React from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Video,
  FileText,
  Download,
  ExternalLink,
  ThumbsUp,
  MessageSquare,
  Clock,
  Droplets,
  CloudRain,
  AlertTriangle,
} from "lucide-react"

export default function KnowledgePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-blue-500" />
              水雨知识科普
            </h1>
            <p className="text-muted-foreground">了解关于水资源、降水和防汛的知识</p>
          </div>

          <Tabs defaultValue="videos" className="w-full">
            <TabsList>
              <TabsTrigger value="videos">视频教程</TabsTrigger>
              <TabsTrigger value="articles">科普文章</TabsTrigger>
              <TabsTrigger value="guides">防汛指南</TabsTrigger>
              <TabsTrigger value="resources">资源下载</TabsTrigger>
            </TabsList>

            <TabsContent value="videos" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <VideoCard
                  title="暴雨天气自救指南"
                  description="本视频详细介绍了在暴雨天气中如何保护自己和家人的安全，包括家庭防汛准备、紧急避险和自救互救技巧。"
                  thumbnail="/placeholder.svg?height=200&width=400"
                  duration="15:24"
                  views="2.5万"
                  date="2023-06-15"
                  tags={["防汛", "自救", "安全"]}
                />

                <VideoCard
                  title="城市内涝形成原因与防范"
                  description="深入分析城市内涝的形成机制、影响因素以及有效的防范措施，帮助市民了解城市排水系统和应对内涝的方法。"
                  thumbnail="/placeholder.svg?height=200&width=400"
                  duration="18:36"
                  views="1.8万"
                  date="2023-07-22"
                  tags={["内涝", "城市", "防范"]}
                />

                <VideoCard
                  title="水资源保护与可持续利用"
                  description="探讨水资源的重要性、当前面临的挑战以及可持续利用的策略，倡导公众参与水资源保护。"
                  thumbnail="/placeholder.svg?height=200&width=400"
                  duration="22:15"
                  views="1.2万"
                  date="2023-08-10"
                  tags={["水资源", "保护", "可持续"]}
                />

                <VideoCard
                  title="降雨量监测技术与应用"
                  description="介绍现代降雨量监测的技术手段、数据分析方法以及在防汛减灾中的应用，展示智能监测系统的工作原理。"
                  thumbnail="/placeholder.svg?height=200&width=400"
                  duration="20:48"
                  views="9,500"
                  date="2023-09-05"
                  tags={["监测", "技术", "应用"]}
                />

                <VideoCard
                  title="暴雨预警信号与应对措施"
                  description="详细解读暴雨预警信号的等级、含义以及对应的应对措施，帮助公众正确理解预警信息并采取适当行动。"
                  thumbnail="/placeholder.svg?height=200&width=400"
                  duration="12:30"
                  views="1.5万"
                  date="2023-05-20"
                  tags={["预警", "应对", "安全"]}
                />

                <VideoCard
                  title="河流水位监测与洪水预报"
                  description="讲解河流水位监测系统的工作原理、数据收集与分析方法，以及如何利用这些数据进行洪水预报和防范。"
                  thumbnail="/placeholder.svg?height=200&width=400"
                  duration="25:10"
                  views="8,200"
                  date="2023-10-12"
                  tags={["水位", "监测", "预报"]}
                />
              </div>
            </TabsContent>

            <TabsContent value="articles" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ArticleCard
                  title="城市排水系统的工作原理与挑战"
                  description="本文详细介绍了现代城市排水系统的设计原理、组成部分以及面临的主要挑战，探讨如何提升城市防洪排涝能力。"
                  author="张水利 教授"
                  date="2023-08-15"
                  readTime="10分钟"
                  tags={["排水系统", "城市规划", "防洪"]}
                  icon={<Droplets className="h-5 w-5 text-blue-500" />}
                />

                <ArticleCard
                  title="暴雨天气中的安全行为指南"
                  description="暴雨天气可能带来多种安全隐患，本文提供了全面的安全行为指南，包括出行安全、家庭防护和紧急情况处理。"
                  author="李安全 专家"
                  date="2023-07-10"
                  readTime="8分钟"
                  tags={["安全", "暴雨", "指南"]}
                  icon={<AlertTriangle className="h-5 w-5 text-yellow-500" />}
                />

                <ArticleCard
                  title="降水量监测技术的发展与应用"
                  description="从传统雨量计到现代雷达和卫星遥感，本文回顾了降水量监测技术的发展历程，并探讨了其在气象预报和防灾减灾中的应用。"
                  author="王气象 研究员"
                  date="2023-09-22"
                  readTime="15分钟"
                  tags={["监测技术", "气象", "应用"]}
                  icon={<CloudRain className="h-5 w-5 text-blue-500" />}
                />

                <ArticleCard
                  title="水资源保护与可持续发展"
                  description="水资源是人类生存和发展的基础，本文分析了当前水资源面临的挑战，并提出了保护和可持续利用的策略与方法。"
                  author="陈环保 博士"
                  date="2023-10-05"
                  readTime="12分钟"
                  tags={["水资源", "可持续", "保护"]}
                  icon={<Droplets className="h-5 w-5 text-green-500" />}
                />

                <ArticleCard
                  title="洪水预警系统的原理与重要性"
                  description="洪水预警系统是防洪减灾的重要工具，本文介绍了其工作原理、关键组成部分以及在减轻洪灾损失中的重要作用。"
                  author="赵防汛 工程师"
                  date="2023-06-18"
                  readTime="9分钟"
                  tags={["预警系统", "洪水", "防灾"]}
                  icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
                />

                <ArticleCard
                  title="气候变化对降水模式的影响"
                  description="气候变化正在改变全球降水模式，本文基于最新研究，分析了这些变化的趋势、原因及其对水资源管理和防灾的影响。"
                  author="刘气候 教授"
                  date="2023-11-12"
                  readTime="14分钟"
                  tags={["气候变化", "降水", "研究"]}
                  icon={<CloudRain className="h-5 w-5 text-purple-500" />}
                />
              </div>
            </TabsContent>

            <TabsContent value="guides" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GuideCard
                  title="家庭防汛应急准备指南"
                  description="详细介绍家庭防汛的物资准备、安全措施和应急预案，帮助家庭提前做好防汛准备。"
                  level="基础"
                  icon={<Droplets className="h-6 w-6 text-blue-500" />}
                />

                <GuideCard
                  title="暴雨天气出行安全指南"
                  description="提供暴雨天气出行的安全建议，包括交通工具选择、路线规划和紧急情况处理。"
                  level="基础"
                  icon={<AlertTriangle className="h-6 w-6 text-yellow-500" />}
                />

                <GuideCard
                  title="城市内涝自救互救技巧"
                  description="介绍在城市内涝情况下的自救互救方法，包括安全避险、求救信号和基本救援技能。"
                  level="中级"
                  icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
                />

                <GuideCard
                  title="防汛物资储备清单"
                  description="提供全面的防汛物资清单，包括必备物品、数量建议和储存方法，适合家庭和社区参考。"
                  level="基础"
                  icon={<FileText className="h-6 w-6 text-green-500" />}
                />

                <GuideCard
                  title="洪水预警信号解读"
                  description="详细解读各级洪水预警信号的含义、发布条件和相应的防范措施，帮助公众正确理解预警信息。"
                  level="中级"
                  icon={<AlertTriangle className="h-6 w-6 text-orange-500" />}
                />

                <GuideCard
                  title="防汛减灾知识问答"
                  description="以问答形式整理常见的防汛减灾知识，涵盖预防、应对和恢复等各个阶段的关键问题。"
                  level="基础"
                  icon={<FileText className="h-6 w-6 text-purple-500" />}
                />
              </div>
            </TabsContent>

            <TabsContent value="resources" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  title="防汛应急手册"
                  description="全面的防汛应急指南，包含预警信息解读、安全避险、自救互救等内容，适合家庭和社区使用。"
                  type="PDF"
                  size="2.5MB"
                  downloads="3,245"
                  date="2023-05-15"
                />

                <ResourceCard
                  title="暴雨灾害防范宣传海报"
                  description="一套高清暴雨灾害防范宣传海报，适合学校、社区和公共场所张贴，提高公众防灾意识。"
                  type="ZIP"
                  size="15MB"
                  downloads="1,876"
                  date="2023-06-20"
                />

                <ResourceCard
                  title="水情监测数据分析工具"
                  description="用于分析和可视化水情监测数据的工具软件，支持多种数据格式和分析方法，适合专业人员使用。"
                  type="EXE"
                  size="45MB"
                  downloads="985"
                  date="2023-08-10"
                />

                <ResourceCard
                  title="防汛知识PPT模板"
                  description="一套精美的防汛知识PPT模板，包含多种主题和版式，适合教育培训和宣传活动使用。"
                  type="PPTX"
                  size="8MB"
                  downloads="2,134"
                  date="2023-07-05"
                />

                <ResourceCard
                  title="城市内涝风险评估手册"
                  description="详细介绍城市内涝风险评估的方法、指标和流程，适合城市规划和防灾减灾工作参考。"
                  type="PDF"
                  size="4.2MB"
                  downloads="1,245"
                  date="2023-09-18"
                />

                <ResourceCard
                  title="水资源保护教育视频集"
                  description="一套水资源保护主题的教育视频，适合学校环保教育和公众宣传活动使用。"
                  type="MP4"
                  size="650MB"
                  downloads="756"
                  date="2023-10-25"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

interface VideoCardProps {
  title: string
  description: string
  thumbnail: string
  duration: string
  views: string
  date: string
  tags: string[]
}

function VideoCard({ title, description, thumbnail, duration, views, date, tags }: VideoCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img src={thumbnail || "/placeholder.svg"} alt={title} className="w-full h-[200px] object-cover" />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">{duration}</div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Video className="h-3 w-3" />
            <span>{views}次观看</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{date}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full">观看视频</Button>
      </CardFooter>
    </Card>
  )
}

interface ArticleCardProps {
  title: string
  description: string
  author: string
  date: string
  readTime: string
  tags: string[]
  icon: React.ReactNode
}

function ArticleCard({ title, description, author, date, readTime, tags, icon }: ArticleCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
        <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
          <div>{author}</div>
          <div className="flex items-center gap-2">
            <span>{date}</span>
            <span>·</span>
            <span>{readTime}阅读</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
            <ThumbsUp className="h-3 w-3" />
            <span>有用</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            <span>评论</span>
          </Button>
        </div>
        <Button variant="outline" size="sm">
          阅读全文
        </Button>
      </CardFooter>
    </Card>
  )
}

interface GuideCardProps {
  title: string
  description: string
  level: "基础" | "中级" | "高级"
  icon: React.ReactNode
}

function GuideCard({ title, description, level, icon }: GuideCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          {icon}
          <Badge
            variant="outline"
            className={
              level === "基础"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : level === "中级"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
            }
          >
            {level}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full">查看指南</Button>
      </CardFooter>
    </Card>
  )
}

interface ResourceCardProps {
  title: string
  description: string
  type: string
  size: string
  downloads: string
  date: string
}

function ResourceCard({ title, description, type, size, downloads, date }: ResourceCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="outline">{type}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div>文件大小: {size}</div>
          <div>下载次数: {downloads}</div>
          <div>更新日期: {date}</div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <ExternalLink className="h-4 w-4" />
          <span>预览</span>
        </Button>
        <Button className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          <span>下载</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
