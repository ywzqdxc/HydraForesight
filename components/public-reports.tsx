"use client"

import { useState, useEffect } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import {
  pageReports,
  createReport,
  upvoteReport,
  getProcessRecords,
  type PublicReport as ApiReport,
  type CreateReportRequest,
} from "@/lib/api/report"

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
  const [allReports, setAllReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [processRecords, setProcessRecords] = useState<any[]>([])

  useEffect(() => {
    loadReports()
  }, [selectedType])

  const loadReports = async () => {
    setLoading(true)
    try {
      const response = await pageReports({
        reportType: selectedType === "all" ? undefined : getReportTypeValue(selectedType),
        current: 1,
        size: 100,
      })
      if (response.code === 200 && response.data) {
        const reports: Report[] = response.data.records.map(convertApiReportToLocal)
        setAllReports(reports)
      }
    } catch (error) {
      console.error("加载上报数据失败", error)
    } finally {
      setLoading(false)
    }
  }

  const convertApiReportToLocal = (apiReport: ApiReport): Report => {
    return {
      id: String(apiReport.id),
      type: getReportTypeKey(apiReport.reportType),
      title: apiReport.title,
      location: apiReport.locationName,
      description: apiReport.content,
      time: apiReport.reportTime,
      status: apiReport.verifyStatus === 1 ? "verified" : "unverified",
      severity: getSeverityKey(apiReport.severity),
      upvotes: apiReport.upvoteCount,
    }
  }

  const getReportTypeKey = (type: number): Exclude<ReportType, "all"> => {
    switch (type) {
      case 1:
        return "flooding"
      case 2:
        return "rainfall"
      case 3:
        return "traffic"
      case 4:
        return "disaster"
      default:
        return "other"
    }
  }

  const getReportTypeValue = (type: ReportType): number | undefined => {
    switch (type) {
      case "flooding":
        return 1
      case "rainfall":
        return 2
      case "traffic":
        return 3
      case "disaster":
        return 4
      case "other":
        return 5
      default:
        return undefined
    }
  }

  const getSeverityKey = (severity: number): "high" | "medium" | "low" => {
    switch (severity) {
      case 3:
        return "high"
      case 2:
        return "medium"
      default:
        return "low"
    }
  }

  const getSeverityValue = (severity: "high" | "medium" | "low"): number => {
    switch (severity) {
      case "high":
        return 3
      case "medium":
        return 2
      default:
        return 1
    }
  }

  const handleSubmitReport = async () => {
    if (!newReport.title || !newReport.location || !newReport.description) {
      return
    }

    setLoading(true)
    try {
      const request: CreateReportRequest = {
        reportType: getReportTypeValue(newReport.type)!,
        title: newReport.title,
        content: newReport.description,
        locationName: newReport.location,
        severity: getSeverityValue(newReport.severity),
      }

      const response = await createReport(request)
      if (response.code === 200) {
        setIsSubmitReportOpen(false)
        setShowSubmitSuccess(true)

        setTimeout(() => {
          setShowSubmitSuccess(false)
        }, 3000)

        // 重新加载数据
        await loadReports()

        // 重置表单
        setNewReport({
          type: "flooding",
          title: "",
          location: "",
          description: "",
          severity: "medium",
        })
      }
    } catch (error) {
      console.error("提交上报失败", error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetail = async (report: Report) => {
    setSelectedReport(report)
    setShowDetailDialog(true)

    // 加载处理记录
    try {
      const response = await getProcessRecords(Number(report.id))
      if (response.code === 200 && response.data) {
        setProcessRecords(response.data)
      }
    } catch (error) {
      console.error("加载处理记录失败", error)
    }
  }

  const handleUpvote = async (reportId: string) => {
    try {
      await upvoteReport(Number(reportId))
      // 重新加载数据
      await loadReports()
    } catch (error) {
      console.error("点赞失败", error)
    }
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
                  <Textarea
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
          <div className="mb-4 bg-green-50 border border-green-200 text-green-800 rounded-md p-4 flex items-center">
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
              {loading ? (
                <div className="text-center py-8">加载中...</div>
              ) : filteredReports.length > 0 ? (
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
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={() => handleUpvote(report.id)}
                              >
                                <AlertTriangle className="mr-1 h-3 w-3" />
                                {report.upvotes} 人已上报
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs bg-transparent"
                                onClick={() => handleViewDetail(report)}
                              >
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
              {loading ? (
                <div className="text-center py-8">加载中...</div>
              ) : filteredReports.filter((r) => r.status === "verified").length > 0 ? (
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
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 text-xs"
                                  onClick={() => handleUpvote(report.id)}
                                >
                                  <AlertTriangle className="mr-1 h-3 w-3" />
                                  {report.upvotes} 人已上报
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 text-xs bg-transparent"
                                  onClick={() => handleViewDetail(report)}
                                >
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
              {loading ? (
                <div className="text-center py-8">加载中...</div>
              ) : filteredReports.filter((r) => r.status === "unverified").length > 0 ? (
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
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 text-xs"
                                  onClick={() => handleUpvote(report.id)}
                                >
                                  <AlertTriangle className="mr-1 h-3 w-3" />
                                  {report.upvotes} 人已上报
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 text-xs bg-transparent"
                                  onClick={() => handleViewDetail(report)}
                                >
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

        <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>上报详情</DialogTitle>
            </DialogHeader>
            {selectedReport && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(selectedReport.type)}
                    <h3 className="font-semibold text-lg">{selectedReport.title}</h3>
                    {getSeverityBadge(selectedReport.severity)}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-4">
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {selectedReport.location}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {selectedReport.time}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">详细描述</h4>
                  <p className="text-sm text-muted-foreground">{selectedReport.description}</p>
                </div>

                {processRecords.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">处理记录</h4>
                    <div className="space-y-3">
                      {processRecords.map((record) => (
                        <div key={record.id} className="border rounded-lg p-3 bg-muted/30">
                          <div className="flex items-start justify-between mb-1">
                            <Badge variant="outline">{record.processTypeName}</Badge>
                            <span className="text-xs text-muted-foreground">{record.processTime}</span>
                          </div>
                          <p className="text-sm mb-1">{record.processContent}</p>
                          <div className="text-xs text-muted-foreground">
                            处理人：{record.processorName} {record.processorDept && `(${record.processorDept})`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">刷新数据</Button>
        <Button>查看全部上报</Button>
      </CardFooter>
    </Card>
  )
}
