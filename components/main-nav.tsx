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

// 修改 components 数组，按照区域大小从大到小排序
const components: { title: string; href: string; description: string; icon: React.ReactNode; status?: string }[] = [
  {
    title: "郑东新区",
    href: "/locations/zhengdong",
    description: "郑东新区整体降水和内涝监测",
    icon: <MapIcon className="h-4 w-4" />,
    status: "normal",
  },
  {
    title: "龙子湖中心",
    href: "/locations/longzihu-center",
    description: "龙子湖中心区域的降水和积水情况监测",
    icon: <MapIcon className="h-4 w-4" />,
    status: "danger",
  },
  {
    title: "东风渠",
    href: "/locations/dongfengqu",
    description: "东风渠水位监测和预警信息",
    icon: <CloudRain className="h-4 w-4" />,
    status: "danger",
  },
  {
    title: "龙湖大道",
    href: "/locations/longhu-avenue",
    description: "龙湖大道交通和积水情况实时监测",
    icon: <MapIcon className="h-4 w-4" />,
    status: "warning",
  },
  {
    title: "如意湖",
    href: "/locations/ruyi-lake",
    description: "如意湖水位和周边区域降水监测",
    icon: <CloudRain className="h-4 w-4" />,
    status: "normal",
  },
  {
    title: "科学大道",
    href: "/locations/science-avenue",
    description: "科学大道沿线的积水点和交通状况",
    icon: <MapIcon className="h-4 w-4" />,
    status: "warning",
  },
  {
    title: "龙翔街",
    href: "/locations/longxiang-street",
    description: "龙翔街沿线积水和交通状况",
    icon: <MapIcon className="h-4 w-4" />,
    status: "warning",
  },
  {
    title: "瀚海路",
    href: "/locations/hanhai-road",
    description: "瀚海路交通和积水情况监测",
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
        <span className="hidden font-bold sm:inline-block">雨安盾</span>
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
                  <h4 className="text-sm font-medium">龙子湖区域预警信息</h4>
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
                <div className="px-3 pt-2 border-t">
                  <Link
                    href="/locations/all"
                    className="flex items-center justify-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    查看所有预警区域
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

          <NavigationMenuItem>
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
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
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
