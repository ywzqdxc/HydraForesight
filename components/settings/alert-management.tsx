"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import {
  Plus,
  RefreshCw,
  Send,
  Ban,
  Trash2,
  Pencil,
  Bell,
  FileText,
  MessageSquare,
  ClipboardList,
  Loader2,
} from "lucide-react"
import {
  pageAlertRules,
  createAlertRule,
  updateAlertRule,
  deleteAlertRule,
  toggleAlertRuleStatus,
  pageAlerts,
  pageAlertNotifications,
  createAndSendNotification,
  revokeNotification,
  pageAlertResponses,
  type AlertRule,
  type AlertRecord,
  type AlertNotification,
  type AlertResponse,
  ALERT_TYPE_MAP,
  ALERT_LEVEL_MAP,
  RESPONSE_TYPE_MAP,
} from "@/lib/api/alert"

export default function AlertManagement() {
  const [activeTab, setActiveTab] = useState("rules")

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rules" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            预警规则管理
          </TabsTrigger>
          <TabsTrigger value="records" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            预警记录管理
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            预警通知管理
          </TabsTrigger>
          <TabsTrigger value="responses" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            预警响应记录
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="mt-4">
          <AlertRulesTab />
        </TabsContent>

        <TabsContent value="records" className="mt-4">
          <AlertRecordsTab />
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <AlertNotificationsTab />
        </TabsContent>

        <TabsContent value="responses" className="mt-4">
          <AlertResponsesTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// 预警规则管理标签页
function AlertRulesTab() {
  const [rules, setRules] = useState<AlertRule[]>([])
  const [loading, setLoading] = useState(false)
  const [searchRuleType, setSearchRuleType] = useState<string>("")
  const [searchStatus, setSearchStatus] = useState<string>("")
  const [showDialog, setShowDialog] = useState(false)
  const [editingRule, setEditingRule] = useState<AlertRule | null>(null)
  const [formData, setFormData] = useState({
    ruleCode: "",
    ruleName: "",
    ruleType: 1,
    alertLevel: 1,
    thresholdValue: 0,
    thresholdUnit: "mm",
    alertMessage: "",
    notifyChannels: "banner",
    isAutoRelease: 1,
    status: 1,
  })

  const fetchRules = useCallback(async () => {
    setLoading(true)
    try {
      const params: any = { current: 1, size: 50 }
      if (searchRuleType) params.ruleType = Number.parseInt(searchRuleType)
      if (searchStatus) params.status = Number.parseInt(searchStatus)
      const res = await pageAlertRules(params)
      if (res.code === 200) {
        setRules(res.data?.records || [])
      }
    } catch (error) {
      toast.error("获取预警规则失败")
    } finally {
      setLoading(false)
    }
  }, [searchRuleType, searchStatus])

  useEffect(() => {
    fetchRules()
  }, [fetchRules])

  const handleAddRule = () => {
    setEditingRule(null)
    setFormData({
      ruleCode: "",
      ruleName: "",
      ruleType: 1,
      alertLevel: 1,
      thresholdValue: 0,
      thresholdUnit: "mm",
      alertMessage: "",
      notifyChannels: "banner",
      isAutoRelease: 1,
      status: 1,
    })
    setShowDialog(true)
  }

  const handleEditRule = (rule: AlertRule) => {
    setEditingRule(rule)
    setFormData({
      ruleCode: rule.ruleCode,
      ruleName: rule.ruleName,
      ruleType: rule.ruleType,
      alertLevel: rule.alertLevel,
      thresholdValue: rule.thresholdValue || 0,
      thresholdUnit: rule.thresholdUnit || "mm",
      alertMessage: rule.alertMessage || "",
      notifyChannels: rule.notifyChannels || "banner",
      isAutoRelease: rule.isAutoRelease || 1,
      status: rule.status,
    })
    setShowDialog(true)
  }

  const handleSaveRule = async () => {
    try {
      if (editingRule) {
        await updateAlertRule({ ...formData, id: editingRule.id })
        toast.success("更新预警规则成功")
      } else {
        await createAlertRule(formData)
        toast.success("创建预警规则成功")
      }
      setShowDialog(false)
      fetchRules()
    } catch (error) {
      toast.error("保存预警规则失败")
    }
  }

  const handleDeleteRule = async (id: number) => {
    if (!confirm("确定要删除此预警规则吗？")) return
    try {
      await deleteAlertRule(id)
      toast.success("删除预警规则成功")
      fetchRules()
    } catch (error) {
      toast.error("删除预警规则失败")
    }
  }

  const handleToggleStatus = async (rule: AlertRule) => {
    try {
      const newStatus = rule.status === 1 ? 0 : 1
      await toggleAlertRuleStatus(rule.id, newStatus)
      toast.success(newStatus === 1 ? "启用成功" : "禁用成功")
      fetchRules()
    } catch (error) {
      toast.error("操作失败")
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>预警规则管理</CardTitle>
            <CardDescription>配置预警触发规则和通知策略</CardDescription>
          </div>
          <Button onClick={handleAddRule}>
            <Plus className="h-4 w-4 mr-2" />
            新增规则
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Select value={searchRuleType} onValueChange={setSearchRuleType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="规则类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              <SelectItem value="1">降水预警</SelectItem>
              <SelectItem value="2">水位预警</SelectItem>
              <SelectItem value="3">内涝预警</SelectItem>
              <SelectItem value="4">设备预警</SelectItem>
            </SelectContent>
          </Select>
          <Select value={searchStatus} onValueChange={setSearchStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="1">启用</SelectItem>
              <SelectItem value="0">禁用</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={fetchRules}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            刷新
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>规则编码</TableHead>
              <TableHead>规则名称</TableHead>
              <TableHead>规则类型</TableHead>
              <TableHead>预警级别</TableHead>
              <TableHead>阈值</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell className="font-mono text-sm">{rule.ruleCode}</TableCell>
                <TableCell>{rule.ruleName}</TableCell>
                <TableCell>{rule.ruleTypeName || ALERT_TYPE_MAP[rule.ruleType] || "-"}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`bg-${ALERT_LEVEL_MAP[rule.alertLevel]?.color}-100 text-${ALERT_LEVEL_MAP[rule.alertLevel]?.color}-800`}
                  >
                    {rule.alertLevelName || ALERT_LEVEL_MAP[rule.alertLevel]?.name || "-"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {rule.thresholdValue} {rule.thresholdUnit}
                </TableCell>
                <TableCell>
                  <Switch checked={rule.status === 1} onCheckedChange={() => handleToggleStatus(rule)} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditRule(rule)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteRule(rule.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingRule ? "编辑预警规则" : "新增预警规则"}</DialogTitle>
              <DialogDescription>配置预警触发条件和通知策略</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>规则编码</Label>
                  <Input
                    value={formData.ruleCode}
                    onChange={(e) => setFormData({ ...formData, ruleCode: e.target.value })}
                    placeholder="如: RULE_RAIN_BLUE"
                  />
                </div>
                <div className="space-y-2">
                  <Label>规则名称</Label>
                  <Input
                    value={formData.ruleName}
                    onChange={(e) => setFormData({ ...formData, ruleName: e.target.value })}
                    placeholder="如: 暴雨蓝色预警规则"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>规则类型</Label>
                  <Select
                    value={String(formData.ruleType)}
                    onValueChange={(v) => setFormData({ ...formData, ruleType: Number.parseInt(v) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">降水预警</SelectItem>
                      <SelectItem value="2">水位预警</SelectItem>
                      <SelectItem value="3">内涝预警</SelectItem>
                      <SelectItem value="4">设备预警</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>预警级别</Label>
                  <Select
                    value={String(formData.alertLevel)}
                    onValueChange={(v) => setFormData({ ...formData, alertLevel: Number.parseInt(v) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">蓝色预警</SelectItem>
                      <SelectItem value="2">黄色预警</SelectItem>
                      <SelectItem value="3">橙色预警</SelectItem>
                      <SelectItem value="4">红色预警</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>阈值</Label>
                  <Input
                    type="number"
                    value={formData.thresholdValue}
                    onChange={(e) => setFormData({ ...formData, thresholdValue: Number.parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>阈值单位</Label>
                  <Input
                    value={formData.thresholdUnit}
                    onChange={(e) => setFormData({ ...formData, thresholdUnit: e.target.value })}
                    placeholder="如: mm, cm, m"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>预警消息模板</Label>
                <Textarea
                  value={formData.alertMessage}
                  onChange={(e) => setFormData({ ...formData, alertMessage: e.target.value })}
                  placeholder="预警触发时发送的消息内容"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                取消
              </Button>
              <Button onClick={handleSaveRule}>保存</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

// 预警记录管理标签页
function AlertRecordsTab() {
  const [records, setRecords] = useState<AlertRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [searchStatus, setSearchStatus] = useState<string>("")
  const [searchLevel, setSearchLevel] = useState<string>("")

  const fetchRecords = useCallback(async () => {
    setLoading(true)
    try {
      const params: any = { current: 1, size: 50 }
      if (searchStatus && searchStatus !== "all") params.status = Number.parseInt(searchStatus)
      if (searchLevel && searchLevel !== "all") params.alertLevel = Number.parseInt(searchLevel)
      const res = await pageAlerts(params)
      if (res.code === 200) {
        setRecords(res.data?.records || [])
      }
    } catch (error) {
      toast.error("获取预警记录失败")
    } finally {
      setLoading(false)
    }
  }, [searchStatus, searchLevel])

  useEffect(() => {
    fetchRecords()
  }, [fetchRecords])

  const getStatusBadge = (status: number) => {
    const statusMap: Record<number, { variant: "default" | "secondary" | "destructive" | "outline"; text: string }> = {
      0: { variant: "secondary", text: "待发布" },
      1: { variant: "destructive", text: "已发布" },
      2: { variant: "outline", text: "已解除" },
      3: { variant: "secondary", text: "已过期" },
      4: { variant: "secondary", text: "已取消" },
    }
    const config = statusMap[status] || { variant: "secondary" as const, text: "未知" }
    return <Badge variant={config.variant}>{config.text}</Badge>
  }

  const getLevelBadge = (level: number) => {
    const colorMap: Record<number, string> = {
      1: "bg-blue-100 text-blue-800 border-blue-300",
      2: "bg-yellow-100 text-yellow-800 border-yellow-300",
      3: "bg-orange-100 text-orange-800 border-orange-300",
      4: "bg-red-100 text-red-800 border-red-300",
    }
    return (
      <Badge variant="outline" className={colorMap[level] || ""}>
        {ALERT_LEVEL_MAP[level]?.name || "未知"}预警
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>预警记录管理</CardTitle>
        <CardDescription>查看和管理所有预警记录</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Select value={searchLevel} onValueChange={setSearchLevel}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="预警级别" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部级别</SelectItem>
              <SelectItem value="1">蓝色预警</SelectItem>
              <SelectItem value="2">黄色预警</SelectItem>
              <SelectItem value="3">橙色预警</SelectItem>
              <SelectItem value="4">红色预警</SelectItem>
            </SelectContent>
          </Select>
          <Select value={searchStatus} onValueChange={setSearchStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="0">待发布</SelectItem>
              <SelectItem value="1">已发布</SelectItem>
              <SelectItem value="2">已解除</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={fetchRecords}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            刷新
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>预警ID</TableHead>
              <TableHead>预警类型</TableHead>
              <TableHead>预警级别</TableHead>
              <TableHead>区域</TableHead>
              <TableHead>标题</TableHead>
              <TableHead>发布时间</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>查看次数</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-mono text-sm">{record.alertId}</TableCell>
                <TableCell>{ALERT_TYPE_MAP[record.alertType] || "-"}</TableCell>
                <TableCell>{getLevelBadge(record.alertLevel)}</TableCell>
                <TableCell>{record.areaName}</TableCell>
                <TableCell className="max-w-[200px] truncate">{record.title}</TableCell>
                <TableCell>{record.publishTime || "-"}</TableCell>
                <TableCell>{getStatusBadge(record.status)}</TableCell>
                <TableCell>{record.viewCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

// 预警通知管理标签页
function AlertNotificationsTab() {
  const [notifications, setNotifications] = useState<AlertNotification[]>([])
  const [loading, setLoading] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [creating, setCreating] = useState(false)
  const [formData, setFormData] = useState({
    alertType: 1,
    alertLevel: 4,
    areaName: "",
    title: "",
    content: "",
  })

  const fetchNotifications = useCallback(async () => {
    setLoading(true)
    try {
      const res = await pageAlertNotifications({ notifyChannel: 5, current: 1, size: 50 })
      if (res.code === 200) {
        setNotifications(res.data?.records || [])
      }
    } catch (error) {
      toast.error("获取通知记录失败")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  const handleCreateNotification = async () => {
    if (!formData.areaName || !formData.title || !formData.content) {
      toast.error("请填写完整信息")
      return
    }
    setCreating(true)
    try {
      await createAndSendNotification({
        ...formData,
        notifyChannel: 5,
      })
      toast.success("预警通知发送成功")
      setShowCreateDialog(false)
      setFormData({ alertType: 1, alertLevel: 4, areaName: "", title: "", content: "" })
      fetchNotifications()
    } catch (error) {
      toast.error("发送预警通知失败")
    } finally {
      setCreating(false)
    }
  }

  const handleRevokeNotification = async (id: number) => {
    if (!confirm("确定要撤销此预警通知吗？撤销后将从首页移除。")) return
    try {
      await revokeNotification(id)
      toast.success("预警通知已撤销")
      fetchNotifications()
    } catch (error) {
      toast.error("撤销预警通知失败")
    }
  }

  const getSendStatusBadge = (status: number) => {
    const statusMap: Record<number, { variant: "default" | "secondary" | "destructive" | "outline"; text: string }> = {
      0: { variant: "secondary", text: "待发送" },
      1: { variant: "default", text: "已发送" },
      2: { variant: "destructive", text: "已撤销" },
    }
    const config = statusMap[status] || { variant: "secondary" as const, text: "未知" }
    return <Badge variant={config.variant}>{config.text}</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>预警通知管理</CardTitle>
            <CardDescription>管理首页横幅预警通知，可手动发送或撤销预警</CardDescription>
          </div>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Send className="h-4 w-4 mr-2" />
            发送预警通知
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" onClick={fetchNotifications}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            刷新
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>预警标题</TableHead>
              <TableHead>预警类型</TableHead>
              <TableHead>预警级别</TableHead>
              <TableHead>区域</TableHead>
              <TableHead>发送时间</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell className="max-w-[200px] truncate">
                  {notification.alertTitle || notification.notifyContent}
                </TableCell>
                <TableCell>
                  {notification.alertTypeName || ALERT_TYPE_MAP[notification.alertType || 1] || "-"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`bg-${ALERT_LEVEL_MAP[notification.alertLevel || 1]?.color}-100 text-${ALERT_LEVEL_MAP[notification.alertLevel || 1]?.color}-800`}
                  >
                    {notification.alertLevelName || ALERT_LEVEL_MAP[notification.alertLevel || 1]?.name || "-"}
                  </Badge>
                </TableCell>
                <TableCell>{notification.areaName || "-"}</TableCell>
                <TableCell>{notification.sendTime || "-"}</TableCell>
                <TableCell>{getSendStatusBadge(notification.sendStatus)}</TableCell>
                <TableCell>
                  {notification.sendStatus === 1 && (
                    <Button variant="ghost" size="sm" onClick={() => handleRevokeNotification(notification.id)}>
                      <Ban className="h-4 w-4 mr-1" />
                      撤销
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>发送预警通知</DialogTitle>
              <DialogDescription>创建并发送预警通知到首页横幅</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>预警类型</Label>
                  <Select
                    value={String(formData.alertType)}
                    onValueChange={(v) => setFormData({ ...formData, alertType: Number.parseInt(v) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">暴雨预警</SelectItem>
                      <SelectItem value="2">洪水预警</SelectItem>
                      <SelectItem value="3">内涝预警</SelectItem>
                      <SelectItem value="4">雷电预警</SelectItem>
                      <SelectItem value="5">道路积水</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>预警级别</Label>
                  <Select
                    value={String(formData.alertLevel)}
                    onValueChange={(v) => setFormData({ ...formData, alertLevel: Number.parseInt(v) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">蓝色预警</SelectItem>
                      <SelectItem value="2">黄色预警</SelectItem>
                      <SelectItem value="3">橙色预警</SelectItem>
                      <SelectItem value="4">红色预警</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>预警区域</Label>
                <Input
                  value={formData.areaName}
                  onChange={(e) => setFormData({ ...formData, areaName: e.target.value })}
                  placeholder="如: 乐山市区、柏杨中路"
                />
              </div>
              <div className="space-y-2">
                <Label>预警标题</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="如: 暴雨红色预警"
                />
              </div>
              <div className="space-y-2">
                <Label>预警内容</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="详细描述预警信息..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                取消
              </Button>
              <Button onClick={handleCreateNotification} disabled={creating}>
                {creating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                发送通知
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

// 预警响应记录标签页
function AlertResponsesTab() {
  const [responses, setResponses] = useState<AlertResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [searchAlertId, setSearchAlertId] = useState<string>("")

  const fetchResponses = useCallback(async () => {
    setLoading(true)
    try {
      const params: any = { current: 1, size: 50 }
      if (searchAlertId) params.alertRecordId = Number.parseInt(searchAlertId)
      const res = await pageAlertResponses(params)
      if (res.code === 200) {
        setResponses(res.data?.records || [])
      }
    } catch (error) {
      toast.error("获取响应记录失败")
    } finally {
      setLoading(false)
    }
  }, [searchAlertId])

  useEffect(() => {
    fetchResponses()
  }, [fetchResponses])

  return (
    <Card>
      <CardHeader>
        <CardTitle>预警响应记录</CardTitle>
        <CardDescription>查看所有用户对预警的响应记录</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Input
            placeholder="预警记录ID"
            value={searchAlertId}
            onChange={(e) => setSearchAlertId(e.target.value)}
            className="w-[200px]"
          />
          <Button variant="outline" onClick={fetchResponses}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            刷新
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>预警ID</TableHead>
              <TableHead>响应类型</TableHead>
              <TableHead>响应内容</TableHead>
              <TableHead>响应人</TableHead>
              <TableHead>部门</TableHead>
              <TableHead>响应时间</TableHead>
              <TableHead>附件</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {responses.map((response) => (
              <TableRow key={response.id}>
                <TableCell>{response.alertRecordId}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {response.responseTypeName || RESPONSE_TYPE_MAP[response.responseType] || "-"}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[300px] truncate">{response.responseContent || "-"}</TableCell>
                <TableCell>{response.responderName || "-"}</TableCell>
                <TableCell>{response.responderDept || "-"}</TableCell>
                <TableCell>{response.responseTime}</TableCell>
                <TableCell>
                  {response.attachments && response.attachments.length > 0 ? (
                    <Badge variant="secondary">{response.attachments.length}个附件</Badge>
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
