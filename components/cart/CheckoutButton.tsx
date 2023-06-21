import Button from '@components/button/Button'

interface CheckoutProps {
  CheckoutFn: () => void
  status: string
}

const CheckoutButton = (props: CheckoutProps) => {
  const { CheckoutFn, status } = props

  return (
    <Button
      title={status}
      onClick={() => {
        CheckoutFn()
      }}
      type={'button'}
    />
  )
}
export default CheckoutButton
