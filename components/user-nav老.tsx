"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Bell, Settings, User, LogOut, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

interface UserNavProps {
  onLogout: () => void
}

export function UserNav({ onLogout }: UserNavProps) {
  const username = typeof window !== "undefined" ? localStorage.getItem("username") || "用户" : "用户"

  const handleClickToDashboard = () => {
    window.location.href = '/alerts/dashboard'; // 或者使用 window.location.assign('https://www.example.com');
  };
  
  return (
    <div className="flex items-center gap-4">
      <ThemeToggle />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              3
            </span>
            <span className="sr-only">通知</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[300px]">
          <DropdownMenuLabel>最新预警</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="max-h-[300px] overflow-auto">
            <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="destructive">红色预警</Badge>
                <span className="text-xs text-muted-foreground">10分钟前</span>
              </div>
              <p className="text-sm">黄石坡区域暴雨红色预警，预计未来3小时降水量将达100mm以上</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="w-[290px]" />
            <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="warning">黄色预警</Badge>
                <span className="text-xs text-muted-foreground">25分钟前</span>
              </div>
              <p className="text-sm">嘉州大道积水黄色预警，部分路段已出现30cm以上积水</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="w-[290px]" />
            <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="destructive">红色预警</Badge>
                <span className="text-xs text-muted-foreground">40分钟前</span>
              </div>
              <p className="text-sm">月弦坝水位红色预警，水位已超过警戒线，请注意防范</p>
            </DropdownMenuItem>
          </div>
          <DropdownMenuSeparator className="w-[290px]" />
          <DropdownMenuItem className="justify-center text-blue-500 cursor-pointer" onClick={handleClickToDashboard}>
            {/* <Button onClick={handleClickToDashboard} className="w-[300px]">查看全部预警</Button> */}
            <Link href="/alerts/dashboard">查看全部预警</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" size="sm" className="hidden md:flex">
        <MapPin className="mr-2 h-4 w-4" />
        乐山市市中区
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.svg?height=32&width=32" alt="用户头像" />
              <AvatarFallback>管理</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">管理员</p>
              <p className="text-xs leading-none text-muted-foreground">admin@example.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>个人资料</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>系统设置</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/login">
              <LogOut className="mr-2 h-4 w-4" />
              <span>退出登录</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
