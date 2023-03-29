import styles from './Cart.module.scss'
import { useCartContext } from './CartContext'

interface CheckoutButtonProps {
  setCheckingOut: (checkingOut: boolean) => void
  checkingOut: boolean
}

const CheckoutButton = (props: CheckoutButtonProps) => {
  const { setCheckingOut, checkingOut } = props
  const { Checkout } = useCartContext()

  return (
    <div className={styles.checkoutButton}>
      <input
        className={styles.checkoutButton__button}
        type="button"
        value="Checkout"
        onClick={() => {
          Checkout()
          setCheckingOut(!checkingOut)
        }}
      />
    </div>
  )
}

export default CheckoutButton
