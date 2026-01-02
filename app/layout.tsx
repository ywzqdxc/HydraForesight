import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { DarkModeFixes } from "@/components/dark-mode-fixes"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "龙子湖雨情预警系统",
  description: "智能降雨监测与预警系统",
    generator: 'v0.app'
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
