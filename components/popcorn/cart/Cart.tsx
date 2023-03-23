import styles from './Cart.module.css'
import type { StripeProduct } from 'types/stripe/StripeProduct'
import { loadStripe } from '@stripe/stripe-js'
import { useLocalContext } from '../context/LocalContext'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    : ''
)

const Cart = () => {
  const { cart } = useLocalContext()
  const handleCheckout = async (cart: StripeProduct[]) => {
    try {
      const stripe = await stripePromise

      if (!stripe) {
        throw new Error('Stripe not loaded')
      }

      await fetch('/api/post/stripe/product_ID_to_price_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productID: cart[0].id,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          await fetch('/api/post/stripe/checkout_session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              priceID: data.price,
            }),
          })
            .then((res) => res.json())
            .then(async (data) => {
              const id = data.id
              const result = await stripe.redirectToCheckout({
                //@ts-ignore
                sessionId: id,
              })
              if (result.error) {
                alert(result.error.message)
              }
            })
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Cart</h1>
      {cart.map((product) => {
        if (product.metadata?.retailPrice === undefined) return null
        return (
          <div key={product.id}>
            <h1>Stripe ID: {product.id}</h1>
            <h1>Product Name: {product.name}</h1>
            <h1>
              Price: ${(parseInt(product.metadata.retailPrice) / 100).toFixed(2)}
            </h1>
          </div>
        )
      })}
      <h1>Cart Total</h1>
      <h1>
        $
        {cart
          .reduce((acc, product) => {
            if (product.metadata?.retailPrice === undefined) return acc
            return acc + parseInt(product.metadata.retailPrice) / 100
          }, 0)
          .toFixed(2)}
      </h1>
      <div>
        <input
          type="button"
          value="Checkout"
          onClick={() => {
            if (cart === undefined) return
            handleCheckout(cart)
          }}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  )
}

export default Cart
