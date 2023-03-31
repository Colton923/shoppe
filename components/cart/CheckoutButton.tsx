import styles from './Cart.module.scss'
import type { CartProps } from './Cart'
import { useLocalContext } from '@components/context/LocalContext'
import Button from '@components/button/Button'

interface CheckoutButtonProps extends CartProps {
  setCheckingOut: (checkingOut: boolean) => void
  checkingOut: boolean
}

const CheckoutButton = (props: CheckoutButtonProps) => {
  const { setCheckingOut, checkingOut, CheckoutFn } = props
  const { stripeCart } = useLocalContext()

  return (
    <Button
      title={CheckoutFn ? 'Pay' : 'Checkout'}
      onClick={() => {
        setCheckingOut(true)
        CheckoutFn ? CheckoutFn(stripeCart) : null
      }}
    />

    // <div className={styles.checkoutButton}>
    //   <div className={styles.buttonBackdrop}></div>
    //   <input
    //     className={styles.checkoutButton__button}
    //     type="button"
    //     value={CheckoutFn ? 'Pay' : 'Checkout'}
    //     onClick={() => {
    //       setCheckingOut(!checkingOut)
    //       CheckoutFn ? CheckoutFn(stripeCart) : null
    //     }}
    //   />
    // </div>
  )
}
export default CheckoutButton
