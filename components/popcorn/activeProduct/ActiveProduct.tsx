'use client'

import { useState } from 'react'
import styles from './ActiveProduct.module.scss'
import { useLocalContext } from '@components/context/LocalContext'
import Image from 'next/image'
import PopcornNamer from '@utils/PopcornNamer'
import intToCash from '@utils/intToCash'
import { SizeNames } from 'types/PopcornSizes'

interface ActiveProductProps {
  activeSize: SizeNames
  activePrice: number
  activeFlavors: string[]
}

const ActiveProduct = (props: ActiveProductProps) => {
  const { activeSize, activeFlavors, activePrice } = props
  const { activeProduct, AddButton, localSizes } = useLocalContext()
  const [localQuantity, setLocalQuantity] = useState<number>(1)
  const { name, images } = activeProduct ?? {}

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
              flavor: activeFlavors,
              size: localSizes.includes(activeSize) ? activeSize : localSizes[0],
            })}
          </h3>
          <div className={styles.shoppingCartItem__info__divider}>
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
              {intToCash(localQuantity * activePrice)}
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
