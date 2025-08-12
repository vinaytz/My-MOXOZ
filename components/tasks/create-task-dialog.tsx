'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Task } from '@/types'
import { useTaskStore } from '@/lib/store'

export function CreateTaskDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    timeLimit: '',
    dueDate: '',
    tags: '',
    strictMode: false,
  })

  const { addTask } = useTaskStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: formData.title,
      description: formData.description || undefined,
      completed: false,
      priority: formData.priority,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      timeLimit: formData.timeLimit ? parseInt(formData.timeLimit) : undefined,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      userId: 'current-user', // This would come from auth
      createdAt: new Date(),
      updatedAt: new Date(),
      strictMode: formData.strictMode,
    }

    addTask(newTask)
    setOpen(false)
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      timeLimit: '',
      dueDate: '',
      tags: '',
      strictMode: false,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Add a new task to your productivity workflow.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter task title..."
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Optional description..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value: 'low' | 'medium' | 'high') => 
                    setFormData({ ...formData, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="timeLimit">Time Limit (min)</Label>
                <Input
                  id="timeLimit"
                  type="number"
                  value={formData.timeLimit}
                  onChange={(e) => setFormData({ ...formData, timeLimit: e.target.value })}
                  placeholder="30"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="datetime-local"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="work, urgent, project-alpha"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="strictMode"
                checked={formData.strictMode}
                onCheckedChange={(checked) => setFormData({ ...formData, strictMode: checked })}
              />
              <Label htmlFor="strictMode" className="text-sm">
                Strict Mode (Auto-complete when timer ends)
              </Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}