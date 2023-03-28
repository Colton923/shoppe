import styles from './Cart.module.scss'
import { useLocalContext } from '@components/context/LocalContext'
import ShoppingCartItem from './ShoppingCartItem'
import SubTotal from './SubTotal'
import type { StripeProduct } from 'types/stripe/StripeProduct'
import CartContextProvider from './CartContext'
import ActiveProduct from '@components/activeProduct/ActiveProduct'

const Cart = () => {
  const {
    activeCart,
    cart,
    activeCategory,
    activeSizes,
    activeFlavors,
    selectedSize,
  } = useLocalContext()

  const UniqueCart = () => {
    return [...new Set(cart)]
  }

  const DuplicatesInCart = (uniqueCart: StripeProduct[]) => {
    const duplicates = uniqueCart.map((item) => {
      return cart.filter((cartItem) => cartItem === item).length
    })
    return duplicates
  }

  return (
    <CartContextProvider>
      {activeCart ? (
        <div className={styles.cart}>
          <h2 className={styles.cart__title}>Shopping Cart</h2>
          {UniqueCart().map((item, index) => {
            return (
              <ShoppingCartItem
                index={index}
                item={item}
                key={index}
                quantity={DuplicatesInCart(UniqueCart())[index]}
              />
            )
          })}
          <SubTotal />
        </div>
      ) : selectedSize !== undefined && activeFlavors.length > 0 ? (
        <div className={styles.ActiveProduct} id="ActiveProduct">
          <ActiveProduct />
        </div>
      ) : (
        <></>
      )}
    </CartContextProvider>
  )
}

export default Cart
