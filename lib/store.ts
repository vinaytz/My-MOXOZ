import { create } from 'zustand'
import { Task, TimerSession } from '@/types'

interface TaskStore {
  tasks: Task[]
  activeTimer: TimerSession | null
  setTasks: (tasks: Task[]) => void
  addTask: (task: Task) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  setActiveTimer: (timer: TimerSession | null) => void
  completeTask: (id: string) => void
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  activeTimer: null,
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  setActiveTimer: (timer) => set({ activeTimer: timer }),
  completeTask: (id) => {
    const { updateTask } = get()
    updateTask(id, { 
      completed: true, 
      completedAt: new Date(),
      timerCompleted: true 
    })
  },
}))

interface UIStore {
  sidebarOpen: boolean
  currentView: 'dashboard' | 'tasks' | 'calendar' | 'analytics'
  setSidebarOpen: (open: boolean) => void
  setCurrentView: (view: 'dashboard' | 'tasks' | 'calendar' | 'analytics') => void
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  currentView: 'dashboard',
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCurrentView: (view) => set({ currentView: view }),
}))