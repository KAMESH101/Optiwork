import { 
  User, 
  Task, 
  DailyReport, 
  Skill, 
  EmployeePerformance, 
  SkillGap, 
  WorkforceAnalytics,
  TrainingSuggestion,
  Message
} from '../types';

// Mock data for advanced features
export const mockSkillEvolution = {
  'EMP001': {
    'skill-1': [
      { date: '2024-06-01', level: 2, milestone: 'Started CNC training' },
      { date: '2024-08-15', level: 3, milestone: 'Completed intermediate course' },
      { date: '2024-12-01', level: 4, milestone: 'Achieved expert certification' },
      { date: '2025-10-14', level: 4 }
    ],
    'skill-2': [
      { date: '2024-01-01', level: 2 },
      { date: '2024-06-01', level: 3, milestone: 'Advanced welding cert' },
      { date: '2025-10-14', level: 3 }
    ]
  }
};

export const mockSkillEndorsements = {
  'EMP001': {
    'skill-1': [
      { type: 'certification' as const, endorserName: 'AWS D1.1', date: '2024-12-01', count: 1 },
      { type: 'supervisor' as const, endorserName: 'Emily Davis', date: '2025-01-15', count: 1 },
      { type: 'peer' as const, endorserName: 'Team Members', date: '2025-03-20', count: 5 },
      { type: 'expert' as const, endorserName: 'John Senior', date: '2024-11-10', count: 1 }
    ]
  }
};

export const mockTaskForecasts = [
  {
    shiftName: 'Morning',
    totalTasks: 24,
    onTrack: 16,
    atRisk: 5,
    delayed: 3,
    predictedCompletion: 75,
    bottlenecks: [
      'Hydraulic press repair (urgent) - Machine #5 down',
      'High-precision aerospace parts require extra time',
      'Safety training scheduled conflicts with production tasks',
      'Blueprint review delays affecting downstream work'
    ]
  },
  {
    shiftName: 'Afternoon',
    totalTasks: 22,
    onTrack: 17,
    atRisk: 4,
    delayed: 1,
    predictedCompletion: 86,
    bottlenecks: [
      'CNC programming taking longer than estimated',
      'Quality audit may impact production schedule',
      'Line changeover scheduled mid-shift'
    ]
  },
  {
    shiftName: 'Night',
    totalTasks: 8,
    onTrack: 6,
    atRisk: 2,
    delayed: 0,
    predictedCompletion: 85,
    bottlenecks: []
  }
];

export const mockShiftHealth = [
  {
    shiftName: 'Morning',
    utilization: 82,
    activeEmployees: 15,
    totalEmployees: 18,
    taskCompletion: 85,
    incidents: 0,
    status: 'excellent' as const
  },
  {
    shiftName: 'Afternoon',
    utilization: 76,
    activeEmployees: 14,
    totalEmployees: 16,
    taskCompletion: 88,
    incidents: 0,
    status: 'excellent' as const
  },
  {
    shiftName: 'Night',
    utilization: 45,
    activeEmployees: 5,
    totalEmployees: 8,
    taskCompletion: 45,
    incidents: 1,
    status: 'fair' as const
  }
];

export const mockEmployeeMilestones = {
  'EMP001': [
    {
      id: 'milestone-1',
      type: 'certification' as const,
      title: 'Expert Machinist',
      description: 'Achieve expert level in CNC Machining',
      progress: 1,
      target: 1,
      achieved: true,
      achievedDate: '2024-12-01',
      icon: '🏅',
      rarity: 'epic' as const
    },
    {
      id: 'milestone-2',
      type: 'streak' as const,
      title: '100-Day Streak',
      description: 'Complete tasks for 100 consecutive days',
      progress: 87,
      target: 100,
      achieved: false,
      icon: '🔥',
      rarity: 'rare' as const
    },
    {
      id: 'milestone-3',
      type: 'tasks' as const,
      title: 'Century Mark',
      description: 'Complete 100 tasks',
      progress: 145,
      target: 100,
      achieved: true,
      achievedDate: '2025-08-15',
      icon: '💯',
      rarity: 'common' as const
    },
    {
      id: 'milestone-4',
      type: 'quality' as const,
      title: 'Perfectionist',
      description: 'Maintain 100% quality rating for 50 tasks',
      progress: 32,
      target: 50,
      achieved: false,
      icon: '⭐',
      rarity: 'legendary' as const
    }
  ]
};

export const mockLeaderboard = [
  {
    rank: 1,
    employeeId: 'EMP002',
    employeeName: 'Sarah Johnson',
    score: 95,
    metric: '%',
    trend: 'up' as const,
    badge: 'Quality Champion'
  },
  {
    rank: 2,
    employeeId: 'EMP009',
    employeeName: 'Rachel Kim',
    score: 93,
    metric: '%',
    trend: 'up' as const,
    badge: 'Welding Expert'
  },
  {
    rank: 3,
    employeeId: 'EMP001',
    employeeName: 'John Smith',
    score: 92,
    metric: '%',
    trend: 'same' as const,
    badge: 'CNC Expert'
  },
  {
    rank: 4,
    employeeId: 'EMP007',
    employeeName: 'Maria Garcia',
    score: 91,
    metric: '%',
    trend: 'up' as const,
    badge: 'Machining Pro'
  },
  {
    rank: 5,
    employeeId: 'EMP005',
    employeeName: 'Lisa Chen',
    score: 90,
    metric: '%',
    trend: 'same' as const,
    badge: 'Assembly Pro'
  },
  {
    rank: 6,
    employeeId: 'EMP003',
    employeeName: 'Mike Wilson',
    score: 88,
    metric: '%',
    trend: 'down' as const,
    badge: ''
  },
  {
    rank: 7,
    employeeId: 'EMP006',
    employeeName: 'James Rodriguez',
    score: 87,
    metric: '%',
    trend: 'up' as const,
    badge: 'QC Specialist'
  },
  {
    rank: 8,
    employeeId: 'EMP008',
    employeeName: 'Kevin Thompson',
    score: 86,
    metric: '%',
    trend: 'same' as const,
    badge: ''
  },
  {
    rank: 9,
    employeeId: 'EMP004',
    employeeName: 'David Martinez',
    score: 85,
    metric: '%',
    trend: 'down' as const,
    badge: ''
  },
  {
    rank: 10,
    employeeId: 'EMP010',
    employeeName: 'Thomas Anderson',
    score: 84,
    metric: '%',
    trend: 'same' as const,
    badge: ''
  }
];

export const mockAIInsights = [
  {
    type: 'prediction' as const,
    title: 'Capacity Alert - Team B',
    description: 'Team B will reach 90% utilization by 2 PM today. Consider redistributing 3 tasks to Team A to prevent overtime and maintain quality standards.',
    confidence: 87
  },
  {
    type: 'recommendation' as const,
    title: 'Top Performer Recognition',
    description: 'Rachel Kim (EMP009) has achieved 93% performance with expert-level TIG welding. Consider her for mentoring new welding trainees.',
    confidence: 94
  },
  {
    type: 'recommendation' as const,
    title: 'Skill Training Opportunity',
    description: 'Thomas Anderson (EMP010) shows consistent progress. Recommend advanced assembly certification - predicted to reduce task completion time by 15%.',
    confidence: 92
  },
  {
    type: 'alert' as const,
    title: 'Equipment Maintenance Due',
    description: 'Machine A-101 requires preventive maintenance within 48 hours. Scheduling now will prevent potential 4-hour downtime next week.',
    confidence: 95
  },
  {
    type: 'insight' as const,
    title: 'Cross-Shift Collaboration Opportunity',
    description: 'Maria Garcia (EMP007) and Rachel Kim (EMP009) have complementary skills. Pairing them on complex machining projects could improve quality by 18%.',
    confidence: 89
  },
  {
    type: 'insight' as const,
    title: 'Performance Trend Detected',
    description: 'Morning shift task completion has improved 12% over the past two weeks. Key contributors: EMP001, EMP009, and EMP008.',
    confidence: 91
  }
];

