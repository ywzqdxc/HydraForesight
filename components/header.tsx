"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { CloudRain, Menu } from "lucide-react"

export function Header() {
  const [showMobileNav, setShowMobileNav] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("username")
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          {/* <Link href="/" className="mr-6 flex items-center space-x-2">
            <CloudRain className="h-6 w-6 text-blue-600" />
            <span className="hidden font-bold sm:inline-block">雨安盾</span>
          </Link> */}
          <MainNav />
        </div>
        <MobileNav />
        {/* <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={() => setShowMobileNav(!showMobileNav)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button> */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="flex items-center space-x-2 md:hidden">
              <CloudRain className="h-6 w-6 text-blue-600" />
              <span className="font-bold">雨安盾</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <UserNav onLogout={handleLogout} />
          </nav>
        </div>
      </div>
      {showMobileNav && <MobileNav />}
    </header>
  )
}
