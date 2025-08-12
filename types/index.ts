export interface User {
  id: string
  email: string
  name: string
  image?: string
  createdAt: Date
  updatedAt: Date
}

export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: Date
  timeLimit?: number // in minutes
  project?: string
  tags: string[]
  userId: string
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
  timerCompleted?: boolean
  strictMode?: boolean
}

export interface TimerSession {
  id: string
  taskId: string
  duration: number // in seconds
  remainingTime: number
  isRunning: boolean
  isPaused: boolean
  startedAt?: Date
  completedAt?: Date
  type: 'pomodoro' | 'stopwatch' | 'countdown'
  strictMode: boolean
}

export interface Project {
  id: string
  name: string
  description?: string
  color: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: Date
}

export interface UserStats {
  tasksCompleted: number
  currentStreak: number
  longestStreak: number
  totalTimeTracked: number
  achievements: Achievement[]
}