'use client'

import { useEffect, useState } from 'react'
import type { StripeProduct } from 'types/stripe/StripeProduct'
import ActiveProduct from './activeProduct/ActiveProduct'
import Flavors from './flavors/Flavors'
import Sizes from './sizes/Sizes'
import Cart from './cart/Cart'
import type { FlavorNames } from 'types/PopcornFlavors'
import type { SizeNames } from 'types/PopcornSizes'
import styles from './Popcorn.module.css'

const PopcornComponent = () => {
  const [products, setProducts] = useState<StripeProduct[]>([])
  const [flavors, setFlavors] = useState<FlavorNames[]>([])
  const [sizes, setSizes] = useState<SizeNames[]>([])
  const [activeFlavors, setActiveFlavors] = useState<FlavorNames[]>([])
  const [activeSizes, setActiveSizes] = useState<SizeNames[]>([])
  const [activeProduct, setActiveProduct] = useState<StripeProduct>()
  const [cart, setCart] = useState<StripeProduct[]>([])

  useEffect(() => {
    const GetStripeProducts = async () => {
      await fetch('/api/get/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data: StripeProduct[]) => {
          setProducts(data)
        })
    }
    GetStripeProducts()
  }, [])

  useEffect(() => {
    if (products.length === 0) return
    const AllFlavors: FlavorNames[] = products.reduce((acc, product) => {
      if (product.metadata?.flavor) {
        acc.push(product.metadata?.flavor as FlavorNames)
      }
      return acc
    }, [] as FlavorNames[])

    const UniqueFlavors = [...new Set(AllFlavors)]
    setFlavors(UniqueFlavors)

    const AllSizes = products.reduce((acc, product) => {
      if (product.metadata?.size) {
        acc.push(product.metadata?.size as SizeNames)
      }
      return acc
    }, [] as SizeNames[])

    const UniqueSizes = [...new Set(AllSizes)]
    setSizes(UniqueSizes)
  }, [products])

  useEffect(() => {
    if (activeFlavors.length === 0 && activeSizes.length === 0) return
    if (activeSizes.length > 1 || activeFlavors.length > 1) {
      setActiveSizes([])
      setActiveFlavors([])
      return
    }
    if (activeFlavors.length === 1 && activeSizes.length === 1) {
      const productFound = products.filter((product) => {
        if (
          product.metadata?.flavor === undefined ||
          product.metadata?.size === undefined
        )
          return null
        return (
          activeFlavors.includes(product.metadata?.flavor as FlavorNames) &&
          activeSizes.includes(product.metadata?.size as SizeNames)
        )
      })
      if (productFound.length > 0) {
        setActiveProduct(productFound[0])
      }
    }
  }, [activeFlavors, activeSizes])

  if (!products || flavors.length === 0 || sizes.length === 0)
    return <div>Loading...</div>

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.componentTitle}>Popcorn</h1>
        </div>
        <Flavors
          flavors={flavors}
          activeFlavors={activeFlavors}
          setActiveFlavors={setActiveFlavors}
        />
        <Sizes
          sizes={sizes}
          activeSizes={activeSizes}
          setActiveSizes={setActiveSizes}
        />
        <ActiveProduct activeProduct={activeProduct} />
        <Cart activeProduct={activeProduct} cart={cart} setCart={setCart} />
      </div>
    </div>
  )
}

export default PopcornComponent
