import type { CartProps } from './Cart'
import { useLocalContext } from '@components/context/LocalContext'
import Button from '@components/button/Button'
import styles from '../context/Context.module.scss'
import ShippingCalculator from '@utils/ShippingCalculator'

interface CheckoutButtonProps extends CartProps {
  setCheckingOut: (checkingOut: boolean) => void
  checkingOut: boolean
  zip?: string
  type?: string
}

const CheckoutButton = (props: CheckoutButtonProps) => {
  const { setCheckingOut, checkingOut, CheckoutFn, zip, type } = props
  const { stripeCart, customer, setIsCartOverlay } = useLocalContext()

  const RemoveDiv = () => {
    const overlayDiv = document.getElementById('cartOverlay')
    if (overlayDiv) {
      overlayDiv.classList.remove(styles.allowCartOverlay)
      setIsCartOverlay(false)
    }
    setCheckingOut(!checkingOut)
  }

  const CheckoutToStripe = async () => {
    if (!CheckoutFn) return
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
        CheckoutFn ? CheckoutToStripe() : RemoveDiv()
      }}
      type={type ?? 'button'}
    />
  )
}
export default CheckoutButton
