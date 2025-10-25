/**
 * Admin Dashboard Component with Real-time Analytics
 * 
 * Features:
 * - Real-time Team Productivity Heatmap: Analyzes completed tasks by day/time to show
 *   productivity patterns, peak hours, and bottlenecks based on actual task data
 * 
 * - Real-time Predictive Insights: AI-powered alerts generated from live data including:
 *   • Workload imbalance detection across employees
 *   • Deadline risk analysis for overdue and at-risk tasks
 *   • Skill gap identification for task-employee mismatches
 *   • Performance trend monitoring with quality metrics
 *   • Resource utilization optimization suggestions
 * 
 * All analytics update dynamically as tasks are completed, assigned, or modified.
 */

import { useState } from 'react';
import { Task, User, DailyReport } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { TaskStatusBadge } from '../shared/TaskStatusBadge';
import { AICoachingChatbot } from '../shared/AICoachingChatbot';
import { ThemeToggle } from '../shared/ThemeToggle';
import { ProductivityHeatmap } from '../shared/ProductivityHeatmap';
import { PredictiveAlertsPanel } from '../shared/PredictiveAlertsPanel';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  FileText, 
  LogOut,
  CheckCircle2,
  Clock,
  AlertCircle,
  CircleDot,
  TrendingUp
} from 'lucide-react';
import { Progress } from '../ui/progress';
import { Toaster } from '../ui/sonner';

interface AdminDashboardProps {
  user: User;
  allTasks: Task[];
  allUsers: User[];
  reports: DailyReport[];
  onNavigate: (view: string) => void;
  onLogout: () => void;
  unreadMessageCount?: number;
}

