import styles from './Cart.module.scss'
import { useLocalContext } from '@components/context/LocalContext'
import ShoppingCartItem from './ShoppingCartItem'
import SubTotal from './SubTotal'
import type { StripeProduct } from 'types/stripe/StripeProduct'
import CartContextProvider from './CartContext'
import CheckoutButton from './CheckoutButton'
import type { StripeCart } from '@components/popcorn/cart/Cart'

export interface CartProps {
  CheckoutFn?: (props: StripeCart[]) => Promise<void>
}

const Cart = (props: CartProps) => {
  const { CheckoutFn } = props
  const { activeCart, cart, setCheckingOut, checkingOut } = useLocalContext()

  const DuplicatesInCart = (uniqueCart: StripeProduct[]) => {
    const duplicates = uniqueCart.map((item) => {
      return cart.filter((cartItem) => cartItem === item).length
    })
    return duplicates
  }

  return (
    <div className={styles.cart} id="cartPopOut">
      <CartContextProvider>
        {activeCart ? (
          <>
            <h2 className={styles.cart__title}>{CheckoutFn ? '' : 'Cart'}</h2>
            {[...new Set(cart)].map((item, index) => {
              return (
                <ShoppingCartItem
                  index={index}
                  item={item}
                  key={index}
                  quantity={
                    DuplicatesInCart([...new Set(cart)])[index] === undefined
                      ? 0
                      : DuplicatesInCart([...new Set(cart)])[index]
                  }
                  CheckoutFn={CheckoutFn}
                />
              )
            })}
            <CheckoutButton
              setCheckingOut={setCheckingOut}
              checkingOut={checkingOut}
              CheckoutFn={CheckoutFn}
            />
            <SubTotal CheckoutFn={CheckoutFn} />
          </>
        ) : (
          <></>
        )}
      </CartContextProvider>
    </div>
  )
}

export default Cart
