'use client'

import { useEffect, useState } from 'react'
import type { StripeProduct } from 'types/stripe/StripeProduct'

const PopcornComponent = () => {
  const [products, setProducts] = useState<StripeProduct[]>([])
  const [flavors, setFlavors] = useState<(string | undefined)[]>([])
  const [sizes, setSizes] = useState<(string | undefined)[]>([])
  const [activeFlavors, setActiveFlavors] = useState<string[]>([])
  const [activeSizes, setActiveSizes] = useState<string[]>([])
  const [activeProduct, setActiveProduct] = useState<StripeProduct | null>(null)
  const [cart, setCart] = useState<StripeProduct[]>([])

  useEffect(() => {
    console.log('fetching products')
    const GetStripeProducts = async () => {
      await fetch('/api/get/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProducts(data)
        })
    }
    GetStripeProducts()
  }, [])

  useEffect(() => {
    const AllFlavors = products.map((product) => {
      return product.metadata?.flavor
    })
    const UniqueFlavors = [...new Set(AllFlavors)]
    setFlavors(UniqueFlavors)

    const AllSizes = products.map((product) => {
      return product.metadata?.size
    })
    const UniqueSizes = [...new Set(AllSizes)]
    setSizes(UniqueSizes)
  }, [products])

  useEffect(() => {
    if (activeSizes.length > 1 || activeFlavors.length > 1) {
      setActiveSizes([])
      setActiveFlavors([])
      return
    }
    if (activeFlavors.length === 1 && activeSizes.length === 1) {
      const productFound = products.filter((product) => {
        if (product.metadata === undefined) return null
        return (
          activeFlavors.includes(product.metadata?.flavor) &&
          activeSizes.includes(product.metadata?.size)
        )
      })
      if (productFound.length > 0) {
        setActiveProduct(productFound[0])
      } else {
        setActiveProduct(null)
      }
    }
  }, [activeFlavors, activeSizes])

  if (!products || flavors.length === 0 || sizes.length === 0)
    return <div>Loading...</div>

  return (
    <div
      style={{
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
      }}
    >
      <div>
        <h1>Popcorn</h1>
      </div>
      <div>
        <h2>Flavors</h2>
        <>
          {flavors.map((flavor) => {
            if (flavor === undefined) return null
            return (
              <input
                key={flavor}
                value={flavor}
                type="button"
                onClick={() => {
                  if (activeFlavors.includes(flavor)) {
                    const newActiveFlavors = activeFlavors.filter(
                      (activeFlavor) => activeFlavor !== flavor
                    )
                    setActiveFlavors(newActiveFlavors)
                    return
                  } else {
                    setActiveFlavors([flavor])
                  }
                }}
                className={
                  activeFlavors.includes(flavor)
                    ? 'styles.active'
                    : 'styles.inactive'
                }
              />
            )
          })}
        </>
      </div>
      <div>
        <>
          <h2>Sizes</h2>
          {sizes.map((size) => {
            if (size === undefined) return null
            return (
              <input
                key={size}
                value={size}
                type="button"
                onClick={() => {
                  if (activeSizes.includes(size)) {
                    const newActiveSizes = activeSizes.filter(
                      (activeSize) => activeSize !== size
                    )
                    setActiveSizes(newActiveSizes)
                    return
                  } else {
                    setActiveSizes([size])
                  }
                }}
                className={
                  activeSizes.includes(size) ? 'styles.active' : 'styles.inactive'
                }
              />
            )
          })}
        </>
      </div>
      <div>
        {activeProduct?.metadata?.retailPrice ? (
          <div>
            <h1>Retail Product Found</h1>
            <h1>{activeProduct.name}</h1>
            <h1>
              ${(parseInt(activeProduct.metadata?.retailPrice) / 100).toFixed(2)}{' '}
            </h1>
          </div>
        ) : (
          <h2>No Retail Product Found</h2>
        )}
      </div>
      <div>
        <input
          value={'Add to Cart'}
          type="button"
          onClick={() => {
            if (activeProduct) {
              setCart([...cart, activeProduct])
            }
          }}
        />
      </div>
      <div>
        <h1>Cart</h1>
        {cart.map((product) => {
          if (product.metadata === undefined) return null
          return (
            <div key={product.id}>
              <h1>Stripe ID: {product.id}</h1>
              <h1>Product Name: {product.name}</h1>
              <h1>
                Price: ${(parseInt(product.metadata.retailPrice) / 100).toFixed(2)}
              </h1>
            </div>
          )
        })}
        <h1>Cart Total</h1>
        <h1>
          $
          {cart
            .reduce((acc, product) => {
              if (product.metadata === undefined) return acc
              return acc + parseInt(product.metadata.retailPrice) / 100
            }, 0)
            .toFixed(2)}
        </h1>
      </div>
    </div>
  )
}

export default PopcornComponent
