import type { CartProps } from './Cart'
import { useLocalContext } from '@components/context/LocalContext'
import Button from '@components/button/Button'
import styles from '../context/Context.module.scss'
interface CheckoutButtonProps extends CartProps {
  setCheckingOut: (checkingOut: boolean) => void
  checkingOut: boolean
}

const CheckoutButton = (props: CheckoutButtonProps) => {
  const { setCheckingOut, checkingOut, CheckoutFn } = props
  const { stripeCart, customer, setIsCartOverlay } = useLocalContext()

  const RemoveDiv = () => {
    const overlayDiv = document.getElementById('cartOverlay')
    if (overlayDiv) {
      overlayDiv.classList.remove(styles.allowCartOverlay)
      setIsCartOverlay(false)
    }
  }

  const CheckoutToStripe = () => {
    if (!CheckoutFn) return
    CheckoutFn({
      stripeCart,
      customer,
    })
    RemoveDiv()
  }

  return (
    <Button
      title={CheckoutFn ? 'Pay' : 'Checkout'}
      onClick={() => {
        setCheckingOut(!checkingOut)
        CheckoutFn ? CheckoutToStripe() : RemoveDiv()
      }}
    />
  )
}
export default CheckoutButton
