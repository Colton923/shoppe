import styles from './Cart.module.scss'
import { useLocalContext } from '@components/context/LocalContext'
import ShoppingCartItem from './ShoppingCartItem'
import SubTotal from './SubTotal'
import type { StripeProduct } from 'types/stripe/StripeProduct'
import CartContextProvider from './CartContext'
import CheckoutButton from './CheckoutButton'

const Cart = () => {
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
            <h2 className={styles.cart__title}>Cart</h2>
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
                />
              )
            })}
            <CheckoutButton
              setCheckingOut={setCheckingOut}
              checkingOut={checkingOut}
            />
            <SubTotal />
          </>
        ) : (
          <></>
        )}
      </CartContextProvider>
    </div>
  )
}

export default Cart
