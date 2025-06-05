import { MessageSquare, Sparkles, RefreshCw } from "lucide-react"

export function SendMessageLoader() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500/50 to-red-500/50 rounded-2xl flex items-center justify-center animate-pulse">
              <MessageSquare className="w-10 h-10 text-white/50" />
            </div>
          </div>

          <div className="w-40 h-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded mx-auto mb-4 animate-pulse"></div>
          <div className="w-64 h-10 bg-gradient-to-r from-gray-700 to-gray-800 rounded mx-auto mb-3 animate-pulse"></div>
          <div className="w-80 h-5 bg-gradient-to-r from-gray-800 to-gray-900 rounded mx-auto animate-pulse"></div>
        </div>

        {/* Message Form Skeleton */}
        <div className="p-6 md:p-8 bg-gradient-to-br from-gray-900/60 to-black/60 border border-gray-700/50 rounded-2xl mb-12 animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="w-40 h-5 bg-gradient-to-r from-gray-700 to-gray-800 rounded"></div>
            <div className="w-16 h-5 bg-gradient-to-r from-gray-700 to-gray-800 rounded"></div>
          </div>

          <div className="w-full h-32 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl mb-6"></div>

          <div className="flex justify-end">
            <div className="w-32 h-10 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-lg"></div>
          </div>
        </div>

        {/* Suggestions Skeleton */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="w-48 h-8 bg-gradient-to-r from-gray-700 to-gray-800 rounded animate-pulse"></div>
            <div className="w-40 h-10 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg animate-pulse"></div>
          </div>

          <div className="p-6 bg-gradient-to-br from-gray-900/60 to-black/60 border border-gray-700/50 rounded-2xl animate-pulse">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                <Sparkles className="w-5 h-5 text-blue-400/50" />
              </div>
              <div>
                <div className="w-48 h-5 bg-gradient-to-r from-gray-700 to-gray-800 rounded mb-2"></div>
                <div className="w-32 h-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
              </div>
            </div>

            <div className="flex items-center justify-center py-8">
              <div className="flex flex-col items-center gap-4">
                <RefreshCw className="w-10 h-10 text-gray-600 animate-spin" />
                <div className="w-48 h-5 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gray-800/50 my-12"></div>

        <div className="text-center">
          <div className="w-40 h-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded mx-auto mb-4 animate-pulse"></div>
          <div className="w-64 h-8 bg-gradient-to-r from-gray-700 to-gray-800 rounded mx-auto mb-3 animate-pulse"></div>
          <div className="w-80 h-5 bg-gradient-to-r from-gray-800 to-gray-900 rounded mx-auto mb-6 animate-pulse"></div>
          <div className="w-48 h-10 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-lg mx-auto"></div>
        </div>
      </div>
    </div>
  )
}