// Productivity Heatmap Mock Data
export const mockProductivityHeatmap = (() => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
  const data = [];

  for (const day of days) {
    for (let i = 0; i < hours.length; i += 2) { // Every 2 hours
      const hour = hours[i];
      let productivity = 0;
      let status: 'peak' | 'normal' | 'idle' | 'bottleneck' = 'normal';

      // Morning shift (6-14)
      if (i >= 6 && i <= 14) {
        productivity = 70 + Math.random() * 30;
        if (i >= 10 && i <= 12) {
          productivity = 85 + Math.random() * 15;
          status = 'peak';
        }
      }
      // Afternoon shift (14-22)
      else if (i >= 14 && i <= 22) {
        productivity = 60 + Math.random() * 25;
        if (i >= 15 && i <= 16) {
          productivity = 20 + Math.random() * 20;
          status = 'idle';
        }
      }
      // Night shift (22-6)
      else {
        productivity = 40 + Math.random() * 30;
      }

      // Random bottlenecks
      if (Math.random() > 0.92) {
        productivity = 25 + Math.random() * 15;
        status = 'bottleneck';
      }

      data.push({
        hour,
        day,
        productivity: Math.round(productivity),
        tasksCompleted: Math.floor((productivity / 100) * 15),
        utilization: Math.round(productivity * 0.9 + Math.random() * 10),
        status
      });
    }
  }

  return data;
})();

// Skills Library
export const mockSkills: Skill[] = [
  {
    id: 'skill-1',
    name: 'CNC Machining',
    category: 'Machining',
    description: 'Operation and programming of CNC machines',
    requiresCertification: true,
    department: 'Production'
  },
  {
    id: 'skill-2',
    name: 'MIG Welding',
    category: 'Welding',
    description: 'Metal Inert Gas welding techniques',
    requiresCertification: true,
    department: 'Production'
  },
  {
    id: 'skill-3',
    name: 'Quality Inspection',
    category: 'Quality Control',
    description: 'Visual and measurement-based quality inspection',
    requiresCertification: true,
    department: 'Quality Control'
  },
  {
    id: 'skill-4',
    name: 'Assembly Line Operations',
    category: 'Assembly',
    description: 'General assembly line work and component installation',
    requiresCertification: false,
    department: 'Assembly'
  },
  {
    id: 'skill-5',
    name: 'Inventory Management',
    category: 'Logistics',
    description: 'Parts tracking and inventory control',
    requiresCertification: false,
    department: 'Assembly'
  },
  {
    id: 'skill-6',
    name: 'Safety Compliance',
    category: 'Safety',
    description: 'OSHA safety standards and equipment inspection',
    requiresCertification: true,
    department: 'All'
  },
  {
    id: 'skill-7',
    name: 'TIG Welding',
    category: 'Welding',
    description: 'Tungsten Inert Gas welding for precision work',
    requiresCertification: true,
    department: 'Production'
  },
  {
    id: 'skill-8',
    name: 'Blueprint Reading',
    category: 'Technical',
    description: 'Technical drawing interpretation',
    requiresCertification: false,
    department: 'Production'
  }
];

