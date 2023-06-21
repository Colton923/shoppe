import styles from './Cart.module.scss'
import { useLocalContext } from '@components/context/LocalContext'
import ShoppingCartItem from './ShoppingCartItem'
import SubTotal from './SubTotal'
import CartContextProvider from './CartContext'
import CheckoutButton from './CheckoutButton'
import type { CheckoutProps } from '@components/popcorn/Checkout'
import Button from '@components/button/Button'
import ShippingCalculator from '@utils/ShippingCalculator'

export interface CartProps {
  CheckoutFn?: (props: CheckoutProps) => Promise<void>
}

const Cart = (props: CartProps) => {
  const { CheckoutFn } = props
  const { cart, setCart, router, customer, status, setStatus } = useLocalContext()

  const CheckoutHandler = () => {
    if (!CheckoutFn) return
    return CheckoutFn({
      customer: customer,
      stripeCart: cart,
    })
  }

  const CheckoutToStripe = async () => {
    if (!CheckoutFn) return
    if (!customer) return
    if (
      customer.address === '' ||
      customer.city === '' ||
      customer.state === '' ||
      customer.zip === '' ||
      parseInt(customer.zip) < 10000 ||
      parseInt(customer.zip) > 99999 ||
      customer.name === ''
    )
      return
    if (customer.zip) {
      const shippingCost = await ShippingCalculator({ zip: customer.zip }).then(
        (res) => {
          if (res) return res
          return 0
        }
      )
      customer.shippingCost = shippingCost ?? 0
    }
    CheckoutHandler()
  }

  const HandleThisCheckout = () => {
    if (status === 'Checkout') {
      return CheckoutToStripe()
    } else if (status === 'Pay') {
      setStatus('Checkout')
      return CheckoutHandler()
    } else {
      return () => {
        return
      }
    }
  }

  return (
    <div className={styles.cart}>
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
            router.back()
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
                quantity={cart.filter((cartItem) => cartItem === item).length}
                CheckoutFn={CheckoutFn}
              />
            )
          })}
        </div>
        <CheckoutButton CheckoutFn={HandleThisCheckout} status={status} />
        <SubTotal CheckoutFn={CheckoutFn} />
      </CartContextProvider>
    </div>
  )
}

export default Cart
