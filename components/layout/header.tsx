'use client'

import { Menu, Bell, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUIStore } from '@/lib/store'
import { useSession, signOut } from 'next-auth/react'

export function Header() {
  const { sidebarOpen, setSidebarOpen } = useUIStore()
  const { data: session } = useSession()

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="relative w-96 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search tasks, projects..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || ''}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <User className="w-4 h-4 text-gray-600" />
            )}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {session?.user?.name || 'User'}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut()}
            className="text-xs"
          >
            Sign out
          </Button>
        </div>
      </div>
    </header>
  )
}