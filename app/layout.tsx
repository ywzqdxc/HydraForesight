import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { DarkModeFixes } from "@/components/dark-mode-fixes"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "乐山市洪涝监测与预警系统",
  description: "智能监测与预警系统",
  generator: '崔Team'
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



import './globals.css'