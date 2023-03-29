import styles from './Cart.module.scss'
import type { CartProps } from './Cart'
import { useLocalContext } from '@components/context/LocalContext'

interface CheckoutButtonProps extends CartProps {
  setCheckingOut: (checkingOut: boolean) => void
  checkingOut: boolean
}

const CheckoutButton = (props: CheckoutButtonProps) => {
  const { setCheckingOut, checkingOut, CheckoutFn } = props
  const { stripeCart } = useLocalContext()

  return (
    <div className={styles.checkoutButton}>
      <input
        className={styles.checkoutButton__button}
        type="button"
        value={CheckoutFn ? 'Pay' : 'Checkout'}
        onClick={() => {
          setCheckingOut(!checkingOut)
          CheckoutFn ? CheckoutFn(stripeCart) : null
        }}
      />
    </div>
  )
}
export default CheckoutButton