// Users with Skills
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'employee',
    employeeId: 'EMP001',
    department: 'Production',
    shift: 'Morning',
    currentWorkload: 35,
    performanceScore: 92,
    skills: [
      {
        skillId: 'skill-1',
        skillName: 'CNC Machining',
        level: 'expert',
        yearsExperience: 5,
        certifications: [{
          id: 'cert-1',
          name: 'CNC Level 3 Certification',
          issueDate: '2023-01-15',
          expiryDate: '2026-01-15',
          status: 'active'
        }],
        lastUsed: '2025-10-14'
      },
      {
        skillId: 'skill-2',
        skillName: 'MIG Welding',
        level: 'advanced',
        yearsExperience: 4,
        certifications: [{
          id: 'cert-2',
          name: 'AWS D1.1 MIG Welding',
          issueDate: '2023-06-10',
          expiryDate: '2026-06-10',
          status: 'active'
        }],
        lastUsed: '2025-10-13'
      },
      {
        skillId: 'skill-6',
        skillName: 'Safety Compliance',
        level: 'advanced',
        yearsExperience: 5,
        certifications: [{
          id: 'cert-3',
          name: 'OSHA 30-Hour',
          issueDate: '2024-03-01',
          expiryDate: '2027-03-01',
          status: 'active'
        }],
        lastUsed: '2025-10-14'
      },
      {
        skillId: 'skill-8',
        skillName: 'Blueprint Reading',
        level: 'expert',
        yearsExperience: 6,
        lastUsed: '2025-10-14'
      }
    ],
    password: 'demo123'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'employee',
    employeeId: 'EMP002',
    department: 'Quality Control',
    shift: 'Morning',
    currentWorkload: 60,
    performanceScore: 95,
    skills: [
      {
        skillId: 'skill-3',
        skillName: 'Quality Inspection',
        level: 'expert',
        yearsExperience: 7,
        certifications: [{
          id: 'cert-4',
          name: 'ASQ CQI Certification',
          issueDate: '2022-09-15',
          expiryDate: '2025-09-15',
          status: 'active'
        }],
        lastUsed: '2025-10-14'
      },
      {
        skillId: 'skill-6',
        skillName: 'Safety Compliance',
        level: 'intermediate',
        yearsExperience: 3,
        certifications: [{
          id: 'cert-5',
          name: 'OSHA 10-Hour',
          issueDate: '2024-01-10',
          expiryDate: '2027-01-10',
          status: 'active'
        }],
        lastUsed: '2025-10-12'
      },
      {
        skillId: 'skill-8',
        skillName: 'Blueprint Reading',
        level: 'advanced',
        yearsExperience: 4,
        lastUsed: '2025-10-13'
      }
    ],
    password: 'demo123'
  },
  {
    id: '3',
    name: 'Mike Wilson',
    role: 'employee',
    employeeId: 'EMP003',
    department: 'Assembly',
    shift: 'Afternoon',
    currentWorkload: 25,
    performanceScore: 88,
    skills: [
      {
        skillId: 'skill-4',
        skillName: 'Assembly Line Operations',
        level: 'advanced',
        yearsExperience: 3,
        lastUsed: '2025-10-13'
      },
      {
        skillId: 'skill-5',
        skillName: 'Inventory Management',
        level: 'intermediate',
        yearsExperience: 2,
        lastUsed: '2025-10-14'
      },
      {
        skillId: 'skill-6',
        skillName: 'Safety Compliance',
        level: 'beginner',
        yearsExperience: 1,
        certifications: [{
          id: 'cert-6',
          name: 'OSHA 10-Hour',
          issueDate: '2024-08-01',
          expiryDate: '2027-08-01',
          status: 'active'
        }],
        lastUsed: '2025-10-10'
      }
    ],
    password: 'demo123'
  },
  {
    id: '6',
    name: 'David Martinez',
    role: 'employee',
    employeeId: 'EMP004',
    department: 'Production',
    shift: 'Morning',
    currentWorkload: 75,
    performanceScore: 85,
    skills: [
      {
        skillId: 'skill-2',
        skillName: 'MIG Welding',
        level: 'expert',
        yearsExperience: 8,
        certifications: [{
          id: 'cert-7',
          name: 'AWS D1.1 MIG Welding',
          issueDate: '2020-03-15',
          expiryDate: '2025-03-15',
          status: 'expired'
        }],
        lastUsed: '2025-10-14'
      },
      {
        skillId: 'skill-7',
        skillName: 'TIG Welding',
        level: 'advanced',
        yearsExperience: 5,
        certifications: [{
          id: 'cert-8',
          name: 'AWS D17.1 TIG Welding',
          issueDate: '2023-11-20',
          expiryDate: '2026-11-20',
          status: 'active'
        }],
        lastUsed: '2025-10-13'
      },
      {
        skillId: 'skill-6',
        skillName: 'Safety Compliance',
        level: 'intermediate',
        yearsExperience: 4,
        lastUsed: '2025-10-12'
      }
    ],
    password: 'demo123'
  },
  {
    id: '7',
    name: 'Lisa Chen',
    role: 'employee',
    employeeId: 'EMP005',
    department: 'Assembly',
    shift: 'Afternoon',
    currentWorkload: 40,
    performanceScore: 90,
    skills: [
      {
        skillId: 'skill-4',
        skillName: 'Assembly Line Operations',
        level: 'expert',
        yearsExperience: 6,
        lastUsed: '2025-10-14'
      },
      {
        skillId: 'skill-5',
        skillName: 'Inventory Management',
        level: 'advanced',
        yearsExperience: 5,
        lastUsed: '2025-10-14'
      },
      {
        skillId: 'skill-3',
        skillName: 'Quality Inspection',
        level: 'intermediate',
        yearsExperience: 2,
        certifications: [{
          id: 'cert-9',
          name: 'Basic Quality Inspector',
          issueDate: '2024-05-01',
          expiryDate: '2027-05-01',
          status: 'active'
        }],
        lastUsed: '2025-10-11'
      }
    ],
    password: 'demo123'
  },
  {
    id: '8',
    name: 'James Rodriguez',
    role: 'employee',
    employeeId: 'EMP006',
    department: 'Quality Control',
    shift: 'Afternoon',
    currentWorkload: 55,
    performanceScore: 87,
    skills: [
      {
        skillId: 'skill-3',
        skillName: 'Quality Inspection',
        level: 'advanced',
        yearsExperience: 4,
        certifications: [{
          id: 'cert-10',
          name: 'ASQ CQI Certification',
          issueDate: '2023-04-20',
          expiryDate: '2026-04-20',
          status: 'active'
        }],
        lastUsed: '2025-10-14'
      },
      {
        skillId: 'skill-8',
        skillName: 'Blueprint Reading',
        level: 'intermediate',
        yearsExperience: 3,
        lastUsed: '2025-10-13'
      },
      {
        skillId: 'skill-6',
        skillName: 'Safety Compliance',
        level: 'advanced',
        yearsExperience: 4,
        certifications: [{
          id: 'cert-11',
          name: 'OSHA 30-Hour',
          issueDate: '2023-07-15',
          expiryDate: '2026-07-15',
          status: 'active'
        }],
        lastUsed: '2025-10-14'
      }
    ],
    password: 'demo123'
  },
  {
    id: '9',
    name: 'Maria Garcia',
    role: 'employee',
    employeeId: 'EMP007',
    department: 'Production',
    shift: 'Afternoon',
    currentWorkload: 68,
    performanceScore: 91,
    skills: [
      {
        skillId: 'skill-1',
        skillName: 'CNC Machining',
        level: 'advanced',
        yearsExperience: 4,
        certifications: [{
          id: 'cert-12',
          name: 'CNC Level 2 Certification',
          issueDate: '2023-02-10',
          expiryDate: '2026-02-10',
          status: 'active'
        }],
        lastUsed: '2025-10-14'
      },
      {
        skillId: 'skill-8',
        skillName: 'Blueprint Reading',
        level: 'expert',
        yearsExperience: 5,
        lastUsed: '2025-10-14'
      },
      {
        skillId: 'skill-6',
        skillName: 'Safety Compliance',
        level: 'intermediate',
        yearsExperience: 3,
        certifications: [{
          id: 'cert-13',
          name: 'OSHA 10-Hour',
          issueDate: '2024-02-05',
          expiryDate: '2027-02-05',
          status: 'active'
        }],
        lastUsed: '2025-10-12'
      }
    ],
    password: 'demo123'
  },
  {
    id: '10',
    name: 'Kevin Thompson',
    role: 'employee',
    employeeId: 'EMP008',
    department: 'Assembly',
    shift: 'Morning',
    currentWorkload: 50,
    performanceScore: 86,
    skills: [
      {
        skillId: 'skill-4',
        skillName: 'Assembly Line Operations',
        level: 'advanced',
        yearsExperience: 5,
        lastUsed: '2025-10-14'
      },
      {
        skillId: 'skill-5',
        skillName: 'Inventory Management',
        level: 'advanced',
        yearsExperience: 4,
        lastUsed: '2025-10-13'
      },
      {
        skillId: 'skill-6',
        skillName: 'Safety Compliance',
        level: 'intermediate',
        yearsExperience: 3,
        certifications: [{
          id: 'cert-14',
          name: 'OSHA 10-Hour',
          issueDate: '2023-09-12',
          expiryDate: '2026-09-12',
          status: 'active'
        }],
        lastUsed: '2025-10-11'
      }
    ],
    password: 'demo123'
  },
  {
    id: '11',
    name: 'Rachel Kim',
    role: 'employee',
    employeeId: 'EMP009',
    department: 'Production',
    shift: 'Morning',
    currentWorkload: 45,
    performanceScore: 93,
    skills: [
      {
        skillId: 'skill-2',
        skillName: 'MIG Welding',
        level: 'advanced',
        yearsExperience: 6,
        certifications: [{
          id: 'cert-15',
          name: 'AWS D1.1 MIG Welding',
          issueDate: '2022-05-18',
          expiryDate: '2025-05-18',
          status: 'active'
        }],
        lastUsed: '2025-10-14'
      },
      {
        skillId: 'skill-7',
        skillName: 'TIG Welding',
        level: 'expert',
        yearsExperience: 7,
        certifications: [{
          id: 'cert-16',
          name: 'AWS D17.1 TIG Welding',
          issueDate: '2022-08-25',
          expiryDate: '2025-08-25',
          status: 'active'
        }],
        lastUsed: '2025-10-14'
      },
      {
        skillId: 'skill-8',
        skillName: 'Blueprint Reading',
        level: 'advanced',
        yearsExperience: 6,
        lastUsed: '2025-10-13'
      },
      {
        skillId: 'skill-6',
        skillName: 'Safety Compliance',
        level: 'advanced',
        yearsExperience: 5,
        certifications: [{
          id: 'cert-17',
          name: 'OSHA 30-Hour',
          issueDate: '2023-03-10',
          expiryDate: '2026-03-10',
          status: 'active'
        }],
        lastUsed: '2025-10-14'
      }
    ],
    password: 'demo123'
  },
  {
    id: '12',
    name: 'Thomas Anderson',
    role: 'employee',
    employeeId: 'EMP010',
    department: 'Assembly',
    shift: 'Afternoon',
    currentWorkload: 62,
    performanceScore: 84,
    skills: [
      {
        skillId: 'skill-4',
        skillName: 'Assembly Line Operations',
        level: 'intermediate',
        yearsExperience: 3,
        lastUsed: '2025-10-14'
      },
      {
        skillId: 'skill-5',
        skillName: 'Inventory Management',
        level: 'beginner',
        yearsExperience: 2,
        lastUsed: '2025-10-12'
      },
      {
        skillId: 'skill-6',
        skillName: 'Safety Compliance',
        level: 'intermediate',
        yearsExperience: 3,
        certifications: [{
          id: 'cert-18',
          name: 'OSHA 10-Hour',
          issueDate: '2024-06-08',
          expiryDate: '2027-06-08',
          status: 'active'
        }],
        lastUsed: '2025-10-10'
      }
    ],
    password: 'demo123'
  },
  {
    id: '4',
    name: 'Emily Davis',
    role: 'supervisor',
    employeeId: 'SUP001',
    department: 'Production',
    email: 'emily.davis@company.com',
    password: 'demo123'
  },
  {
    id: '5',
    name: 'Robert Brown',
    role: 'manager',
    employeeId: 'MGR001',
    department: 'Operations',
    email: 'robert.brown@company.com',
    password: 'demo123'
  }
];

