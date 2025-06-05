import { Shield, Sparkles, User, Mail, Lock } from "lucide-react"

export function SignUpLoader() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-orange-500/20 rounded-3xl blur-xl animate-pulse"></div>

          {/* Card Content */}
          <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
            {/* Header Skeleton */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500/50 to-red-500/50 rounded-2xl flex items-center justify-center animate-pulse">
                  <Shield className="w-8 h-8 text-white/50" />
                </div>
              </div>

              <div className="w-32 h-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded mx-auto mb-4 animate-pulse"></div>
              <div className="w-48 h-8 bg-gradient-to-r from-gray-700 to-gray-800 rounded mx-auto mb-3 animate-pulse"></div>
              <div className="w-64 h-5 bg-gradient-to-r from-gray-800 to-gray-900 rounded mx-auto animate-pulse"></div>
            </div>

            {/* Form Skeleton */}
            <div className="space-y-6">
              {/* Username Field Skeleton */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-orange-400/50" />
                  <div className="w-20 h-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded animate-pulse"></div>
                </div>
                <div className="w-full h-12 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl animate-pulse"></div>
              </div>

              {/* Email Field Skeleton */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-orange-400/50" />
                  <div className="w-24 h-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded animate-pulse"></div>
                </div>
                <div className="w-full h-12 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl animate-pulse"></div>
              </div>

              {/* Password Field Skeleton */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-orange-400/50" />
                  <div className="w-20 h-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded animate-pulse"></div>
                </div>
                <div className="w-full h-12 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl animate-pulse"></div>
                <div className="w-full h-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded mt-3 animate-pulse"></div>
              </div>

              <div className="w-full h-12 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-xl animate-pulse"></div>
            </div>

            {/* Loading Text */}
            <div className="text-center mt-8">
              <div className="flex items-center justify-center gap-2 text-orange-400">
                <Sparkles className="w-5 h-5 animate-spin" />
                <span className="text-lg font-medium">Loading Registration...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
