'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Timer, CheckSquare, BarChart3, Users, Zap, Shield } from 'lucide-react'

export default function LandingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Timer className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">MOXOZ</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.push('/auth/signin')}>
              Sign In
            </Button>
            <Button onClick={() => router.push('/auth/signin')}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Productivity That
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}Auto-Completes
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The only productivity platform with auto-completing task timers. Set a timer, focus on your work, 
            and watch tasks complete themselves when time's up. No more passive tracking.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button size="lg" onClick={() => router.push('/auth/signin')}>
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Timer className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Auto-Completing Timers</CardTitle>
              <CardDescription>
                Tasks automatically complete when your timer ends. No more passive tracking or forgotten completions.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckSquare className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Smart Task Management</CardTitle>
              <CardDescription>
                Full CRUD operations with priorities, deadlines, projects, and tags. Everything you need to stay organized.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>
                Track streaks, productivity patterns, and achievements. Gamified motivation that actually works.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>Team Collaboration</CardTitle>
              <CardDescription>
                Share tasks, create groups, and compete on leaderboards. Productivity is better together.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <CardTitle>Strict Mode</CardTitle>
              <CardDescription>
                Enable strict mode to prevent manual task incompletion after timer ends. Ultimate accountability.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle>Premium Security</CardTitle>
              <CardDescription>
                Enterprise-grade security with NextAuth.js, encrypted data, and secure cloud infrastructure.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who've revolutionized their workflow with MOXOZ.
          </p>
          <Button size="lg" variant="secondary" onClick={() => router.push('/auth/signin')}>
            Start Your Free Trial
          </Button>
        </div>
      </main>
    </div>
  );
}