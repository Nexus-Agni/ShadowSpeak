import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  className?: string
  text?: string
}

export function LoadingSpinner({ className, text = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-gray-700 rounded-full animate-spin border-t-transparent"></div>

        {/* Inner ring */}
        <div className="absolute inset-2 w-12 h-12 border-4 border-orange-500 rounded-full animate-spin border-t-transparent animate-reverse"></div>

        {/* Center dot */}
        <div className="absolute inset-6 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
      </div>

      {text && <p className="text-orange-400 font-medium animate-pulse">{text}</p>}
    </div>
  )
}

export function ShadowSpeakLoader({ text = "Connecting to ShadowSpeak..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="relative">
        {/* Glowing background */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-xl animate-pulse"></div>

        {/* Main spinner */}
        <div className="relative w-20 h-20 border-4 border-gray-800 rounded-full animate-spin">
          <div className="absolute inset-0 border-4 border-transparent border-t-orange-500 border-r-red-500 rounded-full animate-spin"></div>
        </div>

        {/* Inner elements */}
        <div className="absolute inset-4 w-12 h-12 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-full animate-pulse"></div>
        <div className="absolute inset-6 w-8 h-8 border-2 border-orange-400 rounded-full animate-spin animate-reverse"></div>
        <div className="absolute inset-8 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
          ShadowSpeak
        </h3>
        <p className="text-gray-400 animate-pulse">{text}</p>
      </div>
    </div>
  )
}
