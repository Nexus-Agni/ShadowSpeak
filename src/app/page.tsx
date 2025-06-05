"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Lock,
  UserCheck,
  Send,
  MessageSquare,
  ChevronRight,
  Sparkles,
  Zap,
  Eye,
  Globe,
  Database,
  Mail,
  Key,
} from "lucide-react"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 opacity-20">
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

      {/* Floating Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-red-500/15 to-orange-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-gradient-to-r from-orange-600/10 to-red-600/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="container mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border border-orange-500/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Anonymous Feedback Platform
            </Badge>
          </div>

          {/* Main Headline */}
          <div className="mb-8 space-y-4">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none">
              <span className="block bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent">
                Speak
              </span>
              <span className="block bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent relative">
                Freely
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-2xl animate-pulse"></div>
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            The most powerful anonymous feedback platform. Share thoughts, receive insights, and build better
            relationships without revealing your identity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/sign-up">
              <Button className="group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25 border-0">
                <span className="relative z-10 flex items-center gap-2">
                  Start for Free
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </Button>
            </Link>

            <Button
              variant="outline"
              className="group relative bg-transparent text-gray-300 border border-gray-600 hover:border-orange-500/50 hover:bg-orange-500/5 text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                View Demo
              </span>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { number: "10K+", label: "Active Users" },
              { number: "50K+", label: "Messages Sent" },
              { number: "99.9%", label: "Uptime" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-4">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <Badge className="bg-orange-500/10 text-orange-300 border border-orange-500/20 mb-6">Features</Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Built for</span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Anonymous Communication
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Every feature designed with privacy and security at its core
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare className="h-8 w-8" />,
                title: "Anonymous Messaging",
                description:
                  "Send and receive messages without revealing your identity. Complete anonymity guaranteed.",
                color: "from-orange-500 to-red-500",
                delay: "0ms",
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "AI-Powered Suggestions",
                description: "Get intelligent message suggestions powered by advanced AI to express yourself better.",
                color: "from-red-500 to-orange-500",
                delay: "100ms",
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "End-to-End Security",
                description: "Military-grade encryption ensures your messages remain private and secure.",
                color: "from-orange-600 to-red-400",
                delay: "200ms",
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Universal Access",
                description: "Access from any device, anywhere in the world. No restrictions, no limitations.",
                color: "from-red-400 to-orange-600",
                delay: "300ms",
              },
              {
                icon: <UserCheck className="h-8 w-8" />,
                title: "Verified Accounts",
                description: "Optional verification system to build trust while maintaining anonymity.",
                color: "from-orange-500 to-red-500",
                delay: "400ms",
              },
              {
                icon: <Mail className="h-8 w-8" />,
                title: "Email Notifications",
                description: "Get notified instantly when you receive new anonymous feedback.",
                color: "from-red-500 to-orange-500",
                delay: "500ms",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group relative p-8 bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50 backdrop-blur-sm hover:border-orange-500/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 rounded-2xl"
                style={{ animationDelay: feature.delay }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-orange-300 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-32 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <Badge className="bg-red-500/10 text-red-300 border border-red-500/20 mb-6">Process</Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Simple</span>
              <br />
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Three Steps
              </span>
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
              {[
                {
                  step: "01",
                  icon: <UserCheck className="h-12 w-12" />,
                  title: "Create Account",
                  description: "Sign up in seconds with just your email. No personal information required.",
                  color: "from-orange-500 to-red-500",
                },
                {
                  step: "02",
                  icon: <Send className="h-12 w-12" />,
                  title: "Share Your Link",
                  description: "Get your unique anonymous feedback link and share it with anyone.",
                  color: "from-red-500 to-orange-500",
                },
                {
                  step: "03",
                  icon: <MessageSquare className="h-12 w-12" />,
                  title: "Receive Feedback",
                  description: "Start receiving honest, anonymous feedback that helps you grow.",
                  color: "from-orange-600 to-red-400",
                },
              ].map((step, index) => (
                <div key={index} className="relative group">
                  {/* Connection Line */}
                  {index < 2 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange-500/50 to-red-500/50 transform -translate-y-1/2 z-10">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    </div>
                  )}

                  <Card className="relative p-8 bg-gradient-to-br from-gray-900/60 to-black/60 border border-gray-800/50 backdrop-blur-sm hover:border-orange-500/30 transition-all duration-500 transform hover:scale-105 rounded-2xl h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10 text-center">
                      {/* Step Number */}
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 mb-6 group-hover:border-orange-500/50 transition-all duration-300">
                        <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                          {step.step}
                        </span>
                      </div>

                      {/* Icon */}
                      <div
                        className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${step.color} mb-6 group-hover:shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300`}
                      >
                        <div className="text-white">{step.icon}</div>
                      </div>

                      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-orange-300 transition-colors duration-300">
                        {step.title}
                      </h3>

                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-32 px-4">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <Badge className="bg-orange-500/10 text-orange-300 border border-orange-500/20 mb-6">Testimonials</Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Loved by</span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Thousands
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                text: "ShadowSpeak transformed how our team communicates. The anonymity removes all barriers to honest feedback.",
                author: "Sarah M.",
                role: "Team Lead",
                rating: 5,
              },
              {
                text: "Finally, a platform where I can share my thoughts without fear. The AI suggestions are incredibly helpful.",
                author: "Anonymous",
                role: "Employee",
                rating: 5,
              },
              {
                text: "The security features give me complete confidence. My feedback stays truly anonymous.",
                author: "Mike R.",
                role: "Manager",
                rating: 5,
              },
              {
                text: "Incredible platform! The interface is intuitive and the anonymity is bulletproof.",
                author: "Anonymous",
                role: "Consultant",
                rating: 5,
              },
              {
                text: "ShadowSpeak helped me build better relationships with my team through honest communication.",
                author: "Lisa K.",
                role: "Director",
                rating: 5,
              },
              {
                text: "The best anonymous feedback platform I've used. Simple, secure, and effective.",
                author: "Anonymous",
                role: "Freelancer",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="group relative p-8 bg-gradient-to-br from-gray-900/60 to-black/60 border border-gray-800/50 backdrop-blur-sm hover:border-orange-500/30 transition-all duration-500 transform hover:scale-105 rounded-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
                    ))}
                  </div>

                  <blockquote className="text-gray-300 text-lg mb-6 leading-relaxed group-hover:text-white transition-colors duration-300">
                    "{testimonial.text}"
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{testimonial.author.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-orange-300 transition-colors duration-300">
                        {testimonial.author}
                      </div>
                      <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="relative py-32 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <Badge className="bg-red-500/10 text-red-300 border border-red-500/20 mb-6">Security</Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Enterprise-Grade
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Security
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Your privacy and security are our top priorities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Lock className="h-12 w-12" />,
                title: "End-to-End Encryption",
                description: "All messages are encrypted using AES-256 encryption before transmission and storage.",
                features: ["AES-256 Encryption", "Zero-Knowledge Architecture", "Secure Key Management"],
              },
              {
                icon: <Shield className="h-12 w-12" />,
                title: "Privacy Protection",
                description: "We never store personal information that could identify message senders.",
                features: ["No IP Logging", "Anonymous Sessions", "Data Minimization"],
              },
              {
                icon: <Key className="h-12 w-12" />,
                title: "Secure Authentication",
                description: "Multi-factor authentication and secure session management protect your account.",
                features: ["2FA Support", "JWT Tokens", "Session Security"],
              },
            ].map((security, index) => (
              <Card
                key={index}
                className="group relative p-8 bg-gradient-to-br from-gray-900/60 to-black/60 border border-gray-800/50 backdrop-blur-sm hover:border-red-500/30 transition-all duration-500 transform hover:scale-105 rounded-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 text-center">
                  <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 mb-6 group-hover:shadow-lg group-hover:shadow-red-500/25 transition-all duration-300">
                    <div className="text-white">{security.icon}</div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-red-300 transition-colors duration-300">
                    {security.title}
                  </h3>

                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed mb-6">
                    {security.description}
                  </p>

                  <ul className="space-y-2">
                    {security.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center justify-center gap-2 text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300"
                      >
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="relative py-32 px-4">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <Badge className="bg-orange-500/10 text-orange-300 border border-orange-500/20 mb-6">Technology</Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Powered by</span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Modern Stack
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Vercel AI SDK",
                description: "Advanced AI for message suggestions",
                icon: <Zap className="h-6 w-6" />,
                color: "from-orange-500 to-red-500",
              },
              {
                name: "NextAuth",
                description: "Secure authentication system",
                icon: <Key className="h-6 w-6" />,
                color: "from-red-500 to-orange-500",
              },
              {
                name: "Resend",
                description: "Reliable email delivery",
                icon: <Mail className="h-6 w-6" />,
                color: "from-orange-600 to-red-400",
              },
              {
                name: "MongoDB",
                description: "Scalable database solution",
                icon: <Database className="h-6 w-6" />,
                color: "from-red-400 to-orange-600",
              },
            ].map((tech, index) => (
              <Card
                key={index}
                className="group relative p-6 bg-gradient-to-br from-gray-900/60 to-black/60 border border-gray-800/50 backdrop-blur-sm hover:border-orange-500/30 transition-all duration-500 transform hover:scale-105 rounded-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div
                    className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${tech.color} mb-4 group-hover:shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300`}
                  >
                    <div className="text-white">{tech.icon}</div>
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-white group-hover:text-orange-300 transition-colors duration-300">
                    {tech.name}
                  </h3>

                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 blur-3xl"></div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border border-orange-500/30 mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              Ready to Start?
            </Badge>

            <h2 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent">
                Join
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent">
                ShadowSpeak
              </span>
            </h2>

            <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
              Start receiving honest, anonymous feedback today.
              <br />
              No credit card required. Free forever.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/sign-up">
                <Button className="group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xl px-12 py-6 rounded-2xl font-bold transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-orange-500/25 border-0">
                  <span className="relative z-10 flex items-center gap-3">
                    Get Started Free
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                </Button>
              </Link>

              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Trusted by 10,000+ users</div>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800/50 py-16 px-4">
        <div className="container mx-auto relative z-10">
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                ShadowSpeak
              </h3>
              <p className="text-gray-400">Anonymous feedback, amplified.</p>
            </div>

            <div className="border-t border-gray-800/50 pt-8">
              <p className="text-gray-500">
                &copy; 2024 ShadowSpeak by NEXUS<span className="text-orange-500 font-bold">AGNI</span>DEV. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
