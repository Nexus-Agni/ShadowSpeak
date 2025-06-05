"use client"
import { useToast } from "@/hooks/use-toast"
import { SignInSchema } from "@/schema/signInSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import type * as z from "zod"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Eye, EyeOff, Shield, Mail, Lock, ArrowRight, Sparkles } from "lucide-react"

export default function SignIn() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  })

  const { toast } = useToast()

  // OnSubmit function
  const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
    setIsLoading(true)
    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      })

      if (result?.error) {
        if (result?.error === "CredentialsSignin") {
          toast({
            title: "Invalid credentials",
            description: "Please check your credentials and try again",
            variant: "destructive",
          })
        } else {
          toast({
            title: "Error",
            description: result?.error,
            variant: "destructive",
          })
        }
      }

      if (result?.url) {
        toast({
          title: "Welcome back!",
          description: "You have been successfully signed in.",
        })
        router.replace("/dashboard")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-orange-600/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Background */}
      <div className="fixed inset-0 opacity-10">
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

      <div className="w-full max-w-md relative z-10">
        {/* Main Card */}
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-orange-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>

          {/* Card Content */}
          <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur opacity-50 animate-pulse"></div>
                </div>
              </div>

              {/* Badge */}
              <Badge className="bg-orange-500/10 text-orange-300 border border-orange-500/20 mb-4">
                <Sparkles className="w-3 h-3 mr-1" />
                Secure Login
              </Badge>

              {/* Title */}
              <h1 className="text-4xl font-black mb-3">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Welcome Back
                </span>
              </h1>

              <p className="text-gray-400 text-lg">Sign in to continue your anonymous conversations</p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Email/Username Field */}
                <FormField
                  name="identifier"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4 text-orange-400" />
                        Email or Username
                      </FormLabel>
                      <div className="relative group">
                        <Input
                          {...field}
                          placeholder="Enter your email or username"
                          className="bg-gray-800/50 border border-gray-600/50 text-white placeholder:text-gray-500 rounded-xl h-12 pl-4 pr-4 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 group-hover:border-gray-500/70"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 font-medium flex items-center gap-2">
                        <Lock className="w-4 h-4 text-orange-400" />
                        Password
                      </FormLabel>
                      <div className="relative group">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="bg-gray-800/50 border border-gray-600/50 text-white placeholder:text-gray-500 rounded-xl h-12 pl-4 pr-12 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 group-hover:border-gray-500/70"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors duration-200"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Forgot Password Link */}
                <div className="text-right">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200"
                  >
                    Forgot your password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing In...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                </Button>
              </form>
            </Form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-r from-gray-900/80 to-black/80 text-gray-400">
                  New to ShadowSpeak?
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-400 mb-4">Join thousands of users sharing feedback anonymously</p>
              <Link href="/sign-up">
                <Button
                  variant="outline"
                  className="group relative bg-transparent text-gray-300 border border-gray-600 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 rounded-xl px-6 py-2"
                >
                  <span className="flex items-center gap-2">
                    Create Account
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </Button>
              </Link>
            </div>

            {/* Security Notice */}
            <div className="mt-8 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-300">Secure & Anonymous</p>
                  <p className="text-xs text-gray-400">Your privacy is protected with end-to-end encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
