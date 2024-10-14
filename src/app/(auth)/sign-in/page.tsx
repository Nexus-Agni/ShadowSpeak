'use client'
import { useToast } from '@/hooks/use-toast';
import { SignInSchema } from '@/schema/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SignIn() {
    const router = useRouter();

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            identifier: '',
            password: ''
        }
    })

    const { toast } = useToast();

    // OnSubmit function
    const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
        const result = await signIn('credentials', {
            redirect: false,
            identifier: data.identifier,
            password: data.password
        })

        if (result?.error) {
            if (result?.error === 'CredentialsSignin') {
                toast({
                    title: 'Invalid credentials',
                    description: 'Please check your credentials and try again',
                    variant: 'destructive'
                })
            } else {
                toast({
                    title: 'Error',
                    description: result?.error,
                    variant: 'destructive'
                })
            }
        }

        if (result?.url) {
            router.replace('/dashboard');
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-black ">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-700 bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg border border-white">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-orange-500">
                        Welcome Back to ShadowSpeak
                    </h1>
                    <p className="mb-4 text-gray-300">Sign in to continue your secret conversations</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="identifier"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400">Email/Username</FormLabel>
                                    <Input {...field} className="bg-gray-700 text-gray-200 border-gray-600" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400">Password</FormLabel>
                                    <Input type="password" {...field} className="bg-gray-700 text-gray-200 border-gray-600" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full bg-orange-600 hover:bg-orange-500 text-white" type="submit">
                            Sign In
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p className="text-gray-400">
                        Not a member yet?{' '}
                        <Link href="/sign-up" className="text-orange-500 hover:text-orange-400">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
