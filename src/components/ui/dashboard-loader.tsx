import { BarChart3, MessageSquare, Calendar, TrendingUp, Zap } from "lucide-react"

export function DashboardLoader() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Skeleton */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500/50 to-red-500/50 rounded-xl flex items-center justify-center animate-pulse">
              <BarChart3 className="w-6 h-6 text-white/50" />
            </div>
            <div>
              <div className="w-48 h-10 bg-gradient-to-r from-gray-700 to-gray-800 rounded mb-2 animate-pulse"></div>
              <div className="w-32 h-5 bg-gradient-to-r from-gray-800 to-gray-900 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: <MessageSquare className="w-6 h-6" />, color: "from-blue-500/30 to-blue-600/30" },
            { icon: <Calendar className="w-6 h-6" />, color: "from-green-500/30 to-green-600/30" },
            { icon: <TrendingUp className="w-6 h-6" />, color: "from-orange-500/30 to-orange-600/30" },
            { icon: <Zap className="w-6 h-6" />, color: "from-purple-500/30 to-purple-600/30" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-br from-gray-900/60 to-black/60 border border-gray-700/50 rounded-2xl animate-pulse"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <div className="text-white/50">{stat.icon}</div>
                </div>
                <div className="w-12 h-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded"></div>
              </div>
              <div className="w-16 h-8 bg-gradient-to-r from-gray-700 to-gray-800 rounded mb-2"></div>
              <div className="w-24 h-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
            </div>
          ))}
        </div>

        {/* Profile URL Skeleton */}
        <div className="p-6 bg-gradient-to-br from-gray-900/60 to-black/60 border border-gray-700/50 rounded-2xl mb-8 animate-pulse">
          <div className="w-48 h-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded mb-4"></div>
          <div className="flex gap-3">
            <div className="flex-1 h-12 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl"></div>
            <div className="w-24 h-12 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-xl"></div>
          </div>
        </div>

        {/* Settings Skeleton */}
        <div className="p-6 bg-gradient-to-br from-gray-900/60 to-black/60 border border-gray-700/50 rounded-2xl mb-8 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="w-40 h-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded"></div>
            <div className="w-12 h-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full"></div>
          </div>
        </div>

        {/* Messages Skeleton */}
        <div className="space-y-6">
          <div className="w-32 h-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-gray-900/60 to-black/60 border border-gray-700/50 rounded-2xl animate-pulse"
              >
                <div className="w-20 h-5 bg-gradient-to-r from-gray-700 to-gray-800 rounded mb-4"></div>
                <div className="space-y-2 mb-4">
                  <div className="w-full h-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
                  <div className="w-3/4 h-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
                  <div className="w-1/2 h-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-16 h-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
