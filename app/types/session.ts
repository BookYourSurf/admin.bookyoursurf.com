export enum SessionState {
  NEEDS_CONFIRMATION = 'needs_confirmation',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CHANGED = 'changed',
  CANCELLED = 'cancelled'
}

export enum TimeWindow {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  FLEXIBLE = 'flexible'
}

export enum ServiceType {
  SURF_LESSON = 'surf_lesson',
  SURF_COACHING = 'surf_coaching',
  SURF_GUIDING = 'surf_guiding',
  SURF_CAMP = 'surf_camp'
}

export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export interface Session {
  id: string
  templateId: string
  serviceName: string
  serviceType: ServiceType
  date: string
  timeWindow: TimeWindow
  specificTime?: string
  state: SessionState
  groupSize: number
  maxGroupSize: number
  instructorName: string
  instructorId: string
  location: string
  customers: Array<{
    id: string
    name: string
    email: string
    avatar?: {
      src: string
      alt: string
    }
  }>
  level: SkillLevel
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface LessonTemplate {
  id: string
  name: string
  serviceType: ServiceType
  level: SkillLevel
  defaultDuration: number
  defaultTimeWindow: TimeWindow
  minGroupSize: number
  maxGroupSize: number
  defaultLocation: string
  instructorIds: string[]
  instructorNames: string[]
  price: number
  currency: string
  description?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Instructor {
  id: string
  name: string
  email: string
  specialties: ServiceType[]
  maxStudents: number
  isActive: boolean
}

export interface SessionFilters {
  state?: SessionState[]
  serviceType?: ServiceType[]
  instructor?: string[]
  dateRange?: {
    start: string
    end: string
  }
}
