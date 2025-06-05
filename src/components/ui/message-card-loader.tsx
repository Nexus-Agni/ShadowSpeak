import { Clock } from "lucide-react"

export function MessageCardLoader({ viewMode = "grid" }: { viewMode?: "grid" | "list" }) {
  if (viewMode === "list") {
    return (
      <div className="p-6 bg-gradient-to-br from-gray-900/60 to-black/60 border border-gray-700/50 backdrop-blur-sm rounded-2xl animate-pulse">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-20 h-5 bg-gradient-to-r from-gray-700 to-gray-800 rounded"></div>
              <div className="w-16 h-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
            </div>

            {/* Content */}
            <div className="space-y-2 mb-6">
              <div className="w-full h-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
              <div className="w-3/4 h-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
              <div className="w-1/2 h-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg"></div>
              ))}
            </div>
          </div>

          <div className="w-8 h-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900/60 to-black/60 border border-gray-700/50 backdrop-blur-sm rounded-2xl animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-20 h-5 bg-gradient-to-r from-gray-700 to-gray-800 rounded"></div>
        <div className="w-8 h-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg"></div>
      </div>

      {/* Content */}
      <div className="space-y-2 mb-6">
        <div className="w-full h-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
        <div className="w-3/4 h-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
        <div className="w-1/2 h-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-8 h-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg"></div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3 text-gray-600" />
          <div className="w-16 h-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
        </div>
      </div>
    </div>
  )
}