// Enhanced Tasks with Skills and Feedback
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Machine Setup - Line A',
    description: 'Prepare and calibrate machine A-101 for morning production run',
    assignedTo: '1',
    assignedBy: '4',
    priority: 'high',
    status: 'completed',
    startTime: '07:00',
    endTime: '08:00',
    dueDate: '2025-10-14',
    completedAt: '2025-10-14T07:45:00',
    requiredSkills: ['skill-1', 'skill-6'],
    checklist: [
      { id: '1', text: 'Check oil levels', completed: true },
      { id: '2', text: 'Calibrate sensors', completed: true },
      { id: '3', text: 'Test run', completed: true }
    ],
    notes: 'All equipment checked and ready',
    difficultyRating: 3,
    qualityRating: 5,
    feedback: {
      employeeFeedback: {
        difficultyRating: 3,
        clarity: 5,
        hadIssues: false,
        submittedAt: '2025-10-14T08:00:00'
      },
      supervisorFeedback: {
        qualityRating: 5,
        onTime: true,
        needsRetraining: false,
        notes: 'Excellent work as always',
        submittedAt: '2025-10-14T08:30:00'
      }
    }
  },
  {
    id: '2',
    title: 'Quality Inspection - Batch #4521',
    description: 'Inspect finished products from batch 4521 according to QC checklist',
    assignedTo: '2',
    assignedBy: '4',
    priority: 'high',
    status: 'in-progress',
    startTime: '09:00',
    endTime: '10:30',
    dueDate: '2025-10-14',
    requiredSkills: ['skill-3', 'skill-8'],
    checklist: [
      { id: '1', text: 'Visual inspection', completed: true },
      { id: '2', text: 'Measurements check', completed: false },
      { id: '3', text: 'Documentation', completed: false }
    ]
  },
  {
    id: '3',
    title: 'Assembly Station Cleaning',
    description: 'Deep clean assembly station 5 and organize tools',
    assignedTo: '1',
    assignedBy: '4',
    priority: 'medium',
    status: 'pending',
    startTime: '11:00',
    endTime: '12:00',
    dueDate: '2025-10-14',
    requiredSkills: ['skill-6'],
    notes: 'Use approved cleaning supplies only'
  },
  {
    id: '4',
    title: 'Parts Inventory Check',
    description: 'Count and verify parts inventory in storage area B',
    assignedTo: '3',
    assignedBy: '4',
    priority: 'medium',
    status: 'pending',
    startTime: '14:00',
    endTime: '15:30',
    dueDate: '2025-10-14',
    requiredSkills: ['skill-5']
  },
  {
    id: '5',
    title: 'Safety Equipment Inspection',
    description: 'Check all safety equipment and fire extinguishers on floor 2',
    assignedTo: '1',
    assignedBy: '4',
    priority: 'high',
    status: 'pending',
    startTime: '14:00',
    endTime: '15:00',
    dueDate: '2025-10-14',
    requiredSkills: ['skill-6'],
    checklist: [
      { id: '1', text: 'Fire extinguishers', completed: false },
      { id: '2', text: 'First aid kits', completed: false },
      { id: '3', text: 'Emergency exits', completed: false }
    ]
  },
  {
    id: '6',
    title: 'Production Report - Morning Shift',
    description: 'Complete production report for morning shift operations',
    assignedTo: '2',
    assignedBy: '4',
    priority: 'low',
    status: 'pending',
    startTime: '15:00',
    endTime: '16:00',
    dueDate: '2025-10-14'
  },
  {
    id: '7',
    title: 'Precision Welding - Component X45',
    description: 'TIG weld critical joints on aerospace component',
    assignedTo: '6',
    assignedBy: '4',
    priority: 'high',
    status: 'completed',
    startTime: '08:00',
    endTime: '11:00',
    dueDate: '2025-10-13',
    completedAt: '2025-10-13T10:45:00',
    requiredSkills: ['skill-7', 'skill-8'],
    difficultyRating: 5,
    qualityRating: 4,
    feedback: {
      employeeFeedback: {
        difficultyRating: 5,
        clarity: 4,
        hadIssues: true,
        issues: 'Blueprint specifications were unclear for joint J-12',
        submittedAt: '2025-10-13T11:00:00'
      },
      supervisorFeedback: {
        qualityRating: 4,
        onTime: true,
        needsRetraining: false,
        notes: 'Good work, minor rework needed on one joint',
        submittedAt: '2025-10-13T12:00:00'
      }
    }
  },
  {
    id: '8',
    title: 'CNC Programming - Part Series B',
    description: 'Program CNC machine for new part series B-200 to B-210',
    assignedTo: '9',
    assignedBy: '4',
    priority: 'high',
    status: 'in-progress',
    startTime: '14:00',
    endTime: '17:00',
    dueDate: '2025-10-16',
    requiredSkills: ['skill-1', 'skill-8'],
    checklist: [
      { id: '1', text: 'Load CAD files', completed: true },
      { id: '2', text: 'Create toolpaths', completed: true },
      { id: '3', text: 'Test program', completed: false },
      { id: '4', text: 'Document settings', completed: false }
    ],
    notes: 'Priority project for new client order'
  },
  {
    id: '9',
    title: 'Quality Audit - Assembly Line 3',
    description: 'Perform comprehensive quality audit on assembly line 3 operations',
    assignedTo: '8',
    assignedBy: '4',
    priority: 'high',
    status: 'pending',
    startTime: '15:00',
    endTime: '17:30',
    dueDate: '2025-10-16',
    requiredSkills: ['skill-3', 'skill-8'],
    checklist: [
      { id: '1', text: 'Review assembly procedures', completed: false },
      { id: '2', text: 'Inspect workstations', completed: false },
      { id: '3', text: 'Test sample products', completed: false },
      { id: '4', text: 'Generate audit report', completed: false }
    ]
  },
  {
    id: '10',
    title: 'Component Assembly - Order #8821',
    description: 'Assemble 50 units of product model XR-500',
    assignedTo: '7',
    assignedBy: '4',
    priority: 'medium',
    status: 'in-progress',
    startTime: '13:00',
    endTime: '16:00',
    dueDate: '2025-10-16',
    requiredSkills: ['skill-4'],
    notes: 'Customer deadline: Oct 17. Priority assembly.'
  },
  {
    id: '11',
    title: 'Inventory Restocking - Raw Materials',
    description: 'Restock raw materials in production area and update inventory system',
    assignedTo: '10',
    assignedBy: '4',
    priority: 'medium',
    status: 'pending',
    startTime: '14:30',
    endTime: '16:00',
    dueDate: '2025-10-16',
    requiredSkills: ['skill-5'],
    checklist: [
      { id: '1', text: 'Count steel sheets', completed: false },
      { id: '2', text: 'Update SAP system', completed: false },
      { id: '3', text: 'Label new stock', completed: false }
    ]
  },
  {
    id: '12',
    title: 'TIG Welding Certification Training',
    description: 'Conduct TIG welding certification training for new employees',
    assignedTo: '11',
    assignedBy: '4',
    priority: 'low',
    status: 'pending',
    startTime: '08:00',
    endTime: '12:00',
    dueDate: '2025-10-17',
    requiredSkills: ['skill-7'],
    notes: 'Training for 3 new employees - bring certification materials'
  },
  {
    id: '13',
    title: 'Machine Maintenance - CNC A-102',
    description: 'Perform scheduled maintenance on CNC machine A-102',
    assignedTo: '1',
    assignedBy: '4',
    priority: 'high',
    status: 'completed',
    startTime: '06:00',
    endTime: '07:30',
    dueDate: '2025-10-15',
    completedAt: '2025-10-15T07:20:00',
    requiredSkills: ['skill-1', 'skill-6'],
    difficultyRating: 4,
    qualityRating: 5,
    checklist: [
      { id: '1', text: 'Replace cutting tools', completed: true },
      { id: '2', text: 'Lubricate spindle', completed: true },
      { id: '3', text: 'Calibrate axes', completed: true },
      { id: '4', text: 'Test run', completed: true }
    ],
    feedback: {
      employeeFeedback: {
        difficultyRating: 4,
        clarity: 5,
        hadIssues: false,
        submittedAt: '2025-10-15T07:30:00'
      },
      supervisorFeedback: {
        qualityRating: 5,
        onTime: true,
        needsRetraining: false,
        notes: 'Perfect maintenance work',
        submittedAt: '2025-10-15T08:00:00'
      }
    }
  },
  {
    id: '14',
    title: 'MIG Welding - Frame Assembly',
    description: 'Weld steel frame components for industrial rack system',
    assignedTo: '11',
    assignedBy: '4',
    priority: 'high',
    status: 'completed',
    startTime: '07:00',
    endTime: '10:00',
    dueDate: '2025-10-15',
    completedAt: '2025-10-15T09:45:00',
    requiredSkills: ['skill-2', 'skill-8'],
    difficultyRating: 3,
    qualityRating: 5,
    feedback: {
      employeeFeedback: {
        difficultyRating: 3,
        clarity: 5,
        hadIssues: false,
        submittedAt: '2025-10-15T10:00:00'
      },
      supervisorFeedback: {
        qualityRating: 5,
        onTime: true,
        needsRetraining: false,
        notes: 'Exceptional weld quality',
        submittedAt: '2025-10-15T10:30:00'
      }
    }
  },
  {
    id: '15',
    title: 'Final Inspection - Batch #4520',
    description: 'Final quality inspection before shipment of batch 4520',
    assignedTo: '2',
    assignedBy: '4',
    priority: 'high',
    status: 'completed',
    startTime: '11:00',
    endTime: '13:00',
    dueDate: '2025-10-15',
    completedAt: '2025-10-15T12:50:00',
    requiredSkills: ['skill-3'],
    difficultyRating: 2,
    qualityRating: 5,
    checklist: [
      { id: '1', text: 'Dimensional check', completed: true },
      { id: '2', text: 'Surface finish inspection', completed: true },
      { id: '3', text: 'Function test', completed: true },
      { id: '4', text: 'Packaging approval', completed: true }
    ],
    feedback: {
      employeeFeedback: {
        difficultyRating: 2,
        clarity: 5,
        hadIssues: false,
        submittedAt: '2025-10-15T13:00:00'
      },
      supervisorFeedback: {
        qualityRating: 5,
        onTime: true,
        needsRetraining: false,
        notes: 'Thorough inspection as always',
        submittedAt: '2025-10-15T13:30:00'
      }
    }
  },
  {
    id: '16',
    title: 'Assembly Line Setup - New Product',
    description: 'Configure assembly line 4 for new product launch',
    assignedTo: '10',
    assignedBy: '4',
    priority: 'medium',
    status: 'pending',
    startTime: '13:00',
    endTime: '15:30',
    dueDate: '2025-10-17',
    requiredSkills: ['skill-4', 'skill-5'],
    checklist: [
      { id: '1', text: 'Clear previous setup', completed: false },
      { id: '2', text: 'Install new fixtures', completed: false },
      { id: '3', text: 'Arrange tools', completed: false },
      { id: '4', text: 'Stock components', completed: false }
    ]
  },
  {
    id: '17',
    title: 'Safety Training - Fall Protection',
    description: 'Conduct quarterly fall protection safety training',
    assignedTo: '1',
    assignedBy: '4',
    priority: 'high',
    status: 'pending',
    startTime: '09:00',
    endTime: '11:00',
    dueDate: '2025-10-18',
    requiredSkills: ['skill-6'],
    notes: 'Mandatory for all employees working at heights'
  },
  {
    id: '18',
    title: 'Blueprint Review - Project Alpha',
    description: 'Review and verify blueprints for Project Alpha manufacturing',
    assignedTo: '9',
    assignedBy: '4',
    priority: 'high',
    status: 'in-progress',
    startTime: '10:00',
    endTime: '12:00',
    dueDate: '2025-10-16',
    requiredSkills: ['skill-8'],
    checklist: [
      { id: '1', text: 'Check dimensions', completed: true },
      { id: '2', text: 'Verify tolerances', completed: true },
      { id: '3', text: 'Review material specs', completed: false },
      { id: '4', text: 'Confirm with engineering', completed: false }
    ]
  },
  {
    id: '19',
    title: 'Welding Inspection - Critical Joints',
    description: 'Inspect all critical welds on structural components',
    assignedTo: '8',
    assignedBy: '4',
    priority: 'high',
    status: 'pending',
    startTime: '08:00',
    endTime: '10:00',
    dueDate: '2025-10-17',
    requiredSkills: ['skill-3'],
    notes: 'Use dye penetrant testing for all welds'
  },
  {
    id: '20',
    title: 'Subassembly - Motor Mounts',
    description: 'Assemble motor mount subassemblies for main production',
    assignedTo: '12',
    assignedBy: '4',
    priority: 'medium',
    status: 'in-progress',
    startTime: '14:00',
    endTime: '17:00',
    dueDate: '2025-10-16',
    requiredSkills: ['skill-4'],
    notes: 'Need 25 units by end of shift'
  },
  {
    id: '21',
    title: 'Tool Calibration - Measurement Equipment',
    description: 'Calibrate all measurement tools and gauges in QC department',
    assignedTo: '2',
    assignedBy: '4',
    priority: 'medium',
    status: 'pending',
    startTime: '07:00',
    endTime: '09:00',
    dueDate: '2025-10-17',
    requiredSkills: ['skill-3'],
    checklist: [
      { id: '1', text: 'Calipers', completed: false },
      { id: '2', text: 'Micrometers', completed: false },
      { id: '3', text: 'Height gauges', completed: false },
      { id: '4', text: 'Update calibration log', completed: false }
    ]
  },
  {
    id: '22',
    title: 'Material Handling - Steel Delivery',
    description: 'Unload and organize incoming steel shipment',
    assignedTo: '3',
    assignedBy: '4',
    priority: 'high',
    status: 'completed',
    startTime: '08:00',
    endTime: '10:00',
    dueDate: '2025-10-15',
    completedAt: '2025-10-15T09:50:00',
    requiredSkills: ['skill-5', 'skill-6'],
    difficultyRating: 3,
    qualityRating: 4,
    feedback: {
      employeeFeedback: {
        difficultyRating: 3,
        clarity: 4,
        hadIssues: false,
        submittedAt: '2025-10-15T10:00:00'
      },
      supervisorFeedback: {
        qualityRating: 4,
        onTime: true,
        needsRetraining: false,
        notes: 'Good organization',
        submittedAt: '2025-10-15T10:30:00'
      }
    }
  },
  {
    id: '23',
    title: 'Precision Machining - Aerospace Parts',
    description: 'Machine high-precision aerospace components with tight tolerances',
    assignedTo: '1',
    assignedBy: '4',
    priority: 'high',
    status: 'in-progress',
    startTime: '08:30',
    endTime: '12:00',
    dueDate: '2025-10-16',
    requiredSkills: ['skill-1', 'skill-8'],
    notes: 'Tolerance ±0.001" - requires 100% inspection'
  },
  {
    id: '24',
    title: 'Assembly Training - New Hires',
    description: 'Train new employees on assembly line procedures and safety',
    assignedTo: '7',
    assignedBy: '4',
    priority: 'medium',
    status: 'pending',
    startTime: '15:00',
    endTime: '17:00',
    dueDate: '2025-10-18',
    requiredSkills: ['skill-4', 'skill-6'],
    notes: '4 new hires attending'
  },
  {
    id: '25',
    title: 'Equipment Inspection - Afternoon Shift',
    description: 'Pre-shift inspection of all production equipment',
    assignedTo: '9',
    assignedBy: '4',
    priority: 'high',
    status: 'completed',
    startTime: '13:30',
    endTime: '14:00',
    dueDate: '2025-10-15',
    completedAt: '2025-10-15T13:55:00',
    requiredSkills: ['skill-6'],
    difficultyRating: 2,
    qualityRating: 5,
    checklist: [
      { id: '1', text: 'Emergency stops', completed: true },
      { id: '2', text: 'Guards and shields', completed: true },
      { id: '3', text: 'Lighting', completed: true },
      { id: '4', text: 'Report issues', completed: true }
    ],
    feedback: {
      employeeFeedback: {
        difficultyRating: 2,
        clarity: 5,
        hadIssues: false,
        submittedAt: '2025-10-15T14:00:00'
      },
      supervisorFeedback: {
        qualityRating: 5,
        onTime: true,
        needsRetraining: false,
        notes: 'Thorough inspection',
        submittedAt: '2025-10-15T14:30:00'
      }
    }
  },
  {
    id: '26',
    title: 'Custom Welding - Prototype Unit',
    description: 'Fabricate custom prototype using TIG welding techniques',
    assignedTo: '6',
    assignedBy: '4',
    priority: 'high',
    status: 'pending',
    startTime: '09:00',
    endTime: '13:00',
    dueDate: '2025-10-17',
    requiredSkills: ['skill-7', 'skill-8'],
    notes: 'Engineering team needs prototype by EOD Friday'
  },
  {
    id: '27',
    title: 'Quality Documentation - ISO Audit',
    description: 'Prepare quality documentation for upcoming ISO audit',
    assignedTo: '8',
    assignedBy: '4',
    priority: 'medium',
    status: 'in-progress',
    startTime: '09:00',
    endTime: '12:00',
    dueDate: '2025-10-18',
    requiredSkills: ['skill-3'],
    checklist: [
      { id: '1', text: 'Compile inspection reports', completed: true },
      { id: '2', text: 'Review calibration records', completed: false },
      { id: '3', text: 'Update procedures', completed: false },
      { id: '4', text: 'Organize files', completed: false }
    ]
  },
  {
    id: '28',
    title: 'Production Line Changeover',
    description: 'Changeover line 2 from product A to product B configuration',
    assignedTo: '10',
    assignedBy: '4',
    priority: 'high',
    status: 'pending',
    startTime: '12:00',
    endTime: '14:00',
    dueDate: '2025-10-17',
    requiredSkills: ['skill-4', 'skill-5'],
    notes: 'Product B production starts at 14:30'
  },
  {
    id: '29',
    title: 'Hydraulic System Repair',
    description: 'Repair hydraulic leak on press machine #5',
    assignedTo: '1',
    assignedBy: '4',
    priority: 'high',
    status: 'overdue',
    startTime: '10:00',
    endTime: '12:00',
    dueDate: '2025-10-14',
    requiredSkills: ['skill-1', 'skill-6'],
    notes: 'URGENT - Machine down since yesterday'
  },
  {
    id: '30',
    title: 'Finished Goods Inspection',
    description: 'Final inspection and packaging of completed orders',
    assignedTo: '12',
    assignedBy: '4',
    priority: 'medium',
    status: 'pending',
    startTime: '15:00',
    endTime: '17:00',
    dueDate: '2025-10-16',
    requiredSkills: ['skill-4'],
    notes: 'Orders #8819, #8820, #8821 ready for inspection'
  }
];

