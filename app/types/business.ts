import type { GeoPoint, Rating } from './common'

export enum SurfBusinessType {
  SURF_SPOT = 'Surf Spot',
  SURF_SHOP = 'Surf Shop',
  SURF_GUIDE = 'Surf Guide',
  SURF_COACHING = 'Surf Coaching',
  PHOTOGRAPHY = 'Photography'
}

export interface SurfBusiness {
  id: string
  name: string
  address: string
  type: SurfBusinessType
  latLng: GeoPoint
  aggregatedRating: Rating
  image: string
  description: string
  isActive: boolean
  isApproved: boolean
}

export interface SurfActivity {
  id: string
  name: string
  address: string
  type: SurfBusinessType
  latLng: GeoPoint
  aggregatedRating: Rating
  image: string
  description: string
}
