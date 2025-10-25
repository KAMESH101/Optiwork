import { createContext, useContext, useState, ReactNode } from 'react';
import { Task, ChecklistItem, EmployeeFeedback } from '../types';
import { mockTasks } from '../data/mockData';
import { toast } from 'sonner@2.0.3';

interface TaskContextType {
  tasks: Task[];
  addTask: (taskData: Omit<Task, 'id' | 'status' | 'completedAt'>) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  updateTaskChecklist: (taskId: string, checklist: ChecklistItem[]) => void;
  submitTaskFeedback: (taskId: string, feedback: EmployeeFeedback) => void;
  getUserTasks: (userId: string) => Task[];
  getTask: (taskId: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const addTask = (taskData: Omit<Task, 'id' | 'status' | 'completedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      status: 'pending'
    };
    
    setTasks(prev => [...prev, newTask]);
    
    // Show success toast
    toast.success('Task assigned successfully! 📋', {
      description: `Task "${newTask.title}" has been assigned and is now visible to the employee.`
    });

    return newTask;
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks(prevTasks => 
      prevTasks.map(t => 
        t.id === taskId 
          ? { 
              ...t, 
              status, 
              completedAt: status === 'completed' ? new Date().toISOString() : t.completedAt 
            }
          : t
      )
    );

    if (status === 'completed') {
      toast.success('Task completed! 🎉');
    } else if (status === 'in-progress') {
      toast.success('Task started! ⚡');
    }
  };

  const updateTaskChecklist = (taskId: string, checklist: ChecklistItem[]) => {
    setTasks(prevTasks =>
      prevTasks.map(t =>
        t.id === taskId ? { ...t, checklist } : t
      )
    );
  };

  const submitTaskFeedback = (taskId: string, feedback: EmployeeFeedback) => {
    setTasks(prevTasks =>
      prevTasks.map(t =>
        t.id === taskId 
          ? { 
              ...t, 
              difficultyRating: feedback.difficultyRating,
              feedback: { 
                ...t.feedback, 
                employeeFeedback: feedback 
              }
            } 
          : t
      )
    );
    
    toast.success('Feedback submitted! Thank you! 💬');
  };

  const getUserTasks = (userId: string): Task[] => {
    return tasks.filter(t => t.assignedTo === userId);
  };

  const getTask = (taskId: string): Task | undefined => {
    return tasks.find(t => t.id === taskId);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTaskStatus,
        updateTaskChecklist,
        submitTaskFeedback,
        getUserTasks,
        getTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}