export const mockDailyReports: DailyReport[] = [
  {
    date: '2025-10-16',
    totalTasks: 30,
    completed: 8,
    inProgress: 7,
    pending: 14,
    overdue: 1,
    completionRate: 26.7
  },
  {
    date: '2025-10-15',
    totalTasks: 28,
    completed: 24,
    inProgress: 2,
    pending: 2,
    overdue: 0,
    completionRate: 85.7
  },
  {
    date: '2025-10-14',
    totalTasks: 26,
    completed: 19,
    inProgress: 4,
    pending: 2,
    overdue: 1,
    completionRate: 73.1
  },
  {
    date: '2025-10-13',
    totalTasks: 25,
    completed: 23,
    inProgress: 0,
    pending: 1,
    overdue: 1,
    completionRate: 92.0
  },
  {
    date: '2025-10-12',
    totalTasks: 24,
    completed: 22,
    inProgress: 0,
    pending: 2,
    overdue: 0,
    completionRate: 91.7
  },
  {
    date: '2025-10-11',
    totalTasks: 23,
    completed: 21,
    inProgress: 0,
    pending: 2,
    overdue: 0,
    completionRate: 91.3
  },
  {
    date: '2025-10-10',
    totalTasks: 24,
    completed: 22,
    inProgress: 0,
    pending: 2,
    overdue: 0,
    completionRate: 91.7
  },
  {
    date: '2025-10-09',
    totalTasks: 22,
    completed: 20,
    inProgress: 0,
    pending: 2,
    overdue: 0,
    completionRate: 90.9
  },
  {
    date: '2025-10-08',
    totalTasks: 23,
    completed: 21,
    inProgress: 0,
    pending: 2,
    overdue: 0,
    completionRate: 91.3
  }
];

