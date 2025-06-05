"use client"
import { useToast } from "@/hooks/use-toast"
import type { Message } from "@/model/user.model"
import type { ApiResponse } from "@/types/apiResponse"
import axios, { type AxiosError } from "axios"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import {
  Trash2,
  MessageSquare,
  Clock,
  Star,
  Flag,
  Copy,
  Share2,
  MoreVertical,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Volume2,
  VolumeX,
  Download,
  Archive,
  Pin,
  Tag,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react"

type MessageCardProps = {
  message: Message
  onMessageDelete: (messageId: string) => void
  viewMode?: "grid" | "list"
  className?: string
}

function MessageCard({ message, onMessageDelete, viewMode = "grid", className = "" }: MessageCardProps) {
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [isStarred, setIsStarred] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [isArchived, setIsArchived] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isReading, setIsReading] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [sentiment, setSentiment] = useState<"positive" | "negative" | "neutral" | "question">("neutral")
  const cardRef = useRef<HTMLDivElement>(null)

  const handleDeleteConfirm = async () => {
    setIsDeleting(true)
    try {
      const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
      toast({
        title: "Message deleted successfully",
        description: "The message has been permanently removed.",
        variant: "default",
      })
      onMessageDelete(String(message._id))
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Failed to delete message",
        description: axiosError.response?.data.message || "An error occurred while deleting the message.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.content)
    toast({
      title: "Message copied!",
      description: "Message content has been copied to clipboard",
    })
  }

  const handleShareMessage = () => {
    if (navigator.share) {
      navigator.share({
        title: "Anonymous Message",
        text: message.content,
      })
    } else {
      handleCopyMessage()
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    if (isDisliked) setIsDisliked(false)
    toast({
      title: isLiked ? "Removed like" : "Message liked!",
      description: isLiked ? "Like removed from message" : "You liked this message",
    })
  }

  const handleDislike = () => {
    setIsDisliked(!isDisliked)
    if (isLiked) setIsLiked(false)
    toast({
      title: isDisliked ? "Removed dislike" : "Message disliked",
      description: isDisliked ? "Dislike removed from message" : "You disliked this message",
    })
  }

  const handleStar = () => {
    setIsStarred(!isStarred)
    toast({
      title: isStarred ? "Removed from favorites" : "Added to favorites!",
      description: isStarred ? "Message removed from favorites" : "Message added to your favorites",
    })
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Bookmark removed" : "Message bookmarked!",
      description: isBookmarked ? "Bookmark removed from message" : "Message saved to bookmarks",
    })
  }

  const handlePin = () => {
    setIsPinned(!isPinned)
    toast({
      title: isPinned ? "Message unpinned" : "Message pinned!",
      description: isPinned ? "Message removed from pinned" : "Message pinned to top",
    })
  }

  const handleArchive = () => {
    setIsArchived(!isArchived)
    toast({
      title: isArchived ? "Message unarchived" : "Message archived!",
      description: isArchived ? "Message restored from archive" : "Message moved to archive",
    })
  }

  const handleReadAloud = () => {
    if (isReading) {
      speechSynthesis.cancel()
      setIsReading(false)
      setReadingProgress(0)
    } else {
      const utterance = new SpeechSynthesisUtterance(message.content)
      utterance.onstart = () => setIsReading(true)
      utterance.onend = () => {
        setIsReading(false)
        setReadingProgress(0)
      }
      utterance.onerror = () => {
        setIsReading(false)
        setReadingProgress(0)
        toast({
          title: "Speech synthesis failed",
          description: "Unable to read the message aloud",
          variant: "destructive",
        })
      }
      speechSynthesis.speak(utterance)
    }
  }

  // Analyze message sentiment
  useEffect(() => {
    const content = message.content.toLowerCase()
    if (content.includes("?")) {
      setSentiment("question")
    } else if (
      content.includes("thank") ||
      content.includes("great") ||
      content.includes("awesome") ||
      content.includes("love") ||
      content.includes("excellent")
    ) {
      setSentiment("positive")
    } else if (
      content.includes("bad") ||
      content.includes("terrible") ||
      content.includes("hate") ||
      content.includes("awful") ||
      content.includes("worst")
    ) {
      setSentiment("negative")
    } else {
      setSentiment("neutral")
    }
  }, [message.content])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
    const diffMinutes = Math.ceil(diffTime / (1000 * 60))

    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return "Yesterday"
    if (diffDays <= 7) return `${diffDays}d ago`
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const getSentimentConfig = () => {
    switch (sentiment) {
      case "positive":
        return {
          bg: "from-green-500/10 to-emerald-500/10",
          border: "border-green-500/20",
          badge: "bg-green-500/20 text-green-300 border-green-500/30",
          icon: <CheckCircle className="w-3 h-3" />,
          type: "Positive",
          glow: "shadow-green-500/10",
        }
      case "negative":
        return {
          bg: "from-red-500/10 to-rose-500/10",
          border: "border-red-500/20",
          badge: "bg-red-500/20 text-red-300 border-red-500/30",
          icon: <XCircle className="w-3 h-3" />,
          type: "Critical",
          glow: "shadow-red-500/10",
        }
      case "question":
        return {
          bg: "from-blue-500/10 to-cyan-500/10",
          border: "border-blue-500/20",
          badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
          icon: <Info className="w-3 h-3" />,
          type: "Question",
          glow: "shadow-blue-500/10",
        }
      default:
        return {
          bg: "from-gray-500/10 to-slate-500/10",
          border: "border-gray-500/20",
          badge: "bg-gray-500/20 text-gray-300 border-gray-500/30",
          icon: <MessageSquare className="w-3 h-3" />,
          type: "Feedback",
          glow: "shadow-gray-500/10",
        }
    }
  }

  const sentimentConfig = getSentimentConfig()
  const isLongMessage = message.content.length > 200
  const displayContent = isExpanded || !isLongMessage ? message.content : `${message.content.slice(0, 200)}...`

  if (viewMode === "list") {
    return (
      <Card
        ref={cardRef}
        className={`group relative bg-gradient-to-br from-gray-900/80 to-black/80 border ${sentimentConfig.border} backdrop-blur-xl hover:border-opacity-70 transition-all duration-500 rounded-2xl overflow-hidden ${sentimentConfig.glow} hover:shadow-2xl ${className}`}
      >
        {/* Animated Background Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${sentimentConfig.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Pin Indicator */}
        {isPinned && (
          <div className="absolute top-4 right-4 z-20">
            <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse" />
          </div>
        )}

        {/* Reading Progress Bar */}
        {isReading && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 z-20">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300"
              style={{ width: `${readingProgress}%` }}
            />
          </div>
        )}

        <CardContent className="relative z-10 p-6">
          <div className="flex items-start justify-between gap-4">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <Badge className={sentimentConfig.badge}>
                  {sentimentConfig.icon}
                  <span className="ml-1">{sentimentConfig.type}</span>
                </Badge>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="w-3 h-3" />
                  {formatDate(
                    typeof message.createdAt === "string"
                      ? message.createdAt
                      : message.createdAt.toISOString()
                  )}
                </div>

                {isPinned && (
                  <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                    <Pin className="w-3 h-3 mr-1" />
                    Pinned
                  </Badge>
                )}

                {isArchived && (
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    <Archive className="w-3 h-3 mr-1" />
                    Archived
                  </Badge>
                )}
              </div>

              {/* Message Content */}
              <div className="mb-6">
                <p className="text-white text-lg leading-relaxed whitespace-pre-wrap">{displayContent}</p>

                {isLongMessage && (
                  <Button
                    onClick={() => setIsExpanded(!isExpanded)}
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 p-0 h-auto font-medium"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </Button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  onClick={handleLike}
                  variant="ghost"
                  size="sm"
                  className={`group/btn p-2 rounded-lg transition-all duration-200 ${
                    isLiked
                      ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      : "hover:bg-gray-700 text-gray-400 hover:text-green-400"
                  }`}
                >
                  <ThumbsUp
                    className={`w-4 h-4 transition-transform group-hover/btn:scale-110 ${isLiked ? "fill-current" : ""}`}
                  />
                </Button>

                <Button
                  onClick={handleDislike}
                  variant="ghost"
                  size="sm"
                  className={`group/btn p-2 rounded-lg transition-all duration-200 ${
                    isDisliked
                      ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      : "hover:bg-gray-700 text-gray-400 hover:text-red-400"
                  }`}
                >
                  <ThumbsDown
                    className={`w-4 h-4 transition-transform group-hover/btn:scale-110 ${isDisliked ? "fill-current" : ""}`}
                  />
                </Button>

                <Button
                  onClick={handleStar}
                  variant="ghost"
                  size="sm"
                  className={`group/btn p-2 rounded-lg transition-all duration-200 ${
                    isStarred
                      ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                      : "hover:bg-gray-700 text-gray-400 hover:text-yellow-400"
                  }`}
                >
                  <Star
                    className={`w-4 h-4 transition-transform group-hover/btn:scale-110 ${isStarred ? "fill-current" : ""}`}
                  />
                </Button>

                <Button
                  onClick={handleBookmark}
                  variant="ghost"
                  size="sm"
                  className={`group/btn p-2 rounded-lg transition-all duration-200 ${
                    isBookmarked
                      ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                      : "hover:bg-gray-700 text-gray-400 hover:text-blue-400"
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 transition-transform group-hover/btn:scale-110 ${isBookmarked ? "fill-current" : ""}`}
                  />
                </Button>

                <Button
                  onClick={handleCopyMessage}
                  variant="ghost"
                  size="sm"
                  className="group/btn p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-orange-400 transition-all duration-200"
                >
                  <Copy className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                </Button>

                <Button
                  onClick={handleReadAloud}
                  variant="ghost"
                  size="sm"
                  className={`group/btn p-2 rounded-lg transition-all duration-200 ${
                    isReading
                      ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                      : "hover:bg-gray-700 text-gray-400 hover:text-purple-400"
                  }`}
                >
                  {isReading ? (
                    <VolumeX className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                  ) : (
                    <Volume2 className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                  )}
                </Button>
              </div>
            </div>

            {/* More Actions Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800/95 backdrop-blur-xl border-gray-700 rounded-xl shadow-2xl">
                <DropdownMenuItem onClick={handlePin} className="text-gray-300 hover:bg-gray-700 rounded-lg">
                  <Pin className="w-4 h-4 mr-2" />
                  {isPinned ? "Unpin" : "Pin"} Message
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleArchive} className="text-gray-300 hover:bg-gray-700 rounded-lg">
                  <Archive className="w-4 h-4 mr-2" />
                  {isArchived ? "Unarchive" : "Archive"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleShareMessage} className="text-gray-300 hover:bg-gray-700 rounded-lg">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Message
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 rounded-lg">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 rounded-lg">
                  <Tag className="w-4 h-4 mr-2" />
                  Add Tag
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 rounded-lg">
                  <Flag className="w-4 h-4 mr-2" />
                  Report
                </DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      onSelect={(e: { preventDefault: () => any }) => e.preventDefault()}
                      className="text-red-400 hover:bg-red-500/20 rounded-lg focus:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Message
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-gray-900/95 backdrop-blur-xl border-gray-700 rounded-2xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        Delete Message
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-400">
                        This action cannot be undone. This will permanently delete this anonymous message from your
                        dashboard.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteConfirm}
                        disabled={isDeleting}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                      >
                        {isDeleting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Message
                          </>
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Grid View (Default)
  return (
    <Card
      ref={cardRef}
      className={`group relative bg-gradient-to-br from-gray-900/80 to-black/80 border ${sentimentConfig.border} backdrop-blur-xl hover:border-opacity-70 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${sentimentConfig.glow} rounded-2xl overflow-hidden ${className}`}
    >
      {/* Animated Background Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${sentimentConfig.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Pin Indicator */}
      {isPinned && (
        <div className="absolute top-4 right-4 z-20">
          <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse" />
        </div>
      )}

      {/* Reading Progress Bar */}
      {isReading && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 z-20">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
      )}

      <CardHeader className="relative z-10 pb-4">
        <div className="flex items-center justify-between mb-3">
          <Badge className={sentimentConfig.badge}>
            {sentimentConfig.icon}
            <span className="ml-1">{sentimentConfig.type}</span>
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800/95 backdrop-blur-xl border-gray-700 rounded-xl shadow-2xl">
              <DropdownMenuItem onClick={handlePin} className="text-gray-300 hover:bg-gray-700 rounded-lg">
                <Pin className="w-4 h-4 mr-2" />
                {isPinned ? "Unpin" : "Pin"} Message
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleArchive} className="text-gray-300 hover:bg-gray-700 rounded-lg">
                <Archive className="w-4 h-4 mr-2" />
                {isArchived ? "Unarchive" : "Archive"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleShareMessage} className="text-gray-300 hover:bg-gray-700 rounded-lg">
                <Share2 className="w-4 h-4 mr-2" />
                Share Message
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 rounded-lg">
                <Download className="w-4 h-4 mr-2" />
                Export
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 rounded-lg">
                <Tag className="w-4 h-4 mr-2" />
                Add Tag
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 rounded-lg">
                <Flag className="w-4 h-4 mr-2" />
                Report
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e: { preventDefault: () => any }) => e.preventDefault()}
                    className="text-red-400 hover:bg-red-500/20 rounded-lg focus:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Message
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-900/95 backdrop-blur-xl border-gray-700 rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      Delete Message
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                      This action cannot be undone. This will permanently delete this anonymous message from your
                      dashboard.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteConfirm}
                      disabled={isDeleting}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                    >
                      {isDeleting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Message
                        </>
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-3">
          {isPinned && (
            <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
              <Pin className="w-3 h-3 mr-1" />
              Pinned
            </Badge>
          )}

          {isArchived && (
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Archive className="w-3 h-3 mr-1" />
              Archived
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="relative z-10 pb-4">
        <p className="text-white text-lg leading-relaxed mb-6 line-clamp-4 whitespace-pre-wrap">{displayContent}</p>

        {isLongMessage && (
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="ghost"
            size="sm"
            className="mb-4 text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 p-0 h-auto font-medium"
          >
            {isExpanded ? "Show less" : "Read more"}
          </Button>
        )}
      </CardContent>

      <CardFooter className="relative z-10 pt-0">
        <div className="w-full space-y-4">
          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                onClick={handleLike}
                variant="ghost"
                size="sm"
                className={`group/btn p-2 rounded-lg transition-all duration-200 ${
                  isLiked
                    ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                    : "hover:bg-gray-700 text-gray-400 hover:text-green-400"
                }`}
              >
                <ThumbsUp
                  className={`w-4 h-4 transition-transform group-hover/btn:scale-110 ${isLiked ? "fill-current" : ""}`}
                />
              </Button>

              <Button
                onClick={handleDislike}
                variant="ghost"
                size="sm"
                className={`group/btn p-2 rounded-lg transition-all duration-200 ${
                  isDisliked
                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    : "hover:bg-gray-700 text-gray-400 hover:text-red-400"
                }`}
              >
                <ThumbsDown
                  className={`w-4 h-4 transition-transform group-hover/btn:scale-110 ${isDisliked ? "fill-current" : ""}`}
                />
              </Button>

              <Button
                onClick={handleStar}
                variant="ghost"
                size="sm"
                className={`group/btn p-2 rounded-lg transition-all duration-200 ${
                  isStarred
                    ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                    : "hover:bg-gray-700 text-gray-400 hover:text-yellow-400"
                }`}
              >
                <Star
                  className={`w-4 h-4 transition-transform group-hover/btn:scale-110 ${isStarred ? "fill-current" : ""}`}
                />
              </Button>

              <Button
                onClick={handleBookmark}
                variant="ghost"
                size="sm"
                className={`group/btn p-2 rounded-lg transition-all duration-200 ${
                  isBookmarked
                    ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                    : "hover:bg-gray-700 text-gray-400 hover:text-blue-400"
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 transition-transform group-hover/btn:scale-110 ${isBookmarked ? "fill-current" : ""}`}
                />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={handleCopyMessage}
                variant="ghost"
                size="sm"
                className="group/btn p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-orange-400 transition-all duration-200"
              >
                <Copy className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
              </Button>

              <Button
                onClick={handleReadAloud}
                variant="ghost"
                size="sm"
                className={`group/btn p-2 rounded-lg transition-all duration-200 ${
                  isReading
                    ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                    : "hover:bg-gray-700 text-gray-400 hover:text-purple-400"
                }`}
              >
                {isReading ? (
                  <VolumeX className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                ) : (
                  <Volume2 className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                )}
              </Button>
            </div>
          </div>

          {/* Timestamp */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="w-3 h-3" />
            {formatDate(
              typeof message.createdAt === "string"
                ? message.createdAt
                : message.createdAt.toISOString()
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default MessageCard
