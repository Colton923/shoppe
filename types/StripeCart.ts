import { StripeProduct } from './stripe/StripeProduct'

export type StripeCart = {
  item: StripeProduct
  quantity: number
}
