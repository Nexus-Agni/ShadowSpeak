import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Lock, Smartphone, UserCheck, Send, Clock, MessageSquare, ChevronRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Sticky Navigation */}
      {/* <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-orange-500">
            ShadowSpeak
          </Link>
          <div className="space-x-4">
            <Link href="#features" className="text-gray-300 hover:text-orange-500">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-300 hover:text-orange-500">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-gray-300 hover:text-orange-500">
              Testimonials
            </Link>
            <Button variant="outline" className="bg-transparent text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white">
              Sign In
            </Button>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Speak Freely, Anonymously</h1>
          <p className="text-xl text-gray-400 mb-8">Empowering individuals to share feedback without fear</p>
          <div className="space-x-4">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Start Giving Feedback</Button>
            <Button variant="outline" className="bg-transparent text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <MessageSquare className="h-8 w-8 text-orange-500" />, title: "Anonymous Feedback", description: "Share your thoughts without revealing your identity" },
              { icon: <Shield className="h-8 w-8 text-orange-500" />, title: "Privacy First", description: "Your data is protected with state-of-the-art encryption" },
              { icon: <UserCheck className="h-8 w-8 text-orange-500" />, title: "Easy to Use", description: "Intuitive interface for seamless feedback sharing" },
              { icon: <Smartphone className="h-8 w-8 text-orange-500" />, title: "Multi-platform", description: "Access ShadowSpeak from any device, anywhere" },
            ].map((feature, index) => (
              <Card key={index} className="p-6 bg-gray-700 border-gray-600">
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="mt-4 mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
            {[
              { icon: <UserCheck className="h-12 w-12 text-orange-500" />, title: "Sign Up", description: "Create your account in seconds" },
              { icon: <Send className="h-12 w-12 text-orange-500" />, title: "Share Link", description: "Distribute your unique feedback link" },
              { icon: <MessageSquare className="h-12 w-12 text-orange-500" />, title: "Receive Feedback", description: "Get honest, anonymous insights" },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                {step.icon}
                <h3 className="mt-4 mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
                {index < 2 && <ChevronRight className="hidden md:block h-8 w-8 text-orange-500 mt-4" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "ShadowSpeak helped me improve my team's communication without fear of retaliation.", author: "Anonymous Team Lead" },
              { text: "I finally feel heard in my organization thanks to the anonymity ShadowSpeak provides.", author: "Anonymous Employee" },
              { text: "As a manager, the feedback I receive through ShadowSpeak is invaluable for growth.", author: "Anonymous Manager" },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 bg-gray-700 border-gray-600">
                <p className="mb-4 text-gray-300">"{testimonial.text}"</p>
                <p className="text-orange-500 font-semibold">{testimonial.author}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security and Privacy Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Security & Privacy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Lock className="h-12 w-12 text-orange-500" />, title: "End-to-End Encryption", description: "Your feedback is encrypted from start to finish" },
              { icon: <Shield className="h-12 w-12 text-orange-500" />, title: "Secure Storage", description: "Data is stored with industry-leading security measures" },
              { icon: <UserCheck className="h-12 w-12 text-orange-500" />, title: "No Personal Data Tracking", description: "We don't collect or store any identifiable information" },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="mt-4 mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Highlights Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Powered by Cutting-Edge Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Vercel AI SDK", description: "Powers our suggest message feature" },
              { title: "RESEND", description: "Secure and reliable email sending" },
              { title: "NextAuth", description: "Robust authentication system" },
              { title: "Zod", description: "Schema validation for input accuracy" },
            ].map((tech, index) => (
              <Card key={index} className="p-6 bg-gray-700 border-gray-600">
                <h3 className="text-xl font-semibold mb-2">{tech.title}</h3>
                <p className="text-gray-400">{tech.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Join ShadowSpeak and Start Giving and Receiving Honest Feedback Today!</h2>
          <Link href="/sign-up">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg py-2 px-6">
            Sign Up Now
          </Button>
          </Link>
          
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-600 py-8">
        <div className="container mx-auto px-4 text-center text-gray-100">
          <p>&copy; 2024 ShadowSpeak by NEXUS<span className="text-black">AGNI</span>DEV. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}