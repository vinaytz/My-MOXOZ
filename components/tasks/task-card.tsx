'use client'

import { useState } from 'react'
import { Clock, Play, Pause, Square, MoreHorizontal, Flag } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Task, TimerSession } from '@/types'
import { formatTime, formatDate } from '@/lib/utils'
import { useTaskStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const { updateTask, setActiveTimer, activeTimer, completeTask } = useTaskStore()
  const [localTimer, setLocalTimer] = useState<TimerSession | null>(null)

  const isTimerActive = activeTimer?.taskId === task.id
  const currentTimer = isTimerActive ? activeTimer : localTimer

  const startTimer = (type: 'pomodoro' | 'countdown' | 'stopwatch') => {
    const duration = type === 'pomodoro' ? 25 * 60 : (task.timeLimit || 30) * 60
    const timer: TimerSession = {
      id: `timer-${task.id}-${Date.now()}`,
      taskId: task.id,
      duration,
      remainingTime: duration,
      isRunning: true,
      isPaused: false,
      startedAt: new Date(),
      type,
      strictMode: task.strictMode || false
    }
    
    setActiveTimer(timer)
    setLocalTimer(timer)
    
    // Start the countdown
    const interval = setInterval(() => {
      setActiveTimer((current) => {
        if (!current || current.taskId !== task.id) {
          clearInterval(interval)
          return current
        }
        
        const newRemainingTime = current.remainingTime - 1
        
        if (newRemainingTime <= 0) {
          clearInterval(interval)
          // Auto-complete the task when timer finishes
          completeTask(task.id)
          setActiveTimer(null)
          return null
        }
        
        return { ...current, remainingTime: newRemainingTime }
      })
    }, 1000)
  }

  const pauseTimer = () => {
    if (currentTimer) {
      const updatedTimer = { ...currentTimer, isRunning: false, isPaused: true }
      setActiveTimer(updatedTimer)
      setLocalTimer(updatedTimer)
    }
  }

  const stopTimer = () => {
    setActiveTimer(null)
    setLocalTimer(null)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Flag className="w-3 h-3 fill-current" />
      case 'medium': return <Flag className="w-3 h-3" />
      case 'low': return <Flag className="w-3 h-3" />
      default: return null
    }
  }

  const progress = currentTimer 
    ? ((currentTimer.duration - currentTimer.remainingTime) / currentTimer.duration) * 100
    : 0

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md",
      task.completed && "opacity-60",
      isTimerActive && "ring-2 ring-blue-500 ring-opacity-50"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className={cn(
              "font-medium text-gray-900 mb-1",
              task.completed && "line-through text-gray-500"
            )}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-600 mb-2">{task.description}</p>
            )}
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Timer Display */}
        {currentTimer && (
          <div className="mb-3 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">
                {currentTimer.type.charAt(0).toUpperCase() + currentTimer.type.slice(1)} Timer
              </span>
              <span className="text-lg font-mono font-bold text-blue-900">
                {formatTime(currentTimer.remainingTime)}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            {currentTimer.strictMode && (
              <p className="text-xs text-blue-700 mt-1">
                Strict mode: Task will auto-complete when timer ends
              </p>
            )}
          </div>
        )}

        {/* Tags and Priority */}
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className={getPriorityColor(task.priority)}>
            {getPriorityIcon(task.priority)}
            <span className="ml-1 capitalize">{task.priority}</span>
          </Badge>
          {task.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Due Date */}
        {task.dueDate && (
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <Clock className="w-4 h-4 mr-1" />
            Due {formatDate(task.dueDate)}
          </div>
        )}

        {/* Timer Controls */}
        {!task.completed && (
          <div className="flex items-center gap-2">
            {!currentTimer ? (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => startTimer('pomodoro')}
                  className="flex-1"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Pomodoro
                </Button>
                {task.timeLimit && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startTimer('countdown')}
                    className="flex-1"
                  >
                    <Clock className="w-4 h-4 mr-1" />
                    {task.timeLimit}m
                  </Button>
                )}
              </>
            ) : (
              <div className="flex gap-2 w-full">
                {currentTimer.isRunning ? (
                  <Button size="sm" variant="outline" onClick={pauseTimer}>
                    <Pause className="w-4 h-4 mr-1" />
                    Pause
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => startTimer(currentTimer.type)}>
                    <Play className="w-4 h-4 mr-1" />
                    Resume
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={stopTimer}>
                  <Square className="w-4 h-4 mr-1" />
                  Stop
                </Button>
              </div>
            )}
          </div>
        )}

        {task.completed && task.timerCompleted && (
          <div className="mt-3 p-2 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800 font-medium">
              ✅ Completed via timer auto-completion
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}