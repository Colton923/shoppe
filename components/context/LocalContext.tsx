'use client'

import { useMemo, memo, createContext, useContext, useState, useEffect } from 'react'
import { FlavorNames } from '../../types/PopcornFlavors'
import { SizeNames } from '../../types/PopcornSizes'
import { StripeProduct } from '../../types/stripe/StripeProduct'
import styles from './Context.module.scss'
import type { StripeCart } from '@components/popcorn/cart/Cart'

export type FilteredFlavors = {
  Regular: FlavorNames[]
  Savory: FlavorNames[]
  Candy: FlavorNames[]
  Premium: FlavorNames[]
}

type LocalContextScope = {
  activeCart: boolean
  setActiveCart: (activeCart: boolean) => void
  AddButton: (quantity: number) => void
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
  checkingOut: boolean
  stripeCart: StripeCart[]
  setStripeCart: (stripeCart: StripeCart[]) => void
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
  setCheckingOut: (checkingOut: boolean) => void
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
  const [selectedSize, setSelectedSize] = useState<SizeNames | undefined>(
    'Small Bag'
  )
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
  const [activeCart, setActiveCart] = useState<boolean>(false)
  const [checkingOut, setCheckingOut] = useState<boolean>(false)

  const UniqueCart = () => {
    return [...new Set(cart)]
  }

  const DuplicatesInCart = (uniqueCart: StripeProduct[]) => {
    const duplicates = uniqueCart.map((item) => {
      return cart.filter((cartItem) => cartItem === item).length
    })
    return duplicates
  }

  const MakeCart = () => {
    const newCart = UniqueCart()
    const duplicates = DuplicatesInCart(newCart)
    const stripeCart: StripeCart[] = []
    newCart.forEach((item, index) => {
      stripeCart.push({
        item: item,
        quantity: duplicates[index],
      })
    })
    return stripeCart
  }

  const [stripeCart, setStripeCart] = useState<StripeCart[]>(MakeCart())

  useEffect(() => {
    setStripeCart(MakeCart())
  }, [cart, activeCart, checkingOut])

  useEffect(() => {
    if (!activeProduct) return
    if (!activeProduct.metadata) return
    if (!activeProduct.metadata.retailPrice) return
    setLocalPrice(parseInt(activeProduct.metadata.retailPrice) * quantity)
  }, [activeProduct, quantity, selectedSize, activeFlavors])

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
      setProductFound(foundProduct)
    }
  }, [activeFlavors, selectedSize, products, activeFlavors])

  useEffect(() => {
    const ShoppingCartOverlay = document.getElementById('cartOverlay')
    if (!ShoppingCartOverlay) return
    if (activeCart && !checkingOut) {
      ShoppingCartOverlay.classList.add(styles.allowCartOverlay)
    } else {
      ShoppingCartOverlay.classList.remove(styles.allowCartOverlay)
    }
  }, [activeCart, checkingOut, cart, setActiveCart])

  const AddButton = (quantity: number) => {
    setActiveFlavors([])
    setActiveSizes([])
    if (!activeProduct || quantity === 0) return
    for (let i = 0; i < quantity; i++) {
      cart.push(activeProduct)
    }
    setCart(cart)
    setQuantity(1)
    setProductFound(undefined)
    setSelectedSize(undefined)
    setActiveCart(true)
  }

  const contextValue = useMemo(
    () => ({
      AddButton,
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
      checkingOut,
      setCheckingOut,
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
      activeCart,
      setActiveCart,
      stripeCart,
      setStripeCart,
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
      checkingOut,
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
      activeCart,
      setActiveCart,
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
