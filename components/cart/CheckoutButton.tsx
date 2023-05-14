import type { CartProps } from './Cart'
import { useLocalContext } from '@components/context/LocalContext'
import Button from '@components/button/Button'
import styles from '../context/Context.module.scss'
import ShippingCalculator from '@utils/ShippingCalculator'

interface CheckoutButtonProps extends CartProps {
  setCheckingOut: (checkingOut: boolean) => void
  checkingOut: boolean
  zip?: string
}

const CheckoutButton = (props: CheckoutButtonProps) => {
  const { setCheckingOut, checkingOut, CheckoutFn, zip } = props
  const { stripeCart, customer, setIsCartOverlay } = useLocalContext()

  const RemoveDiv = () => {
    const overlayDiv = document.getElementById('cartOverlay')
    if (overlayDiv) {
      overlayDiv.classList.remove(styles.allowCartOverlay)
      setIsCartOverlay(false)
    }
  }

  const CheckoutToStripe = async () => {
    if (!CheckoutFn) return
    if (zip) {
      const shippingCost = await ShippingCalculator({ zip }).then((res) => {
        if (res) return res
        return 0
      })
      customer.shippingCost = shippingCost ?? 0
    }
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