// Employee Performance Data
export const mockEmployeePerformance: EmployeePerformance[] = [
  {
    employeeId: '1',
    completionRate: 92,
    averageTaskTime: 55, // minutes
    onTimeDeliveryRate: 95,
    qualityScore: 4.6,
    tasksCompleted: 145,
    tasksOverdue: 7,
    skillsUsed: [
      { skillId: 'skill-1', count: 89 },
      { skillId: 'skill-2', count: 34 },
      { skillId: 'skill-6', count: 22 }
    ],
    performanceTrend: [
      { date: '2025-10-08', completionRate: 90, tasksCompleted: 8 },
      { date: '2025-10-09', completionRate: 91, tasksCompleted: 9 },
      { date: '2025-10-10', completionRate: 93, tasksCompleted: 10 },
      { date: '2025-10-11', completionRate: 92, tasksCompleted: 9 },
      { date: '2025-10-12', completionRate: 94, tasksCompleted: 11 },
      { date: '2025-10-13', completionRate: 91, tasksCompleted: 8 },
      { date: '2025-10-14', completionRate: 92, tasksCompleted: 9 }
    ]
  },
  {
    employeeId: '2',
    completionRate: 95,
    averageTaskTime: 62,
    onTimeDeliveryRate: 98,
    qualityScore: 4.8,
    tasksCompleted: 132,
    tasksOverdue: 3,
    skillsUsed: [
      { skillId: 'skill-3', count: 98 },
      { skillId: 'skill-8', count: 34 }
    ],
    performanceTrend: [
      { date: '2025-10-08', completionRate: 94, tasksCompleted: 7 },
      { date: '2025-10-09', completionRate: 95, tasksCompleted: 8 },
      { date: '2025-10-10', completionRate: 96, tasksCompleted: 9 },
      { date: '2025-10-11', completionRate: 95, tasksCompleted: 8 },
      { date: '2025-10-12', completionRate: 95, tasksCompleted: 8 },
      { date: '2025-10-13', completionRate: 96, tasksCompleted: 9 },
      { date: '2025-10-14', completionRate: 95, tasksCompleted: 7 }
    ]
  },
  {
    employeeId: '3',
    completionRate: 88,
    averageTaskTime: 48,
    onTimeDeliveryRate: 90,
    qualityScore: 4.2,
    tasksCompleted: 98,
    tasksOverdue: 12,
    skillsUsed: [
      { skillId: 'skill-4', count: 67 },
      { skillId: 'skill-5', count: 31 }
    ],
    performanceTrend: [
      { date: '2025-10-08', completionRate: 86, tasksCompleted: 6 },
      { date: '2025-10-09', completionRate: 87, tasksCompleted: 7 },
      { date: '2025-10-10', completionRate: 88, tasksCompleted: 8 },
      { date: '2025-10-11', completionRate: 89, tasksCompleted: 7 },
      { date: '2025-10-12', completionRate: 88, tasksCompleted: 7 },
      { date: '2025-10-13', completionRate: 87, tasksCompleted: 6 },
      { date: '2025-10-14', completionRate: 88, tasksCompleted: 7 }
    ]
  },
  {
    employeeId: '6',
    completionRate: 85,
    averageTaskTime: 78,
    onTimeDeliveryRate: 87,
    qualityScore: 4.1,
    tasksCompleted: 76,
    tasksOverdue: 14,
    skillsUsed: [
      { skillId: 'skill-2', count: 45 },
      { skillId: 'skill-7', count: 31 }
    ],
    performanceTrend: [
      { date: '2025-10-08', completionRate: 84, tasksCompleted: 5 },
      { date: '2025-10-09', completionRate: 85, tasksCompleted: 6 },
      { date: '2025-10-10', completionRate: 86, tasksCompleted: 6 },
      { date: '2025-10-11', completionRate: 85, tasksCompleted: 5 },
      { date: '2025-10-12', completionRate: 84, tasksCompleted: 5 },
      { date: '2025-10-13', completionRate: 85, tasksCompleted: 6 },
      { date: '2025-10-14', completionRate: 85, tasksCompleted: 5 }
    ]
  },
  {
    employeeId: '7',
    completionRate: 90,
    averageTaskTime: 52,
    onTimeDeliveryRate: 93,
    qualityScore: 4.5,
    tasksCompleted: 112,
    tasksOverdue: 8,
    skillsUsed: [
      { skillId: 'skill-4', count: 78 },
      { skillId: 'skill-5', count: 34 }
    ],
    performanceTrend: [
      { date: '2025-10-08', completionRate: 89, tasksCompleted: 7 },
      { date: '2025-10-09', completionRate: 90, tasksCompleted: 8 },
      { date: '2025-10-10', completionRate: 91, tasksCompleted: 9 },
      { date: '2025-10-11', completionRate: 90, tasksCompleted: 8 },
      { date: '2025-10-12', completionRate: 89, tasksCompleted: 7 },
      { date: '2025-10-13', completionRate: 90, tasksCompleted: 8 },
      { date: '2025-10-14', completionRate: 90, tasksCompleted: 8 }
    ]
  },
  {
    employeeId: '8',
    completionRate: 87,
    averageTaskTime: 58,
    onTimeDeliveryRate: 91,
    qualityScore: 4.3,
    tasksCompleted: 94,
    tasksOverdue: 9,
    skillsUsed: [
      { skillId: 'skill-3', count: 68 },
      { skillId: 'skill-8', count: 26 }
    ],
    performanceTrend: [
      { date: '2025-10-08', completionRate: 86, tasksCompleted: 6 },
      { date: '2025-10-09', completionRate: 87, tasksCompleted: 7 },
      { date: '2025-10-10', completionRate: 88, tasksCompleted: 7 },
      { date: '2025-10-11', completionRate: 87, tasksCompleted: 6 },
      { date: '2025-10-12', completionRate: 86, tasksCompleted: 6 },
      { date: '2025-10-13', completionRate: 87, tasksCompleted: 7 },
      { date: '2025-10-14', completionRate: 87, tasksCompleted: 7 }
    ]
  },
  {
    employeeId: '9',
    completionRate: 91,
    averageTaskTime: 56,
    onTimeDeliveryRate: 94,
    qualityScore: 4.7,
    tasksCompleted: 108,
    tasksOverdue: 6,
    skillsUsed: [
      { skillId: 'skill-1', count: 52 },
      { skillId: 'skill-8', count: 56 }
    ],
    performanceTrend: [
      { date: '2025-10-08', completionRate: 90, tasksCompleted: 7 },
      { date: '2025-10-09', completionRate: 91, tasksCompleted: 8 },
      { date: '2025-10-10', completionRate: 92, tasksCompleted: 9 },
      { date: '2025-10-11', completionRate: 91, tasksCompleted: 8 },
      { date: '2025-10-12', completionRate: 90, tasksCompleted: 7 },
      { date: '2025-10-13', completionRate: 91, tasksCompleted: 8 },
      { date: '2025-10-14', completionRate: 91, tasksCompleted: 8 }
    ]
  },
  {
    employeeId: '10',
    completionRate: 86,
    averageTaskTime: 50,
    onTimeDeliveryRate: 88,
    qualityScore: 4.2,
    tasksCompleted: 89,
    tasksOverdue: 11,
    skillsUsed: [
      { skillId: 'skill-4', count: 61 },
      { skillId: 'skill-5', count: 28 }
    ],
    performanceTrend: [
      { date: '2025-10-08', completionRate: 85, tasksCompleted: 6 },
      { date: '2025-10-09', completionRate: 86, tasksCompleted: 7 },
      { date: '2025-10-10', completionRate: 87, tasksCompleted: 7 },
      { date: '2025-10-11', completionRate: 86, tasksCompleted: 6 },
      { date: '2025-10-12', completionRate: 85, tasksCompleted: 6 },
      { date: '2025-10-13', completionRate: 86, tasksCompleted: 7 },
      { date: '2025-10-14', completionRate: 86, tasksCompleted: 7 }
    ]
  },
  {
    employeeId: '11',
    completionRate: 93,
    averageTaskTime: 65,
    onTimeDeliveryRate: 96,
    qualityScore: 4.8,
    tasksCompleted: 118,
    tasksOverdue: 4,
    skillsUsed: [
      { skillId: 'skill-2', count: 48 },
      { skillId: 'skill-7', count: 70 }
    ],
    performanceTrend: [
      { date: '2025-10-08', completionRate: 92, tasksCompleted: 8 },
      { date: '2025-10-09', completionRate: 93, tasksCompleted: 9 },
      { date: '2025-10-10', completionRate: 94, tasksCompleted: 9 },
      { date: '2025-10-11', completionRate: 93, tasksCompleted: 8 },
      { date: '2025-10-12', completionRate: 92, tasksCompleted: 8 },
      { date: '2025-10-13', completionRate: 93, tasksCompleted: 9 },
      { date: '2025-10-14', completionRate: 93, tasksCompleted: 9 }
    ]
  },
  {
    employeeId: '12',
    completionRate: 84,
    averageTaskTime: 53,
    onTimeDeliveryRate: 86,
    qualityScore: 4.0,
    tasksCompleted: 82,
    tasksOverdue: 13,
    skillsUsed: [
      { skillId: 'skill-4', count: 58 },
      { skillId: 'skill-5', count: 24 }
    ],
    performanceTrend: [
      { date: '2025-10-08', completionRate: 83, tasksCompleted: 6 },
      { date: '2025-10-09', completionRate: 84, tasksCompleted: 6 },
      { date: '2025-10-10', completionRate: 85, tasksCompleted: 7 },
      { date: '2025-10-11', completionRate: 84, tasksCompleted: 6 },
      { date: '2025-10-12', completionRate: 83, tasksCompleted: 6 },
      { date: '2025-10-13', completionRate: 84, tasksCompleted: 6 },
      { date: '2025-10-14', completionRate: 84, tasksCompleted: 6 }
    ]
  }
];

