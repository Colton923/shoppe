'use client'

import { useEffect, useState } from 'react'
import type { StripeProduct } from 'types/stripe/StripeProduct'
import ActiveProduct from './activeProduct/ActiveProduct'
import Flavors from './flavors/Flavors'
import Cart from './cart/Cart'
import type { FlavorNames } from 'types/PopcornFlavors'
import type { SizeNames } from 'types/PopcornSizes'
import styles from './Popcorn.module.scss'
import Sizes from './sizes/Sizes'

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
  const [activeSizes, setActiveSizes] = useState<SizeNames[]>([])
  const [selectedSize, setSelectedSize] = useState<SizeNames>()

  const HandleAddToCart = (quantity: number) => {
    if (!activeProduct) return
    const allProduct = activeProduct
    if (quantity === 0) return
    if (quantity > 0) {
      const newCart = [...cart]
      for (let i = 0; i < quantity; i++) {
        newCart.push(allProduct)
      }

      setCart(newCart)
    }
  }

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
        if (product.metadata?.size !== selectedSize) return null

        return activeFlavors.includes(product.metadata?.flavor as FlavorNames)
      })
      if (productFound.length > 0) {
        setActiveProduct(productFound[0])
      }
    }
  }, [activeFlavors, selectedSize])

  if (!products || flavors.length === 0 || sizes.length === 0)
    return <div>Loading...</div>

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        {activeSizes.length === 0 ? (
          <div className={styles.SizeContainer}>
            <Sizes sizes={sizes} setActiveSizes={setActiveSizes} />
          </div>
        ) : (
          <>
            <h1 className={styles.componentTitle}>Popcorn</h1>
            <div className={styles.back} onClick={() => setActiveSizes([])}>
              <span>Back</span>
            </div>

            <Flavors
              flavors={flavors}
              activeFlavors={activeFlavors}
              setActiveFlavors={setActiveFlavors}
              activeSizes={activeSizes}
              setSelectedSize={setSelectedSize}
              product={activeProduct}
              HandleAddToCart={HandleAddToCart}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default PopcornComponent
