"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Bell, X, Loader2, Upload, FileIcon, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import {
  getBannerNotification,
  getAlertDetail,
  createAlertResponse,
  getAlertResponses,
  uploadAlertResponseFile,
  type AlertNotification,
  type AlertRecord,
  type AlertResponse,
  ALERT_TYPE_MAP,
  ALERT_LEVEL_MAP,
  RESPONSE_TYPE_MAP,
} from "@/lib/api/alert"

// 预警级别对应的颜色样式
const LEVEL_STYLES: Record<number, { bg: string; border: string; text: string; icon: string }> = {
  1: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-800 dark:text-blue-300",
    icon: "text-blue-600 dark:text-blue-400",
  },
  2: {
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    border: "border-yellow-200 dark:border-yellow-800",
    text: "text-yellow-800 dark:text-yellow-300",
    icon: "text-yellow-600 dark:text-yellow-400",
  },
  3: {
    bg: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
    text: "text-orange-800 dark:text-orange-300",
    icon: "text-orange-600 dark:text-orange-400",
  },
  4: {
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-800",
    text: "text-red-800 dark:text-red-300",
    icon: "text-red-600 dark:text-red-400",
  },
}

interface FileInfo {
  id: string
  name: string
  url: string
  size: number
  type: string
  path: string
}

