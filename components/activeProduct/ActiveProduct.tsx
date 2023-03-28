'use client'

import { useState } from 'react'
import styles from './ActiveProduct.module.scss'
import { useLocalContext } from '@components/context/LocalContext'
import ShoppingCartItem from '@components/cart/ShoppingCartItem'

const ActiveProduct = () => {
  const { activeProduct, activeCart, AddButton } = useLocalContext()
  const [localQuantity, setLocalQuantity] = useState<number>(1)
  if (activeProduct === undefined || activeCart) return <></>
  return (
    <>
      <ShoppingCartItem
        index={0}
        item={activeProduct}
        quantity={localQuantity}
        key={0}
      />
      <input
        type="button"
        value={localQuantity}
        onClick={() => {
          setLocalQuantity(localQuantity + 1)
        }}
      />
      <input
        type="button"
        value="Add to Cart"
        onClick={() => {
          AddButton(localQuantity)
        }}
      />
    </>
  )
}

export default ActiveProduct
