'use client'

import styles from './Cart.module.scss'
import type { StripeProduct } from 'types/stripe/StripeProduct'

import * as subCart from '@components/cart/Cart'
import Checkout from '../Checkout'

export type StripeCart = {
  item: StripeProduct
  quantity: number
}

const Cart = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Please Verify your Shipping Address</h2>
      <div className={styles.customerShippingInfo}>
        <div className={styles.customerShippingInfo__name}>
          <h3>Name</h3>
          <p>John Doe</p>
        </div>
        <div className={styles.customerShippingInfo__address}>
          <h3>Address</h3>
          <p>1234 Main St</p>
        </div>
        <div className={styles.customerShippingInfo__city}>
          <h3>City</h3>
          <p>Los Angeles</p>
        </div>
        <div className={styles.customerShippingInfo__state}>
          <h3>State</h3>
          <p>CA</p>
        </div>
        <div className={styles.customerShippingInfo__zip}>
          <h3>Zip</h3>
          <p>90001</p>
        </div>
      </div>
      <h2 className={styles.title}>Your Order</h2>
      <subCart.default CheckoutFn={Checkout} />
    </div>
  )
}

export default Cart
