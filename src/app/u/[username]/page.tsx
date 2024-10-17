'use client'
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import { useCompletion } from 'ai/react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MessageSchema } from '@/schema/messageSchema';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/apiResponse';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const specialChar = '||';
const initialMessageString = 'What is the aim of your life? || How do you find yourself in your life? || What do you think about yourself? ';

const parseStringMessages = (messageString : string) => {
  return messageString.split(specialChar);
}

function SendMessage() {
  const params = useParams<{username : string}>();
  const username = params.username;
  const {toast} = useToast()

  // Handling streaming response using useCompletion hook from Vercel Ai SDK 
  const {complete, completion, error, isLoading: isSuggestLoading} = useCompletion({
    api: '/api/suggest-messages',
    initialCompletion: initialMessageString
  })

  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema)
  })

  const {watch, setValue, reset, getValues, handleSubmit} = form;
  const messageContent = watch('content');

  const handleMessageClick = (message: string) => {
    setValue('content', message);
  }

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: z.infer<typeof MessageSchema>) => {
    setIsLoading(true)
    try {
      const response = await axios.post<ApiResponse>('/api/send-messages', {
        ...data, username
      })

      toast({
        title: response.data.message || 'Message sent successfully',
        variant: 'default'
      })

      reset({ content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: axiosError.response?.data.message || 'Error sending message',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSuggestedMessages = async () => {
    try {
      complete('');
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: axiosError.response?.data.message || 'Error fetching suggested messages',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="container mx-auto my-8 p-6 bg-slate-900 rounded max-w-4xl text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-center text-orange-500">Public profile link</h1>
      
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <FormField 
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-300'>Send Anonymous Message to {username}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Write your message here...'
                    className='resize-none bg-slate-800 text-gray-300 placeholder-gray-500 border border-gray-700 focus:ring-orange-500 focus:border-orange-500'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className='flex justify-center'>
            {isLoading ? (
              <Button disabled className="bg-orange-500">
                <Loader2 className='mr-2 h-4 w-4 animate-spin text-white' />
              </Button>
            ) : (
              <Button 
                type='submit' 
                disabled={isLoading || !messageContent}
                className="bg-orange-500 text-white hover:bg-orange-600"
              >
                Send
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className='space-y-4 my-8'>
        <div className='space-y-2'>
          <Button 
            onClick={fetchSuggestedMessages} 
            className='my-4 bg-slate-800 text-orange-500 hover:bg-black  transition-all ease-in-out border-gray-600'
            
          >
            {isSuggestLoading ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin text-orange-500' />
            ): 'Get Suggested Messages'}
          </Button>
          <p>Click on any message below to select it</p>
        </div>
        <Card className="bg-slate-800 border-gray-700">
          <CardHeader className="text-gray-300">
            <h3 className='text-xl font-bold'>Messages</h3>
          </CardHeader>
          <CardContent className='flex flex-col space-y-4'>
            {error ? (
              <p className='text-red-500'>{error.message}</p>
            ) : (
              parseStringMessages(completion).map((message, index) => (
                <Button
                  key={index}
                  variant='outline'
                  onClick={() => handleMessageClick(message)}
                  className='mb-2 text-black hover:bg-black hover:text-white transition-all ease-in-out border-gray-600'
                >
                  {message}
                </Button>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Separator className='my-6 bg-gray-600' />
      
      <div className='text-center'>
        <div className='mb-4 text-gray-400'>Get Your Message Board</div>
        <Link href={'/sign-up'}>
          <Button className="bg-orange-500 text-white hover:bg-orange-600">
            Create Your Account
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default SendMessage;
