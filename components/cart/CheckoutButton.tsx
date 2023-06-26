import { Switch } from '@mantine/core'

interface CheckoutProps {
  HandleCheckout: any
  status: string
}

const CheckoutButton = (props: CheckoutProps) => {
  const { HandleCheckout, status } = props

  return (
    <Switch
      value={status}
      onChange={HandleCheckout}
      label="Checkout"
      style={{ width: '100%' }}
      size="lg"
      color="blue"
    />
  )
}
export default CheckoutButton
