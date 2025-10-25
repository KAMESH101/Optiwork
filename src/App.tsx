import { useState, useEffect } from 'react';
import { User, Task, ChecklistItem, Skill, EmployeeFeedback, Message } from './types';
import { 
  mockUsers, 
  mockTasks, 
  mockDailyReports, 
  mockSkills,
  mockEmployeePerformance,
  mockSkillGaps,
  mockWorkforceAnalytics,
  mockTrainingSuggestions,
  mockMessages
} from './data/mockData';

// Employee Components
import { EmployeeLogin } from './components/employee/EmployeeLogin';
import { EmployeeDashboard } from './components/employee/EmployeeDashboard';
import { TaskDetails } from './components/employee/TaskDetails';
import { EmployeeSkillProfile } from './components/employee/EmployeeSkillProfile';
import { TaskFeedback } from './components/employee/TaskFeedback';

// Admin Components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { EmployeeList } from './components/admin/EmployeeList';
import { TaskAssignment } from './components/admin/TaskAssignment';
import { ReportsView } from './components/admin/ReportsView';
import { SkillLibrary } from './components/admin/SkillLibrary';
import { SmartTaskAssignment } from './components/admin/SmartTaskAssignment';
import { WorkforceAnalytics } from './components/admin/WorkforceAnalytics';
import { EmployeePerformanceDetail } from './components/admin/EmployeePerformanceDetail';
import { SkillGapReport } from './components/admin/SkillGapReport';

// Shared Components
import { ThemeToggle } from './components/shared/ThemeToggle';
import { MessagesPanel } from './components/shared/MessagesPanel';

import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

type AppMode = 'select' | 'employee' | 'admin';
type EmployeeView = 'dashboard' | 'task-details' | 'skill-profile' | 'task-feedback' | 'messages';
type AdminView = 'dashboard' | 'employees' | 'assign' | 'reports' | 'skills' | 'smart-assign' | 'analytics' | 'employee-performance' | 'skill-gaps' | 'messages';

