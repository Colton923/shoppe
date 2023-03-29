'use client'

import styles from './Cart.module.scss'
import type { StripeProduct } from 'types/stripe/StripeProduct'
import { loadStripe } from '@stripe/stripe-js'
import { useLocalContext } from '@components/context/LocalContext'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    : ''
)

export type StripeCart = {
  item: StripeProduct
  quantity: number
}

const Cart = () => {
  const { cart, stripeCart } = useLocalContext()

  const handleCheckout = async (cart: StripeProduct[]) => {
    const getPriceIds = async () => {
      const priceIds = await Promise.all(
        stripeCart.map(async (item) => {
          const res = await fetch('/api/post/stripe/product_ID_to_price_ID', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              productID: item.item.id,
            }),
          })
          const data = await res.json()
          return data.price
        })
      )
      return priceIds
    }

    try {
      const stripe = await stripePromise

      if (!stripe) {
        throw new Error('Stripe not loaded')
      }

      await getPriceIds()
        .then((data) => {
          return data.map((price, index) => {
            return {
              price,
              quantity: stripeCart[index].quantity,
            }
          })
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
          const id = data.id
          const result = await stripe.redirectToCheckout({
            //@ts-ignore
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

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Cart</h2>
      {stripeCart.map((product) => {
        if (product.item.metadata?.retailPrice === undefined) return null
        return (
          <div key={product.item.id}>
            <h3 className={styles.subText}>Stripe ID: {product.item.id}</h3>
            <h3 className={styles.subText}>Product Name: {product.item.name}</h3>
            <h3 className={styles.subText}>
              Price: $
              {(
                (parseInt(product.item.metadata.retailPrice) / 100) *
                product.quantity
              ).toFixed(2)}
            </h3>
          </div>
        )
      })}
      <h2 className={styles.title}>Cart Total</h2>
      <h2 className={styles.title}>
        $
        {stripeCart
          .reduce((acc, product) => {
            if (product.item.metadata?.retailPrice === undefined) return acc
            return (
              acc +
              (parseInt(product.item.metadata.retailPrice) / 100) * product.quantity
            )
          }, 0)
          .toFixed(2)}
      </h2>
      <div className={styles.checkout}>
        <input
          type="button"
          value="Checkout"
          className={styles.checkoutButton}
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
