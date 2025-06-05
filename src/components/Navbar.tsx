"use client"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import type { User } from "next-auth"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { LogOut, UserIcon, Menu, X, Sparkles, Shield } from "lucide-react"

function Navbar() {
  const [scrollY, setScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session } = useSession()
  const user: User = session?.user as User

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    document.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Calculate navbar width based on scroll position
  const getNavbarWidth = () => {
    const maxScroll = 300 // Scroll distance to reach minimum width
    const minWidthPercent = 85 // Minimum width percentage
    const maxWidthPercent = 100 // Maximum width percentage

    const scrollPercent = Math.min(scrollY / maxScroll, 1)
    const widthPercent = maxWidthPercent - scrollPercent * (maxWidthPercent - minWidthPercent)

    return `${widthPercent}%`
  }

  // Calculate glassmorphism intensity based on scroll
  const getGlassmorphismIntensity = () => {
    const maxScroll = 200
    const scrollPercent = Math.min(scrollY / maxScroll, 1)
    return scrollPercent
  }

  const glassmorphismIntensity = getGlassmorphismIntensity()
  const navbarWidth = getNavbarWidth()

  return (
    <>
      <nav
        className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out"
        style={{
          width: navbarWidth,
          backgroundColor: `rgba(0, 0, 0, ${0.7 + glassmorphismIntensity * 0.2})`,
          backdropFilter: `blur(${8 + glassmorphismIntensity * 12}px)`,
          borderRadius: scrollY > 50 ? "24px" : "0px",
          marginTop: scrollY > 50 ? "12px" : "0px",
          boxShadow: `0 8px 32px rgba(251, 146, 60, ${0.1 + glassmorphismIntensity * 0.15})`,
        }}
      >
        {/* Animated border */}
        <div
          className="absolute inset-0 rounded-[24px] transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, 
              rgba(251, 146, 60, ${0.2 + glassmorphismIntensity * 0.3}) 0%, 
              rgba(239, 68, 68, ${0.2 + glassmorphismIntensity * 0.3}) 50%, 
              rgba(251, 146, 60, ${0.2 + glassmorphismIntensity * 0.3}) 100%)`,
            padding: "1px",
          }}
        >
          <div
            className="w-full h-full bg-black/40 transition-all duration-500"
            style={{
              borderRadius: scrollY > 50 ? "23px" : "0px",
            }}
          />
        </div>

        <div className="relative z-10 px-4 md:px-6">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="group flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300 transform group-hover:scale-105">
                  <Shield className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <span className="text-lg md:text-2xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:to-red-300 transition-all duration-300">
                ShadowSpeak
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {session ? (
                <div className="flex items-center space-x-4 lg:space-x-6">
                  {/* User Info */}
                  <div className="flex items-center space-x-3 px-3 lg:px-4 py-2 rounded-xl bg-gradient-to-r from-gray-900/60 to-black/60 border border-gray-700/50 backdrop-blur-sm">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <UserIcon className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs lg:text-sm font-medium text-white">
                        {user?.username || user?.email?.split("@")[0]}
                      </span>
                      <span className="text-xs text-gray-400 hidden lg:block">{user?.email}</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                      Online
                    </Badge>
                  </div>

                  {/* Logout Button */}
                  <Button
                    onClick={() => signOut({callbackUrl : "/sign-in"})}
                    className="group relative bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500 hover:to-orange-500 text-red-300 hover:text-white border border-red-500/30 hover:border-transparent transition-all duration-300 transform hover:scale-105 text-sm lg:text-base px-3 lg:px-4 py-2"
                    variant="outline"
                  >
                    <LogOut className="w-3 h-3 lg:w-4 lg:h-4 mr-2 group-hover:animate-pulse" />
                    <span className="hidden lg:inline">Logout</span>
                    <span className="lg:hidden">Out</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 rounded-md blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <Link href="/sign-in">
                    <Button
                      className="group relative bg-transparent text-gray-300 border border-gray-600 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 text-sm lg:text-base px-3 lg:px-4 py-2"
                      variant="outline"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button className="group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25 text-sm lg:text-base px-3 lg:px-4 py-2">
                      <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 mr-2 group-hover:animate-spin" />
                      <span className="hidden lg:inline">Get Started</span>
                      <span className="lg:hidden">Start</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-md blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                onClick={toggleMobileMenu}
                className="relative bg-gradient-to-r from-gray-800/60 to-gray-900/60 border border-gray-700/50 hover:border-orange-500/50 text-white p-2"
                variant="outline"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-black/60 backdrop-blur-xl border-t border-orange-500/20 px-4 py-6 rounded-b-[24px]">
            {session ? (
              <div className="space-y-6">
                {/* Mobile User Info */}
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-gray-900/60 to-black/60 border border-gray-700/50">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-white">{user?.username || user?.email?.split("@")[0]}</span>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                        Online
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-400">{user?.email}</span>
                  </div>
                </div>

                {/* Mobile Logout Button */}
                <Button
                  onClick={() => {
                    signOut({callbackUrl : "/sign-in"})
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full group relative bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500 hover:to-orange-500 text-red-300 hover:text-white border border-red-500/30 hover:border-transparent transition-all duration-300"
                  variant="outline"
                >
                  <LogOut className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    className="w-full bg-transparent text-gray-300 border border-gray-600 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300"
                    variant="outline"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white transition-all duration-300 shadow-lg hover:shadow-orange-500/25">
                    <Sparkles className="w-4 h-4 mr-2 group-hover:animate-spin" />
                    Get Started
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-md blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16 md:h-20 bg-black"></div>
    </>
  )
}

export default Navbar
