'use client'

import { useMemo, memo, createContext, useContext, useState, useEffect } from 'react'
import { useLocalContext } from '@components/context/LocalContext'
import intToCash from '@utils/intToCash'
import type { StripeProduct } from 'types/stripe/StripeProduct'

type CartContextScope = {
  /*
   *  State
   */

  setActiveItems: (activeItems: boolean[]) => void
  activeItems: boolean[]
  setUniqueCart: (uniqueCart: StripeProduct[]) => void
  uniqueCart: StripeProduct[]
  setDuplicatesInCart: (duplicatesInCart: number[]) => void
  duplicatesInCart: number[]
  localCart: StripeProduct[]
  setLocalCart: (localCart: StripeProduct[]) => void

  /*
   *  Functions
   */
  GetSubTotal: () => string
  CheckItemInCart: (index: number) => void
  handleDeleteItem: (id: string | undefined) => void
}

interface Props {
  children: React.ReactNode
}

export const CartContext = createContext<CartContextScope | null>(null)

export const CartContextProvider = (props: Props) => {
  const { children } = props
  const { cart, setCart } = useLocalContext()
  const [activeItems, setActiveItems] = useState<boolean[]>([])
  const [uniqueCart, setUniqueCart] = useState<StripeProduct[]>([])
  const [duplicatesInCart, setDuplicatesInCart] = useState<number[]>([])
  const [localCart, setLocalCart] = useState<StripeProduct[]>([])

  const UniqueCart = () => {
    return [...new Set(localCart)]
  }

  const DuplicatesInCart = (uniqueCart: StripeProduct[]) => {
    const duplicates = uniqueCart.map((item) => {
      return localCart.filter((cartItem) => cartItem === item).length
    })
    return duplicates
  }

  const GetSubTotal = () => {
    const subTotal: number[] = []
    let itemTotal = 0
    localCart.forEach((item) => {
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
    //Did not get this going for version 1
    // const newActiveItems = [...activeItems]
    // newActiveItems[index] = !newActiveItems[index]
    // setActiveItems(newActiveItems)
  }

  const handleDeleteItem = (id: string | undefined) => {
    const updatedCartItems = localCart.filter((item) => item.id !== id)
    setCart(updatedCartItems)
  }

  useEffect(() => {
    setLocalCart(cart)
  }, [cart])

  useEffect(() => {
    const newUnique = UniqueCart()
    setUniqueCart(newUnique)

    const newActiveItems = newUnique.map(() => {
      return true
    })
    setActiveItems(newActiveItems)

    setDuplicatesInCart(DuplicatesInCart(newUnique))
  }, [localCart, setLocalCart, setActiveItems])

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
      handleDeleteItem,
      localCart,
      setLocalCart,
    }),
    [
      activeItems,
      setActiveItems,
      GetSubTotal,
      uniqueCart,
      duplicatesInCart,
      setUniqueCart,
      setDuplicatesInCart,
      CheckItemInCart,
      handleDeleteItem,
      localCart,
      setLocalCart,
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
