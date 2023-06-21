'use client'

import { useLocalContext } from '@components/context/LocalContext'
import styles from './ActiveProduct.module.scss'
import PopcornNamer from '@utils/PopcornNamer'
import intToCash from '@utils/intToCash'
import Button from '@components/button/Button'
import * as SanityTypes from 'types/SanityItem'
import urlFor from '@lib/sanity/urlFor'

const ActiveProduct = () => {
  const {
    activePopcorn,
    activeQuantity,
    HandleAddToCart,
    HandleSetQuantity,
    activePrice,
  } = useLocalContext()
  console.log(activePopcorn)

  if (!activePopcorn.flavor) return null
  return (
    <div className={styles.wrapper}>
      <div className={styles.shoppingCartItem}>
        <div className={styles.shoppingCartItem__image}>
          {activePopcorn.flavor[0].image && (
            <div
              className={styles.shoppingCartItem__image}
              style={{
                backgroundImage: `url(${urlFor(
                  activePopcorn.flavor[0].image
                ).url()})`,
              }}
            />
          )}
        </div>
        <div className={styles.shoppingCartItem__info}>
          <h3 className={styles.shoppingCartItem__info__name}>
            {PopcornNamer(activePopcorn)}
          </h3>
          <div className={styles.shoppingCartItem__info__divider}>
            <h4 className={styles.shoppingCartItem__info__quantity}>
              Quantity:
              <input
                type="number"
                value={activeQuantity}
                id="quantity"
                className={styles.quantity}
                disabled={true}
              />
            </h4>
            <div
              className={styles.upDownWrapper}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <input
                type="button"
                value={'+'}
                onClick={() => {
                  HandleSetQuantity(activeQuantity + 1)
                }}
                className={styles.quantityButton}
              />
              <input
                type="button"
                value={'-'}
                onClick={() => {
                  HandleSetQuantity(activeQuantity - 1)
                }}
                className={styles.quantityButton}
              />
            </div>
            <h4 className={styles.shoppingCartItem__info__price}>
              Price:
              {intToCash(activeQuantity * activePrice)}
            </h4>
          </div>
        </div>
      </div>
      <Button
        title={'Add to Cart'}
        onClick={() => {
          HandleAddToCart()
        }}
      />
    </div>
  )
}

export default ActiveProduct
