import styles from './Cart.module.scss'
import { useLocalContext } from '@components/context/LocalContext'
import ShoppingCartItem from './ShoppingCartItem'
import SubTotal from './SubTotal'
import type { StripeProduct } from 'types/stripe/StripeProduct'
import CartContextProvider from './CartContext'
import CheckoutButton from './CheckoutButton'
import type { StripeCart } from '@components/popcorn/cart/Cart'
import type { CheckoutProps } from '@components/popcorn/Checkout'

export interface CartProps {
  CheckoutFn?: (props: CheckoutProps) => Promise<void>
}

const Cart = (props: CartProps) => {
  const { CheckoutFn } = props
  const { cart, setCheckingOut, checkingOut, DuplicatesInCart, UniqueCart } =
    useLocalContext()

  if (cart.length === 0) return <>Cart: Empty</>

  return (
    <div className={styles.cart} id="cartPopOut">
      <CartContextProvider>
        <h2 className={styles.cart__title}>{CheckoutFn ? '' : 'Cart'}</h2>

        <div className={styles.cartItemsScroller}>
          {[...new Set(cart)].map((item, index) => {
            return (
              <ShoppingCartItem
                index={index}
                item={item}
                key={index}
                quantity={
                  DuplicatesInCart(UniqueCart(cart))[index] === undefined
                    ? 0
                    : DuplicatesInCart([...new Set(cart)])[index]
                }
                CheckoutFn={CheckoutFn}
              />
            )
          })}
        </div>
        <CheckoutButton
          setCheckingOut={setCheckingOut}
          checkingOut={checkingOut}
          CheckoutFn={CheckoutFn}
        />
        <SubTotal CheckoutFn={CheckoutFn} />
      </CartContextProvider>
    </div>
  )
}

export default Cart
