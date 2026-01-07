"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import {
  pageReports,
  processReportWithRecord,
  getProcessRecords,
  type PublicReport,
  type ReportProcess,
} from "@/lib/api/report"
import { CheckCircle2, Clock, FileText, Loader2, Search, AlertCircle, Filter } from "lucide-react"

export default function ReportManagement() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [reports, setReports] = useState<PublicReport[]>([])
  const [selectedReport, setSelectedReport] = useState<PublicReport | null>(null)
  const [showProcessDialog, setShowProcessDialog] = useState(false)
  const [showRecordsDialog, setShowRecordsDialog] = useState(false)
  const [processRecords, setProcessRecords] = useState<ReportProcess[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [processForm, setProcessForm] = useState({
    processType: 1,
    processContent: "",
    processStatus: 1,
  })

  useEffect(() => {
    loadReports()
  }, [])

  const loadReports = async () => {
    setLoading(true)
    try {
      const response = await pageReports({ current: 1, size: 100 })
      if (response.code === 200 && response.data) {
        setReports(response.data.records)
      }
    } catch (error) {
      toast({
        title: "加载失败",
        description: error instanceof Error ? error.message : "无法加载上报数据",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleProcessReport = (report: PublicReport) => {
    setSelectedReport(report)
    setProcessForm({
      processType: 1,
      processContent: "",
      processStatus: report.processStatus === 0 ? 1 : report.processStatus,
    })
    setShowProcessDialog(true)
  }

  const handleViewRecords = async (report: PublicReport) => {
    setSelectedReport(report)
    try {
      const response = await getProcessRecords(report.id)
      if (response.code === 200 && response.data) {
        setProcessRecords(response.data)
        setShowRecordsDialog(true)
      }
    } catch (error) {
      toast({
        title: "加载失败",
        description: "无法加载处理记录",
        variant: "destructive",
      })
    }
  }

  const handleSubmitProcess = async () => {
    if (!selectedReport || !processForm.processContent) {
      toast({
        title: "提示",
        description: "请填写处理内容",
        variant: "destructive",
      })
      return
    }

    console.log("[v0] Submitting process for report:", selectedReport.id)
    console.log("[v0] Process form data:", processForm)

    try {
      await processReportWithRecord({
        reportId: selectedReport.id,
        processType: processForm.processType,
        processContent: processForm.processContent,
        processStatus: processForm.processStatus,
      })

      toast({
        title: "成功",
        description: "上报处理成功，已创建处理记录",
      })

      setShowProcessDialog(false)
      await loadReports()
    } catch (error) {
      console.error("[v0] Process report error:", error)
      toast({
        title: "处理失败",
        description: error instanceof Error ? error.message : "请重试",
        variant: "destructive",
      })
    }
  }

  const getReportTypeName = (type: number) => {
    const types: Record<number, string> = {
      1: "积水",
      2: "降雨",
      3: "交通",
      4: "灾害",
      5: "其他",
    }
    return types[type] || "未知"
  }

  const getSeverityName = (severity: number) => {
    const severities: Record<number, string> = {
      1: "轻微",
      2: "中等",
      3: "严重",
    }
    return severities[severity] || "未知"
  }

  const getVerifyStatusBadge = (status: number) => {
    if (status === 1) {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          已核实
        </Badge>
      )
    } else if (status === 2) {
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          不属实
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
        <Clock className="mr-1 h-3 w-3" />
        未核实
      </Badge>
    )
  }

  const getProcessStatusBadge = (status: number) => {
    if (status === 2) {
      return <Badge variant="default">已处理</Badge>
    } else if (status === 1) {
      return <Badge variant="secondary">处理中</Badge>
    } else if (status === 3) {
      return <Badge variant="outline">已关闭</Badge>
    }
    return <Badge variant="destructive">待处理</Badge>
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      searchQuery === "" ||
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.locationName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "pending" && report.processStatus === 0) ||
      (statusFilter === "processing" && report.processStatus === 1) ||
      (statusFilter === "processed" && report.processStatus === 2)

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索标题或位置..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="pending">待处理</SelectItem>
              <SelectItem value="processing">处理中</SelectItem>
              <SelectItem value="processed">已处理</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-muted-foreground">共 {filteredReports.length} 条上报</div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>上报ID</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>标题</TableHead>
              <TableHead>位置</TableHead>
              <TableHead>严重程度</TableHead>
              <TableHead>核实状态</TableHead>
              <TableHead>处理状态</TableHead>
              <TableHead>上报时间</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                  暂无上报数据
                </TableCell>
              </TableRow>
            ) : (
              filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-mono text-xs">{report.reportId}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{getReportTypeName(report.reportType)}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{report.title}</TableCell>
                  <TableCell className="max-w-[150px] truncate">{report.locationName}</TableCell>
                  <TableCell>
                    <Badge
                      variant={report.severity === 3 ? "destructive" : report.severity === 2 ? "secondary" : "outline"}
                    >
                      {getSeverityName(report.severity)}
                    </Badge>
                  </TableCell>
                  <TableCell>{getVerifyStatusBadge(report.verifyStatus)}</TableCell>
                  <TableCell>{getProcessStatusBadge(report.processStatus)}</TableCell>
                  <TableCell className="text-sm">{report.reportTime}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewRecords(report)}
                        title="查看处理记录"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="default" onClick={() => handleProcessReport(report)} title="处理上报">
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* 处理上报对话框 */}
      <Dialog open={showProcessDialog} onOpenChange={setShowProcessDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>处理公众上报</DialogTitle>
            <DialogDescription>填写处理信息，系统将自动记录处理人和部门信息</DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">上报标题</div>
                  <div className="mt-1">{selectedReport.title}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">上报位置</div>
                  <div className="mt-1">{selectedReport.locationName}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">上报类型</div>
                  <div className="mt-1">
                    <Badge variant="outline">{getReportTypeName(selectedReport.reportType)}</Badge>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">严重程度</div>
                  <div className="mt-1">
                    <Badge
                      variant={
                        selectedReport.severity === 3
                          ? "destructive"
                          : selectedReport.severity === 2
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {getSeverityName(selectedReport.severity)}
                    </Badge>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm font-medium text-muted-foreground">上报内容</div>
                  <div className="mt-1 text-sm">{selectedReport.content}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="processType">处理类型</Label>
                  <Select
                    value={processForm.processType.toString()}
                    onValueChange={(value) => setProcessForm({ ...processForm, processType: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">核实</SelectItem>
                      <SelectItem value="2">现场处理</SelectItem>
                      <SelectItem value="3">转派</SelectItem>
                      <SelectItem value="4">回复</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="processStatus">处理状态</Label>
                  <Select
                    value={processForm.processStatus.toString()}
                    onValueChange={(value) => setProcessForm({ ...processForm, processStatus: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">处理中</SelectItem>
                      <SelectItem value="2">已处理</SelectItem>
                      <SelectItem value="3">已关闭</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="processContent">处理内容 *</Label>
                  <Textarea
                    id="processContent"
                    value={processForm.processContent}
                    onChange={(e) => setProcessForm({ ...processForm, processContent: e.target.value })}
                    placeholder="请详细描述处理过程和结果..."
                    className="min-h-[120px]"
                  />
                </div>

                <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <p className="text-sm text-blue-800">提交后将自动创建处理记录，并关联您的用户信息和部门信息</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProcessDialog(false)}>
              取消
            </Button>
            <Button onClick={handleSubmitProcess}>提交处理</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 查看处理记录对话框 */}
      <Dialog open={showRecordsDialog} onOpenChange={setShowRecordsDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>处理记录</DialogTitle>
            <DialogDescription>{selectedReport?.title} - 所有处理记录</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {processRecords.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">暂无处理记录</div>
            ) : (
              processRecords.map((record, index) => (
                <div key={record.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{record.processTypeName}</Badge>
                      <span className="text-sm text-muted-foreground">#{processRecords.length - index}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{record.processTime}</div>
                  </div>
                  <div className="text-sm">{record.processContent}</div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>处理人: {record.processorName}</span>
                    <span>•</span>
                    <span>部门: {record.processorDept}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRecordsDialog(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
