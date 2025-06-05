"use client"
import { Button } from "@/components/ui/button"
import type React from "react"

import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { verifySchema } from "@/schema/verifySchema"
import type { ApiResponse } from "@/types/apiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { type AxiosError } from "axios"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import type * as z from "zod"
import { Mail, CheckCircle, ArrowRight, Sparkles, RefreshCw, Clock, AlertCircle } from "lucide-react"

export default function VerifyCode() {
  const router = useRouter()
  const params = useParams<{ username: string }>()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
  const [canResend, setCanResend] = useState(false)
  const [codeInputs, setCodeInputs] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  })

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Handle individual code input
  const handleCodeInput = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedCode = value.slice(0, 6)
      const newInputs = [...codeInputs]
      for (let i = 0; i < 6; i++) {
        newInputs[i] = pastedCode[i] || ""
      }
      setCodeInputs(newInputs)
      form.setValue("code", newInputs.join(""))

      // Focus last filled input or next empty
      const lastFilledIndex = Math.min(pastedCode.length - 1, 5)
      inputRefs.current[lastFilledIndex]?.focus()
    } else {
      // Handle single character
      const newInputs = [...codeInputs]
      newInputs[index] = value
      setCodeInputs(newInputs)
      form.setValue("code", newInputs.join(""))

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !codeInputs[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post("/api/verify-code", {
        username: params.username,
        code: data.code,
      })

      toast({
        title: "Account verified successfully!",
        description: "You can now sign in to your account.",
      })

      router.replace("/sign-in")
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError.response?.data.message || "Error verifying code. Please try again later."
      toast({
        title: "Verification failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)
    try {
      await axios.post("/api/resend-code", {
        username: params.username,
      })

      toast({
        title: "Code resent!",
        description: "A new verification code has been sent to your email.",
      })

      setTimeLeft(600) // Reset timer
      setCanResend(false)
      setCodeInputs(["", "", "", "", "", ""]) // Clear inputs
      form.setValue("code", "")
      inputRefs.current[0]?.focus()
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError.response?.data.message || "Error resending code. Please try again."
      toast({
        title: "Resend failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsResending(false)
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
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur opacity-50 animate-pulse"></div>
                </div>
              </div>

              {/* Badge */}
              <Badge className="bg-blue-500/10 text-blue-300 border border-blue-500/20 mb-4">
                <Sparkles className="w-3 h-3 mr-1" />
                Email Verification
              </Badge>

              {/* Title */}
              <h1 className="text-4xl font-black mb-3">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Verify Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Account
                </span>
              </h1>

              <p className="text-gray-400 text-lg mb-2">We've sent a 6-digit code to your email</p>
              <p className="text-orange-400 font-medium">@{params.username}</p>
            </div>

            {/* Timer */}
            <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50">
              <Clock className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-gray-300">
                Code expires in: <span className="text-orange-400 font-mono font-bold">{formatTime(timeLeft)}</span>
              </span>
            </div>

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Code Input */}
                <FormField
                  name="code"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 font-medium text-center block mb-4">
                        Enter Verification Code
                      </FormLabel>

                      {/* Custom 6-digit input */}
                      <div className="flex gap-3 justify-center mb-4">
                        {codeInputs.map((digit, index) => (
                          <input
                            key={index}
                            ref={(el) => { inputRefs.current[index] = el }}
                            type="text"
                            maxLength={6}
                            value={digit}
                            onChange={(e) => handleCodeInput(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-14 text-center text-xl font-bold bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 hover:border-gray-500/70"
                            placeholder="0"
                          />
                        ))}
                      </div>

                      {/* Hidden input for form validation */}
                      <Input {...field} type="hidden" />
                      <FormMessage className="text-red-400 text-center" />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || codeInputs.join("").length !== 6}
                  className="w-full group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Verify Account
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
                  Didn't receive the code?
                </span>
              </div>
            </div>

            {/* Resend Button */}
            {/* <div className="text-center">
              <Button
                type="button"
                onClick={handleResendCode}
                disabled={!canResend || isResending}
                variant="outline"
                className="group relative bg-transparent text-gray-300 border border-gray-600 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 rounded-xl px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center gap-2">
                  {isResending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-400/30 border-t-gray-400 rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                      Resend Code
                    </>
                  )}
                </span>
              </Button>

              {!canResend && (
                <p className="text-sm text-gray-500 mt-2">You can resend the code in {formatTime(timeLeft)}</p>
              )}
            </div> */}

            {/* Help Notice */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-300 mb-1">Having trouble?</p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Check your spam folder or try resending the code. If you continue having issues, contact our support
                    team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
