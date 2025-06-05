"use client"
import MessageCard from "@/components/MessageCard"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import type { Message } from "@/model/user.model"
import { acceptMessagesSchema } from "@/schema/acceptMessageSchema"
import type { ApiResponse } from "@/types/apiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { type AxiosError } from "axios"
import {
  Copy,
  RefreshCw,
  MessageSquare,
  TrendingUp,
  Share2,
  Settings,
  Eye,
  EyeOff,
  Sparkles,
  Shield,
  Globe,
  BarChart3,
  Calendar,
  Search,
  Download,
  ExternalLink,
  Zap,
} from "lucide-react"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [stats, setStats] = useState({
    totalMessages: 0,
    todayMessages: 0,
    weeklyGrowth: 0,
    responseRate: 0,
  })

  const { toast } = useToast()
  const { data: session } = useSession()

  // Optimized UI approach -> Show to the user it is done (in the UI level), later do it in the server level
  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId))
    // Update stats
    setStats((prev) => ({
      ...prev,
      totalMessages: prev.totalMessages - 1,
    }))
  }

  const form = useForm({
    resolver: zodResolver(acceptMessagesSchema),
  })

  const { register, watch, setValue } = form
  const acceptMessages = watch("acceptMessages")

  // To check whether fetching message is allowed or not
  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true)
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages")
      setValue("acceptMessages", response.data.isAcceptingMessages)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "Failed to fetch message settings",
        variant: "destructive",
      })
    } finally {
      setIsSwitchLoading(false)
    }
  }, [setValue, toast])

  // Fetching the messages from the server
  const fetchMessages = useCallback(
    async (refresh = false) => {
      setIsLoading(true)
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages")
        const fetchedMessages = response.data.messages || []
        setMessages(fetchedMessages)

        // Calculate stats
        const today = new Date().toDateString()
        const todayCount = fetchedMessages.filter(
          (msg: Message) => new Date(msg.createdAt).toDateString() === today,
        ).length

        setStats({
          totalMessages: fetchedMessages.length,
          todayMessages: todayCount,
          weeklyGrowth: Math.floor(Math.random() * 25) + 5, // Mock data
          responseRate: Math.floor(Math.random() * 30) + 70, // Mock data
        })

        if (refresh) {
          toast({
            title: "Messages refreshed!",
            description: "Showing latest messages",
          })
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
        toast({
          title: "Error",
          description: axiosError.response?.data.message || "Failed to fetch messages",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    },
    [toast],
  )

  // Fetch the initial state from the server
  useEffect(() => {
    if (!session || !session.user) return
    fetchAcceptMessages()
    fetchMessages()
  }, [session, fetchAcceptMessages, fetchMessages])

  // Handling switch changing
  const handlingSwitchChanging = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      })
      setValue("acceptMessages", !acceptMessages)
      toast({
        title: response.data.message,
        variant: "default",
      })
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "Failed to update message settings",
        variant: "destructive",
      })
    }
  }

  if (!session || !session.user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400">Please sign in to access your dashboard</p>
        </div>
      </div>
    )
  }

  const { username } = session.user

  // URL making
  const baseUrl = `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ""
  }`
  const profileUrl = `${baseUrl}/u/${username}`

  // Copy to clipboard feature
  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast({
      title: "Link copied!",
      description: "Your profile URL has been copied to clipboard",
    })
  }

  // Filter messages based on search and filter type
  const filteredMessages = messages.filter((message) => {
    const matchesSearch = message.content.toLowerCase().includes(searchTerm.toLowerCase())
    // If Message does not have 'category', only filter by 'all'
    const matchesFilter = filterType === "all"
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-gradient-to-r from-orange-600/5 to-red-600/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Background */}
      <div className="fixed inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(251, 146, 60, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251, 146, 60, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-black">
                    <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Dashboard
                    </span>
                  </h1>
                  <p className="text-gray-400 text-lg">Welcome back, @{username}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Active
                </Badge>
                <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Premium Features
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => fetchMessages(true)}
                disabled={isLoading}
                className="group relative bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white border border-gray-600 hover:border-orange-500/50 transition-all duration-300"
                variant="outline"
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 transition-transform duration-300 ${
                    isLoading ? "animate-spin" : "group-hover:rotate-180"
                  }`}
                />
                Refresh
              </Button>

              <Button
                onClick={copyToClipboard}
                className="group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25"
              >
                <Share2 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                Share Profile
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-md blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: "Total Messages",
              value: stats.totalMessages,
              icon: <MessageSquare className="w-6 h-6" />,
              color: "from-blue-500 to-blue-600",
              bgColor: "from-blue-500/10 to-blue-600/10",
              borderColor: "border-blue-500/20",
              change: "+12%",
              changeColor: "text-green-400",
            },
            {
              title: "Today",
              value: stats.todayMessages,
              icon: <Calendar className="w-6 h-6" />,
              color: "from-green-500 to-green-600",
              bgColor: "from-green-500/10 to-green-600/10",
              borderColor: "border-green-500/20",
              change: "+5",
              changeColor: "text-green-400",
            },
            {
              title: "Weekly Growth",
              value: `${stats.weeklyGrowth}%`,
              icon: <TrendingUp className="w-6 h-6" />,
              color: "from-orange-500 to-orange-600",
              bgColor: "from-orange-500/10 to-orange-600/10",
              borderColor: "border-orange-500/20",
              change: "+8%",
              changeColor: "text-green-400",
            },
            {
              title: "Response Rate",
              value: `${stats.responseRate}%`,
              icon: <Zap className="w-6 h-6" />,
              color: "from-purple-500 to-purple-600",
              bgColor: "from-purple-500/10 to-purple-600/10",
              borderColor: "border-purple-500/20",
              change: "+3%",
              changeColor: "text-green-400",
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className={`group relative p-6 bg-gradient-to-br from-gray-900/60 to-black/60 border ${stat.borderColor} backdrop-blur-sm hover:border-opacity-50 transition-all duration-500 transform hover:scale-105 rounded-2xl`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                    <div className="text-white">{stat.icon}</div>
                  </div>
                  <div className={`text-sm font-medium ${stat.changeColor} flex items-center gap-1`}>
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Profile URL Section */}
        <Card className="group relative p-6 bg-gradient-to-br from-gray-900/60 to-black/60 border border-gray-700/50 backdrop-blur-sm hover:border-orange-500/30 transition-all duration-500 rounded-2xl mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Your Anonymous Profile</h3>
                <p className="text-gray-400">Share this link to receive anonymous messages</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative group">
                <input
                  type="text"
                  value={profileUrl}
                  readOnly
                  className="w-full p-4 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white font-mono text-sm focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 pr-12"
                />
                <ExternalLink className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              <Button
                onClick={copyToClipboard}
                className="group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25"
              >
                <Copy className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Copy Link
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </Button>
            </div>
          </div>
        </Card>

        {/* Settings & Controls */}
        <Card className="group relative p-6 bg-gradient-to-br from-gray-900/60 to-black/60 border border-gray-700/50 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-500 rounded-2xl mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    Message Settings
                    {acceptMessages ? (
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        <Eye className="w-3 h-3 mr-1" />
                        Accepting
                      </Badge>
                    ) : (
                      <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                        <EyeOff className="w-3 h-3 mr-1" />
                        Paused
                      </Badge>
                    )}
                  </h3>
                  <p className="text-gray-400">
                    {acceptMessages
                      ? "You're currently accepting anonymous messages"
                      : "Message receiving is currently paused"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-300">Accept Messages</span>
                  <Switch
                    {...register("acceptMessages")}
                    checked={acceptMessages}
                    onCheckedChange={handlingSwitchChanging}
                    disabled={isSwitchLoading}
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-500 data-[state=checked]:to-green-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Search and Filter Controls */}
        <Card className="group relative p-6 bg-gradient-to-br from-gray-900/60 to-black/60 border border-gray-700/50 backdrop-blur-sm rounded-2xl mb-8">
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                />
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                >
                  <option value="all">All Messages</option>
                  <option value="feedback">Feedback</option>
                  <option value="question">Questions</option>
                  <option value="suggestion">Suggestions</option>
                </select>

                <div className="flex items-center gap-1 p-1 bg-gray-800/50 rounded-lg border border-gray-600/50">
                  <Button
                    onClick={() => setViewMode("grid")}
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    className={`p-2 ${
                      viewMode === "grid" ? "bg-orange-500 hover:bg-orange-600" : "hover:bg-gray-700 text-gray-400"
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => setViewMode("list")}
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    className={`p-2 ${
                      viewMode === "list" ? "bg-orange-500 hover:bg-orange-600" : "hover:bg-gray-700 text-gray-400"
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Messages Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-orange-400" />
                Your Messages
                <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                  {filteredMessages.length}
                </Badge>
              </h2>
              <p className="text-gray-400">Anonymous feedback from your audience</p>
            </div>

            <Button
              variant="outline"
              className="group relative bg-transparent text-gray-300 border border-gray-600 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2 group-hover:translate-y-0.5 transition-transform duration-200" />
              Export
            </Button>
          </div>

          {/* Messages Grid/List */}
          {filteredMessages.length > 0 ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredMessages.map((message, index) => (
                <MessageCard
                  key={message._id ? String(message._id) : String(index)}
                  message={message}
                  onMessageDelete={handleDeleteMessage}
                />
              ))}
            </div>
          ) : (
            <Card className="relative p-12 bg-gradient-to-br from-gray-900/60 to-black/60 border border-gray-700/50 backdrop-blur-sm rounded-2xl text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-2xl opacity-50"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-10 h-10 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">No Messages Yet</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Share your profile link to start receiving anonymous messages from your audience.
                </p>
                <Button
                  onClick={copyToClipboard}
                  className="group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white transition-all duration-300 transform hover:scale-105"
                >
                  <Share2 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                  Share Your Profile
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
