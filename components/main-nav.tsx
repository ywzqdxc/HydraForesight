"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { CloudRain, MapIcon, BarChart, Info, Phone, HelpCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// 修改 components 数组，按照区域大小从大到小排序
const components: { title: string; href: string; description: string; icon: React.ReactNode; status?: string }[] = [
  {
    title: "市中区",
    href: "/locations/zhengdong",
    description: "市中区整体降水和内涝监测",
    icon: <MapIcon className="h-4 w-4" />,
    status: "normal",
  },
  {
    title: "黄石坡",
    href: "/locations/longzihu-center",
    description: "黄石坡区域的降水和积水情况监测",
    icon: <MapIcon className="h-4 w-4" />,
    status: "danger",
  },
  {
    title: "月弦坝",
    href: "/locations/dongfengqu",
    description: "月弦坝水位监测和预警信息",
    icon: <CloudRain className="h-4 w-4" />,
    status: "danger",
  },
  {
    title: "柏杨中路",
    href: "/locations/longhu-avenue",
    description: "柏杨中路交通和积水情况实时监测",
    icon: <MapIcon className="h-4 w-4" />,
    status: "warning",
  },
  {
    title: "周河坎",
    href: "/locations/ruyi-lake",
    description: "周河坎水位和周边区域降水监测",
    icon: <CloudRain className="h-4 w-4" />,
    status: "normal",
  },
  {
    title: "嘉州大道",
    href: "/locations/science-avenue",
    description: "嘉州大道沿线的积水点和交通状况",
    icon: <MapIcon className="h-4 w-4" />,
    status: "warning",
  },
  {
    title: "王浩儿街",
    href: "/locations/longxiang-street",
    description: "王浩儿街沿线积水和交通状况",
    icon: <MapIcon className="h-4 w-4" />,
    status: "warning",
  },
  {
    title: "碧山路",
    href: "/locations/hanghai-road",
    description: "碧山路交通和积水情况监测",
    icon: <MapIcon className="h-4 w-4" />,
    status: "normal",
  },
]

export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <CloudRain className="h-6 w-6 text-blue-500" />
        <span className="hidden font-bold sm:inline-block min-w-[55px]">智水先知</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), pathname === "/" && "bg-accent text-accent-foreground")}
              >
                首页
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {/* 修改 NavigationMenuItem 中的监测区域部分 */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>预警中心</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-4 w-[600px]">
                <div className="flex items-center gap-2 px-3">
                  <h4 className="text-sm font-medium">乐山市预警信息</h4>
                  <div className="ml-auto flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span>严重</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span>警告</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>正常</span>
                    </div>
                  </div>
                </div>
                <ul className="grid grid-cols-2 gap-3">
                  {components.slice(0, 4).map((component) => (
                    <li key={component.title}>
                      <ListItem
                        title={component.title}
                        href={component.href}
                        icon={component.icon}
                        status={component.status}
                      >
                        {component.description}
                      </ListItem>
                    </li>
                  ))}
                </ul>
                <div className="px-3 py-2">
                  <h4 className="text-sm font-medium mb-2">其他预警区域</h4>
                  <ul className="grid grid-cols-2 gap-3">
                    {components.slice(4).map((component) => (
                      <li key={component.title}>
                        <ListItem
                          title={component.title}
                          href={component.href}
                          icon={component.icon}
                          status={component.status}
                        >
                          {component.description}
                        </ListItem>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* <div className="px-3 pt-2 grid-cols-2 border-t"> */}
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/locations/all"
                    className="flex items-center justify-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    查看所有预警区域
                  </Link>
                  <Link
                    href="/alerts/dashboard"
                    className="flex items-center justify-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    查看预警中心
                  </Link>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/device-management" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === "/device-management" && "bg-accent text-accent-foreground",
                )}
              >
                设备管理
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/public-reports" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === "/public-reports" && "bg-accent text-accent-foreground",
                )}
              >
                公众参与
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/knowledge" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === "/knowledge" && "bg-accent text-accent-foreground",
                )}
              >
                知识科普
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {/* <NavigationMenuItem>
            <NavigationMenuTrigger>更多</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-3 p-4 md:w-[200px]">
                <li>
                  <Link href="/analytics" legacyBehavior passHref>
                    <NavigationMenuLink className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                      <BarChart className="h-4 w-4" />
                      <span>数据分析</span>
                    </NavigationMenuLink>
                  </Link>
                </li>
                <li>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                      <Info className="h-4 w-4" />
                      <span>关于系统</span>
                    </NavigationMenuLink>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                      <Phone className="h-4 w-4" />
                      <span>联系我们</span>
                    </NavigationMenuLink>
                  </Link>
                </li>
                <li>
                  <Link href="/help" legacyBehavior passHref>
                    <NavigationMenuLink className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                      <HelpCircle className="h-4 w-4" />
                      <span>帮助中心</span>
                    </NavigationMenuLink>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>

      <DropdownMenu>
        {/* <DropdownMenuTrigger asChild> */}
        <DropdownMenuTrigger>
          {" "}
          <div
            className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
              className,
            )}
          >
            更多
          </div>{" "}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <ul className="grid w-[200px] gap-3 p-4">
            <li>
              <ListItemForDrop title="数据分析" href="/analytics" icon={<BarChart className="h-4 w-4" />}>
                降水数据统计与分析
              </ListItemForDrop>
            </li>
            <li>
              <ListItemForDrop title="关于系统" href="/about" icon={<Info className="h-4 w-4" />}>
                系统介绍与使用说明
              </ListItemForDrop>
            </li>
            <li>
              <ListItemForDrop title="联系我们" href="/contact" icon={<Phone className="h-4 w-4" />}>
                联系方式与反馈渠道
              </ListItemForDrop>
            </li>
            <li>
              <ListItemForDrop title="帮助中心" href="/help" icon={<HelpCircle className="h-4 w-4" />}>
                常见问题与使用帮助
              </ListItemForDrop>
            </li>
          </ul>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// 修改 ListItem 组件，不再返回 <li> 元素
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    icon?: React.ReactNode
    status?: string
  }
>(({ className, title, children, icon, status, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-2 text-sm font-medium leading-none">
          {icon}
          <span>{title}</span>
          {status && (
            <div
              className={cn(
                "ml-auto w-2 h-2 rounded-full",
                status === "danger" ? "bg-red-500" : status === "warning" ? "bg-yellow-500" : "bg-green-500",
              )}
            />
          )}
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
      </a>
    </NavigationMenuLink>
  )
})
ListItem.displayName = "ListItem"

// 新建 ListItemForDrop 组件，不再返回 <li> 元素
const ListItemForDrop = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    icon?: React.ReactNode
    status?: string
  }
>(({ className, title, children, icon, status, ...props }, ref) => {
  return (
    <a
      ref={ref}
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 text-sm font-medium leading-none">
        {icon}
        <span>{title}</span>
        {status && (
          <div
            className={cn(
              "ml-auto w-2 h-2 rounded-full",
              status === "danger" ? "bg-red-500" : status === "warning" ? "bg-yellow-500" : "bg-green-500",
            )}
          />
        )}
      </div>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
    </a>
  )
})
