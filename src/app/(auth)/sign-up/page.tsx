"use client"
import { useToast } from "@/hooks/use-toast"
import { SignUpSchema } from "@/schema/signUpSchema"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDebounceCallback } from "usehooks-ts"
import type * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { type AxiosError } from "axios"
import type { ApiResponse } from "@/types/apiResponse"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Shield,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowRight,
  Sparkles,
  AlertCircle,
} from "lucide-react"

function SignUpForm() {
  const [username, setUsername] = useState("")
  const [usernameMessage, setUsernameMessage] = useState("")
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const debounced = useDebounceCallback(setUsername, 500)

  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[a-z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    return strength
  }

  // Watch password changes for strength indicator
  const watchedPassword = form.watch("password")
  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(watchedPassword || ""))
  }, [watchedPassword])

  // Check username uniqueness
  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username.length > 0) {
        setIsCheckingUsername(true)
        setUsernameMessage("") // Reset message
        try {
          const response = await axios.get<ApiResponse>(`/api/check-username-unique?username=${username}`)
          setUsernameMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>
          setUsernameMessage(axiosError.response?.data.message || "Error checking username")
        } finally {
          setIsCheckingUsername(false)
        }
      }
    }
    checkUsernameUnique()
  }, [username])

  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post("/api/sign-up", data)
      toast({
        title: "Account created successfully!",
        description: "Please check your email for verification code.",
      })

      router.replace(`/verify/${username}`)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError.response?.data.message || "Error signing up. Please try again later."
      toast({
        title: "Sign Up failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return "from-red-500 to-red-600"
    if (passwordStrength < 50) return "from-orange-500 to-orange-600"
    if (passwordStrength < 75) return "from-yellow-500 to-yellow-600"
    return "from-green-500 to-green-600"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return "Weak"
    if (passwordStrength < 50) return "Fair"
    if (passwordStrength < 75) return "Good"
    return "Strong"
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
                Join ShadowSpeak
              </Badge>

              {/* Title */}
              <h1 className="text-4xl font-black mb-3">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Step into the
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Shadows
                </span>
              </h1>

              <p className="text-gray-400 text-lg">Create your account and let your voice be heard anonymously</p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Username Field */}
                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 font-medium flex items-center gap-2">
                        <User className="w-4 h-4 text-orange-400" />
                        Username
                      </FormLabel>
                      <div className="relative group">
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            debounced(e.target.value)
                          }}
                          placeholder="Choose a unique username"
                          className="bg-gray-800/50 border border-gray-600/50 text-white placeholder:text-gray-500 rounded-xl h-12 pl-4 pr-12 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 group-hover:border-gray-500/70"
                        />

                        {/* Username Status Icon */}
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          {isCheckingUsername ? (
                            <Loader2 className="w-5 h-5 text-orange-400 animate-spin" />
                          ) : usernameMessage === "Username is available" ? (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          ) : usernameMessage && usernameMessage !== "Username is available" ? (
                            <XCircle className="w-5 h-5 text-red-400" />
                          ) : null}
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>

                      {/* Username Message */}
                      {!isCheckingUsername && usernameMessage && (
                        <div className="flex items-center gap-2 mt-2">
                          {usernameMessage === "Username is available" ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400" />
                          )}
                          <p
                            className={`text-sm ${
                              usernameMessage === "Username is available" ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {usernameMessage}
                          </p>
                        </div>
                      )}

                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4 text-orange-400" />
                        Email Address
                      </FormLabel>
                      <div className="relative group">
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email address"
                          className="bg-gray-800/50 border border-gray-600/50 text-white placeholder:text-gray-500 rounded-xl h-12 pl-4 pr-4 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 group-hover:border-gray-500/70"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <AlertCircle className="w-4 h-4 text-blue-400" />
                        <p className="text-sm text-blue-400">We'll send you a verification code</p>
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
                          placeholder="Create a strong password"
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

                      {/* Password Strength Indicator */}
                      {watchedPassword && (
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Password Strength</span>
                            <span
                              className={`text-sm font-medium ${getPasswordStrengthColor().replace("from-", "text-").replace("-500", "-400").split(" ")[0]}`}
                            >
                              {getPasswordStrengthText()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${getPasswordStrengthColor()} transition-all duration-300`}
                              style={{ width: `${passwordStrength}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    (Boolean(usernameMessage) && usernameMessage !== "Username is available")
                  }
                  className="w-full group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
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
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-gray-400 mb-4">Join thousands of users sharing feedback anonymously</p>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="group relative bg-transparent text-gray-300 border border-gray-600 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 rounded-xl px-6 py-2"
                >
                  <span className="flex items-center gap-2">
                    Sign In Instead
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </Button>
              </Link>
            </div>

            {/* Privacy Notice */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-300">Privacy Protected</p>
                  <p className="text-xs text-gray-400">Your data is encrypted and never shared with third parties</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