// Skill Gap Analysis
export const mockSkillGaps: SkillGap[] = [
  {
    skillId: 'skill-1',
    skillName: 'CNC Machining',
    demand: 45, // tasks requiring this skill per week
    supply: 1, // employees with this skill
    gap: 44,
    utilization: 95
  },
  {
    skillId: 'skill-2',
    skillName: 'MIG Welding',
    demand: 38,
    supply: 2,
    gap: 36,
    utilization: 88
  },
  {
    skillId: 'skill-3',
    skillName: 'Quality Inspection',
    demand: 32,
    supply: 2,
    gap: 30,
    utilization: 78
  },
  {
    skillId: 'skill-4',
    skillName: 'Assembly Line Operations',
    demand: 28,
    supply: 2,
    gap: 26,
    utilization: 65
  },
  {
    skillId: 'skill-5',
    skillName: 'Inventory Management',
    demand: 15,
    supply: 2,
    gap: 13,
    utilization: 55
  },
  {
    skillId: 'skill-6',
    skillName: 'Safety Compliance',
    demand: 22,
    supply: 5,
    gap: 17,
    utilization: 42
  },
  {
    skillId: 'skill-7',
    skillName: 'TIG Welding',
    demand: 18,
    supply: 1,
    gap: 17,
    utilization: 92
  },
  {
    skillId: 'skill-8',
    skillName: 'Blueprint Reading',
    demand: 25,
    supply: 3,
    gap: 22,
    utilization: 58
  }
];

