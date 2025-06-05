import { Shield } from "lucide-react"

export function NavbarLoader() {
  return (
    <>
      <nav
        className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full bg-black/80 backdrop-blur-xl rounded-none"
        style={{
          boxShadow: "0 8px 32px rgba(251, 146, 60, 0.1)",
        }}
      >
        {/* Animated border */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-orange-500/20 p-px">
          <div className="w-full h-full bg-black/40" />
        </div>

        <div className="relative z-10 px-4 md:px-6">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo Skeleton */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-orange-500/50 to-red-500/50 rounded-xl flex items-center justify-center animate-pulse">
                <Shield className="w-4 h-4 md:w-6 md:h-6 text-white/50" />
              </div>
              <div className="w-24 md:w-32 h-5 md:h-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded animate-pulse"></div>
            </div>

            {/* Desktop Navigation Skeleton */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="w-32 lg:w-48 h-8 lg:h-10 bg-gradient-to-r from-gray-800/60 to-gray-900/60 rounded-xl animate-pulse"></div>
              <div className="w-16 lg:w-20 h-8 lg:h-10 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-md animate-pulse"></div>
            </div>

            {/* Mobile Menu Button Skeleton */}
            <div className="md:hidden">
              <div className="w-9 h-9 bg-gradient-to-r from-gray-800/60 to-gray-900/60 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16 md:h-20"></div>
    </>
  )
}

export function NavbarLoadingState() {
  return <NavbarLoader />
}
