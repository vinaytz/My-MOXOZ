'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { StatsOverview } from '@/components/dashboard/stats-overview'
import { ActiveTimer } from '@/components/dashboard/active-timer'
import { UpcomingTasks } from '@/components/dashboard/upcoming-tasks'
import { CreateTaskDialog } from '@/components/tasks/create-task-dialog'
import { TaskCard } from '@/components/tasks/task-card'
import { useTaskStore } from '@/lib/store'
import { Task } from '@/types'

// Mock data for development
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Finish the Q1 project proposal for the new client',
    completed: false,
    priority: 'high',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    timeLimit: 45,
    tags: ['work', 'urgent'],
    userId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    strictMode: true,
  },
  {
    id: '2',
    title: 'Review team performance',
    description: 'Monthly review of team KPIs and individual performance',
    completed: false,
    priority: 'medium',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    timeLimit: 30,
    tags: ['management', 'review'],
    userId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Update documentation',
    description: 'Update API documentation with latest changes',
    completed: true,
    priority: 'low',
    tags: ['documentation', 'api'],
    userId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: new Date(),
    timerCompleted: true,
  },
]

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { tasks, setTasks } = useTaskStore()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    // Initialize with mock data
    if (tasks.length === 0) {
      setTasks(mockTasks)
    }
  }, [tasks.length, setTasks])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const activeTasks = tasks.filter(task => !task.completed)
  const recentTasks = activeTasks.slice(0, 6)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Good morning, {session.user?.name?.split(' ')[0] || 'there'}! 👋
                </h1>
                <p className="text-gray-600 mt-1">
                  Let's make today productive. You have {activeTasks.length} active tasks.
                </p>
              </div>
              <CreateTaskDialog />
            </div>
          </div>

          <StatsOverview />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <ActiveTimer />
            </div>
            <div>
              <UpcomingTasks />
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Tasks</h2>
              <button 
                onClick={() => router.push('/tasks')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View all tasks →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}