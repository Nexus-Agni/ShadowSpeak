'use client'
import { useToast } from '@/hooks/use-toast'
import { SignUpSchema } from '@/schema/signUpSchema'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {useForm } from 'react-hook-form'
import {useDebounceCallback} from 'usehooks-ts'
import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/apiResponse'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function signUpForm() {
    const [username, setUsername] = useState('')
    const [usernameMessage, setUsernameMessage] = useState('')
    const [isCheckingUsername, setIsCheckingUsername] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const debounced = useDebounceCallback(setUsername, 500)

    const router = useRouter()
    const {toast} = useToast()

    const form = useForm<z.infer<typeof SignUpSchema>> ({
        resolver : zodResolver(SignUpSchema),
        defaultValues : {
            username : '',
            email : '',
            password : ''
        }
    })

    // check username unique
    useEffect(() => {
        const checkUsernameUnique = async () => {
            if (username.length > 0) {
                setIsCheckingUsername(true)
                setUsernameMessage('') //reset message
                try {
                    const response = await axios.get<ApiResponse>(`/api/check-username-unique?username=${username}`)
                    setUsernameMessage(response.data.message)
                } catch (error) {
                    const axiosError = error as AxiosError<ApiResponse>
                    setUsernameMessage(axiosError.response?.data.message || 'Error checking username')
                } finally {
                    setIsCheckingUsername(false)
                }
            }
        }
        checkUsernameUnique()
    },[username])

    const onsubmit = async (data : z.infer<typeof SignUpSchema>) => {
        setIsSubmitting(true)
        try {
            const response = await axios.post('/api/sign-up', data)
            toast({
                title : 'Success',
                description : response.data.message,
                variant : 'default'
            })

            router.replace(`/verify/${username}`)
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message || 'Error signing up. Please try again later.'
            toast ({
                title : "Sign Up failed",
                description : errorMessage,
                variant : 'destructive'
            })
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-800'>
            <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
                <div className='text-center'>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-orange-500">
                        Step into the Shadows
                    </h1>
                    <p className='mb-4 text-orange-400'>Sign Up join ShadowSpeak and Let Your Voice Be Heard</p>
                </div>
                {/* <FormProvider {...form}>  */}
                <Form {...form}>
                    
                    <form onSubmit={form.handleSubmit(onsubmit)} className='space-y-6'>

                    {/* // Username Field */}
                    <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className='text-orange-600'>Username</FormLabel>
                        <Input
                            {...field}
                            onChange={(e) => {
                            field.onChange(e);
                            setUsername(e.target.value);
                            }}
                        />
                        {isCheckingUsername && <Loader2 className="animate-spin" />}
                        {!isCheckingUsername && usernameMessage && (
                            <p
                            className={`text-sm ${
                                usernameMessage === 'Username is available'
                                ? 'text-green-500'
                                : 'text-red-500'
                            }`}
                            >
                            {usernameMessage}
                            </p>
                        )}
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    {/* // Email Field */}
                    <FormField 
                    name='email'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className='text-orange-600'>Email</FormLabel>
                        <Input
                            {...field}
                            name='email'
                            type='email'
                        />
                        <p className='text-muted text-gray-400 text-sm'>We will send you a vefication code</p>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    {/* // Password Field */}
                    <FormField 
                    name='password'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className='text-orange-600'>Password</FormLabel>
                        <Input
                            {...field}
                            type='password'
                        />
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <Button type="submit" disabled={isSubmitting} className='w-full bg-orange-500 hover:bg-orange-600 transition-all duration-300'>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin mr-2 h-2 w-4" />
                                Please wait
                            </>
                        ) : (
                            'Sign Up'
                        )}
                    </Button>
                    </form>
                    
                </Form>
                {/* </FormProvider> */}
                <div className="text-center mt-4">
                <p>
                    Already a member?{' '}
                    <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
                    Sign in
                    </Link>
                </p>
                </div>
            </div>
        </div>
    )
}

export default signUpForm
