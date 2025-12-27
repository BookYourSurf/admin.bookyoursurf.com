export default defineEventHandler(() => {
  const getNextDays = (days: number): Date => {
    const date = new Date()
    date.setDate(date.getDate() + days)
    return date
  }

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0] as string
  }

  return [
    {
      id: 'sess-1',
      templateId: 'tpl-1',
      serviceName: 'Beginner Surf Lesson',
      serviceType: 'surf_lesson' as const,
      date: formatDate(new Date()),
      timeWindow: 'morning' as const,
      state: 'needs_confirmation' as const,
      groupSize: 2,
      maxGroupSize: 6,
      instructorName: 'Made Surya',
      instructorId: 'inst-1',
      location: 'Canggu Beach',
      customers: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: {
            src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
            alt: 'John Doe'
          }
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          avatar: {
            src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
            alt: 'Jane Smith'
          }
        }
      ],
      level: 'beginner' as const,
      notes: 'Customer requested early morning session if possible',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'sess-2',
      templateId: 'tpl-2',
      serviceName: 'Intermediate Surf Coaching',
      serviceType: 'surf_coaching' as const,
      date: formatDate(getNextDays(1)),
      timeWindow: 'morning' as const,
      specificTime: '07:00',
      state: 'confirmed' as const,
      groupSize: 1,
      maxGroupSize: 4,
      instructorName: 'Wayan Agung',
      instructorId: 'inst-2',
      location: 'Uluwatu',
      customers: [
        {
          id: '3',
          name: 'Bob Wilson',
          email: 'bob@example.com',
          avatar: {
            src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
            alt: 'Bob Wilson'
          }
        }
      ],
      level: 'intermediate' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'sess-3',
      templateId: 'tpl-1',
      serviceName: 'Beginner Surf Lesson',
      serviceType: 'surf_lesson' as const,
      date: formatDate(new Date()),
      timeWindow: 'afternoon' as const,
      state: 'needs_confirmation' as const,
      groupSize: 4,
      maxGroupSize: 6,
      instructorName: 'Ketut Dharma',
      instructorId: 'inst-3',
      location: 'Canggu Beach',
      customers: [
        {
          id: '4',
          name: 'Alice Johnson',
          email: 'alice@example.com',
          avatar: {
            src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
            alt: 'Alice Johnson'
          }
        },
        {
          id: '5',
          name: 'Charlie Brown',
          email: 'charlie@example.com',
          avatar: {
            src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
            alt: 'Charlie Brown'
          }
        },
        {
          id: '6',
          name: 'Diana Prince',
          email: 'diana@example.com',
          avatar: {
            src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
            alt: 'Diana Prince'
          }
        },
        {
          id: '7',
          name: 'Eva Martinez',
          email: 'eva@example.com',
          avatar: {
            src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eva',
            alt: 'Eva Martinez'
          }
        }
      ],
      level: 'beginner' as const,
      notes: 'Group booking - family of 4',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'sess-4',
      templateId: 'tpl-3',
      serviceName: 'Advanced Surf Guiding',
      serviceType: 'surf_guiding' as const,
      date: formatDate(getNextDays(2)),
      timeWindow: 'morning' as const,
      specificTime: '06:30',
      state: 'confirmed' as const,
      groupSize: 3,
      maxGroupSize: 4,
      instructorName: 'Wayan Agung',
      instructorId: 'inst-2',
      location: 'Padang Padang',
      customers: [
        {
          id: '8',
          name: 'Frank Chen',
          email: 'frank@example.com',
          avatar: {
            src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Frank',
            alt: 'Frank Chen'
          }
        },
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: {
            src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
            alt: 'John Doe'
          }
        },
        {
          id: '3',
          name: 'Bob Wilson',
          email: 'bob@example.com',
          avatar: {
            src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
            alt: 'Bob Wilson'
          }
        }
      ],
      level: 'advanced' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'sess-5',
      templateId: 'tpl-2',
      serviceName: 'Intermediate Surf Coaching',
      serviceType: 'surf_coaching' as const,
      date: formatDate(getNextDays(-2)),
      timeWindow: 'morning' as const,
      specificTime: '08:00',
      state: 'completed' as const,
      groupSize: 2,
      maxGroupSize: 4,
      instructorName: 'Made Surya',
      instructorId: 'inst-1',
      location: 'Uluwatu',
      customers: [
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          avatar: {
            src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
            alt: 'Jane Smith'
          }
        },
        {
          id: '6',
          name: 'Diana Prince',
          email: 'diana@example.com',
          avatar: {
            src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
            alt: 'Diana Prince'
          }
        }
      ],
      level: 'intermediate' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'sess-6',
      templateId: 'tpl-1',
      serviceName: 'Beginner Surf Lesson',
      serviceType: 'surf_lesson' as const,
      date: formatDate(getNextDays(1)),
      timeWindow: 'morning' as const,
      specificTime: '09:00',
      state: 'changed' as const,
      groupSize: 1,
      maxGroupSize: 6,
      instructorName: 'Ketut Dharma',
      instructorId: 'inst-3',
      location: 'Seminyak Beach',
      customers: [
        {
          id: '4',
          name: 'Alice Johnson',
          email: 'alice@example.com',
          avatar: {
            src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
            alt: 'Alice Johnson'
          }
        }
      ],
      level: 'beginner' as const,
      notes: 'Customer requested to change from afternoon to morning',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'sess-7',
      templateId: 'tpl-1',
      serviceName: 'Beginner Surf Lesson',
      serviceType: 'surf_lesson' as const,
      date: formatDate(getNextDays(-5)),
      timeWindow: 'afternoon' as const,
      specificTime: '14:00',
      state: 'completed' as const,
      groupSize: 3,
      maxGroupSize: 6,
      instructorName: 'Made Surya',
      instructorId: 'inst-1',
      location: 'Canggu Beach',
      customers: [
        {
          id: '7',
          name: 'Eva Martinez',
          email: 'eva@example.com',
          avatar: {
            src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eva',
            alt: 'Eva Martinez'
          }
        },
        {
          id: '5',
          name: 'Charlie Brown',
          email: 'charlie@example.com',
          avatar: {
            src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
            alt: 'Charlie Brown'
          }
        },
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: {
            src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
            alt: 'John Doe'
          }
        }
      ],
      level: 'beginner' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'sess-8',
      templateId: 'tpl-3',
      serviceName: 'Advanced Surf Guiding',
      serviceType: 'surf_guiding' as const,
      date: formatDate(getNextDays(0)),
      timeWindow: 'morning' as const,
      state: 'needs_confirmation' as const,
      groupSize: 2,
      maxGroupSize: 4,
      instructorName: 'Wayan Agung',
      instructorId: 'inst-2',
      location: 'Bingin Beach',
      customers: [
        {
          id: '8',
          name: 'Frank Chen',
          email: 'frank@example.com',
          avatar: {
            src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Frank',
            alt: 'Frank Chen'
          }
        },
        {
          id: '3',
          name: 'Bob Wilson',
          email: 'bob@example.com',
          avatar: {
            src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
            alt: 'Bob Wilson'
          }
        }
      ],
      level: 'advanced' as const,
      notes: 'Experienced surfer looking for barrels',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'sess-9',
      templateId: 'tpl-2',
      serviceName: 'Intermediate Surf Coaching',
      serviceType: 'surf_coaching' as const,
      date: formatDate(getNextDays(-1)),
      timeWindow: 'morning' as const,
      specificTime: '07:30',
      state: 'cancelled' as const,
      groupSize: 1,
      maxGroupSize: 4,
      instructorName: 'Made Surya',
      instructorId: 'inst-1',
      location: 'Uluwatu',
      customers: [
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          avatar: {
            src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
            alt: 'Jane Smith'
          }
        }
      ],
      level: 'intermediate' as const,
      notes: 'Customer cancelled due to illness',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
})
