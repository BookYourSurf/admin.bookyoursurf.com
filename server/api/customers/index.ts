import type { Customer } from '~/types/customer'
import { SkillLevel } from '~/types/session'

// Mock customer data
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    avatar: {
      src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      alt: 'John Doe'
    },
    skillLevel: SkillLevel.BEGINNER,
    totalBookings: 5,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 234 567 8901',
    avatar: {
      src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      alt: 'Jane Smith'
    },
    skillLevel: SkillLevel.INTERMEDIATE,
    totalBookings: 12,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    phone: '+1 234 567 8902',
    avatar: {
      src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      alt: 'Bob Wilson'
    },
    skillLevel: SkillLevel.ADVANCED,
    totalBookings: 25,
    createdAt: '2023-12-05',
    updatedAt: '2023-12-05'
  },
  {
    id: '4',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: {
      src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      alt: 'Alice Johnson'
    },
    skillLevel: SkillLevel.BEGINNER,
    totalBookings: 3,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    phone: '+1 234 567 8904',
    avatar: {
      src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
      alt: 'Charlie Brown'
    },
    skillLevel: SkillLevel.EXPERT,
    totalBookings: 50,
    createdAt: '2023-06-15',
    updatedAt: '2023-06-15'
  },
  {
    id: '6',
    name: 'Diana Prince',
    email: 'diana@example.com',
    phone: '+1 234 567 8905',
    avatar: {
      src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
      alt: 'Diana Prince'
    },
    skillLevel: SkillLevel.INTERMEDIATE,
    totalBookings: 18,
    createdAt: '2023-11-01',
    updatedAt: '2023-11-01'
  },
  {
    id: '7',
    name: 'Eva Martinez',
    email: 'eva@example.com',
    phone: '+1 234 567 8906',
    avatar: {
      src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eva',
      alt: 'Eva Martinez'
    },
    skillLevel: SkillLevel.BEGINNER,
    totalBookings: 2,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01'
  },
  {
    id: '8',
    name: 'Frank Chen',
    email: 'frank@example.com',
    phone: '+1 234 567 8907',
    avatar: {
      src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Frank',
      alt: 'Frank Chen'
    },
    skillLevel: SkillLevel.ADVANCED,
    totalBookings: 32,
    createdAt: '2023-09-15',
    updatedAt: '2023-09-15'
  }
]

export default defineEventHandler((event) => {
  return {
    customers: mockCustomers,
    total: mockCustomers.length
  }
})

