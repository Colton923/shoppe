import styles from './Cart.module.scss'
import { useLocalContext } from '@components/context/LocalContext'
import CheckoutButton from '@components/cart/CheckoutButton'

const Customer = () => {
  const { customer, setCustomer, status, HandleCheckout } = useLocalContext()

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Please Verify your Shipping Address</h2>
      <div className={styles.customerShippingInfo}>
        <div className={styles.customerShippingInfo__name}>
          <h3 className={styles.customerShippingInfo__name__title}>Name</h3>
          <input
            type="text"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            placeholder="First and Last Name"
            className={styles.customerShippingInfo__name__input}
          />
        </div>
        <div className={styles.customerShippingInfo__address}>
          <h3 className={styles.customerShippingInfo__address__title}>Address</h3>
          <input
            type="text"
            value={customer.address}
            onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
            placeholder="Street Address"
            className={styles.customerShippingInfo__address__input}
          />
        </div>
        <div className={styles.customerShippingInfo__city}>
          <h3 className={styles.customerShippingInfo__city__title}>City</h3>
          <input
            type="text"
            value={customer.city}
            onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
            placeholder="City"
            className={styles.customerShippingInfo__city__input}
          />
        </div>
        <div className={styles.customerShippingInfo__state}>
          <h3 className={styles.customerShippingInfo__state__title}>State</h3>
          <input
            type="text"
            value={customer.state}
            onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
            placeholder="State"
            className={styles.customerShippingInfo__state__input}
          />
        </div>
        <div className={styles.customerShippingInfo__zip}>
          <h3 className={styles.customerShippingInfo__zip__title}>Zip</h3>
          <input
            type="text"
            value={customer.zip}
            onChange={(e) => setCustomer({ ...customer, zip: e.target.value })}
            placeholder="Zip"
            className={styles.customerShippingInfo__zip__input}
          />
        </div>
      </div>
      <CheckoutButton CheckoutFn={HandleCheckout} status={status} />
    </div>
  )
}

export default Customer
