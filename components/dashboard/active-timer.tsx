'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Play, Pause, Square, Timer } from 'lucide-react'
import { useTaskStore } from '@/lib/store'
import { formatTime } from '@/lib/utils'

export function ActiveTimer() {
  const { activeTimer, tasks, setActiveTimer } = useTaskStore()
  
  if (!activeTimer) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Timer className="w-5 h-5 mr-2" />
            Active Timer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Timer className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No active timer</p>
            <p className="text-sm text-gray-400">
              Start a timer on any task to track your focus time
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const task = tasks.find(t => t.id === activeTimer.taskId)
  const progress = ((activeTimer.duration - activeTimer.remainingTime) / activeTimer.duration) * 100

  const pauseTimer = () => {
    setActiveTimer({ ...activeTimer, isRunning: false, isPaused: true })
  }

  const resumeTimer = () => {
    setActiveTimer({ ...activeTimer, isRunning: true, isPaused: false })
  }

  const stopTimer = () => {
    setActiveTimer(null)
  }

  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardHeader>
        <CardTitle className="flex items-center text-lg text-blue-900">
          <Timer className="w-5 h-5 mr-2" />
          Active Timer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-blue-900 mb-1">{task?.title}</h3>
            <p className="text-sm text-blue-700 capitalize">
              {activeTimer.type} Timer
              {activeTimer.strictMode && ' • Strict Mode'}
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl font-mono font-bold text-blue-900 mb-2">
              {formatTime(activeTimer.remainingTime)}
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <div className="flex gap-2">
            {activeTimer.isRunning ? (
              <Button 
                variant="outline" 
                onClick={pauseTimer}
                className="flex-1"
              >
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={resumeTimer}
                className="flex-1"
              >
                <Play className="w-4 h-4 mr-2" />
                Resume
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={stopTimer}
              className="flex-1"
            >
              <Square className="w-4 h-4 mr-2" />
              Stop
            </Button>
          </div>

          {activeTimer.strictMode && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Strict Mode:</strong> This task will be automatically marked as complete when the timer ends.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}