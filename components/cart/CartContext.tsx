'use client'

import { useMemo, memo, createContext, useContext, useState, useEffect } from 'react'
import { useLocalContext } from '@components/context/LocalContext'
import intToCash from '@utils/intToCash'
import * as SanityTypes from '../../types/SanityItem'

type CartContextScope = {
  /*
   *  State
   */

  localCart: SanityTypes.SanityItem[]
  setLocalCart: (localCart: SanityTypes.SanityItem[]) => void

  /*
   *  Functions
   */
  GetSubTotal: () => string
  handleDeleteItem: (id: string | undefined) => void
  handleCheckout: () => void
}

interface Props {
  children: React.ReactNode
  setCart: (cart: SanityTypes.SanityItem[]) => void
}

export const CartContext = createContext<CartContextScope | null>(null)

export const CartContextProvider = (props: Props) => {
  const { children } = props
  const { cart, setCart } = useLocalContext()
  const [localCart, setLocalCart] = useState<SanityTypes.SanityItem[]>(cart)
  const [updateCart, setUpdateCart] = useState(false)
  const [subTotal, setSubTotal] = useState('0')

  const HandleSubTotal = () => {
    let subTotal = 0
    if (!localCart) return intToCash(subTotal)
    localCart.forEach((item) => {
      subTotal += parseInt(item.stripeProduct?.metadata?.retailPrice || '0')
    })
    return intToCash(subTotal)
  }

  const handleDeleteItem = (id: string | undefined) => {
    if (!id) return
    const newCart = localCart.filter((item) => item?.stripeProduct?.id !== id)

    if (newCart.length === 0) {
      setLocalCart([])
      return
    }
    if (newCart.length === localCart.length) return

    if (newCart.length > 0) setLocalCart(newCart)
    setSubTotal(HandleSubTotal())
  }

  const GetSubTotal = () => {
    return subTotal
  }

  useEffect(() => {
    if (!updateCart) {
      setCart(localCart)
    }
    setUpdateCart(true)
    setSubTotal(HandleSubTotal())
  }, [localCart, setCart])

  const handleCheckout = () => {
    setCart(localCart)
  }

  const contextValue: CartContextScope = useMemo(
    () => ({
      handleDeleteItem,
      localCart,
      setLocalCart,
      GetSubTotal,
      handleCheckout,
    }),
    [handleDeleteItem, localCart, setLocalCart, GetSubTotal, handleCheckout]
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
