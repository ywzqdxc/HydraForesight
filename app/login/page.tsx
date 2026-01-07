"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Eye, EyeOff, CloudRain, Droplets, Shield, Mail, Lock, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { login, register, isAuthenticated } from "@/lib/api/auth"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  // 检查是否已经登录，如果已登录则跳转到主页
  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/")
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await login({
        username: loginForm.username,
        password: loginForm.password,
        rememberMe: loginForm.rememberMe,
      })

      if (response.code === 200) {
        toast({
          title: "登录成功",
          description: `欢迎回来，${response.data.user.username}！`,
        })
        router.push("/")
      } else {
        toast({
          title: "登录失败",
          description: response.message || "用户名或密码错误",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "登录失败",
        description: error.message || "网络错误，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "注册失败",
        description: "两次输入的密码不一致",
        variant: "destructive",
      })
      return
    }
    if (!registerForm.agreeTerms) {
      toast({
        title: "注册失败",
        description: "请同意用户协议和隐私政策",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await register({
        username: registerForm.username,
        password: registerForm.password,
        email: registerForm.email || undefined,
        phone: registerForm.phone || undefined,
      })

      if (response.code === 200) {
        toast({
          title: "注册成功",
          description: "请使用新账号登录",
        })
        // 注册成功后自动登录
        const loginResponse = await login({
          username: registerForm.username,
          password: registerForm.password,
        })
        if (loginResponse.code === 200) {
          router.push("/")
        }
      } else {
        toast({
          title: "注册失败",
          description: response.message || "注册失败，请稍后重试",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "注册失败",
        description: error.message || "网络错误，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 relative overflow-hidden">
        {/* 背景装饰元素 */}
        <div className="absolute inset-0 overflow-hidden">
          {/* 动态水滴效果 */}
          <div
              className="absolute top-10 left-10 w-4 h-4 bg-blue-400/20 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
          ></div>
          <div
              className="absolute top-20 right-20 w-3 h-3 bg-cyan-400/20 rounded-full animate-bounce"
              style={{ animationDelay: "1s" }}
          ></div>
          <div
              className="absolute bottom-20 left-20 w-5 h-5 bg-sky-400/20 rounded-full animate-bounce"
              style={{ animationDelay: "2s" }}
          ></div>
          <div
              className="absolute bottom-10 right-10 w-2 h-2 bg-blue-500/20 rounded-full animate-bounce"
              style={{ animationDelay: "0.5s" }}
          ></div>

          {/* 波浪效果 */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-100/30 to-transparent dark:from-blue-900/30"></div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-cyan-100/20 to-transparent dark:from-cyan-900/20"></div>
        </div>

        <div className="relative z-10 w-full max-w-md mx-4">
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-2">
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                  <Droplets className="h-6 w-6 text-cyan-500 absolute -top-1 -right-1" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mb-8">
                {/* 云雨图标代码已删除 */}
                <h1 className="mt-6 text-3xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  智水先知
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">城市洪涝监测与预警系统</p>
              </div>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    登录
                  </TabsTrigger>
                  <TabsTrigger value="register" className="flex items-center gap-2">
                    <CloudRain className="h-4 w-4" />
                    注册
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">用户名</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                            id="username"
                            type="text"
                            placeholder="请输入用户名"
                            className="pl-10"
                            value={loginForm.username}
                            onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                            required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">密码</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="请输入密码"
                            className="pl-10 pr-10"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            checked={loginForm.rememberMe}
                            onCheckedChange={(checked) => setLoginForm({ ...loginForm, rememberMe: checked as boolean })}
                        />
                        <Label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400">
                          记住我
                        </Label>
                      </div>
                      <Link
                          href="/forgot-password"
                          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        忘记密码？
                      </Link>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                        disabled={isLoading}
                    >
                      {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            登录中...
                          </div>
                      ) : (
                          "登录"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-username">用户名</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                            id="reg-username"
                            type="text"
                            placeholder="请输入用户名"
                            className="pl-10"
                            value={registerForm.username}
                            onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                            required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">邮箱</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="请输入邮箱地址"
                            className="pl-10"
                            value={registerForm.email}
                            onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">手机号</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="请输入手机号"
                            className="pl-10"
                            value={registerForm.phone}
                            onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reg-password">密码</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                            id="reg-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="请输入密码"
                            className="pl-10 pr-10"
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">确认密码</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="请再次输入密码"
                            className="pl-10 pr-10"
                            value={registerForm.confirmPassword}
                            onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                          id="terms"
                          checked={registerForm.agreeTerms}
                          onCheckedChange={(checked) =>
                              setRegisterForm({ ...registerForm, agreeTerms: checked as boolean })
                          }
                      />
                      <Label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400">
                        我同意
                        <Link href="/terms" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 mx-1">
                          用户协议
                        </Link>
                        和
                        <Link href="/privacy" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 mx-1">
                          隐私政策
                        </Link>
                      </Label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                        disabled={isLoading}
                    >
                      {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            注册中...
                          </div>
                      ) : (
                          "注册"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  © 2026 智水先知监测系统 - 智能降水检测与预警平台
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}
