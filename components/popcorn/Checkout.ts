import { loadStripe } from '@stripe/stripe-js'
import type { StripeCart } from './cart/Cart'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    : ''
)

const Checkout = async (props: StripeCart[]) => {
  const stripeCart = props

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
        console.log('priceID Prices', data)
        return
      })
      .then((data) => {
        return {
          line_items: data,
        }
      })
      .then((data) => {
        return JSON.stringify(data)
      })

      .then((data) => {
        return {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        }
      })
      .then((data) => {
        return fetch('/api/post/stripe/checkout_session', data)
      })
      .then((res) => res.json())
      .then(async (data) => {
        return
        // const id = data.id
        // const result = await stripe.redirectToCheckout({
        //   sessionId: id,
        // })
        // if (result.error) {
        //   alert(result.error.message)
        // }
      })
  } catch (error) {
    console.log(error)
  }
}

export default Checkout
