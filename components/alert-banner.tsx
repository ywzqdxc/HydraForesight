"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Bell, X, Loader2 } from "lucide-react"
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

export default function AlertBanner() {
  const [notification, setNotification] = useState<AlertNotification | null>(null)
  const [alertDetail, setAlertDetail] = useState<AlertRecord | null>(null)
  const [responses, setResponses] = useState<AlertResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [showResponseDialog, setShowResponseDialog] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [responseForm, setResponseForm] = useState({
    responseType: 1,
    responseContent: "",
    attachmentUrls: "[]",
  })
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ fileName: string; filePath: string; fileSize: number; fileType: string }>
  >([])

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
        setResponses(responsesRes.data)
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

    for (const file of Array.from(files)) {
      try {
        const res = await uploadAlertResponseFile(file)
        if (res.code === 200 && res.data) {
          setUploadedFiles((prev) => [...prev, res.data])
          toast.success(`文件 ${file.name} 上传成功`)
        }
      } catch (error) {
        toast.error(`文件 ${file.name} 上传失败`)
      }
    }
  }

  const handleSubmitResponse = async () => {
    if (!notification?.alertRecordId) return
    if (!responseForm.responseContent.trim()) {
      toast.error("请填写响应内容")
      return
    }

    setSubmitting(true)
    try {
      await createAlertResponse({
        alertRecordId: notification.alertRecordId,
        responseType: responseForm.responseType,
        responseContent: responseForm.responseContent,
        attachmentUrls: JSON.stringify(uploadedFiles),
      })
      toast.success("响应提交成功")
      setShowResponseDialog(false)
      setResponseForm({ responseType: 1, responseContent: "", attachmentUrls: "[]" })
      setUploadedFiles([])
    } catch (error) {
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
                            <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                              {file.fileName}
                            </span>
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
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              {uploadedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {uploadedFiles.map((file, index) => (
                    <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {file.fileName} ({(file.fileSize / 1024).toFixed(1)}KB)
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResponseDialog(false)}>
              取消
            </Button>
            <Button onClick={handleSubmitResponse} disabled={submitting}>
              {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              提交响应
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
