import { loadStripe } from '@stripe/stripe-js'
import type { StripeCart } from 'types/StripeCart'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    : ''
)

export interface CheckoutProps {
  stripeCart: StripeCart[]
  customer: any
}

const Checkout = async (props: CheckoutProps) => {
  const { stripeCart, customer } = { ...props }
  const PriceIDs = async () => {
    const res = await fetch('/api/post/stripe/product_ID_to_price_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stripeCart: stripeCart,
      }),
    })
    const data = await res.json()
    return data
  }

  try {
    const stripe = await stripePromise

    if (!stripe) {
      throw new Error('Stripe not loaded')
    }

    await PriceIDs()
      .then((data) => {
        // data = priceIDs [ 'price_1MioZlHtHKdtig1S3Xabd1Vp', 'price_1MioXUHtHKdtig1SwTXgvBNJ' ]
        //@ts-ignore
        return data.map((priceID, index) => {
          return {
            price: priceID,
            quantity: stripeCart[index].quantity,
          }
        })
      })
      .then((data) => {
        const lines = data
        const shippingLineItem = customer.shippingCost
          ? (customer.shippingCost * 100).toFixed(0)
          : '0'
        const dataObj = {
          shipping: shippingLineItem,
          lines: lines,
        }
        return dataObj
      })
      .then((data) => {
        const dataString = JSON.stringify({
          line_items: data.lines,
          shipping: data.shipping,
        })
        return {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: dataString,
        }
      })
      .then((data) => {
        return fetch('/api/post/stripe/checkout_session', data)
      })
      .then((res) => res.json())
      .then(async (data) => {
        const id = data.id
        const result = await stripe.redirectToCheckout({
          sessionId: id,
        })
        if (result.error) {
          alert(result.error.message)
        }
      })
  } catch (error) {
    console.log(error)
  }
}

export default Checkout
