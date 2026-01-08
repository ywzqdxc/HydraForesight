"use client"
import type React from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Suspense, useEffect, useState } from "react"
import {
  BookOpen,
  Video,
  FileText,
  Download,
  ThumbsUp,
  MessageSquare,
  Droplets,
  CloudRain,
  AlertTriangle,
  Eye,
} from "lucide-react"
import { floodGuideApi, knowledgeResourceApi, type FloodGuide, type KnowledgeResource } from "@/lib/api/knowledge"
import { toast } from "sonner"

// 自定义 Hook：useQueryString
function useQueryString(name: string) {
  const [value, setValue] = useState<string | null>(null)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search)
      setValue(searchParams.get(name))
    }
  }, [name])
  if (value === null) {
    return "videos"
  } else {
    return value
  }
}

function processStringOrNull(value: string | null): string | undefined {
  console.log(value)
  if (value === null) {
    return "videos"
  } else {
    return value
  }
}

export default function KnowledgePage() {
  const tabDefaultValue = processStringOrNull(useQueryString("tab"))
  const [floodGuides, setFloodGuides] = useState<FloodGuide[]>([])
  const [resources, setResources] = useState<KnowledgeResource[]>([])
  const [selectedGuide, setSelectedGuide] = useState<FloodGuide | null>(null)
  const [guideDialogOpen, setGuideDialogOpen] = useState(false)

  useEffect(() => {
    loadFloodGuides()
    loadResources()
  }, [])

  const loadFloodGuides = async () => {
    try {
      console.log("[v0] 开始加载防汛指南...")
      const guides = await floodGuideApi.getPublished()
      console.log("[v0] 防汛指南加载成功:", guides)
      setFloodGuides(guides)
    } catch (error) {
      console.error("[v0] 加载防汛指南失败:", error)
    }
  }

  const loadResources = async () => {
    try {
      console.log("[v0] 开始加载资源...")
      const resources = await knowledgeResourceApi.getPublished()
      console.log("[v0] 资源加载成功:", resources)
      setResources(resources)
    } catch (error) {
      console.error("[v0] 加载资源失败:", error)
    }
  }

  const handleViewGuide = async (guide: FloodGuide) => {
    try {
      await floodGuideApi.incrementView(guide.id)
      const detail = await floodGuideApi.getById(guide.id)
      setSelectedGuide(detail)
      setGuideDialogOpen(true)
    } catch (error) {
      toast.error("加载指南详情失败")
    }
  }

  const handleDownloadResource = async (resource: KnowledgeResource) => {
    try {
      await knowledgeResourceApi.incrementDownload(resource.id)
      window.open(resource.fileUrl, "_blank")
      toast.success("开始下载")
    } catch (error) {
      toast.error("下载失败")
    }
  }

  const handlePreviewResource = async (resource: KnowledgeResource) => {
    try {
      await knowledgeResourceApi.incrementView(resource.id)
      // PDF和图片可以预览，其他类型直接下载
      const previewableTypes = ["PDF", "JPG", "JPEG", "PNG", "GIF"]
      if (previewableTypes.includes(resource.fileType.toUpperCase())) {
        window.open(resource.fileUrl, "_blank")
      } else {
        toast.info("该文件类型不支持预览，将直接下载")
        handleDownloadResource(resource)
      }
    } catch (error) {
      toast.error("预览失败")
    }
  }

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
            <p className="text-muted-foreground">了解关于降水和防汛的知识</p>
            <div id="tabtab-container"></div>
          </div>
          <Suspense fallback={<div>Loading</div>}>
            <Tabs defaultValue={tabDefaultValue} className="w-full">
              <TabsList>
                <TabsTrigger value="videos">视频教程</TabsTrigger>
                <TabsTrigger value="articles">科普文章</TabsTrigger>
                <TabsTrigger value="guides">防汛指南</TabsTrigger>
                <TabsTrigger value="resources">资源下载</TabsTrigger>
              </TabsList>

              <TabsContent value="videos" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <VideoCard
                    title="什么是洪涝灾害"
                    description="洪涝是大雨、暴雨或持续降水使低洼地区淹没、渍水的现象。最为常见而且影响较大的是发生在江河流域的大洪水和涝渍，由于洪水和涝渍往往同时或连续发生在同一地区，大多难以准确界定区别，所以统称为洪涝灾害。"
                    thumbnail="//player.bilibili.com/player.html?isOutside=true&aid=925955023&bvid=BV1DT4y1E7sY&cid=200176360&p=1&autoplay=false"
                    duration="01:26"
                    views="1.8万"
                    date="2025-12-21"
                    tags={["防汛", "自救", "安全"]}
                    url="https://b23.tv/9AuRO67"
                  />

                  <VideoCard
                    title="洪涝是怎么形成的"
                    description="受持续强降水影响，河南多地发生区域性严重洪涝灾害，其中郑州市区内涝严重。那洪涝是怎么形成的？"
                    thumbnail="//player.bilibili.com/player.html?isOutside=true&aid=889358414&bvid=BV1RP4y147dR&cid=374020761&p=1&autoplay=false"
                    duration="00:52"
                    views="2.3万"
                    date="2025-12-26"
                    tags={["内涝", "城市", "防范"]}
                    url="https://b23.tv/3Q3X2jt"
                  />

                  <VideoCard
                    title="强降雨天气如何避险"
                    description="短时强降雨极易形成洪涝灾害，遇到危险情况怎么办？跟着山东省威海市应急管理局卡通形象IP“应急侠”，学习强降雨天气如何安全避险吧。"
                    thumbnail="//player.bilibili.com/player.html?isOutside=true&aid=642897467&bvid=BV1gY4y1n7h1&cid=758001502&p=1&p=1&autoplay=false"
                    duration="03:11"
                    views="4867"
                    date="2025-12-29"
                    tags={["强降雨", "安全", "避险"]}
                    url="https://b23.tv/WktSoN2"
                  />

                  <VideoCard
                    title="遇到洪涝如何自救"
                    description="汛期来临,遇到洪涝就要这样自救。"
                    thumbnail="//vdse.bdstatic.com//5275d8254407852c6e820d11a814569d.mp4?authorization=bce-auth-v1%2F40f207e648424f47b2e3dfbb1014b1a5%2F2025-07-31T07%3A21%3A26Z%2F-1%2Fhost%2Ffc65f5dcdba7b31a554cfd41b406b32d958b7892fcfb966bdcc386a16b326efb&vid=10609098371664430648"
                    duration="02:17"
                    views="1541"
                    date="2026-01-02"
                    tags={["洪涝", "自救", "安全"]}
                    url="https://me.mbd.baidu.com/r/1ABm5zffphC?f=cp&rs=2982426813&ruk=OI4aJgrGlEnbBxYqMbx_Pg&u=cc117a5ce1d07a4b"
                  />

                  <VideoCard
                    title="城市内涝的成因"
                    description="详细解读暴雨预警信号的等级、含义以及对应的应对措施，帮助公众正确理解预警信息并采取适当行动。"
                    thumbnail="//player.bilibili.com/player.html?isOutside=true&aid=958676827&bvid=BV19p4y1c7Dm&cid=1271618103&p=1&autoplay=false"
                    duration="03:43"
                    views="3071"
                    date="2026-01-04"
                    tags={["预警", "应对", "安全"]}
                    url="https://b23.tv/O9etCTj"
                  />

                  <VideoCard
                    title="城市内涝与排水系统的关系"
                    description="每年汛期，城市内涝都是热议话题，今年，河南遭遇极端降雨灾害，城市被淹没，网络上再一次充满了对我国排水系统的质疑声。我想你也好奇，我国的排水系统相比国外真的很落后吗？城市内涝到底是怎么发生的呢？所以我们制作了本期内容，带你全面了解我国排水系统的设计标准，和运转原理~"
                    thumbnail="//player.bilibili.com/player.html?isOutside=true&aid=462696903&bvid=BV1iL41147Rm&cid=400769622&p=1&autoplay=false"
                    duration="14:44"
                    views="23.1万"
                    date="2026-01-06"
                    tags={["水位", "监测", "预报"]}
                    url="https://b23.tv/XKcmbtY"
                  />
                </div>
              </TabsContent>

              <TabsContent value="articles" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ArticleCard
                    title="城市排水系统的工作原理与挑战"
                    description="本文介绍了城市排水系统的工作原理与挑战。"
                    author="兴合排水"
                    date="2025-12-20"
                    readTime="10分钟"
                    tags={["排水系统", "城市规划", "防洪"]}
                    icon={<Droplets className="h-5 w-5 text-blue-500" />}
                    url="https://www.zhihu.com/question/642929561/answer/3405226384?utm_psn=1891883758031991684"
                  />

                  <ArticleCard
                    title="降水量监测技术的发展与应用"
                    description="雨水情监测系统是一项关键的科技应用，通过数据分析和实时监测，能够提供准确的雨水情况预警和水资源管理方案。本文将探讨雨水情监测系统的技术应用和未来发展展望，带您了解这一系统的重要性及其在环境保护和资源管理方面的潜力。"
                    author="北斗产业资讯平台"
                    date="2025-12-25"
                    readTime="2分钟"
                    tags={["雨水", "暴雨", "展望"]}
                    icon={<AlertTriangle className="h-5 w-5 text-yellow-500" />}
                    url="https://www.qxwz.com/zixun/655220215"
                  />

                  <ArticleCard
                    title="暴雨天气中的安全行为指南"
                    description="在生活中，暴雨天气的到来往往打乱人们的日常节奏。诸如出行、工作及社交活动等都受到影响，甚至可能危及生命安全。因此，在暴雨来临之际，出行安全显得尤为重要。尤其在积水严重的情况下，如何保护自己、确保安全出行成为每个人必须面对的课题。本文将为步行者、骑行者和驾车者提供实用的安全指南，帮助大家在极端天气中保持警觉，确保平安出行。"
                    author="知识璞玉"
                    date="2025-12-28"
                    readTime="15分钟"
                    tags={["监测技术", "气象", "应用"]}
                    icon={<CloudRain className="h-5 w-5 text-blue-500" />}
                    url="https://m.sohu.com/coo/sg/820654678_121956422"
                  />

                  <ArticleCard
                    title="水资源保护与可持续发展"
                    description="水资源是地球上宝贵的自然资源，对人类的生存和发展具有不可替代的作用。然而，随着人口增长、经济发展和城市化进程的加速，水资源面临着日益严峻的挑战。为了确保水资源的可持续利用，需要采取一系列策略和技术，包括水资源保护与生态修复、水资源高效利用技术和水资源管理与政策制定。"
                    author="李剑超 教授"
                    date="2026-01-01"
                    readTime="12分钟"
                    tags={["水资源", "可持续", "保护"]}
                    icon={<Droplets className="h-5 w-5 text-green-500" />}
                    url="https://m.sohu.com/coo/sg/731766233_121719025"
                  />

                  <ArticleCard
                    title="洪水预警系统的原理与重要性"
                    description="水乃生命之源，其力有两面性。河、湖、库水位变与生活相关，存风险。往昔缺有效监测，水位骤变致洪旱灾害，威胁生命财产与社会经济。如暴雨区难知水位，洪水毁堤淹田房；干旱时未觉水位低影响灌溉。随科技进，水位自动监测预警系统现，为保水域安全、合理用水及应灾重要工具。"
                    author="武汉德希科技有限公司"
                    date="2026-01-05"
                    readTime="9分钟"
                    tags={["预警系统", "洪水", "防灾"]}
                    icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
                    url="https://m.sohu.com/coo/sg/820275397_121766550"
                  />

                  <ArticleCard
                    title="气候变化对降水模式的影响"
                    description="如今，我国正在面临着严峻的生态环境发展困境与趋势，这饿就直接地导致我国经济发展与自然环保的失衡。
                  而本文分析气候变化对水文水资源影响研究方法的基础上，分析了水文水资源等因素的影响，旨在介绍中国水文水资源系统的进展，方法和技术和优势，并分析水温变暖的影响结果在中国水文水资源系统。"
                    author="厉羽萱"
                    date="2026-01-08"
                    readTime="14分钟"
                    tags={["气候变化", "降水", "研究"]}
                    icon={<CloudRain className="h-5 w-5 text-purple-500" />}
                    url="https://m.163.com/dy/article_v2/IFM5TMR70543QP26.html"
                  />
                </div>
              </TabsContent>

              <TabsContent value="guides" className="mt-4">
                {floodGuides.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>暂无防汛指南数据</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {floodGuides.map((guide) => (
                      <GuideCard
                        key={guide.id}
                        guide={guide}
                        onView={() => handleViewGuide(guide)}
                        icon={getGuideIcon(guide.guideLevel)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="resources" className="mt-4">
                {resources.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Download className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>暂无资源下载数据</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {resources.map((resource) => (
                      <ResourceCard
                        key={resource.id}
                        resource={resource}
                        onPreview={() => handlePreviewResource(resource)}
                        onDownload={() => handleDownloadResource(resource)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Suspense>
        </div>
      </main>

      <Dialog open={guideDialogOpen} onOpenChange={setGuideDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedGuide?.title}</DialogTitle>
            <DialogDescription>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getLevelColor(selectedGuide?.guideLevel || 1)}>{selectedGuide?.guideLevelName}</Badge>
                <span className="text-sm">浏览: {selectedGuide?.viewCount}</span>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">描述</h4>
              <p className="text-sm text-muted-foreground">{selectedGuide?.description}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">内容</h4>
              <div className="text-sm whitespace-pre-wrap bg-muted p-4 rounded-lg">{selectedGuide?.content}</div>
            </div>
            {selectedGuide?.tags && (
              <div>
                <h4 className="font-medium mb-2">标签</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedGuide.tags.split(",").map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setGuideDialogOpen(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
  url: string
}

function VideoCard({ title, description, thumbnail, duration, views, date, tags, url }: VideoCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <iframe
          src={thumbnail || "/placeholder.svg"}
          className="mx-auto max-w-[410px] w-full h-[200px] object-cover"
        ></iframe>

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
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full" onClick={() => clickHandler(url)}>
          观看视频
        </Button>
      </CardFooter>
    </Card>
  )
}

const clickHandler = (name: string) => {
  window.location.href = name
}

interface ArticleCardProps {
  title: string
  description: string
  author: string
  date: string
  readTime: string
  tags: string[]
  icon: React.ReactNode
  url: string
}

function ArticleCard({ title, description, author, date, readTime, tags, icon, url }: ArticleCardProps) {
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
        <Button variant="outline" size="sm" onClick={() => clickHandler(url)}>
          阅读全文
        </Button>
      </CardFooter>
    </Card>
  )
}

interface GuideCardProps {
  guide: FloodGuide
  onView: () => void
  icon: React.ReactNode
}

function GuideCard({ guide, onView, icon }: GuideCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          {icon}
          <Badge className={getLevelColor(guide.guideLevel)}>{guide.guideLevelName}</Badge>
        </div>
        <CardTitle className="text-lg mt-2">{guide.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{guide.description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full" onClick={onView}>
          查看指南
        </Button>
      </CardFooter>
    </Card>
  )
}

interface ResourceCardProps {
  resource: KnowledgeResource
  onPreview: () => void
  onDownload: () => void
}

function ResourceCard({ resource, onPreview, onDownload }: ResourceCardProps) {
  const previewableTypes = ["PDF", "JPG", "JPEG", "PNG", "GIF"]
  const canPreview = previewableTypes.includes(resource.fileType.toUpperCase())

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{resource.title}</CardTitle>
          <Badge variant="outline">{resource.fileType}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div>文件大小: {resource.fileSizeText}</div>
          <div>下载: {resource.downloadCount}次</div>
          <div>{new Date(resource.publishTime).toLocaleDateString()}</div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        {canPreview ? (
          <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent" onClick={onPreview}>
            <Eye className="h-4 w-4" />
            <span>预览</span>
          </Button>
        ) : (
          <div className="text-xs text-muted-foreground">不支持预览</div>
        )}
        <Button className="flex items-center gap-1" onClick={onDownload}>
          <Download className="h-4 w-4" />
          <span>下载</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

function getGuideIcon(level: number) {
  switch (level) {
    case 1:
      return <Droplets className="h-6 w-6 text-blue-500" />
    case 2:
      return <AlertTriangle className="h-6 w-6 text-yellow-500" />
    case 3:
      return <AlertTriangle className="h-6 w-6 text-red-500" />
    default:
      return <FileText className="h-6 w-6 text-gray-500" />
  }
}

function getLevelColor(level: number) {
  switch (level) {
    case 1:
      return "bg-green-100 text-green-800"
    case 2:
      return "bg-yellow-100 text-yellow-800"
    case 3:
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
