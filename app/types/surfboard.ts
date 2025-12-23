// Surfboard-related types

export enum BoardType {
  LONGBOARD = 'Longboard',
  SHORTBOARD = 'Shortboard',
  FISH = 'Fish',
  FUNBOARD = 'Funboard',
  GUN = 'Gun',
  MINI_MAL = 'Mini Mal',
  SOFTBOARD = 'Softboard',
  FOAM_BOARD = 'Foam Board'
}

export enum BoardCondition {
  EXCELLENT = 'Excellent',
  GOOD = 'Good',
  FAIR = 'Fair'
}

export interface SurfBoard {
  id: string
  name: string
  type: BoardType
  brand?: string
  model?: string
  length: number // in feet
  width: number // in inches
  thickness: number // in inches
  volume: number // in liters
  condition: BoardCondition
  description?: string
  images: string[]
  pricePerHour: number
  pricePerDay: number
  pricePerWeek?: number
  isAvailable: boolean
  features?: string[] // e.g., ["FCS fins", "Leash included", "Wax applied"]
  rating?: {
    rating: number
    reviewCount: number
  }
}
