'use client'

import styles from '../Popcorn.module.scss'
import type { FlavorNames } from 'types/PopcornFlavors'
import { allRootColors } from '@utils/allRootColors'
import * as PopcornData from '@utils/PopcornData'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import testImg from '@public/images/mascot.png'
import type { SizeNames } from 'types/PopcornSizes'
import type { StripeProduct } from 'types/stripe/StripeProduct'

interface FlavorsProps {
  flavors: FlavorNames[]
  activeFlavors: FlavorNames[]
  setActiveFlavors: React.Dispatch<React.SetStateAction<FlavorNames[]>>
  activeSizes: SizeNames[]
  setSelectedSize: React.Dispatch<React.SetStateAction<SizeNames | undefined>>
  product: StripeProduct | undefined
  HandleAddToCart: (quantity: number) => void
}

const Flavors = (props: FlavorsProps) => {
  const {
    product,
    flavors,
    activeFlavors,
    setActiveFlavors,
    activeSizes,
    setSelectedSize,
    HandleAddToCart,
  } = props
  const [quantity, setQuantity] = useState<number>(1)

  const Arrow = () => (
    <svg
      data-bbox="9 70.9 181 59"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      style={{
        position: 'absolute',
        stroke: 'white',
        fill: 'white',
        transform: 'scale(0.8)',
        top: '10%',
        zIndex: 1,
      }}
    >
      <g>
        <path d="M159 70.9l-2.2 2.4L183.6 99H9v3h174.6l-26.2 25.3 2.1 2.6 30.5-29.3-31-29.7z"></path>
      </g>
    </svg>
  )

  useEffect(() => {
    activeFlavors.forEach((flavor) => {
      const div = document.getElementById(flavor)
      if (!flavor) return
      if (!div) return
      if (!div.classList.contains(styles.flavorWrapper)) return
      div.classList.add(styles.expandView)
    })
  }, [activeFlavors])

  const NewActiveFlavor = (flavor: FlavorNames) => {
    const isFlavor = activeFlavors.includes(flavor)
    const div = document.getElementById(flavor)
    if (isFlavor) {
      activeFlavors.splice(activeFlavors.indexOf(flavor), 1)

      if (!div) return
      if (!div.classList.contains(styles.flavorWrapper)) return
      div.classList.remove(styles.expandView)
      div.classList.add(styles.flavorWrapper)
      setActiveFlavors([...activeFlavors])
    } else {
      setActiveFlavors([...activeFlavors, flavor])
    }
  }

  const HandleChangeSize = (size: SizeNames) => {
    setSelectedSize(size)
  }

  const FlavorInput = (flavor: FlavorNames) => {
    return (
      <div
        id={flavor + '_toggle'}
        className={activeFlavors.includes(flavor) ? styles.active : styles.inactive}
      >
        <Image
          className={styles.picture}
          src={testImg}
          alt="test"
          width={120}
          height={120}
        />
        <div className={styles.positionFlavorTitle}>
          <h2 className={styles.flavorTitle}>{flavor}</h2>
        </div>{' '}
        <input
          type="button"
          onClick={() => {
            NewActiveFlavor(flavor)
          }}
          className={styles.input}
        />
        {activeFlavors.includes(flavor) && (
          <div className={styles.ExpandedVisible}>
            <div className={styles.sizePicker}>
              <select
                className={styles.sizeSelect}
                onInput={(e) => {
                  //@ts-ignore
                  const value = e.target.value
                  HandleChangeSize(value)
                }}
              >
                <option value={''}>Select Size</option>
                {activeSizes.map((size: SizeNames) => {
                  return (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className={styles.SizeOptions}>
              <div className={styles.quantity}>
                <h3>QUANTITY</h3>
                <input
                  type="tel"
                  className={styles.numberInput}
                  placeholder={'0'}
                  min={0}
                  max={9}
                  value={quantity}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value.length > 1) return
                    if (value === '') {
                      setQuantity(0)
                      return
                    }
                    setQuantity(parseInt(value))
                  }}
                />
              </div>
              <div className={styles.addToCart}>
                <Arrow />
                <input
                  type="button"
                  className={styles.addToCartButton}
                  value={'Add'}
                  onClick={() => {
                    HandleAddToCart(quantity)
                  }}
                />
              </div>
              <h3 className={styles.price}>
                PRICE: $
                {product
                  ? (
                      parseInt(
                        product.metadata?.retailPrice
                          ? product.metadata.retailPrice
                          : ''
                      ) / 100
                    ).toFixed(2)
                  : '0.00'}
              </h3>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={styles.itemsWrapper}>
      <h2 className={styles.subHeader}>Regular</h2>
      {flavors.map((flavor) => {
        if (PopcornData.RegularFlavors.includes(flavor)) {
          return (
            <div key={flavor} id={flavor} className={styles.flavorWrapper}>
              {FlavorInput(flavor)}
            </div>
          )
        }
      })}
      <h2 className={styles.subHeader}>Savory</h2>
      {flavors.map((flavor) => {
        if (PopcornData.SavoryFlavors.includes(flavor)) {
          return (
            <div key={flavor} id={flavor} className={styles.flavorWrapper}>
              {FlavorInput(flavor)}
            </div>
          )
        }
      })}
      <h2 className={styles.subHeader}>Candy</h2>
      {flavors.map((flavor) => {
        if (PopcornData.CandyFlavors.includes(flavor)) {
          return (
            <div key={flavor} id={flavor} className={styles.flavorWrapper}>
              {FlavorInput(flavor)}
            </div>
          )
        }
      })}
      <h2 className={styles.subHeader}>Premium</h2>
      {flavors.map((flavor) => {
        if (PopcornData.PremiumFlavors.includes(flavor)) {
          return (
            <div key={flavor} className={styles.flavorWrapper} id="bubble">
              {FlavorInput(flavor)}
            </div>
          )
        }
      })}
    </div>
  )
}

export default Flavors
