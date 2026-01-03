import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { DarkModeFixes } from "@/components/dark-mode-fixes"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "智水先知 - 城市洪涝监测与预警系统",
  description: "智水先知是一套基于物联网、大数据和人工智能技术的综合性降水监测与预警平台",
  generator: "崔Team",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <DarkModeFixes />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
