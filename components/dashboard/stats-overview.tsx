'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckSquare, Clock, Target, Flame } from 'lucide-react'
import { useTaskStore } from '@/lib/store'

export function StatsOverview() {
  const { tasks } = useTaskStore()
  
  const completedTasks = tasks.filter(task => task.completed).length
  const totalTasks = tasks.length
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
  
  const todayTasks = tasks.filter(task => {
    const today = new Date()
    const taskDate = task.dueDate
    return taskDate && 
           taskDate.getDate() === today.getDate() &&
           taskDate.getMonth() === today.getMonth() &&
           taskDate.getFullYear() === today.getFullYear()
  })
  
  const todayCompleted = todayTasks.filter(task => task.completed).length
  const currentStreak = 7 // This would be calculated from actual data

  const stats = [
    {
      title: 'Tasks Completed',
      value: completedTasks,
      total: totalTasks,
      icon: CheckSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Today\'s Progress',
      value: todayCompleted,
      total: todayTasks.length,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Current Streak',
      value: currentStreak,
      unit: 'days',
      icon: Flame,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Focus Time',
      value: 4.2,
      unit: 'hours',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              {stat.total && (
                <div className="text-sm text-gray-500">
                  / {stat.total}
                </div>
              )}
              {stat.unit && (
                <div className="text-sm text-gray-500">
                  {stat.unit}
                </div>
              )}
            </div>
            {stat.total && (
              <div className="mt-2">
                <Progress 
                  value={(stat.value / stat.total) * 100} 
                  className="h-2"
                />
              </div>
            )}
            {stat.title === 'Current Streak' && (
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">
                  🔥 Keep it up!
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}