'use client'

import { useState } from 'react'
import styles from './ActiveProduct.module.scss'
import { useLocalContext } from '@components/context/LocalContext'
import Image from 'next/image'
import PopcornNamer from '@utils/PopcornNamer'
import intToCash from '@utils/intToCash'
const ActiveProduct = () => {
  const { activeProduct, AddButton } = useLocalContext()
  const [localQuantity, setLocalQuantity] = useState<number>(1)
  const { name, images, metadata } = activeProduct ?? {}
  const { flavor, size, retailPrice } = metadata ?? {}

  return (
    <>
      <div className={styles.shoppingCartItem}>
        <div className={styles.shoppingCartItem__image}>
          {images && images[0] && (
            <Image
              src={images[0]}
              alt={name ? name : styles.shoppingCartItem}
              width={125}
              height={125}
            />
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
            <h4 className={styles.shoppingCartItem__info__flavor}>{flavor}</h4>

            <h4 className={styles.shoppingCartItem__info__size}>{size}</h4>

            <h4 className={styles.shoppingCartItem__info__quantity}>
              Quantity: {localQuantity}
            </h4>
            <div
              className={styles.upDownWrapper}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <input
                type="button"
                value={'+'}
                onClick={() => {
                  setLocalQuantity(localQuantity + 1)
                }}
                className={styles.quantityButton}
              />
              <input
                type="button"
                value={'-'}
                onClick={() => {
                  setLocalQuantity(localQuantity - 1)
                }}
                className={styles.quantityButton}
              />
            </div>
            <h4 className={styles.shoppingCartItem__info__price}>
              Price:
              {intToCash(localQuantity * parseInt(retailPrice ? retailPrice : '0'))}
            </h4>
          </div>
        </div>
      </div>

      <input
        type="button"
        value="Add to Cart"
        onClick={() => {
          AddButton(localQuantity)
        }}
        className={styles.addButton}
      />
    </>
  )
}

export default ActiveProduct
