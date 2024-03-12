import { useCallback, useState } from "react";
import * as feedback from '../Function/feedback'
import { url } from "../Constant/url";
import { dataRemap } from "../Function/dataRemap";

export interface newTaskType {
  taskName: string,
  dueDate: string,
  owner: string
  tags: string
  isDone: boolean
}

export interface TaskType extends newTaskType {
  key: string
}

export default function useTaskAPI() {
  const [isAdding, setIsAdding] = useState(false)
  const [task, setTask] = useState<TaskType[]>([])
  const [isGettingTask, setIsGettingTask] = useState(false)
  const [isFinishing, setIsFinishing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const getTask = useCallback(async () => {
    setIsGettingTask(true)
    setTask([])
    try {
      const res = await fetch(`${url}/task.json`)
      const data = await res.json()
      const arr = dataRemap(data)
      setTask(arr)
      setIsGettingTask(false)
    } catch (e) {
      setIsGettingTask(false)
      feedback.error(e as Error)
    }
  }, [])

  const addTask = useCallback(async (newTask: newTaskType) => {
    setIsAdding(true)
    try {
      const res = await fetch(`${url}/task.json`, {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setIsAdding(false)
      if (res.ok) { feedback.success('Add Task') }
    }
    catch (e) {
      setIsAdding(false)
      feedback.error(e as Error)
    }
  }, [])

  const doneTask = useCallback(async (task: TaskType) => {
    setIsFinishing(true)
    try {
      const res = await fetch(`${url}/task/${task.key}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ ...task, isDone: !task.isDone }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setIsFinishing(false)
      if (res.ok) feedback.success("Update Task")
    } catch (e) {
      setIsFinishing(false)
      feedback.error(e as Error)
    }
  }, [])

  const deleteTask = useCallback(async (taskId: string) => {
    setIsDeleting(true)
    try {
      const res = await fetch(`${url}/task/${taskId}.json`, {
        method: 'DELETE',
        body: JSON.stringify(taskId),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setIsDeleting(false)
      if (res.ok) feedback.success("Delete Task")
    } catch (e) {
      setIsFinishing(false)
      feedback.error(e as Error)
    }
  }, [])

  const updateTask = useCallback(async (task: TaskType) => {
    setIsFinishing(true)
    try {
      const res = await fetch(`${url}/task/${task.key}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ ...task }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setIsFinishing(false)
      if (res.ok) feedback.success("Update Task")
    } catch (e) {
      setIsFinishing(false)
      feedback.error(e as Error)
    }
  }, [])


  return {
    isAdding,
    addTask,
    task,
    getTask,
    isGettingTask,
    doneTask,
    isFinishing,
    deleteTask,
    isDeleting,
    updateTask
  }
}