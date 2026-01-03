"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Menu, CloudRain, MapIcon, Users, Settings, BarChart, Moon, Sun, Cpu, BookOpen } from "lucide-react"
import { useTheme } from "next-themes"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">打开菜单</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-6">
        <SheetHeader className="border-b pb-4 mb-4">
          <SheetTitle className="flex items-center gap-2">
            <CloudRain className="h-5 w-5 text-blue-500" />
            智水先知
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col gap-2 py-2">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm rounded-md",
                pathname === "/"
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-foreground/70 hover:text-foreground hover:bg-accent/50",
              )}
            >
              <BarChart className="h-4 w-4" />
              首页
            </Link>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="locations" className="border-0">
                <AccordionTrigger className="py-2 px-3 text-sm hover:bg-accent/50 rounded-md hover:no-underline">
                  <div className="flex items-center gap-2">
                    <MapIcon className="h-4 w-4" />
                    预警中心
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0 pt-1">
                  <div className="flex flex-col gap-1 pl-6">
                    <div className="px-3 py-1 text-xs text-muted-foreground">主要预警区域</div>
                    <Link
                      href="/locations/zhengdong"
                      onClick={() => setOpen(false)}
                      className="px-3 py-2 text-sm rounded-md text-foreground/70 hover:text-foreground hover:bg-accent/50 flex justify-between items-center"
                    >
                      <span>市中区</span>
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    </Link>
                    <Link
                      href="/locations/longzihu-center"
                      onClick={() => setOpen(false)}
                      className="px-3 py-2 text-sm rounded-md text-foreground/70 hover:text-foreground hover:bg-accent/50 flex justify-between items-center"
                    >
                      <span>黄石坡</span>
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    </Link>
                    <Link
                      href="/locations/dongfengqu"
                      onClick={() => setOpen(false)}
                      className="px-3 py-2 text-sm rounded-md text-foreground/70 hover:text-foreground hover:bg-accent/50 flex justify-between items-center"
                    >
                      <span>月弦坝</span>
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    </Link>
                    <Link
                      href="/locations/longhu-avenue"
                      onClick={() => setOpen(false)}
                      className="px-3 py-2 text-sm rounded-md text-foreground/70 hover:text-foreground hover:bg-accent/50 flex justify-between items-center"
                    >
                      <span>柏杨中路</span>
                      <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    </Link>

                    <div className="px-3 py-1 text-xs text-muted-foreground mt-2">其他预警区域</div>
                    <Link
                      href="/locations/ruyi-lake"
                      onClick={() => setOpen(false)}
                      className="px-3 py-2 text-sm rounded-md text-foreground/70 hover:text-foreground hover:bg-accent/50 flex justify-between items-center"
                    >
                      <span>周河坎</span>
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    </Link>
                    <Link
                      href="/locations/science-avenue"
                      onClick={() => setOpen(false)}
                      className="px-3 py-2 text-sm rounded-md text-foreground/70 hover:text-foreground hover:bg-accent/50 flex justify-between items-center"
                    >
                      <span>嘉州大道</span>
                      <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    </Link>
                    <Link
                      href="/locations/longxiang-street"
                      onClick={() => setOpen(false)}
                      className="px-3 py-2 text-sm rounded-md text-foreground/70 hover:text-foreground hover:bg-accent/50 flex justify-between items-center"
                    >
                      <span>王浩儿街</span>
                      <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    </Link>
                    <Link
                      href="/locations/hanhai-road"
                      onClick={() => setOpen(false)}
                      className="px-3 py-2 text-sm rounded-md text-foreground/70 hover:text-foreground hover:bg-accent/50 flex justify-between items-center"
                    >
                      <span>碧山路</span>
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    </Link>

                    <div className="px-3 py-2 mt-1 text-center border-t">
                      <Link
                        href="/locations/all"
                        onClick={() => setOpen(false)}
                        className="text-sm text-blue-600 dark:text-blue-400"
                      >
                        查看所有预警区域
                      </Link>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link
              href="/device-management"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm rounded-md",
                pathname === "/device-management"
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-foreground/70 hover:text-foreground hover:bg-accent/50",
              )}
            >
              <Cpu className="h-4 w-4" />
              设备管理
            </Link>

            <Link
              href="/public-reports"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm rounded-md",
                pathname === "/public-reports"
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-foreground/70 hover:text-foreground hover:bg-accent/50",
              )}
            >
              <Users className="h-4 w-4" />
              公众参与
            </Link>

            <Link
              href="/knowledge"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm rounded-md",
                pathname === "/knowledge"
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-foreground/70 hover:text-foreground hover:bg-accent/50",
              )}
            >
              <BookOpen className="h-4 w-4" />
              知识科普
            </Link>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="more" className="border-0">
                <AccordionTrigger className="py-2 px-3 text-sm hover:bg-accent/50 rounded-md hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    更多
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0 pt-1">
                  <div className="flex flex-col gap-1 pl-6">
                    <Link
                      href="/analytics"
                      onClick={() => setOpen(false)}
                      className="px-3 py-2 text-sm rounded-md text-foreground/70 hover:text-foreground hover:bg-accent/50"
                    >
                      数据分析
                    </Link>
                    <Link
                      href="/about"
                      onClick={() => setOpen(false)}
                      className="px-3 py-2 text-sm rounded-md text-foreground/70 hover:text-foreground hover:bg-accent/50"
                    >
                      关于系统
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="px-3 py-2 text-sm rounded-md text-foreground/70 hover:text-foreground hover:bg-accent/50"
                    >
                      联系我们
                    </Link>
                    <Link
                      href="/help"
                      onClick={() => setOpen(false)}
                      className="px-3 py-2 text-sm rounded-md text-foreground/70 hover:text-foreground hover:bg-accent/50"
                    >
                      帮助中心
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="px-3 py-2 mt-2 border-t">
              <div className="flex flex-col gap-2">
                <h4 className="text-xs text-muted-foreground mb-1">主题设置</h4>
                <div className="flex-row gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-4 w-4 mr-1" />
                    白天
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-4 w-4 mr-1" />
                    夜晚
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
