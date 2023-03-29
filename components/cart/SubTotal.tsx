import styles from './Cart.module.scss'
import { useCartContext } from './CartContext'
import { CartProps } from './Cart'

const SubTotal = (props: CartProps) => {
  const { GetSubTotal } = useCartContext()
  const { CheckoutFn } = props

  return (
    <div className={styles.subTotal}>
      <h2 className={styles.subTotalTitle}>
        {CheckoutFn ? `Total: ${GetSubTotal()}` : `Subtotal: ${GetSubTotal()}`}
      </h2>
    </div>
  )
}

export default SubTotal
