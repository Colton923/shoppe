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
      <h2 className={styles.title}>Cart</h2>
      <subCart.default CheckoutFn={Checkout} />
    </div>
  )
}

export default Cart
