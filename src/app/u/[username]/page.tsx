"use client"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { useCompletion } from "ai/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type * as z from "zod"
import { MessageSchema } from "@/schema/messageSchema"
import axios, { type AxiosError } from "axios"
import type { ApiResponse } from "@/types/apiResponse"
import { useToast } from "@/hooks/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import {
  MessageSquare,
  Sparkles,
  Send,
  RefreshCw,
  Shield,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Loader2,
  ChevronRight,
  ArrowRight,
} from "lucide-react"
import { ShadowSpeakLoader } from "@/components/ui/shadowspeak-loader"

const specialChar = "||"
const initialMessageString =
  "What is the aim of your life? || How do you find yourself in your life? || What do you think about yourself? "

const parseStringMessages = (messageString: string) => {
  return messageString.split(specialChar).filter((msg) => msg.trim().length > 0)
}

function SendMessage() {
  const params = useParams<{ username: string }>()
  const username = params.username
  const { toast } = useToast()
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [isAcceptingMessages, setIsAcceptingMessages] = useState(true)
  const [characterCount, setCharacterCount] = useState(0)
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isAnonymous, setIsAnonymous] = useState(true)

  // Handling streaming response using useCompletion hook from Vercel Ai SDK
  const {
    complete,
    completion,
    error,
    isLoading: isSuggestLoading,
  } = useCompletion({
    api: "/api/suggest-messages",
    initialCompletion: initialMessageString,
  })

  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      content: "",
    },
  })

  const { watch, setValue, reset, handleSubmit } = form
  const messageContent = watch("content")

  useEffect(() => {
    // Check if user is accepting messages
    const checkUserStatus = async () => {
      try {
        const response = await axios.get<ApiResponse>(`/api/check-user-status/?username=${username}`)
        setIsAcceptingMessages(response.data.isAcceptingMessages ?? false)
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
        toast({
          title: "Error",
          description: axiosError.response?.data.message || "Could not verify user status",
          variant: "destructive",
        })
        setIsAcceptingMessages(false)
      } finally {
        setIsPageLoading(false)
      }
    }

    checkUserStatus()
  }, [username, toast])

  useEffect(() => {
    setCharacterCount(messageContent?.length || 0)
  }, [messageContent])

  const handleMessageClick = (message: string, index: number) => {
    setValue("content", message)
    setSelectedSuggestion(index)
  }

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: z.infer<typeof MessageSchema>) => {
    setIsLoading(true)
    try {
      const response = await axios.post<ApiResponse>("/api/send-messages", {
        ...data,
        username,
        anonymous: isAnonymous,
      })

      toast({
        title: "Message sent successfully!",
        description: "Your anonymous message has been delivered.",
        variant: "default",
      })

      reset({ content: "" })
      setSelectedSuggestion(null)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Failed to send message",
        description: axiosError.response?.data.message || "An error occurred while sending your message",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSuggestedMessages = async () => {
    try {
      complete("")
      setSelectedSuggestion(null)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error fetching suggestions",
        description: axiosError.response?.data.message || "Could not generate message suggestions",
        variant: "destructive",
      })
    }
  }

  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <ShadowSpeakLoader text={`Loading @${username}'s profile...`} />
      </div>
    )
  }

  if (!isAcceptingMessages) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Card className="relative bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-700/50 backdrop-blur-xl rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-3xl"></div>
            <CardContent className="pt-8 pb-8 px-6 relative z-10 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <EyeOff className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Messages Disabled</h2>
              <p className="text-gray-400 mb-6">
                @{username} is not currently accepting anonymous messages. Please check back later.
              </p>
              <Link href="/">
                <Button className="group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white transition-all duration-300 transform hover:scale-105">
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                  Return Home
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-md blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

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

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full max-w-md max-h-md">
              {[...Array(50)].map((_, i) => {
                const size = Math.random() * 10 + 5
                const left = Math.random() * 100
                const animationDuration = Math.random() * 3 + 2
                const delay = Math.random() * 0.5
                const color = i % 3 === 0 ? "#f97316" : i % 3 === 1 ? "#ef4444" : "#ffffff"

                return (
                  <div
                    key={i}
                    className="absolute animate-confetti"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      backgroundColor: color,
                      left: `${left}%`,
                      top: "-20px",
                      opacity: Math.random() * 0.7 + 0.3,
                      borderRadius: Math.random() > 0.5 ? "50%" : "0",
                      animation: `confetti ${animationDuration}s ease-in-out ${delay}s forwards`,
                    }}
                  />
                )
              })}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur opacity-50 animate-pulse"></div>
            </div>
          </div>

          <Badge className="bg-orange-500/10 text-orange-300 border border-orange-500/20 mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            Anonymous Messaging
          </Badge>

          <h1 className="text-4xl md:text-5xl font-black mb-3">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Send to</span>{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              @{username}
            </span>
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Share your thoughts, feedback, or questions anonymously. Your identity will remain completely hidden.
          </p>
        </div>

        <Card className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-700/50 backdrop-blur-xl hover:border-orange-500/30 transition-all duration-500 rounded-2xl mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <CardContent className="relative z-10 p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-orange-400" />
                    <FormLabel className="text-gray-300 font-medium">Your Anonymous Message</FormLabel>
                  </div>

                  <div
                    className={`text-sm font-mono ${
                      characterCount > 500 ? "text-red-400" : characterCount > 400 ? "text-orange-400" : "text-gray-400"
                    }`}
                  >
                    {characterCount}/500
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Write your anonymous message here..."
                          className="min-h-32 bg-gray-800/50 border border-gray-600/50 text-white placeholder:text-gray-500 rounded-xl focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                          maxLength={500}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      onClick={() => setIsAnonymous(!isAnonymous)}
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 text-gray-300 hover:bg-gray-800 transition-colors"
                    >
                      {isAnonymous ? (
                        <>
                          <Eye className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">Anonymous</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-4 h-4 text-red-400" />
                          <span className="text-red-400">Not Anonymous</span>
                        </>
                      )}
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || !messageContent || characterCount > 500}
                    className="group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25 w-full sm:w-auto"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                          Send Message
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-md blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-orange-400" />
              Suggested Messages
            </h2>

            <Button
              onClick={fetchSuggestedMessages}
              disabled={isSuggestLoading}
              className="group relative bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white border border-gray-600 hover:border-orange-500/50 transition-all duration-300"
              variant="outline"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 transition-transform duration-300 ${
                  isSuggestLoading ? "animate-spin" : "group-hover:rotate-180"
                }`}
              />
              {isSuggestLoading ? "Generating..." : "Get New Suggestions"}
            </Button>
          </div>

          <Card className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-700/50 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-500 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <CardHeader className="relative z-10 border-b border-gray-700/50 bg-gradient-to-r from-gray-900 to-black">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">AI-Generated Suggestions</h3>
                  <p className="text-gray-400 text-sm">Click on any message to use it</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative z-10 p-6">
              {isSuggestLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 border-4 border-gray-700 rounded-full animate-spin border-t-transparent"></div>
                      <div className="absolute inset-2 w-8 h-8 border-4 border-orange-500 rounded-full animate-spin border-t-transparent animate-reverse"></div>
                    </div>
                    <p className="text-gray-400">Generating creative suggestions...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-8">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <AlertTriangle className="w-12 h-12 text-red-400" />
                    <div>
                      <p className="text-red-400 font-medium">Failed to generate suggestions</p>
                      <p className="text-gray-500 mt-2">{error.message}</p>
                    </div>
                    <Button
                      onClick={fetchSuggestedMessages}
                      className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white border border-gray-600"
                      variant="outline"
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {parseStringMessages(completion).map((message, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleMessageClick(message, index)}
                      className={`group relative h-auto py-4 px-5 text-left justify-start bg-gradient-to-br from-gray-800/80 to-black/80 border ${
                        selectedSuggestion === index
                          ? "border-orange-500/50 shadow-lg shadow-orange-500/10"
                          : "border-gray-700/50 hover:border-gray-500/70"
                      } rounded-xl transition-all duration-300`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-xl opacity-0 ${
                          selectedSuggestion === index ? "opacity-100" : "group-hover:opacity-50"
                        } transition-opacity duration-300`}
                      ></div>
                      <div className="relative z-10 flex items-start gap-3">
                        <div
                          className={`mt-1 w-4 h-4 rounded-full ${
                            selectedSuggestion === index
                              ? "bg-gradient-to-r from-orange-400 to-red-400"
                              : "border border-gray-600 group-hover:border-orange-500/50"
                          } transition-all duration-300 flex-shrink-0`}
                        >
                          {selectedSuggestion === index && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200">
                          {message}
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12 bg-gray-800/50" />

        <div className="text-center">
          <Badge className="bg-blue-500/10 text-blue-300 border border-blue-500/20 mb-4">
            <Shield className="w-3 h-3 mr-1" />
            ShadowSpeak
          </Badge>

          <h2 className="text-2xl font-bold text-white mb-4">Want your own anonymous message board?</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Create your own ShadowSpeak profile and start receiving anonymous feedback from your audience.
          </p>

          <Link href="/sign-up">
            <Button className="group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25">
              <span className="relative z-10 flex items-center gap-2">
                Create Your Account
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-md blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </Button>
          </Link>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Lock className="w-3 h-3" />
            <span>All messages are encrypted and anonymous</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendMessage
