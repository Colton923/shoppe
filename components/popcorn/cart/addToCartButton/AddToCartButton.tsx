import styles from './AddToCartButton.module.css'
import type { StripeProduct } from 'types/stripe/StripeProduct'

export interface AddToCartButtonProps {
  activeProduct: StripeProduct | undefined
  cart: StripeProduct[]
  setCart: React.Dispatch<React.SetStateAction<StripeProduct[]>>
}

const AddToCartButton = (props: AddToCartButtonProps) => {
  const { activeProduct, cart, setCart } = props
  return (
    <div>
      <input
        value={'Add to Cart'}
        type="button"
        onClick={() => {
          if (activeProduct) {
            setCart([...cart, activeProduct])
          }
        }}
      />
    </div>
  )
}

export default AddToCartButton