export default function AlertBanner() {
  const [notification, setNotification] = useState<AlertNotification | null>(null)
  const [alertDetail, setAlertDetail] = useState<AlertRecord | null>(null)
  const [responses, setResponses] = useState<AlertResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [showResponseDialog, setShowResponseDialog] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<FileInfo[]>([])
  const [responseForm, setResponseForm] = useState({
    responseType: 1,
    responseContent: "",
  })

  useEffect(() => {
    fetchBannerNotification()
  }, [])

  const fetchBannerNotification = async () => {
    try {
      const res = await getBannerNotification()
      if (res.code === 200 && res.data) {
        setNotification(res.data)
      }
    } catch (error) {
      console.error("获取横幅通知失败:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetail = async () => {
    if (!notification?.alertRecordId) return
    try {
      const [detailRes, responsesRes] = await Promise.all([
        getAlertDetail(notification.alertRecordId),
        getAlertResponses(notification.alertRecordId),
      ])
      if (detailRes.code === 200 && detailRes.data) {
        setAlertDetail(detailRes.data)
      }
      if (responsesRes.code === 200 && responsesRes.data) {
        const parsedResponses = responsesRes.data.map((response) => {
          if (response.attachmentUrls) {
            try {
              response.attachments = JSON.parse(response.attachmentUrls)
            } catch (e) {
              response.attachments = []
            }
          }
          return response
        })
        setResponses(parsedResponses)
      }
      setShowDetailDialog(true)
    } catch (error) {
      toast.error("获取预警详情失败")
    }
  }

  const handleOpenResponseDialog = () => {
    setShowDetailDialog(false)
    setShowResponseDialog(true)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    console.log("[v0] 选择的文件数量:", files.length)
    setUploading(true)

    for (const file of Array.from(files)) {
      try {
        console.log("[v0] 开始上传文件:", {
          name: file.name,
          size: file.size,
          type: file.type,
        })

        const res = await uploadAlertResponseFile(file)
        console.log("[v0] 文件上传响应:", res)

        if (res.code === 200 && res.data) {
          const fileInfo: FileInfo = {
            id: res.data.id || `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: res.data.fileName || res.data.name || file.name,
            url: res.data.url || "",
            size: res.data.fileSize || res.data.size || file.size,
            type: res.data.fileType || res.data.type || file.type,
            path: res.data.filePath || res.data.path || "",
          }
          console.log("[v0] 构建的文件信息:", fileInfo)

          setUploadedFiles((prev) => {
            const newFiles = [...prev, fileInfo]
            console.log("[v0] 更新后的文件列表:", newFiles)
            return newFiles
          })
          toast.success(`文件 ${file.name} 上传成功`)
        } else {
          console.error("[v0] 上传失败:", res)
          toast.error(`文件 ${file.name} 上传失败: ${res.message || "未知错误"}`)
        }
      } catch (error) {
        console.error("[v0] 文件上传错误:", error)
        toast.error(`文件 ${file.name} 上传失败: ${error instanceof Error ? error.message : "网络错误"}`)
      }
    }

    setUploading(false)
    // 清空input，允许重复上传同一文件
    e.target.value = ""
  }

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
    toast.success("文件已移除")
  }

  const handleSubmitResponse = async () => {
    if (!notification?.alertRecordId) return
    if (!responseForm.responseContent.trim()) {
      toast.error("请填写响应内容")
      return
    }

    console.log("[v0] 准备提交响应，当前上传的文件:", uploadedFiles)
    setSubmitting(true)
    try {
      // 将文件信息序列化为JSON字符串
      const attachmentUrlsJson = JSON.stringify(uploadedFiles)
      console.log("[v0] 提交的附件JSON:", attachmentUrlsJson)

      const submitData = {
        alertRecordId: notification.alertRecordId,
        responseType: responseForm.responseType,
        responseContent: responseForm.responseContent,
        attachmentUrls: attachmentUrlsJson,
      }
      console.log("[v0] 提交的完整数据:", submitData)

      await createAlertResponse(submitData)

      toast.success("响应提交成功")
      setShowResponseDialog(false)
      setResponseForm({ responseType: 1, responseContent: "" })
      setUploadedFiles([])

      // 刷新响应列表
      if (showDetailDialog) {
        const responsesRes = await getAlertResponses(notification.alertRecordId)
        if (responsesRes.code === 200 && responsesRes.data) {
          const parsedResponses = responsesRes.data.map((response) => {
            if (response.attachmentUrls) {
              try {
                response.attachments = JSON.parse(response.attachmentUrls)
              } catch (e) {
                console.error("[v0] 解析附件JSON失败:", e)
                response.attachments = []
              }
            }
            return response
          })
          setResponses(parsedResponses)
        }
      }
    } catch (error) {
      console.error("[v0] 提交响应错误:", error)
      toast.error("响应提交失败")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return null
  }

  if (!notification || dismissed) {
    return null
  }

  const level = notification.alertLevel || 4
  const styles = LEVEL_STYLES[level] || LEVEL_STYLES[4]
  const levelName = ALERT_LEVEL_MAP[level]?.name || "红色"
  const typeName = notification.alertTypeName || ALERT_TYPE_MAP[notification.alertType || 1] || "预警"

  return (
    <>
      <div className={`${styles.bg} border ${styles.border} rounded-md p-3 animate-pulse`}>
        <div className="flex items-center gap-2">
          <Bell className={`h-5 w-5 ${styles.icon}`} />
          <div className={`font-medium ${styles.text} flex-1`}>紧急预警：{notification.notifyContent}</div>
          <Button
            variant="outline"
            size="sm"
            className={`ml-auto text-xs h-7 border-current ${styles.text} hover:bg-current/10 bg-transparent`}
            onClick={handleViewDetail}
          >
            查看详情
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setDismissed(true)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 预警详情对话框 */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className={styles.icon} />
              {alertDetail?.title || notification.alertTitle || "预警详情"}
            </DialogTitle>
            <DialogDescription>
              {levelName}预警 · {typeName} · {alertDetail?.areaName || notification.areaName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${styles.bg} border ${styles.border}`}>
              <h4 className="font-medium mb-2">预警内容</h4>
              <p className="text-sm text-muted-foreground">{alertDetail?.content || notification.notifyContent}</p>
            </div>

            {alertDetail && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">发布时间：</span>
                  <span>{alertDetail.publishTime || "-"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">发布人：</span>
                  <span>{alertDetail.publisherName || "-"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">预计结束：</span>
                  <span>{alertDetail.expectedEndTime || "-"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">查看次数：</span>
                  <span>{alertDetail.viewCount}</span>
                </div>
              </div>
            )}

            {responses.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">响应记录 ({responses.length})</h4>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {responses.map((response) => (
                    <div key={response.id} className="p-3 bg-muted rounded-lg text-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">
                          {response.responderName} · {response.responderDept || "未知部门"}
                        </span>
                        <span className="text-xs text-muted-foreground">{response.responseTime}</span>
                      </div>
                      <div className="text-xs text-blue-600 mb-1">
                        {response.responseTypeName || RESPONSE_TYPE_MAP[response.responseType]}
                      </div>
                      <p className="text-muted-foreground">{response.responseContent}</p>
                      {response.attachments && response.attachments.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {response.attachments.map((file, index) => (
                            <a
                              key={index}
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded hover:bg-blue-200 transition-colors inline-flex items-center gap-1"
                            >
                              <FileIcon className="h-3 w-3" />
                              {file.name} ({(file.size / 1024).toFixed(1)}KB)
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailDialog(false)}>
              关闭
            </Button>
            <Button onClick={handleOpenResponseDialog}>填写响应</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 填写响应对话框 */}
      <Dialog open={showResponseDialog} onOpenChange={setShowResponseDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>填写预警响应</DialogTitle>
            <DialogDescription>请填写您对此预警的响应内容</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>响应类型</Label>
              <Select
                value={String(responseForm.responseType)}
                onValueChange={(v) => setResponseForm({ ...responseForm, responseType: Number.parseInt(v) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">确认收到</SelectItem>
                  <SelectItem value="2">现场处置</SelectItem>
                  <SelectItem value="3">上报情况</SelectItem>
                  <SelectItem value="4">处置完成</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>响应内容</Label>
              <Textarea
                value={responseForm.responseContent}
                onChange={(e) => setResponseForm({ ...responseForm, responseContent: e.target.value })}
                placeholder="请描述您的响应情况..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>上传附件</Label>
              <div className="flex items-center gap-2">
                <label className="flex-1">
                  <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed rounded-md cursor-pointer hover:border-primary hover:bg-accent transition-colors">
                    <Upload className="h-4 w-4" />
                    <span className="text-sm">{uploading ? "上传中..." : "点击选择文件或拖拽文件到此处"}</span>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>

              {/* 已上传文件列表 */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2 mt-3 p-3 bg-muted rounded-md">
                  <div className="text-xs font-medium text-muted-foreground">已上传 {uploadedFiles.length} 个文件</div>
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between gap-2 p-2 bg-background rounded border"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <FileIcon className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{file.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(1)}KB · {file.type}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 flex-shrink-0"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs text-muted-foreground">支持图片、PDF、Word、Excel等格式，单个文件最大10MB</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResponseDialog(false)}>
              取消
            </Button>
            <Button onClick={handleSubmitResponse} disabled={submitting || uploading}>
              {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              提交响应
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
