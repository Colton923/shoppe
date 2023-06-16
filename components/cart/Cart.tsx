import styles from './Cart.module.scss'
import { useLocalContext } from '@components/context/LocalContext'
import ShoppingCartItem from './ShoppingCartItem'
import SubTotal from './SubTotal'
import CartContextProvider from './CartContext'
import CheckoutButton from './CheckoutButton'
import type { CheckoutProps } from '@components/popcorn/Checkout'
import Button from '@components/button/Button'

export interface CartProps {
  CheckoutFn?: (props: CheckoutProps) => Promise<void>
}

const Cart = (props: CartProps) => {
  const { CheckoutFn } = props
  const {
    cart,
    setCheckingOut,
    checkingOut,
    DuplicatesInCart,
    UniqueCart,
    setCart,
    setIsCartOverlay,
    isCartOverlay,
  } = useLocalContext()

  if (cart.length === 0) return null
  if (!isCartOverlay) return null

  return (
    <div className={styles.cart} id={'cartPopOut'}>
      <div
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
          padding: '1rem',
          cursor: 'pointer',
        }}
      >
        <Button
          onClick={() => {
            setIsCartOverlay(false)
          }}
          title="Close"
          type="button"
        />
      </div>
      <CartContextProvider setCart={setCart}>
        <h2 className={styles.cart__title}>{CheckoutFn ? '' : 'Cart'}</h2>

        <div className={styles.cartItemsScroller}>
          {[...new Set(cart)].map((item, index) => {
            return (
              <ShoppingCartItem
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
