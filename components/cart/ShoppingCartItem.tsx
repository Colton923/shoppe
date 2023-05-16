import Image from 'next/image'
import styles from './Cart.module.scss'
import type { StripeProduct } from 'types/stripe/StripeProduct'
import intToCash from '@utils/intToCash'
import PopcornNamer from '@utils/PopcornNamer'
import { useCartContext } from './CartContext'
import type { CartProps } from './Cart'

interface ShoppingCartItemProps extends CartProps {
  item: StripeProduct
  quantity: number
}

const ShoppingCartItem = (props: ShoppingCartItemProps) => {
  const { item, quantity, CheckoutFn } = props
  const { handleDeleteItem } = useCartContext()

  const { metadata } = { ...item }
  if (!metadata) return <></>
  const { images, name } = item
  const { flavor, size, retailPrice } = metadata
  if (!item) return <></>

  return (
    <div className={styles.shoppingCartItem}>
      <div className={styles.shoppingCartItem__image}>
        {images && images[0] && (
          <Image src={images[0]} alt={name} width={125} height={125} />
        )}
      </div>
      <div className={styles.shoppingCartItem__info}>
        <h3 className={styles.shoppingCartItem__info__name}>
          {PopcornNamer({
            flavor: flavor ? [flavor] : ['Plain'],
            size: size ? size : '1 Gal.',
          })}
        </h3>
        <div className={styles.shoppingCartItem__info__divider}>
          <h4 className={styles.shoppingCartItem__info__size}>Size: {size}</h4>
          <div className={styles.shoppingCartItem_qtyAndPriceWrapper}>
            <h4 className={styles.shoppingCartItem__info__quantity}>
              Quantity: {quantity}
            </h4>

            <h4 className={styles.shoppingCartItem__info__price}>
              Price:{' '}
              {intToCash(quantity * parseInt(retailPrice ? retailPrice : '0'))}
            </h4>
          </div>
        </div>
        {!CheckoutFn && (
          <div className={styles.selectedActive}>
            <button
              onClick={() => handleDeleteItem(item.id)}
              className={styles.removeFromCartBtn}
            >
              Remove Item
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShoppingCartItem
