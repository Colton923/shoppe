'use client'

import { useMemo, memo, createContext, useContext, useState, useEffect } from 'react'
import { FlavorNames } from '../../../types/PopcornFlavors'
import { SizeNames } from '../../../types/PopcornSizes'
import { StripeProduct } from '../../../types/stripe/StripeProduct'
import styles from '../Popcorn.module.scss'
import * as PopcornData from '@utils/PopcornData'
import Static from '@components/popcorn/static/Static'

export type FilteredFlavors = {
  Regular: FlavorNames[]
  Savory: FlavorNames[]
  Candy: FlavorNames[]
  Premium: FlavorNames[]
}

type LocalContextScope = {
  AddButton: (quantity: number) => void
  NewActiveFlavor: (flavor: FlavorNames) => void
  activeFlavors: FlavorNames[]
  activeProduct: StripeProduct | undefined
  activeSizes: SizeNames[]
  selectedSize: SizeNames | undefined
  cart: StripeProduct[]
  products: StripeProduct[]
  flavors: FlavorNames[]
  sizes: SizeNames[]
  quantity: number
  localPrice: number
  filteredFlavors: FilteredFlavors
  setFilteredFlavors: (filteredFlavors: FilteredFlavors) => void
  setSizes: (sizes: SizeNames[]) => void
  setFlavors: (flavors: FlavorNames[]) => void
  setProducts: (products: StripeProduct[]) => void
  setLocalPrice: (price: number) => void
  setActiveFlavors: (flavors: FlavorNames[]) => void
  setActiveSizes: (sizes: SizeNames[]) => void
  setCart: (cart: StripeProduct[]) => void
  setSelectedSize: (size: SizeNames | undefined) => void
  setProductFound: (product: StripeProduct | undefined) => void
  setQuantity: (quantity: number) => void
}
interface Props {
  children: React.ReactNode
}

export const LocalContext = createContext<LocalContextScope | null>(null)

export const LocalContextProvider = (props: Props) => {
  const { children } = props
  const [activeProduct, setProductFound] = useState<StripeProduct | undefined>(
    undefined
  )
  const [activeSizes, setActiveSizes] = useState<SizeNames[]>([])
  const [cart, setCart] = useState<StripeProduct[]>([])
  const [activeFlavors, setActiveFlavors] = useState<FlavorNames[]>([])
  const [selectedSize, setSelectedSize] = useState<SizeNames | undefined>(undefined)
  const [quantity, setQuantity] = useState<number>(1)
  const [localPrice, setLocalPrice] = useState<number>(0)
  const [products, setProducts] = useState<StripeProduct[]>([])
  const [flavors, setFlavors] = useState<FlavorNames[]>([])
  const [sizes, setSizes] = useState<SizeNames[]>([])
  const [filteredFlavors, setFilteredFlavors] = useState<FilteredFlavors>({
    Regular: [],
    Savory: [],
    Candy: [],
    Premium: [],
  })

  useEffect(() => {
    activeFlavors.forEach((flavor) => {
      const div = document.getElementById(flavor)
      if (!flavor) return
      if (!div) return
      if (!div.classList.contains(styles.flavorWrapper)) return
      div.classList.add(styles.expandView)
    })
  }, [activeFlavors])

  useEffect(() => {
    if (!activeProduct) return
    if (!activeProduct.metadata) return
    if (!activeProduct.metadata.retailPrice) return
    setLocalPrice(parseInt(activeProduct.metadata.retailPrice) * quantity)
  }, [activeProduct, quantity, selectedSize])

  useEffect(() => {
    if (!products) return
    setLocalPrice(
      parseInt(
        products.find((product) => {
          if (
            product.metadata?.flavor === undefined ||
            product.metadata?.size === undefined
          ) {
            return false
          }
          if (product.metadata?.size !== selectedSize) {
            return false
          }
          return activeFlavors.includes(product.metadata?.flavor as FlavorNames)
        })?.metadata?.retailPrice ?? '0'
      )
    )
    if (activeFlavors.length === 1) {
      const foundProduct = products.find((product) => {
        if (
          product.metadata?.flavor === undefined ||
          product.metadata?.size === undefined
        ) {
          return false
        }
        if (product.metadata?.size !== selectedSize) return false

        return activeFlavors.includes(product.metadata?.flavor as FlavorNames)
      })
      if (foundProduct) {
        setProductFound(foundProduct)
      } else {
        setProductFound(undefined)
      }
    }
  }, [activeFlavors, selectedSize, products])

  const AddButton = (quantity: number) => {
    setActiveFlavors([])
    if (!activeProduct || quantity === 0) return
    for (let i = 0; i < quantity; i++) {
      cart.push(activeProduct)
    }
    setCart(cart)
    setQuantity(1)
    const cartDiv = document.getElementById('cart')
    if (cartDiv) {
      cartDiv.classList.add(styles.cartActive)
      setTimeout(() => {
        cartDiv.classList.remove(styles.cartActive)
      }, 1000)
    }
  }

  const NewActiveFlavor = (flavor: FlavorNames) => {
    activeFlavors.splice(activeFlavors.indexOf(flavor), 1)

    setActiveFlavors([flavor])
  }

  const contextValue = useMemo(
    () => ({
      AddButton,
      NewActiveFlavor,
      activeFlavors,
      activeProduct,
      activeSizes,
      selectedSize,
      cart,
      products,
      flavors,
      sizes,
      quantity,
      localPrice,
      filteredFlavors,
      setFilteredFlavors,
      setSizes,
      setFlavors,
      setProducts,
      setLocalPrice,
      setActiveFlavors,
      setActiveSizes,
      setCart,
      setSelectedSize,
      setProductFound,
      setQuantity,
    }),
    [
      activeFlavors,
      activeProduct,
      activeSizes,
      selectedSize,
      cart,
      products,
      flavors,
      sizes,
      quantity,
      localPrice,
      setLocalPrice,
      setActiveFlavors,
      setActiveSizes,
      setCart,
      setSelectedSize,
      setProductFound,
      setQuantity,
      filteredFlavors,
      setFilteredFlavors,
      setSizes,
      setFlavors,
      setProducts,
    ]
  )

  return (
    <LocalContext.Provider value={contextValue as LocalContextScope}>
      {children}
    </LocalContext.Provider>
  )
}

export default memo(LocalContextProvider)

export const useLocalContext = () => {
  const context = useContext(LocalContext)
  if (!context) {
    throw new Error('useLocalContext must be used within a LocalContextProvider')
  }
  return context
}
