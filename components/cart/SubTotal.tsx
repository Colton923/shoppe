import styles from './Cart.module.scss'
import { useCartContext } from './CartContext'

const SubTotal = () => {
  const { GetSubTotal } = useCartContext()

  return (
    <div className={styles.subTotal}>
      <h2 className={styles.subTotalTitle}>Subtotal: {GetSubTotal()}</h2>
    </div>
  )
}

export default SubTotal
