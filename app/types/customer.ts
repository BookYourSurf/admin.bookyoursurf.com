import type { SkillLevel } from './session'

export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: {
    src: string
    alt: string
  }
  skillLevel?: SkillLevel
  preferences?: string
  totalBookings: number
  createdAt: string
  updatedAt: string
}

export interface CustomerFormData {
  name: string
  email: string
  phone?: string
  avatar?: {
    src: string
    alt: string
  }
  skillLevel?: SkillLevel
  preferences?: string
}

