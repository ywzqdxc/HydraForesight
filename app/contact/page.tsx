import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, Users } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <MessageSquare className="h-8 w-8 text-blue-500" />
              联系我们
            </h1>
            <p className="text-muted-foreground">我们期待您的反馈和建议</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-500" />
                  电话咨询
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">工作日 9:00-18:00</p>
                <p className="font-medium">0371-12345678</p>
                <p className="text-sm text-muted-foreground">紧急情况 24小时热线</p>
                <p className="font-medium">0371-87654321</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-500" />
                  电子邮件
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">一般咨询</p>
                <p className="font-medium">info@XXXXXXXX.com</p>
                <p className="text-sm text-muted-foreground">技术支持</p>
                <p className="font-medium">support@XXXXXXXX.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  办公地址
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">总部地址</p>
                <p className="font-medium">XXXXXXXX</p>
                <p className="text-sm text-muted-foreground">监测中心</p>
                <p className="font-medium">XXXXXXXX</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>联系表单</CardTitle>
                <CardDescription>填写以下表单，我们将尽快回复您</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input id="name" placeholder="请输入您的姓名" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">电话</Label>
                    <Input id="phone" placeholder="请输入您的电话" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">电子邮件</Label>
                  <Input id="email" placeholder="请输入您的电子邮件" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">咨询类型</Label>
                  <Select>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="请选择咨询类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">一般咨询</SelectItem>
                      <SelectItem value="technical">技术支持</SelectItem>
                      <SelectItem value="feedback">意见反馈</SelectItem>
                      <SelectItem value="cooperation">合作洽谈</SelectItem>
                      <SelectItem value="other">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">留言内容</Label>
                  <Textarea id="message" placeholder="请输入您的留言内容" rows={5} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  提交留言
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    服务时间
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium">客服中心</h4>
                        <p className="text-sm text-muted-foreground">周一至周五: 9:00-18:00</p>
                        <p className="text-sm text-muted-foreground">周六至周日: 10:00-16:00</p>
                      </div>
                      <div>
                        <h4 className="font-medium">技术支持</h4>
                        <p className="text-sm text-muted-foreground">周一至周五: 9:00-20:00</p>
                        <p className="text-sm text-muted-foreground">周六至周日: 10:00-18:00</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">紧急响应</h4>
                      <p className="text-sm text-muted-foreground">24小时全天候服务</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    合作伙伴
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      我们与多家机构和企业建立了长期合作关系，共同推进智慧城市和防灾减灾工作。如果您有合作意向，欢迎联系我们。
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border rounded-md text-center">
                        {/* <div className="w-12 h-12 bg-slate-200 mx-auto mb-2 rounded"></div> */}
                        <img src="cma_logo.png" alt="XX市气象局" className="w-12 h-12 mx-auto mb-2 rounded"/>
                        <p className="text-sm">XX市气象局</p>
                      </div>
                      <div className="p-4 border rounded-md text-center">
                        {/* <div className="w-12 h-12 bg-slate-200 mx-auto mb-2 rounded"></div> */}
                        <img src="mwr_logo.png" alt="XX市水利局" className="w-12 h-12 mx-auto mb-2 rounded"/>
                        <p className="text-sm">XX市水利局</p>
                      </div>
                      <div className="p-4 border rounded-md text-center">
                        {/* <div className="w-12 h-12 bg-slate-200 mx-auto mb-2 rounded"></div> */}
                        <img src="mem_logo.png" alt="XX市应急管理局" className="w-12 h-12 mx-auto mb-2 rounded"/>
                        <p className="text-sm">XX市应急管理局</p>
                      </div>
                      <div className="p-4 border rounded-md text-center">
                        {/* <div className="w-12 h-12 bg-slate-200 mx-auto mb-2 rounded"></div> */}
                        <img src="ncwu_logo.png" alt="华北水利水电大学" className="w-12 h-12 mx-auto mb-2 rounded"/>
                        <p className="text-sm">华北水利水电大学</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* <Card>
            <CardHeader>
              <CardTitle>位置地图</CardTitle>
              <CardDescription>我们的办公地址位于XXXXXXXX</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">地图加载中...</p>
                  <p className="text-muted-foreground">这里是地图</p>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </main>
    </div>
  )
}
