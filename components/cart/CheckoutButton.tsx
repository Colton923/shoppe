import type { CartProps } from './Cart'
import { useLocalContext } from '@components/context/LocalContext'
import Button from '@components/button/Button'
interface CheckoutButtonProps extends CartProps {
  setCheckingOut: (checkingOut: boolean) => void
  checkingOut: boolean
}

const CheckoutButton = (props: CheckoutButtonProps) => {
  const { setCheckingOut, checkingOut, CheckoutFn } = props
  const { stripeCart, customer } = useLocalContext()

  return (
    <Button
      title={CheckoutFn ? 'Pay' : 'Checkout'}
      onClick={() => {
        setCheckingOut(!checkingOut)
        CheckoutFn
          ? CheckoutFn({
              stripeCart,
              customer,
            })
          : null
      }}
    />
  )
}
export default CheckoutButton
