// Activity-related types

import type { GeoPoint, Rating } from './common'
import type { SurfBoard } from './surfboard'

export enum SkillLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export enum PaymentMethod {
  CASH = 'Cash',
  CARD = 'Card',
  BANK_TRANSFER = 'Bank Transfer',
  PAYPAL = 'PayPal'
}

export enum Language {
  ENGLISH = 'English',
  INDONESIAN = 'Indonesian',
  DUTCH = 'Dutch',
  GERMAN = 'German',
  FRENCH = 'French'
}

export enum ActivityType {
  LESSONS = 'Lessons',
  COACHING = 'Coaching',
  PHOTOGRAPHY = 'Photography',
  RENTAL = 'Rental'
}

export interface Activity {
  id: string
  businessId: string
  name: string
  description: string
  price: number
  currency: string
  images: string[]
  isActive: boolean
  isApproved: boolean
  rating: Rating
  location?: GeoPoint
  meetingPoint?: string
  cancellationPolicy: string
  paymentMethods: PaymentMethod[]
  languages: Language[]
  includedMaterials: string[]
  whatToBring: string[]
  knowBeforeYouGo: string[]
}

export interface SurfLessonActivity extends Activity {
  skillLevel: SkillLevel
  instructor: {
    name: string
    experience: string
    certifications?: string[]
  }
  groupSize: {
    min: number
    max: number
    isPrivate: boolean
  }
  duration: number
  timeSlots: string[]
  extras: {
    videoAnalysis: boolean
    feedback: boolean
    equipment: boolean
  }
}

export interface SurfCoachingActivity extends Activity {
  skillLevel: SkillLevel
  expertise: string[]
  surfSpots: string[]
  extras: {
    videoAnalysis: boolean
    feedback: boolean
    equipment: boolean
  }
}

export interface SurfPhotographyActivity extends Activity {
  surfSpots: string[]
  equipment: {
    drones: boolean
    waterCamera: boolean
    landCamera: boolean
    lenses: string[]
  }
  services: {
    onLocation: boolean
    editing: boolean
  }
  portfolio: string[]
  delivery: {
    digital: boolean
    sdCard: boolean
    other: string[]
  }
}

export interface SurfRentalActivity extends Activity {
  boards: SurfBoard[]
  rentalPeriods: {
    hourly: boolean
    daily: boolean
    weekly: boolean
  }
  included: string[]
  requirements: string[]
}
