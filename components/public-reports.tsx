"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertTriangle,
  ChevronDown,
  Filter,
  MapPin,
  Search,
  Droplets,
  CloudRain,
  Car,
  AlertCircle,
  Clock,
  CheckCircle2,
  Plus,
  ArrowUpDown,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 上报类型
type ReportType = "all" | "flooding" | "rainfall" | "traffic" | "disaster" | "other"

// 上报状态
type ReportStatus = "all" | "verified" | "unverified"

// 上报信息接口
interface Report {
  id: string
  type: Exclude<ReportType, "all">
  title: string
  location: string
  description: string
  time: string
  status: "verified" | "unverified"
  severity?: "high" | "medium" | "low"
  images?: string[]
  upvotes: number
}

export default function PublicReports() {
    // 状态管理
  const [activeTab, setActiveTab] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<ReportType>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showVerified, setShowVerified] = useState(true)
  const [showUnverified, setShowUnverified] = useState(true)
  const [sortBy, setSortBy] = useState<"time" | "upvotes">("time")
  const [isSubmitReportOpen, setIsSubmitReportOpen] = useState(false)
  const [newReport, setNewReport] = useState({
    type: "flooding" as Exclude<ReportType, "all">,
    title: "",
    location: "",
    description: "",
    severity: "medium" as "high" | "medium" | "low",
  })
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false)

  // 模拟上报数据
  // const allReports: Report[] = [
  const [allReports, setAllReports] = useState<Report[]>([
    {
      id: "1",
      type: "flooding",
      title: "嘉州大道严重积水",
      location: "市中区嘉州大道与天星路交叉口",
      description: "道路积水严重，水深约30厘米，小型车辆难以通行，建议绕行。",
      time: "2025-04-24 10:15",
      status: "verified",
      severity: "high",
      upvotes: 15,
    },
    {
      id: "2",
      type: "rainfall",
      title: "持续强降雨",
      location: "市中区月弦坝附近",
      description: "持续强降雨已超过2小时，雨势不减，周边低洼地带开始出现积水。",
      time: "2025-04-16 09:30",
      status: "verified",
      severity: "medium",
      upvotes: 8,
    },
    {
      id: "3",
      type: "traffic",
      title: "道路交通拥堵",
      location: "嘉定北路与柏杨东路交叉口",
      description: "因积水导致交通拥堵，车辆行驶缓慢，预计需等待30分钟以上。",
      time: "2025-04-20 09:45",
      status: "verified",
      severity: "medium",
      upvotes: 12,
    },
    {
      id: "4",
      type: "disaster",
      title: "小区地下车库进水",
      location: "市中区徐家街徐家小区",
      description: "小区地下车库进水严重，水位约20厘米，正在组织车辆撤离。",
      time: "2025-04-24 10:05",
      status: "verified",
      severity: "high",
      upvotes: 18,
    },
    {
      id: "5",
      type: "flooding",
      title: "嘉定北路积水",
      location: "市中区嘉定北路与百福路交叉口",
      description: "道路出现积水，深度约15厘米，车辆可缓慢通行。",
      time: "2025-04-02 09:20",
      status: "verified",
      severity: "low",
      upvotes: 5,
    },
    {
      id: "6",
      type: "rainfall",
      title: "雨势增强",
      location: "沙湾区全域",
      description: "降雨强度明显增加，预计未来1小时雨量将达到30mm以上。",
      time: "2025-04-02 08:50",
      status: "unverified",
      upvotes: 3,
    },
    {
      id: "7",
      type: "traffic",
      title: "信号灯故障",
      location: "市中区龙游路与天星路交叉口",
      description: "交通信号灯因雨水影响出现故障，交警正在现场指挥交通。",
      time: "2025-04-18 09:10",
      status: "unverified",
      upvotes: 7,
    },
    {
      id: "8",
      type: "disaster",
      title: "树木倒伏",
      location: "市中区春华公园北门",
      description: "一棵大树因强风暴雨倒伏，压坏两辆停放的车辆，无人员伤亡。",
      time: "2025-04-21 10:20",
      status: "unverified",
      severity: "medium",
      upvotes: 9,
    },
    {
      id: "9",
      type: "other",
      title: "排水管道堵塞",
      location: "市中区柏杨东路与天星路交叉口",
      description: "排水管道疑似堵塞，路面积水无法及时排出，建议相关部门处理。",
      time: "2025-04-09 09:35",
      status: "unverified",
      upvotes: 6,
    },
    {
      id: "10",
      type: "flooding",
      title: "地下通道积水",
      location: "市中区碧山路地下通道",
      description: "地下通道积水严重，已无法通行，请绕行其他道路。",
      time: "2025-04-02 10:30",
      status: "verified",
      severity: "high",
      upvotes: 20,
    },
    {
      id: "11",
      type: "other",
      title: "雨水口堵塞",
      location: "市中区朝霞路新纪元小区",
      description: "小区北门雨水口堵塞，路面大量积水，影响出行。",
      time: "2025-04-02 10:40",
      status: "unverified",
      upvotes: 11,
    },
    {
      id: "12",
      type: "disaster",
      title: "围墙倒塌",
      location: "市中区竹公溪路建设工地",
      description: "工地临时围墙因强风暴雨部分倒塌，无人员伤亡，已封锁现场。",
      time: "2025-04-17 09:55",
      status: "verified",
      severity: "medium",
      upvotes: 8,
    },
  ])

  // 状态管理
  // const [activeTab, setActiveTab] = useState<string>("all")
  // const [selectedType, setSelectedType] = useState<ReportType>("all")
  // const [searchQuery, setSearchQuery] = useState("")
  // const [showVerified, setShowVerified] = useState(true)
  // const [showUnverified, setShowUnverified] = useState(true)
  // const [sortBy, setSortBy] = useState<"time" | "upvotes">("time")

  // 处理提交上报
  const handleSubmitReport = () => {
    if (!newReport.title || !newReport.location || !newReport.description) {
      return // 简单验证
    }

    // 生成新上报ID
    const newId = String(allReports.length + 1)

    // 创建新上报对象
    const reportToAdd: Report = {
      id: newId,
      type: newReport.type,
      title: newReport.title,
      location: newReport.location,
      description: newReport.description,
      time: new Date().toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "unverified", // 新提交的默认未核实
      severity: newReport.severity,
      upvotes: 1, // 默认1个上报（提交者自己）
    }

    // 添加到上报列表（添加到开头，最新的在前面）
    setAllReports((prev) => [reportToAdd, ...prev])

    // 关闭对话框并显示成功提示
    setIsSubmitReportOpen(false)
    setShowSubmitSuccess(true)

    // 3秒后隐藏成功提示
    setTimeout(() => {
      setShowSubmitSuccess(false)
    }, 3000)

    // 重置表单
    setNewReport({
      type: "flooding",
      title: "",
      location: "",
      description: "",
      severity: "medium",
    })
  }

  // 筛选和排序上报
  const filteredReports = allReports
    .filter((report) => {
      // 类型筛选
      if (selectedType !== "all" && report.type !== selectedType) return false

      // 状态筛选
      if (!showVerified && report.status === "verified") return false
      if (!showUnverified && report.status === "unverified") return false

      // 搜索筛选
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          report.title.toLowerCase().includes(query) ||
          report.location.toLowerCase().includes(query) ||
          report.description.toLowerCase().includes(query)
        )
      }

      return true
    })
    .sort((a, b) => {
      if (sortBy === "time") {
        return new Date(b.time).getTime() - new Date(a.time).getTime()
      } else {
        return b.upvotes - a.upvotes
      }
    })

  // 获取上报类型图标
  const getTypeIcon = (type: Exclude<ReportType, "all">) => {
    switch (type) {
      case "flooding":
        return <Droplets className="h-4 w-4 text-blue-500" />
      case "rainfall":
        return <CloudRain className="h-4 w-4 text-blue-500" />
      case "traffic":
        return <Car className="h-4 w-4 text-orange-500" />
      case "disaster":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-purple-500" />
    }
  }

  // 获取严重程度标签
  const getSeverityBadge = (severity?: "high" | "medium" | "low") => {
    if (!severity) return null

    switch (severity) {
      case "high":
        return (
          <Badge variant="destructive" className="ml-2">
            严重
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="warning" className="ml-2">
            中等
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="ml-2">
            轻微
          </Badge>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>公众参与平台</CardTitle>
            <CardDescription>查看和提交降水相关信息</CardDescription>
          </div>
          <Dialog open={isSubmitReportOpen} onOpenChange={setIsSubmitReportOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" /> 提交新上报
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>提交新上报</DialogTitle>
                <DialogDescription>请填写详细信息帮助我们了解当前情况</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="report-type" className="text-right">
                    上报类型
                  </Label>
                  <Select
                    value={newReport.type}
                    onValueChange={(value) => setNewReport({ ...newReport, type: value as Exclude<ReportType, "all"> })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="选择上报类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flooding">积水情况</SelectItem>
                      <SelectItem value="rainfall">降雨情况</SelectItem>
                      <SelectItem value="traffic">交通状况</SelectItem>
                      <SelectItem value="disaster">灾害情况</SelectItem>
                      <SelectItem value="other">其他情况</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="report-title" className="text-right">
                    标题
                  </Label>
                  <Input
                    id="report-title"
                    value={newReport.title}
                    onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                    className="col-span-3"
                    placeholder="简要描述情况"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="report-location" className="text-right">
                    具体位置
                  </Label>
                  <Input
                    id="report-location"
                    value={newReport.location}
                    onChange={(e) => setNewReport({ ...newReport, location: e.target.value })}
                    className="col-span-3"
                    placeholder="详细地址或标志性建筑"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="report-severity" className="text-right">
                    严重程度
                  </Label>
                  <Select
                    value={newReport.severity}
                    onValueChange={(value) =>
                      setNewReport({ ...newReport, severity: value as "high" | "medium" | "low" })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="选择严重程度" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">严重</SelectItem>
                      <SelectItem value="medium">中等</SelectItem>
                      <SelectItem value="low">轻微</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="report-description" className="text-right mt-2">
                    详细描述
                  </Label>
                  <textarea
                    id="report-description"
                    value={newReport.description}
                    onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                    className="col-span-3 min-h-[80px] px-3 py-2 border border-input rounded-md text-sm"
                    placeholder="请详细描述当前情况，包括影响范围、持续时间等"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">取消</Button>
                </DialogClose>
                <Button onClick={handleSubmitReport}>提交上报</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {showSubmitSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
            <span>上报提交成功！感谢您的参与，我们会尽快核实处理。</span>
          </div>
        )}
        <div className="space-y-4">
          {/* 搜索和筛选 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索上报内容..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-[130px] bg-transparent">
                    <Filter className="mr-2 h-4 w-4" />
                    {selectedType === "all"
                      ? "全部类型"
                      : selectedType === "flooding"
                        ? "积水"
                        : selectedType === "rainfall"
                          ? "降雨"
                          : selectedType === "traffic"
                            ? "交通"
                            : selectedType === "disaster"
                              ? "灾害"
                              : "其他"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedType("all")}>全部类型</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedType("flooding")}>
                    <Droplets className="mr-2 h-4 w-4 text-blue-500" />
                    积水
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedType("rainfall")}>
                    <CloudRain className="mr-2 h-4 w-4 text-blue-500" />
                    降雨
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedType("traffic")}>
                    <Car className="mr-2 h-4 w-4 text-orange-500" />
                    交通
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedType("disaster")}>
                    <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
                    灾害
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedType("other")}>
                    <AlertTriangle className="mr-2 h-4 w-4 text-purple-500" />
                    其他
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortBy(sortBy === "time" ? "upvotes" : "time")}
                title={sortBy === "time" ? "按时间排序" : "按热度排序"}
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 状态筛选 */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="verified"
                checked={showVerified}
                onCheckedChange={(checked) => setShowVerified(checked as boolean)}
              />
              <label htmlFor="verified" className="text-sm flex items-center">
                <CheckCircle2 className="mr-1 h-3.5 w-3.5 text-green-500" />
                已核实
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="unverified"
                checked={showUnverified}
                onCheckedChange={(checked) => setShowUnverified(checked as boolean)}
              />
              <label htmlFor="unverified" className="text-sm flex items-center">
                <Clock className="mr-1 h-3.5 w-3.5 text-yellow-500" />
                未核实
              </label>
            </div>
            <div className="text-xs text-muted-foreground">共 {filteredReports.length} 条上报</div>
          </div>

          {/* 上报列表 */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="all">全部上报</TabsTrigger>
              <TabsTrigger value="verified">已核实</TabsTrigger>
              <TabsTrigger value="unverified">未核实</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4 space-y-4">
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">{getTypeIcon(report.type)}</div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium text-sm">{report.title}</h3>
                            {getSeverityBadge(report.severity)}
                            {report.status === "verified" ? (
                              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                已核实
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700 border-yellow-200">
                                <Clock className="mr-1 h-3 w-3" />
                                未核实
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {report.location}
                          </div>
                          <p className="text-sm mt-2">{report.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">{report.time}</span>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-7 text-xs">
                                <AlertTriangle className="mr-1 h-3 w-3" />
                                {report.upvotes} 人已上报
                              </Button>
                              <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                                查看详情
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertTriangle className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>没有找到匹配的上报信息</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="verified" className="mt-4 space-y-4">
              {filteredReports.filter((r) => r.status === "verified").length > 0 ? (
                filteredReports
                  .filter((r) => r.status === "verified")
                  .map((report) => (
                    <div key={report.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">{getTypeIcon(report.type)}</div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium text-sm">{report.title}</h3>
                              {getSeverityBadge(report.severity)}
                              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                已核实
                              </Badge>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {report.location}
                            </div>
                            <p className="text-sm mt-2">{report.description}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-muted-foreground">{report.time}</span>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="h-7 text-xs">
                                  <AlertTriangle className="mr-1 h-3 w-3" />
                                  {report.upvotes} 人已上报
                                </Button>
                                <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                                  查看详情
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle2 className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>没有找到已核实的上报信息</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="unverified" className="mt-4 space-y-4">
              {filteredReports.filter((r) => r.status === "unverified").length > 0 ? (
                filteredReports
                  .filter((r) => r.status === "unverified")
                  .map((report) => (
                    <div key={report.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">{getTypeIcon(report.type)}</div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium text-sm">{report.title}</h3>
                              {getSeverityBadge(report.severity)}
                              <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700 border-yellow-200">
                                <Clock className="mr-1 h-3 w-3" />
                                未核实
                              </Badge>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {report.location}
                            </div>
                            <p className="text-sm mt-2">{report.description}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-muted-foreground">{report.time}</span>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="h-7 text-xs">
                                  <AlertTriangle className="mr-1 h-3 w-3" />
                                  {report.upvotes} 人已上报
                                </Button>
                                <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                                  查看详情
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>没有找到未核实的上报信息</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">刷新数据</Button>
        <Button>查看全部上报</Button>
      </CardFooter>
    </Card>
  )
}

