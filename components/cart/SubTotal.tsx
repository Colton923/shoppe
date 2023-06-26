import styles from './Cart.module.scss'
interface SubTotalProps {
  HandleCheckout?: () => void
  subTotal: number
}
const SubTotal = (props: SubTotalProps) => {
  const { HandleCheckout, subTotal } = { ...props}
      if (!subTotal) return
  const FormatSubtotal = (subTotal: number) => {
    // 3200 = $32.00
    const subTotalStr = subTotal.toString()
    const subTotalArr = subTotalStr.split('')
    const cents = subTotalArr.slice(subTotalArr.length - 2, subTotalArr.length)
    const dollars = subTotalArr.slice(0, subTotalArr.length - 2)
    const dollarsStr = dollars.join('')
    const centsStr = cents.join('')
    return `$${dollarsStr}.${centsStr}`
  }

  return (
    <div className={styles.subTotal}>
      <h2 className={styles.subTotalTitle}>
        {HandleCheckout ? `Total: ${FormatSubtotal(subTotal)}` : `Subtotal: ${FormatSubtotal(subTotal)}`}
      </h2>
    </div>
  )
}

export default SubTotal
