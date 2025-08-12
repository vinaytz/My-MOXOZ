'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Flag } from 'lucide-react'
import { useTaskStore } from '@/lib/store'
import { formatDateTime } from '@/lib/utils'
import { isToday, isTomorrow, isThisWeek } from 'date-fns'

export function UpcomingTasks() {
  const { tasks } = useTaskStore()
  
  const upcomingTasks = tasks
    .filter(task => !task.completed && task.dueDate)
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 5)

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    if (isThisWeek(date)) return 'This week'
    return formatDateTime(date)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const isOverdue = (date: Date) => {
    return new Date(date) < new Date()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Clock className="w-5 h-5 mr-2" />
          Upcoming Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingTasks.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No upcoming tasks</p>
            <p className="text-sm text-gray-400">
              All caught up! Create new tasks to stay productive.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className={`p-3 rounded-lg border transition-colors hover:bg-gray-50 ${
                  isOverdue(task.dueDate!) ? 'bg-red-50 border-red-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {task.title}
                    </h4>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={`${isOverdue(task.dueDate!) ? 'text-red-600' : 'text-gray-600'}`}>
                        {isOverdue(task.dueDate!) ? 'Overdue' : getDateLabel(task.dueDate!)}
                      </span>
                      {task.timeLimit && (
                        <Badge variant="outline" className="text-xs">
                          {task.timeLimit}m
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getPriorityColor(task.priority)} text-xs`}
                  >
                    <Flag className="w-3 h-3 mr-1" />
                    {task.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}