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

export type Customer = {
  name: string
  address: string
  city: string
  state: string
  zip: string
  email?: string
  phone?: string
  shippingCost?: number
}

type LocalContextScope = {
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
  localSizes: SizeNames[]
  setLocalSizes: (sizes: SizeNames[]) => void
  isCartOverlay: boolean
  setIsCartOverlay: (isCartOverlay: boolean) => void
  customer: Customer
  setCustomer: (customer: Customer) => void
  DuplicatesInCart: (uniqueCart: StripeProduct[]) => number[]
  UniqueCart: (cart: StripeProduct[]) => StripeProduct[]
  MakeCart: (cart: StripeProduct[]) => StripeCart[]
  isRegisterOverlay: boolean
  setIsRegisterOverlay: (isRegisterOverlay: boolean) => void
  isLoginOverlay: boolean
  setIsLoginOverlay: (isLoginOverlay: boolean) => void
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
  const [checkingOut, setCheckingOut] = useState<boolean>(false)
  const [localSizes, setLocalSizes] = useState<SizeNames[]>([])
  const [isCartOverlay, setIsCartOverlay] = useState<boolean>(false)
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  })
  const [isRegisterOverlay, setIsRegisterOverlay] = useState<boolean>(false)
  const [isLoginOverlay, setIsLoginOverlay] = useState<boolean>(false)

  const UniqueCart = (cart: StripeProduct[]) => {
    return [...new Set(cart)]
  }

  const DuplicatesInCart = (uniqueCart: StripeProduct[]) => {
    const duplicates = uniqueCart.map((item) => {
      return cart.filter((cartItem) => cartItem === item).length
    })
    return duplicates
  }

  const MakeCart = (cart: StripeProduct[]) => {
    const newCart = UniqueCart(cart)
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

  const [stripeCart, setStripeCart] = useState<StripeCart[]>(MakeCart(cart))

  useEffect(() => {
    if (!activeProduct) return
    if (!activeProduct.metadata) return
    if (!activeProduct.metadata.retailPrice) return
    setLocalPrice(parseInt(activeProduct.metadata.retailPrice) * quantity)
  }, [activeProduct, quantity, selectedSize, activeFlavors])

  useEffect(() => {
    if (!products) return

    const effectiveSize = selectedSize
      ? localSizes.includes(selectedSize)
        ? selectedSize
        : localSizes[0]
      : localSizes[0]
    setLocalPrice(
      parseInt(
        products.find((product) => {
          if (
            product.metadata?.flavor === undefined ||
            product.metadata?.size === undefined
          ) {
            return false
          }
          if (product.metadata?.size !== effectiveSize) {
            return false
          }
          return activeFlavors.includes(product.metadata?.flavor as FlavorNames)
        })?.metadata?.retailPrice ?? '0'
      )
    )
    const foundProduct = products.find((product) => {
      if (
        product.metadata?.flavor === undefined ||
        product.metadata?.size === undefined
      ) {
        return false
      }
      if (product.metadata?.size !== effectiveSize) return false

      return activeFlavors.includes(product.metadata?.flavor as FlavorNames)
    })
    setProductFound(foundProduct)
  }, [activeFlavors, selectedSize, products, activeFlavors, setActiveFlavors])

  const ClickOffOverlayHandler = (e: MouseEvent) => {
    const cartOverlayDiv = document.getElementById('cartOverlay')
    const cartLogoDiv = document.getElementById('cart')

    if (cartOverlayDiv?.classList.contains(styles.allowCartOverlay)) {
      if (cartLogoDiv?.contains(e.target as Node)) {
        cartOverlayDiv.classList.remove(styles.allowCartOverlay)
      } else {
        if (cartOverlayDiv?.contains(e.target as Node)) return
        cartOverlayDiv.classList.remove(styles.allowCartOverlay)

        // IsCartOverlay boolean is referenced is CheckoutButton.tsx, and Navbar.tsx.
        // We can likely remove all of that, and this state, and then make a class that toggles the overlay on and off rather.
        setIsCartOverlay(false)
      }
    }
  }

  useEffect(() => {
    const overlayDiv = document.getElementById('cartOverlay')
    if (!overlayDiv) return
    if (isCartOverlay) {
      document.body.addEventListener('click', ClickOffOverlayHandler)
      overlayDiv.classList.add(styles.allowCartOverlay)
    } else {
      document.body.removeEventListener('click', ClickOffOverlayHandler)
    }
  }, [cart, isCartOverlay, checkingOut])

  useEffect(() => {
    setStripeCart(MakeCart(cart))
  }, [checkingOut, cart])

  const AddButton = (quantity: number) => {
    if (!activeProduct || quantity === 0) return
    const newCart = [...cart]

    for (let i = 0; i < quantity; i++) {
      newCart.push(activeProduct)
    }
    setCart(newCart)
    setQuantity(1)
    setProductFound(undefined)
    setSelectedSize(undefined)
    setActiveSizes([])
    setActiveFlavors([])
    setIsCartOverlay(!isCartOverlay)
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
      stripeCart,
      setStripeCart,
      localSizes,
      setLocalSizes,
      isCartOverlay,
      setIsCartOverlay,
      customer,
      setCustomer,
      DuplicatesInCart,
      UniqueCart,
      MakeCart,
      isRegisterOverlay,
      setIsRegisterOverlay,
      isLoginOverlay,
      setIsLoginOverlay,
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
      localSizes,
      setLocalSizes,
      stripeCart,
      setStripeCart,
      isCartOverlay,
      setIsCartOverlay,
      customer,
      setCustomer,
      isRegisterOverlay,
      setIsRegisterOverlay,
      isLoginOverlay,
      setIsLoginOverlay,
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
