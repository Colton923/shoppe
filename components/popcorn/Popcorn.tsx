'use client'

import { useEffect, useState } from 'react'
import type { StripeProduct } from 'types/stripe/StripeProduct'
import ActiveProduct from './activeProduct/ActiveProduct'
import Flavors from './flavors/Flavors'
import Cart from './cart/Cart'
import type { FlavorNames } from 'types/PopcornFlavors'
import type { SizeNames } from 'types/PopcornSizes'
import styles from './Popcorn.module.scss'

interface ShopProps {
  products: StripeProduct[]
  flavors: FlavorNames[]
  sizes: SizeNames[]
  cart: StripeProduct[]
  setCart: (cart: StripeProduct[]) => void
}

const PopcornComponent = (props: ShopProps) => {
  const { products, flavors, sizes, cart, setCart } = props

  const [activeFlavors, setActiveFlavors] = useState<FlavorNames[]>([])
  const [activeProduct, setActiveProduct] = useState<StripeProduct>()

  useEffect(() => {
    if (activeFlavors.length === 0) return
    if (activeFlavors.length > 1) {
      setActiveFlavors([])
      return
    }
    if (activeFlavors.length === 1) {
      const productFound = products.filter((product) => {
        if (
          product.metadata?.flavor === undefined ||
          product.metadata?.size === undefined
        ) {
          return null
        }
        return activeFlavors.includes(product.metadata?.flavor as FlavorNames)
      })
      if (productFound.length > 0) {
        setActiveProduct(productFound[0])
      }
    }
  }, [activeFlavors])

  if (!products || flavors.length === 0 || sizes.length === 0)
    return <div>Loading...</div>

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <h1 className={styles.componentTitle}>Popcorn</h1>
        <Flavors
          flavors={flavors}
          activeFlavors={activeFlavors}
          setActiveFlavors={setActiveFlavors}
        />
      </div>
    </div>
  )
}

export default PopcornComponent
