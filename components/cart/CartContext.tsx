'use client'

import { useMemo, memo, createContext, useContext, useState, useEffect } from 'react'
import { useLocalContext } from '@components/context/LocalContext'
import intToCash from '@utils/intToCash'
import type { StripeProduct } from 'types/stripe/StripeProduct'
import styles from './Cart.module.scss'
type CartContextScope = {
  activeItems: boolean[]
  setActiveItems: (activeItems: boolean[]) => void
  GetSubTotal: () => string
  uniqueCart: StripeProduct[]
  duplicatesInCart: number[]
  setUniqueCart: (uniqueCart: StripeProduct[]) => void
  setDuplicatesInCart: (duplicatesInCart: number[]) => void
  CheckItemInCart: (index: number) => void
}
interface Props {
  children: React.ReactNode
}

export const CartContext = createContext<CartContextScope | null>(null)

export const CartContextProvider = (props: Props) => {
  const { children } = props
  const [activeItems, setActiveItems] = useState<boolean[]>([])
  const { cart, setCart, activeCart } = useLocalContext()
  const [subTotal, setSubTotal] = useState<string>('')
  const [uniqueCart, setUniqueCart] = useState<StripeProduct[]>([])
  const [duplicatesInCart, setDuplicatesInCart] = useState<number[]>([])

  const UniqueCart = () => {
    return [...new Set(cart)]
  }

  const DuplicatesInCart = (uniqueCart: StripeProduct[]) => {
    const duplicates = uniqueCart.map((item) => {
      return cart.filter((cartItem) => cartItem === item).length
    })
    return duplicates
  }

  useEffect(() => {
    const newActiveItems = activeItems.map((item) => {
      return true
    })

    setActiveItems(newActiveItems)
    setUniqueCart(UniqueCart())
    setDuplicatesInCart(DuplicatesInCart(UniqueCart()))
  }, [cart, setCart, activeCart, setActiveItems])

  const GetSubTotal = () => {
    const subTotal: number[] = []
    let itemTotal = 0
    cart.forEach((item, index) => {
      if (item.metadata?.retailPrice === undefined) return
      if (itemTotal === parseInt(item.metadata?.retailPrice)) return
      itemTotal = parseInt(item.metadata?.retailPrice)
      subTotal.push(itemTotal)
    })

    if (subTotal.length === 0) return intToCash(0)
    let sotal = 0
    subTotal.forEach((item) => {
      const multiplier =
        duplicatesInCart[subTotal.indexOf(item)] *
        (activeItems[subTotal.indexOf(item)] ? 1 : 0)
      sotal += item * multiplier
    })

    return intToCash(sotal)
  }

  const CheckItemInCart = (index: number) => {
    const newActiveItems = [...activeItems]
    newActiveItems[index] = !newActiveItems[index]
    setActiveItems(newActiveItems)
  }

  const contextValue: CartContextScope = useMemo(
    () => ({
      activeItems,
      setActiveItems,
      GetSubTotal,
      uniqueCart,
      duplicatesInCart,
      setUniqueCart,
      setDuplicatesInCart,
      CheckItemInCart,
    }),
    [
      activeItems,
      setActiveItems,
      GetSubTotal,
      uniqueCart,
      duplicatesInCart,
      setUniqueCart,
      setDuplicatesInCart,
    ]
  )

  return (
    <CartContext.Provider value={contextValue as CartContextScope}>
      {children}
    </CartContext.Provider>
  )
}

export default memo(CartContextProvider)

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within a CartContextProvider')
  }
  return context
}
