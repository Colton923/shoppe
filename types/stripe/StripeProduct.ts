import type { FlavorNames } from 'types/PopcornFlavors'
import type { SizeNames } from 'types/PopcornSizes'

export type StripeProduct = {
  id?: string
  object?: string // 'product'
  active?: boolean
  created?: number
  default_price?: string
  description?: string
  images?: string[]
  livemode?: boolean
  metadata?: {
    flavor?: FlavorNames
    size?: SizeNames
    retailPrice?: string
    wholesalePrice?: string
  }
  name?: string
  package_dimensions?: null
  shippable?: boolean
  statement_descriptor?: string
  tax_code?: string
  unit_label?: string
  updated?: number
  url?: string
} | null
