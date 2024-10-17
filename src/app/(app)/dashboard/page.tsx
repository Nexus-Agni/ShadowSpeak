'use client'
import MessageCard from '@/components/MessageCard'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { Message } from '@/model/user.model'
import { acceptMessagesSchema } from '@/schema/acceptMessageSchema'
import { ApiResponse } from '@/types/apiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { Loader2, RefreshCcw } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)

  const { toast } = useToast()
  const { data: session } = useSession()

  // Optimized UI approach -> Show to the user it is done (in the UI level), later do it in the server level
  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId))
  }

  const form = useForm({
    resolver: zodResolver(acceptMessagesSchema)
  })

  const { register, watch, setValue } = form
  const acceptMessages = watch('acceptMessages')

  // To check whether fetching message is allowed or not
  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true)
    try {
      const response = await axios.get<ApiResponse>('/api/accept-messages')
      setValue('acceptMessages', response.data.isAcceptingMessages)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error",
        description: axiosError.response?.data.message || 'Failed to fetch message settings',
        variant: 'destructive'
      })
    } finally {
      setIsSwitchLoading(false)
    }
  }, [setValue, setIsSwitchLoading, toast])

  // Fetching the messages from the server
  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true)
    setIsSwitchLoading(true)
    try {
      const response = await axios.get<ApiResponse>('/api/get-messages')
      setMessages(response.data.messages || [])
      if (refresh) {
        toast({
          title: "Refreshed Messages",
          description: response.data.message || 'Showing latest Messages'
        })
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error",
        description: axiosError.response?.data.message,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
      setIsSwitchLoading(false)
    }
  }, [setIsLoading, setIsSwitchLoading, setMessages, toast])

  // Fetch the initial state from the server 
  useEffect(() => {
    if (!session || !session.user) return
    fetchAcceptMessages()
    fetchMessages()
  }, [session, setValue, toast, fetchAcceptMessages, fetchMessages])

  // Handling switch changing
  const handlingSwitchChanging = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages', {
        acceptMessages: !acceptMessages
      })
      setValue('acceptMessages', !acceptMessages)
      toast({
        title: response.data.message,
        variant: "default"
      })
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "Failed to update message settings",
        variant: 'destructive'
      })
    }
  }

  if (!session || !session.user) {
    return <div>No session or user found.</div>
  }

  const { username } = session.user

  // URL making
  const baseUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  // Copy to clipboard feature
  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: 'URL Copied!',
      description: 'Profile URL has been successfully copied to clipboard'
    })
  }

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-gray-900 text-gray-200 rounded w-full max-w-6xl shadow-md backdrop:blur-md bg-opacity-40">
      <h1 className="text-4xl font-bold mb-4 text-orange-500">User Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 text-orange-400">Copy Your Unique Link</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2 bg-gray-800 text-gray-200"
          />
          <Button onClick={copyToClipboard} className="bg-orange-500 hover:bg-orange-600">
            Copy
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register('acceptMessages')}
          checked={acceptMessages}
          onCheckedChange={handlingSwitchChanging}
          disabled={isSwitchLoading}
          className="bg-orange-700"
          
        />
        <span className="ml-2">
          Accept Messages: {acceptMessages ? 'On' : 'Off'}
        </span>
      </div>
      <Separator className="my-4" />

      <Button
        className="mt-4 bg-gray-700 hover:bg-gray-600"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCard
              key={index} // Consider using unique keys like message._id
              message={message}
              onMessageDelete={handleDeleteMessage}

            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