export default function App() {
  // App state
  const [appMode, setAppMode] = useState<AppMode>('select');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Employee state
  const [employeeView, setEmployeeView] = useState<EmployeeView>('dashboard');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  // Admin state
  const [adminView, setAdminView] = useState<AdminView>('dashboard');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  
  // Data state
  const [users] = useState<User[]>(mockUsers);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [reports] = useState(mockDailyReports);
  const [skills, setSkills] = useState<Skill[]>(mockSkills);
  const [performanceData] = useState(mockEmployeePerformance);
  const [skillGaps] = useState(mockSkillGaps);
  const [analytics] = useState(mockWorkforceAnalytics);
  const [trainingSuggestions] = useState(mockTrainingSuggestions);
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  // Real-time task statistics
  const [taskStats, setTaskStats] = useState({
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    overdue: tasks.filter(t => t.status === 'overdue').length
  });

  // Update task statistics whenever tasks change
  useEffect(() => {
    setTaskStats({
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'completed').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      pending: tasks.filter(t => t.status === 'pending').length,
      overdue: tasks.filter(t => t.status === 'overdue').length
    });
  }, [tasks]);

  // Employee handlers
  const handleEmployeeLogin = (user: User) => {
    setCurrentUser(user);
    toast.success(`Welcome back, ${user.name}!`);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setEmployeeView('task-details');
  };

  const handleUpdateTaskStatus = (taskId: string, status: Task['status']) => {
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
    
    if (selectedTask?.id === taskId) {
      setSelectedTask(prev => prev ? { 
        ...prev, 
        status,
        completedAt: status === 'completed' ? new Date().toISOString() : prev.completedAt
      } : null);
    }

    if (status === 'completed') {
      toast.success('Task completed! Would you like to provide feedback?', {
        action: {
          label: 'Give Feedback',
          onClick: () => {
            if (selectedTask) {
              setEmployeeView('task-feedback');
            }
          }
        }
      });
    } else if (status === 'in-progress') {
      toast.success('Task started');
    }
  };

  const handleUpdateChecklist = (taskId: string, checklist: ChecklistItem[]) => {
    setTasks(prevTasks =>
      prevTasks.map(t =>
        t.id === taskId ? { ...t, checklist } : t
      )
    );
    
    if (selectedTask?.id === taskId) {
      setSelectedTask(prev => prev ? { ...prev, checklist } : null);
    }
  };

  const handleSubmitTaskFeedback = (taskId: string, feedback: EmployeeFeedback) => {
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
    
    setEmployeeView('dashboard');
  };

  // Admin handlers
  const handleAdminLogin = (username: string, password: string) => {
    // Simple demo authentication
    if (username === 'admin' && password === 'admin123') {
      const adminUser = users.find(u => u.role === 'supervisor' || u.role === 'manager');
      if (adminUser) {
        setCurrentUser(adminUser);
        setAppMode('admin');
        toast.success(`Welcome, ${adminUser.name}!`);
      }
    } else {
      toast.error('Invalid credentials. Use admin / admin123');
    }
  };

  const handleAssignTask = (taskData: Omit<Task, 'id' | 'status' | 'completedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      status: 'pending'
    };
    
    setTasks(prev => [...prev, newTask]);
    
    // Find the employee who received the task
    const assignedEmployee = users.find(u => u.id === taskData.assignedTo);
    
    // Show detailed success message
    toast.success('✅ Task Assigned Successfully!', {
      description: assignedEmployee 
        ? `Task "${newTask.title}" has been assigned to ${assignedEmployee.name} and is now visible in their employee portal.`
        : `Task "${newTask.title}" has been created and assigned.`,
      duration: 5000
    });
  };

  const handleAddSkill = (skillData: Omit<Skill, 'id'>) => {
    const newSkill: Skill = {
      ...skillData,
      id: `skill-${Date.now()}`
    };
    setSkills(prev => [...prev, newSkill]);
  };

  const handleUpdateSkill = (skillId: string, skillData: Partial<Skill>) => {
    setSkills(prev => 
      prev.map(s => s.id === skillId ? { ...s, ...skillData } : s)
    );
  };

  const handleDeleteSkill = (skillId: string) => {
    setSkills(prev => prev.filter(s => s.id !== skillId));
  };

  // Message handlers
  const handleSendMessage = (messageData: Omit<Message, 'id' | 'createdAt' | 'isRead'>) => {
    const newMessage: Message = {
      ...messageData,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isRead: false
    };
    
    console.log('Sending message:', newMessage);
    setMessages(prev => [newMessage, ...prev]);
    
    const recipientText = messageData.to 
      ? `Sent to ${messageData.toName}` 
      : (messageData.from ? 'Broadcast to all' : 'Broadcast to all employees');
    
    toast.success('Message sent successfully!', {
      description: recipientText
    });
  };

  const handleMarkAsRead = (messageId: string) => {
    setMessages(prev =>
      prev.map(m => m.id === messageId ? { ...m, isRead: true } : m)
    );
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAppMode('select');
    setEmployeeView('dashboard');
    setAdminView('dashboard');
    setSelectedTask(null);
    setSelectedEmployeeId('');
  };

  // Get user-specific tasks
  const getUserTasks = () => {
    if (!currentUser) return [];
    return tasks.filter(t => t.assignedTo === currentUser.id);
  };

  const getEmployees = () => {
    return users.filter(u => u.role === 'employee');
  };

  // Mode selection screen
  if (appMode === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>

        {/* Decorative Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-3xl animate-pulse-subtle" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 dark:bg-purple-600/5 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-5xl w-full relative z-10 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 gradient-primary rounded-2xl shadow-industrial-lg mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h1 className="text-5xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Optiwork
            </h1>
            <p className="text-xl text-muted-foreground">AI-Powered Workforce Optimization for Manufacturing Excellence</p>
          </div>
          
          {/* Portal Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Employee Portal */}
            <button
              onClick={() => setAppMode('employee')}
              className="group industrial-card p-10 hover:shadow-industrial-lg hover:scale-[1.02] transition-all duration-300 text-left"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center shadow-industrial transform group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <svg className="w-6 h-6 text-primary transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h2 className="text-2xl mb-3 text-foreground">Employee Access</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Access your daily tasks, track skills, provide feedback, and stay connected with your team
              </p>
              <div className="flex items-center gap-2 text-sm text-primary">
                <span>Login with Employee ID</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>

            {/* Admin Portal */}
            <button
              onClick={() => setAppMode('admin')}
              className="group industrial-card p-10 hover:shadow-industrial-lg hover:scale-[1.02] transition-all duration-300 text-left border-2 border-primary/20"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 rounded-xl flex items-center justify-center shadow-industrial transform group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0h2m-6 0h6" />
                  </svg>
                </div>
                <svg className="w-6 h-6 text-foreground transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h2 className="text-2xl mb-3 text-foreground">Admin Dashboard</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Smart assignment, workforce analytics, skill management, and comprehensive reporting tools
              </p>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <span>Supervisor & Manager Access</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
          </div>

          {/* Feature Highlights */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: '🎯', label: 'Smart Matching' },
              { icon: '📊', label: 'Real-time Analytics' },
              { icon: '🏆', label: 'Skill Tracking' },
              { icon: '⚡', label: 'Instant Updates' }
            ].map((feature, idx) => (
              <div key={idx} className="text-center animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="text-3xl mb-2">{feature.icon}</div>
                <p className="text-sm text-muted-foreground">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
        <Toaster />
      </div>
    );
  }

  // Employee mode
  if (appMode === 'employee') {
    if (!currentUser) {
      return (
        <>
          <EmployeeLogin 
            onLogin={handleEmployeeLogin} 
            employees={users.filter(u => u.role === 'employee')} 
          />
          <Toaster />
        </>
      );
    }

    if (employeeView === 'skill-profile') {
      return (
        <>
          <EmployeeSkillProfile
            user={currentUser}
            skills={skills}
            tasks={getUserTasks()}
            onBack={() => setEmployeeView('dashboard')}
          />
          <Toaster />
        </>
      );
    }

    if (employeeView === 'task-feedback' && selectedTask) {
      return (
        <>
          <TaskFeedback
            task={selectedTask}
            onBack={() => setEmployeeView('dashboard')}
            onSubmitFeedback={handleSubmitTaskFeedback}
          />
          <Toaster />
        </>
      );
    }

    if (employeeView === 'messages') {
      return (
        <>
          <MessagesPanel
            currentUser={currentUser}
            users={users}
            messages={messages}
            onSendMessage={handleSendMessage}
            onMarkAsRead={handleMarkAsRead}
            onBack={() => setEmployeeView('dashboard')}
            isAdmin={false}
          />
          <Toaster />
        </>
      );
    }

    if (employeeView === 'task-details' && selectedTask) {
      const assignedBy = users.find(u => u.id === selectedTask.assignedBy);
      return (
        <>
          <TaskDetails
            task={selectedTask}
            assignedByName={assignedBy?.name || 'Supervisor'}
            onBack={() => setEmployeeView('dashboard')}
            onUpdateStatus={handleUpdateTaskStatus}
            onUpdateChecklist={handleUpdateChecklist}
          />
          <Toaster />
        </>
      );
    }

    // Calculate unread messages for employee
    const unreadMessages = messages.filter(
      m => !m.isRead && (m.to === currentUser.id || (!m.to && m.from !== currentUser.id))
    ).length;

    return (
      <>
        <EmployeeDashboard
          user={currentUser}
          tasks={getUserTasks()}
          onTaskClick={handleTaskClick}
          onLogout={handleLogout}
          onViewSkills={() => setEmployeeView('skill-profile')}
          onViewMessages={() => setEmployeeView('messages')}
          unreadMessageCount={unreadMessages}
        />
        <Toaster />
      </>
    );
  }

  // Admin mode
  if (appMode === 'admin') {
    if (!currentUser) {
      return (
        <>
          <AdminLogin onLogin={handleAdminLogin} />
          <Toaster />
        </>
      );
    }

    if (adminView === 'messages') {
      return (
        <>
          <MessagesPanel
            currentUser={currentUser}
            users={users}
            messages={messages}
            onSendMessage={handleSendMessage}
            onMarkAsRead={handleMarkAsRead}
            onBack={() => setAdminView('dashboard')}
            isAdmin={true}
          />
          <Toaster />
        </>
      );
    }

    if (adminView === 'skills') {
      return (
        <>
          <SkillLibrary
            skills={skills}
            onBack={() => setAdminView('dashboard')}
            onAddSkill={handleAddSkill}
            onUpdateSkill={handleUpdateSkill}
            onDeleteSkill={handleDeleteSkill}
          />
          <Toaster />
        </>
      );
    }

    if (adminView === 'smart-assign') {
      return (
        <>
          <SmartTaskAssignment
            employees={getEmployees()}
            skills={skills}
            tasks={tasks}
            currentUser={currentUser}
            onBack={() => setAdminView('dashboard')}
            onAssignTask={handleAssignTask}
          />
          <Toaster />
        </>
      );
    }

    if (adminView === 'analytics') {
      return (
        <>
          <WorkforceAnalytics
            employees={getEmployees()}
            reports={reports}
            performanceData={performanceData}
            skillGaps={skillGaps}
            analytics={analytics}
            onBack={() => setAdminView('dashboard')}
            onNavigateToPerformance={(empId) => {
              setSelectedEmployeeId(empId);
              setAdminView('employee-performance');
            }}
            onNavigateToSkillGaps={() => setAdminView('skill-gaps')}
          />
          <Toaster />
        </>
      );
    }

    if (adminView === 'employee-performance' && selectedEmployeeId) {
      const employee = users.find(u => u.id === selectedEmployeeId);
      const performance = performanceData.find(p => p.employeeId === selectedEmployeeId);
      
      if (employee && performance) {
        return (
          <>
            <EmployeePerformanceDetail
              employee={employee}
              performance={performance}
              tasks={tasks}
              skills={skills}
              trainingSuggestions={trainingSuggestions}
              onBack={() => setAdminView('analytics')}
            />
            <Toaster />
          </>
        );
      }
    }

    if (adminView === 'skill-gaps') {
      return (
        <>
          <SkillGapReport
            skillGaps={skillGaps}
            skills={skills}
            employees={getEmployees()}
            trainingSuggestions={trainingSuggestions}
            onBack={() => setAdminView('analytics')}
          />
          <Toaster />
        </>
      );
    }

    if (adminView === 'employees') {
      return (
        <>
          <EmployeeList
            employees={getEmployees()}
            tasks={tasks}
            onBack={() => setAdminView('dashboard')}
          />
          <Toaster />
        </>
      );
    }

    if (adminView === 'assign') {
      return (
        <>
          <TaskAssignment
            employees={getEmployees()}
            currentUser={currentUser}
            onBack={() => setAdminView('dashboard')}
            onAssignTask={handleAssignTask}
          />
          <Toaster />
        </>
      );
    }

    if (adminView === 'reports') {
      return (
        <>
          <ReportsView
            reports={reports}
            tasks={tasks}
            employees={getEmployees()}
            onBack={() => setAdminView('dashboard')}
          />
          <Toaster />
        </>
      );
    }

    // Calculate unread messages for admin
    const unreadAdminMessages = messages.filter(
      m => !m.isRead && (m.to === currentUser.id || (!m.to && m.from !== currentUser.id))
    ).length;

    return (
      <>
        <AdminDashboard
          user={currentUser}
          allTasks={tasks}
          allUsers={users}
          reports={reports}
          onNavigate={(view) => setAdminView(view as AdminView)}
          onLogout={handleLogout}
          unreadMessageCount={unreadAdminMessages}
        />
        <Toaster />
      </>
    );
  }

  return null;
}
