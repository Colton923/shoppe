import { loadStripe } from '@stripe/stripe-js'

let stripePromise: Promise<any>

const getStripe = () => {
  if (!stripePromise) {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error('unidentified environment variable at lib/stripe')
    }
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  }

  return stripePromise
}

export default getStripe
