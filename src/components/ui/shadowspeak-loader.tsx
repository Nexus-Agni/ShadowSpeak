import { cn } from "@/lib/utils"

interface ShadowSpeakLoaderProps {
  className?: string
  text?: string
  size?: "sm" | "md" | "lg"
}

export function ShadowSpeakLoader({ className, text = "Loading ShadowSpeak...", size = "md" }: ShadowSpeakLoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-6", className)}>
      <div className="relative">
        {/* Outer glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-full blur-xl animate-pulse"></div>

        {/* Main spinner container */}
        <div className={cn("relative border-4 border-gray-800 rounded-full animate-spin", sizeClasses[size])}>
          {/* Gradient border */}
          <div className="absolute inset-0 border-4 border-transparent border-t-orange-500 border-r-red-500 rounded-full animate-spin"></div>

          {/* Inner ring */}
          <div className="absolute inset-2 border-2 border-gray-700 rounded-full">
            <div className="absolute inset-0 border-2 border-transparent border-b-orange-400 border-l-red-400 rounded-full animate-spin animate-reverse"></div>
          </div>

          {/* Center dot */}
          <div className="absolute inset-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {text && (
        <div className="text-center space-y-2">
          <p className="text-lg font-medium bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent animate-pulse">
            {text}
          </p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        <ShadowSpeakLoader size="lg" text="Initializing ShadowSpeak..." className="text-white" />
      </div>
    </div>
  )
}

export function ComponentLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <ShadowSpeakLoader size="sm" text={text} className="text-gray-400" />
    </div>
  )
}
