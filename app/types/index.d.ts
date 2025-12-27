export * from './activity'
export * from './business'
export * from './common'
export * from './enums'
export * from './search'
export * from './session'
export * from './surfboard'
export * from './types'

export interface User {
  name: string
  email: string
  avatar?: {
    src: string
    alt: string
  }
}

export interface NavigationLink {
  label: string
  icon: string
  to: string
  badge?: string
}

export interface DashboardFeature {
  id: string
  icon: string
  iconColor: 'blue' | 'green' | 'purple' | 'red' | 'orange'
  title: string
  description: string
}
