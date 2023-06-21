import type { StripeProduct } from './stripe/StripeProduct'

export interface SanityItem {
  stripeProduct?: StripeProduct
  item?: Popcorn | StoreProduct
}

export type Popcorn = {
  container: Container
  flavor: Flavor[]
  size: Size
}

export type StoreProduct = {
  productCategory: ProductCategory
  product: Product
}

export type Category = {
  _id: string
  name?: string
  markupRetail?: Array<{
    container?: Container['name']
    value?: number
  }>
  markupWholesale?: Array<{
    name?: Container['name']
    value?: number
  }>
}

export type Container = {
  _id: string
  name?: string
  startingRetailPrice?: number
  startingWholesalePrice?: number
  image?: string
}

export type Flavor = {
  _id: string
  name?: string
  category?: {
    _ref?: string // ID reference to Category
    type?: string
  }
  image?: string // ID reference to Image Asset
  description?: string
}

export type Size = {
  _id: string
  name?: string
  container?: {
    _id?: string // ID reference to Container
    name?: string
  }
  markupRetail?: number
  markupWholesale?: number
  width?: number
  height?: number
  length?: number
  weight?: number
  maxFlavors?: number
}

export type ProductCategory = {
  _id: string
  name?: string
}

export type Product = {
  _id: string
  category?: {
    _ref?: string // ID reference to ProductCategory
    type?: string
    name?: string
    _id?: string
  }
  description?: string
  height?: number
  image?: string // ID reference to Image Asset
  length?: number
  name?: string
  retailPrice?: number
  wholesalePrice?: number
  weight?: number
  width?: number
}