export function AdminDashboard({ 
  user, 
  allTasks, 
  allUsers,
  reports,
  onNavigate,
  onLogout,
  unreadMessageCount = 0
}: AdminDashboardProps) {
  const [showAICoach, setShowAICoach] = useState(false);
  
  const todayReport = reports[0];
  const employees = allUsers.filter(u => u.role === 'employee');

  const getTaskCountByStatus = (status: string) => {
    return allTasks.filter(t => t.status === status).length;
  };

  // ============================================================================
  // REAL-TIME DATA ANALYTICS
  // ============================================================================
  // These functions analyze actual task and employee data to provide live insights
  // replacing static mock data with dynamic calculations based on current state
  
  /**
   * Generates real-time productivity heatmap data by analyzing completed tasks
   * grouped by day of week and time slots. Calculates productivity, utilization,
   * and identifies peak/idle periods based on actual task completion patterns.
   */
  const generateRealTimeHeatmapData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const hours = ['08:00', '10:00', '12:00', '14:00', '16:00'];
    const data = [];
    
    // Create a map to track tasks by day and hour
    const taskMap = new Map<string, Task[]>();
    
    // Group completed tasks by their completion time
    allTasks.filter(t => t.completedAt).forEach(task => {
      const completedDate = new Date(task.completedAt!);
      const dayIndex = completedDate.getDay(); // 0 = Sun, 1 = Mon, etc.
      const hour = completedDate.getHours();
      
      // Map to our days array (skip weekends)
      const dayMapping = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayName = dayMapping[dayIndex];
      
      if (days.includes(dayName)) {
        // Round to nearest 2-hour block
        const timeSlots = [8, 10, 12, 14, 16];
        const nearestHour = timeSlots.reduce((prev, curr) => 
          Math.abs(curr - hour) < Math.abs(prev - hour) ? curr : prev
        );
        const hourStr = `${nearestHour.toString().padStart(2, '0')}:00`;
        
        const key = `${dayName}-${hourStr}`;
        if (!taskMap.has(key)) {
          taskMap.set(key, []);
        }
        taskMap.get(key)!.push(task);
      }
    });
    
    // Also consider in-progress tasks for current utilization
    const inProgressTasks = allTasks.filter(t => t.status === 'in-progress');
    const now = new Date();
    const currentDayIndex = now.getDay();
    const currentHour = now.getHours();
    const dayMapping = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDay = dayMapping[currentDayIndex];
    
    // Generate heatmap data
    for (const day of days) {
      for (const hour of hours) {
        const key = `${day}-${hour}`;
        const tasksInSlot = taskMap.get(key) || [];
        const tasksCompleted = tasksInSlot.length;
        
        // Calculate productivity based on task completion and quality
        let productivity = 0;
        if (tasksCompleted > 0) {
          const avgQuality = tasksInSlot.reduce((sum, t) => 
            sum + (t.qualityRating || 4), 0) / tasksCompleted;
          productivity = Math.min(100, (tasksCompleted * 15) * (avgQuality / 5));
        }
        
        // Add current in-progress tasks for utilization calculation
        const hourNum = parseInt(hour.split(':')[0]);
        let utilization = productivity;
        if (day === currentDay && Math.abs(hourNum - currentHour) <= 2) {
          utilization = Math.min(100, productivity + (inProgressTasks.length * 8));
        }
        
        // Determine status based on metrics
        let status: 'peak' | 'normal' | 'idle' | 'bottleneck';
        if (productivity > 75) {
          status = 'peak';
        } else if (productivity > 40) {
          status = 'normal';
        } else if (productivity === 0) {
          status = 'idle';
        } else {
          // Low productivity might indicate bottleneck
          status = tasksCompleted > 0 && productivity < 40 ? 'bottleneck' : 'idle';
        }
        
        data.push({
          hour,
          day,
          productivity: Math.round(productivity),
          tasksCompleted,
          utilization: Math.round(utilization),
          status
        });
      }
    }
    
    return data;
  };

  /**
   * Generates real-time predictive insights by analyzing current task distribution,
   * deadline risks, skill gaps, and performance trends. Provides actionable alerts
   * with confidence scores based on actual workforce and task data.
   */
  const generateRealTimePredictiveAlerts = () => {
    const alerts = [];
    
    // 1. Workload Imbalance Detection
    const employeeWorkloads = employees.map(emp => ({
      employee: emp,
      taskCount: allTasks.filter(t => t.assignedTo === emp.id && t.status !== 'completed').length
    }));
    
    if (employeeWorkloads.length > 1) {
      const sortedByWorkload = [...employeeWorkloads].sort((a, b) => b.taskCount - a.taskCount);
      const maxWorkload = sortedByWorkload[0].taskCount;
      const minWorkload = sortedByWorkload[sortedByWorkload.length - 1].taskCount;
      
      if (maxWorkload >= 5 && (maxWorkload - minWorkload) >= 4) {
        alerts.push({
          id: 'workload-imbalance',
          type: 'warning' as const,
          title: 'Workload Imbalance Detected',
          description: `${sortedByWorkload[0].employee.name} has ${maxWorkload} active tasks while ${sortedByWorkload[sortedByWorkload.length - 1].employee.name} has only ${minWorkload}. Consider redistributing for optimal efficiency.`,
          confidence: 85 + Math.min(15, (maxWorkload - minWorkload) * 2),
          impact: 'high' as const,
          timestamp: new Date(),
          actionable: true,
          action: {
            label: 'Smart Redistribute',
            onClick: () => onNavigate('smart-assign')
          },
          dismissible: true
        });
      }
    }
    
    // 2. Deadline Risk Analysis
    const now = new Date();
    const highPriorityAtRisk = allTasks.filter(t => {
      if (t.status === 'completed' || t.status === 'overdue') return false;
      const dueDate = new Date(t.dueDate);
      const hoursUntilDue = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60);
      return t.priority === 'high' && hoursUntilDue < 24 && hoursUntilDue > 0;
    });
    
    const overdueTasks = allTasks.filter(t => t.status === 'overdue');
    
    if (highPriorityAtRisk.length >= 2 || overdueTasks.length >= 3) {
      const count = highPriorityAtRisk.length + overdueTasks.length;
      alerts.push({
        id: 'deadline-risk',
        type: 'critical' as const,
        title: 'Critical Deadline Alert',
        description: `${overdueTasks.length} tasks overdue and ${highPriorityAtRisk.length} high-priority tasks at risk of missing deadlines within 24 hours. Immediate action recommended.`,
        confidence: 90 + Math.min(10, count),
        impact: 'high' as const,
        timestamp: new Date(),
        actionable: true,
        action: {
          label: 'Review Tasks',
          onClick: () => onNavigate('assign')
        },
        dismissible: true
      });
    }
    
    // 3. Skill Gap Alert
    const tasksRequiringSkills = allTasks.filter(t => 
      t.requiredSkills && t.requiredSkills.length > 0 && t.status !== 'completed'
    );
    
    let skillGapCount = 0;
    tasksRequiringSkills.forEach(task => {
      const assignedEmployee = allUsers.find(u => u.id === task.assignedTo);
      if (assignedEmployee && assignedEmployee.skills && task.requiredSkills) {
        const employeeSkillIds = assignedEmployee.skills.map(s => s.skillId);
        const missingSkills = task.requiredSkills.filter(rs => !employeeSkillIds.includes(rs));
        if (missingSkills.length > 0) {
          skillGapCount++;
        }
      }
    });
    
    if (skillGapCount >= 2) {
      alerts.push({
        id: 'skill-gap',
        type: 'warning' as const,
        title: 'Skill Mismatch Detected',
        description: `${skillGapCount} active tasks are assigned to employees without all required skills. Training or reassignment may be needed.`,
        confidence: 78,
        impact: 'medium' as const,
        timestamp: new Date(),
        actionable: true,
        action: {
          label: 'View Skill Gaps',
          onClick: () => onNavigate('skill-gaps')
        },
        dismissible: true
      });
    }
    
    // 4. Performance Trends - Positive
    const recentCompletedTasks = allTasks.filter(t => {
      if (!t.completedAt) return false;
      const completedDate = new Date(t.completedAt);
      const daysSince = (now.getTime() - completedDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysSince <= 7;
    });
    
    const completionRate = allTasks.length > 0 
      ? (getTaskCountByStatus('completed') / allTasks.length) * 100 
      : 0;
    
    const avgQuality = recentCompletedTasks.length > 0
      ? recentCompletedTasks.reduce((sum, t) => sum + (t.qualityRating || 0), 0) / recentCompletedTasks.length
      : 0;
    
    if (completionRate >= 65 && avgQuality >= 4.0) {
      const topDepartments = [...new Set(
        recentCompletedTasks
          .map(t => allUsers.find(u => u.id === t.assignedTo)?.department)
          .filter(Boolean)
      )];
      
      alerts.push({
        id: 'positive-trend',
        type: 'success' as const,
        title: 'Strong Performance Trend',
        description: `Team productivity at ${completionRate.toFixed(1)}% with ${avgQuality.toFixed(1)}/5.0 quality score. ${recentCompletedTasks.length} tasks completed this week${topDepartments.length > 0 ? `. ${topDepartments[0]} showing excellent results` : ''}.`,
        confidence: 95,
        impact: 'medium' as const,
        timestamp: new Date(),
        actionable: false,
        dismissible: true
      });
    }
    
    // 5. Low utilization warning
    const activeTaskCount = allTasks.filter(t => 
      t.status === 'in-progress' || t.status === 'pending'
    ).length;
    
    if (employees.length > 0) {
      const avgTasksPerEmployee = activeTaskCount / employees.length;
      if (avgTasksPerEmployee < 2 && allTasks.length > 10) {
        alerts.push({
          id: 'low-utilization',
          type: 'info' as const,
          title: 'Resource Underutilization',
          description: `Average of ${avgTasksPerEmployee.toFixed(1)} active tasks per employee. Consider assigning more tasks to optimize workforce utilization.`,
          confidence: 72,
          impact: 'low' as const,
          timestamp: new Date(),
          actionable: true,
          action: {
            label: 'Assign Tasks',
            onClick: () => onNavigate('assign')
          },
          dismissible: true
        });
      }
    }
    
    return alerts;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl">Optiwork Admin</h1>
                <p className="text-xs text-gray-500">Welcome, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats - Real-time Task Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Tasks</p>
                  <p className="text-3xl">{todayReport.totalTasks}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <ClipboardList className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completed</p>
                  <p className="text-3xl text-green-600">{todayReport.completed}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">In Progress</p>
                  <p className="text-3xl text-blue-600">{todayReport.inProgress}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Overdue</p>
                  <p className="text-3xl text-red-600">{todayReport.overdue}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Completion Rate - Real-Time */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Overall Completion Rate (Real-Time)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {getTaskCountByStatus('completed')} of {allTasks.length} tasks completed
                </span>
                <span className="text-2xl">
                  {allTasks.length > 0 ? ((getTaskCountByStatus('completed') / allTasks.length) * 100).toFixed(1) : 0}%
                </span>
              </div>
              <Progress 
                value={allTasks.length > 0 ? (getTaskCountByStatus('completed') / allTasks.length) * 100 : 0} 
                className="h-3" 
              />
              <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                <div className="text-center">
                  <p className="text-gray-500">In Progress</p>
                  <p className="font-semibold text-blue-600">{getTaskCountByStatus('in-progress')}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500">Pending</p>
                  <p className="font-semibold text-orange-600">{getTaskCountByStatus('pending')}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500">Overdue</p>
                  <p className="font-semibold text-red-600">{getTaskCountByStatus('overdue')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate('employees')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="mb-1">Manage Employees</h3>
                  <p className="text-sm text-gray-600">{employees.length} active employees</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate('assign')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <ClipboardList className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="mb-1">Assign Tasks</h3>
                  <p className="text-sm text-gray-600">Create new assignments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow relative"
            onClick={() => onNavigate('messages')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center relative">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  {unreadMessageCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadMessageCount > 9 ? '9+' : unreadMessageCount}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="mb-1">Messages</h3>
                  <p className="text-sm text-gray-600">
                    Send announcements & appreciation
                    {unreadMessageCount > 0 && (
                      <span className="ml-1 text-red-600 font-semibold">
                        ({unreadMessageCount} unread)
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate('reports')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="mb-1">View Reports</h3>
                  <p className="text-sm text-gray-600">Daily & weekly analytics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Smart Features */}
        <h2 className="mb-4 text-gray-700">Smart Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-purple-200"
            onClick={() => onNavigate('smart-assign')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <CircleDot className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="mb-1">Smart Assignment</h3>
                  <p className="text-sm text-gray-600">AI-powered matching</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate('analytics')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="mb-1">Workforce Analytics</h3>
                  <p className="text-sm text-gray-600">Performance insights</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate('skills')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <CircleDot className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="mb-1">Skill Library</h3>
                  <p className="text-sm text-gray-600">Manage skills & certs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-red-200"
            onClick={() => onNavigate('skill-gaps')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="mb-1">Skill Gaps</h3>
                  <p className="text-sm text-gray-600">Training needs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Analytics Widgets - Real-time Data */}
        <h2 className="mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Real-time Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Productivity Heatmap - Real-time */}
          <ProductivityHeatmap
            data={generateRealTimeHeatmapData()}
            title="Team Productivity Overview"
          />

          {/* Predictive Alerts - Real-time Analysis */}
          <PredictiveAlertsPanel
            alerts={generateRealTimePredictiveAlerts()}
            onDismiss={(id) => console.log('Dismissed alert:', id)}
          />
        </div>

        {/* Recent Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {allTasks.slice(0, 5).map((task) => {
                const employee = allUsers.find(u => u.id === task.assignedTo);
                return (
                  <div 
                    key={task.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="mb-2">{task.title}</h4>
                      <div className="flex items-center gap-3">
                        <TaskStatusBadge status={task.status} />
                        <span className="text-sm text-gray-600">
                          Assigned to: {employee?.name}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {task.startTime} - {task.endTime}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
