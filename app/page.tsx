'use client'

import Popcorn from '@components/popcorn/Popcorn'
import { useEffect, useState } from 'react'
import type { StripeProduct } from 'types/stripe/StripeProduct'
import type { FlavorNames } from 'types/PopcornFlavors'
import type { SizeNames } from 'types/PopcornSizes'

import Image from 'next/image'
import styles from '@styles/Home.module.scss'
import aiPopcorn1 from '@public/images/aiPopcorn1.png'

import mascot from '@public/images/mascot.png'
import caramel1 from '@public/images/caramel1.png'
import caramel2 from '@public/images/caramel2.png'
import caramel3 from '@public/images/caramel3.png'
import caramel4 from '@public/images/caramel4.png'

import Progress from '@components/progress/Progress'
import Footer from '@components/footer/Footer'

export default function Index() {
  const [products, setProducts] = useState<StripeProduct[]>([])
  const [flavors, setFlavors] = useState<FlavorNames[]>([])
  const [sizes, setSizes] = useState<SizeNames[]>([])
  const [cart, setCart] = useState<StripeProduct[]>([])
  const [progress, setProgress] = useState(1)

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

  console.log(cart)

  return (
    <div className={styles.pageContent}>
      <div className={styles.container}>
        {/* <Progress stage={progress} /> */}
        <Popcorn
          products={products}
          flavors={flavors}
          sizes={sizes}
          cart={cart}
          setCart={setCart}
        />
      </div>
      <Footer />
    </div>
  )
}