// Workforce Analytics
export const mockWorkforceAnalytics: WorkforceAnalytics = {
  overallUtilization: 72,
  skillUtilization: mockSkillGaps,
  topPerformers: ['2', '1', '7'], // Sarah, John, Lisa
  skillsInDemand: ['skill-1', 'skill-2', 'skill-7'], // CNC, MIG, TIG
  reworkIncidents: 8,
  trainingNeeded: [
    { skillId: 'skill-1', employeeIds: ['3', '7'] },
    { skillId: 'skill-2', employeeIds: ['3'] },
    { skillId: 'skill-3', employeeIds: ['6'] }
  ]
};

// Training Suggestions
export const mockTrainingSuggestions: TrainingSuggestion[] = [
  {
    employeeId: '6',
    skillId: 'skill-2',
    reason: 'MIG Welding certification expired - recertification required',
    priority: 'high',
    basedOn: 'certification-expiry'
  },
  {
    employeeId: '3',
    skillId: 'skill-1',
    reason: 'High demand for CNC Machining skills - upskilling recommended',
    priority: 'high',
    basedOn: 'skill-gap'
  },
  {
    employeeId: '3',
    skillId: 'skill-6',
    reason: 'Multiple safety tasks assigned - advanced training needed',
    priority: 'medium',
    basedOn: 'performance'
  },
  {
    employeeId: '7',
    skillId: 'skill-1',
    reason: 'Cross-training opportunity for production backup',
    priority: 'medium',
    basedOn: 'skill-gap'
  },
  {
    employeeId: '6',
    skillId: 'skill-3',
    reason: 'Task feedback indicates quality control knowledge gaps',
    priority: 'medium',
    basedOn: 'task-feedback'
  }
];

// Messages & Communication
export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    type: 'appreciation',
    title: '🏆 Outstanding Performance!',
    content: 'John, your precision work on the aerospace components this week has been exceptional. Keep up the excellent work!',
    from: '4',
    fromName: 'Emily Davis',
    to: '1',
    toName: 'John Smith',
    createdAt: '2025-10-15T14:30:00',
    isRead: false,
    priority: 'high'
  },
  {
    id: 'msg-2',
    type: 'announcement',
    title: '📢 Safety Training - October 18',
    content: 'Reminder: All employees must attend the mandatory fall protection safety training on October 18 at 9:00 AM. Please confirm your attendance.',
    from: '4',
    fromName: 'Emily Davis',
    createdAt: '2025-10-15T09:00:00',
    isRead: true,
    priority: 'high'
  },
  {
    id: 'msg-3',
    type: 'appreciation',
    title: '⭐ Quality Excellence',
    content: 'Sarah, your attention to detail during the ISO audit preparation has been invaluable. Thank you for your dedication!',
    from: '4',
    fromName: 'Emily Davis',
    to: '2',
    toName: 'Sarah Johnson',
    createdAt: '2025-10-14T16:45:00',
    isRead: false,
    priority: 'medium'
  },
  {
    id: 'msg-4',
    type: 'feedback',
    title: '💡 Suggestion Implemented',
    content: 'Thanks for the suggestion about reorganizing the tool storage. We\'ve implemented it and it\'s working great!',
    from: '4',
    fromName: 'Emily Davis',
    to: '3',
    toName: 'Mike Wilson',
    createdAt: '2025-10-14T11:20:00',
    isRead: true,
    priority: 'low'
  },
  {
    id: 'msg-5',
    type: 'announcement',
    title: '🎉 New Production Record!',
    content: 'Team, we achieved a new production record this week! 485 units completed with 98.5% quality rating. Great teamwork everyone!',
    from: '4',
    fromName: 'Emily Davis',
    createdAt: '2025-10-13T17:00:00',
    isRead: true,
    priority: 'medium'
  },
  {
    id: 'msg-6',
    type: 'appreciation',
    title: '🌟 Excellent Welding Work',
    content: 'David, your TIG welding on the prototype was flawless. The engineering team was very impressed!',
    from: '4',
    fromName: 'Emily Davis',
    to: '4',
    toName: 'David Martinez',
    createdAt: '2025-10-13T15:30:00',
    isRead: false,
    priority: 'medium'
  },
  {
    id: 'msg-7',
    type: 'reminder',
    title: '⏰ Equipment Calibration Due',
    content: 'Reminder to complete the quarterly equipment calibration by Friday. All QC measurement tools need to be certified.',
    from: '4',
    fromName: 'Emily Davis',
    to: '2',
    toName: 'Sarah Johnson',
    createdAt: '2025-10-12T10:00:00',
    isRead: true,
    priority: 'high'
  },
  {
    id: 'msg-8',
    type: 'appreciation',
    title: '👏 Quick Problem Solving',
    content: 'Maria, thank you for quickly resolving the blueprint issue on the Alpha project. Your expertise saved us valuable time!',
    from: '4',
    fromName: 'Emily Davis',
    to: '7',
    toName: 'Maria Garcia',
    createdAt: '2025-10-11T14:15:00',
    isRead: true,
    priority: 'medium'
  },
  {
    id: 'msg-9',
    type: 'announcement',
    title: '📋 New Client Order - Priority',
    content: 'We have a high-priority order from a new aerospace client. Production starts Monday. Please review the specifications in your task assignments.',
    from: '4',
    fromName: 'Emily Davis',
    createdAt: '2025-10-11T08:30:00',
    isRead: true,
    priority: 'high'
  },
  {
    id: 'msg-10',
    type: 'appreciation',
    title: '🎖️ Safety Champion',
    content: 'Rachel, your commitment to safety procedures and training new employees has been outstanding. You\'re setting a great example!',
    from: '4',
    fromName: 'Emily Davis',
    to: '9',
    toName: 'Rachel Kim',
    createdAt: '2025-10-10T16:00:00',
    isRead: true,
    priority: 'medium'
  },
  // Employee-sent messages (examples)
  {
    id: 'msg-11',
    type: 'feedback',
    title: '💡 Equipment Maintenance Suggestion',
    content: 'Hi Supervisor, I noticed that CNC Machine #3 needs its coolant system checked. It\'s making unusual sounds and might need preventive maintenance.',
    from: '1',
    fromName: 'John Smith',
    to: '4',
    toName: 'Emily Davis',
    createdAt: '2025-10-16T09:15:00',
    isRead: false,
    priority: 'medium'
  },
  {
    id: 'msg-12',
    type: 'feedback',
    title: '❓ Question about Blueprint Specifications',
    content: 'Could you clarify the tolerance requirements on the new aerospace part? The blueprint shows 0.001" but the work order says 0.002".',
    from: '2',
    fromName: 'Sarah Johnson',
    to: '4',
    toName: 'Emily Davis',
    createdAt: '2025-10-16T10:30:00',
    isRead: false,
    priority: 'medium'
  },
  {
    id: 'msg-13',
    type: 'announcement',
    title: '🔧 Tool Sharing - Torque Wrench Available',
    content: 'Hey team, I finished with the digital torque wrench early. It\'s calibrated and ready if anyone needs it for their tasks today.',
    from: '3',
    fromName: 'Mike Wilson',
    createdAt: '2025-10-16T11:00:00',
    isRead: true,
    priority: 'low'
  },
  {
    id: 'msg-14',
    type: 'appreciation',
    title: '👏 Thanks for the Help!',
    content: 'Thanks Maria for helping me troubleshoot that welding issue yesterday. Your expertise saved me a lot of time!',
    from: '6',
    fromName: 'Robert Taylor',
    to: '7',
    toName: 'Maria Garcia',
    createdAt: '2025-10-15T16:45:00',
    isRead: true,
    priority: 'low'
  }
];
