'use client'

import { useMemo, memo, createContext, useContext, useState, useEffect } from 'react'
import { StripeProduct } from '../../types/stripe/StripeProduct'
import { useRouter } from 'next/navigation'
import * as SanityTypes from '../../types/SanityItem'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { Customer } from 'types/Customer'
import type { StripeCart } from 'types/StripeCart'
import PopcornNamer from '@utils/PopcornNamer'
import Checkout from '@components/popcorn/Checkout'
import { Data } from 'app/page'
import { useDisclosure } from '@mantine/hooks'

export type Markup = {
  _id: string
  name: string
  category: {
    _id: string
    markupRetail: {
      name: {
        _ref: string
        _type: string
      }
      _key: string
      value: number
      _type: string
    }[]
    markupWholesale: {
      name: {
        _ref: string
        _type: string
      }
      _key: string
      value: number
      _type: string
    }[]
    container: {
      startingRetailPrice: number
      startingWholesalePrice: number
    }[]
  }[]
  size: {
    _id: string
    name: string
    container: {
      _id: string
      name: string
      startingRetailPrice: number
      startingWholesalePrice: number
    }
    markupRetail: number
    markupWholesale: number
  }[]
}

type LocalContextScope = {
  cart: SanityTypes.SanityItem[]
  popcornStoreActive: boolean
  activeContainer: SanityTypes.Container | null
  activeFlavor: SanityTypes.Flavor | null
  activeSize: SanityTypes.Size | null
  activeProduct: SanityTypes.Product | null
  customer: Customer
  status: string
  wholesaler: boolean
  showCart: boolean
  data: Data
  activePopcorn: SanityTypes.Popcorn
  activePrice: number
  activeQuantity: number
  sizesForTin: SanityTypes.Size[] | null
  subTotal: number
  setSubTotal: (subTotal: number) => void
  setSizesForTin: (sizes: SanityTypes.Size[] | null) => void
  setWholesaler: (wholesaler: boolean) => void
  setPopcornStoreActive: (active: boolean) => void
  setCart: (cart: SanityTypes.SanityItem[]) => void
  setCustomer: (customer: Customer | null) => void
  setStatus: (status: string) => void
  setActiveContainer: (container: SanityTypes.Container | null) => void
  setActiveFlavor: (flavor: SanityTypes.Flavor | null) => void
  setActiveSize: (size: SanityTypes.Size | null) => void
  setActiveProduct: (product: SanityTypes.Product | null) => void
  setActivePopcorn: (popcorn: SanityTypes.Popcorn) => void
  setActivePrice: (price: number) => void
  setShowCart: (show: boolean) => void

  CheckoutFormat: (cart: StripeProduct[]) => StripeCart[]

  HandleSizeSelect: (size: SanityTypes.Size) => void
  HandleContainerSelect: (container: SanityTypes.Container) => void
  HandleProductSelect: (product: SanityTypes.Product) => void
  HandleSetQuantity: (quantity: number) => void
  HandleAddToCart: () => Promise<void>
  HandleCheckout: () => void
  HandleDeleteItem: (id: string) => void
  opened: boolean
  open: () => void
  close: () => void
  router: AppRouterInstance
}

interface Props {
  children: React.ReactNode
  data: Data
}

export const LocalContext = createContext<LocalContextScope | null>(null)

export const LocalContextProvider = (props: Props) => {
  const { children, data } = props
  const [cart, setCart] = useState<SanityTypes.SanityItem[]>([])
  const [popcornStoreActive, setPopcornStoreActive] = useState<boolean | null>(null)
  const [activeContainer, setActiveContainer] =
    useState<SanityTypes.Container | null>(null)
  const [activeFlavor, setActiveFlavor] = useState<SanityTypes.Flavor | null>(null)
  const [activeSize, setActiveSize] = useState<SanityTypes.Size | null>(null)
  const [activeProduct, setActiveProduct] = useState<SanityTypes.Product | null>(
    null
  )
  const [activePrice, setActivePrice] = useState<number>(0)
  const [activeQuantity, setActiveQuantity] = useState<number>(1)
  const [activePopcorn, setActivePopcorn] = useState<SanityTypes.Popcorn>(
    {} as SanityTypes.Popcorn
  )
  const [status, setStatus] = useState<string>('Pay')
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    shippingCost: 0,
    email: '',
    phone: '',
  })
  const [wholesaler, setWholesaler] = useState<boolean>(false)
  const [showCart, setShowCart] = useState<boolean>(false)
  const [sizesForTin, setSizesForTin] = useState<SanityTypes.Size[] | null>(null)
  const [subTotal, setSubTotal] = useState<number | null>(null)
  const [opened, { open, close }] = useDisclosure()

  const router = useRouter()

  const CheckoutFormat = (cart: StripeProduct[]) => {
    const newCart = [...new Set(cart)]
    const duplicates = newCart.map((item) => {
      return cart.filter((cartItem) => cartItem === item).length
    })

    return newCart.map((item, index) => {
      return {
        item: item,
        quantity: duplicates[index],
      }
    })
  }

  const StripePopcornProduct = async (popcorn: SanityTypes.Popcorn) => {
    const body = {
      name: PopcornNamer(popcorn),
      product: false,
    } as {
      name: string
      retailPrice: number | undefined
      wholesalePrice: number | undefined
      product: boolean
    }
    setSubTotal((prev) => {
      if (prev) {
        return prev + activePrice * activeQuantity
      }
      return activePrice * activeQuantity
    })
    if (wholesaler) {
      body.wholesalePrice = activePrice
    } else {
      body.retailPrice = activePrice
    }
    const Product = async () => {
      const prod = await fetch('/api/post/stripe/productCheck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          return data
        })
        .catch((err) => console.log(err))

      return prod
    }
    const product = await Product()
    return product
  }

  const StripeProduct = async (product: SanityTypes.Product) => {
    const body = {
      name: product.name,
      product: true,
    } as {
      name: string
      retailPrice: number | undefined
      wholesalePrice: number | undefined
      product: boolean
    }
    if (wholesaler) {
      body.wholesalePrice = (product.wholesalePrice as number) * 100
    } else {
      body.retailPrice = (product.retailPrice as number) * 100
    }
    setSubTotal((prev) => {
      if (prev) {
        return prev + activePrice * activeQuantity
      }
      return activePrice * activeQuantity
    })

    const stripeProduct = await fetch('/api/post/stripe/productCheck', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        return data
      })
    return stripeProduct as StripeProduct
  }

  const HandleDeleteItem = (id: string) => {
    const newCart = cart.filter((item) => item.stripeProduct?.id !== id)
    setCart(newCart)
    if (newCart.length === 0) {
      setSubTotal(0)
    } else {
      let total = 0
      if (wholesaler) {
        const newSubTotal = newCart.map((item) => {
          return item.stripeProduct?.metadata?.wholesalePrice
        })
        newSubTotal.forEach((item) => {
          if (item) {
            total += parseInt(item)
          }
        })
        setSubTotal(total)
      } else {
        const newSubTotal = newCart.map((item) => {
          return item.stripeProduct?.metadata?.retailPrice
        })
        newSubTotal.forEach((item) => {
          if (item) {
            total += parseInt(item)
          }
        })
        setSubTotal(total)
      }
    }
  }

  const HandleSizeSelect = (size: SanityTypes.Size) => {
    setActiveSize(size)
    activePopcorn.size = size
  }

  const HandleContainerSelect = (container: SanityTypes.Container) => {
    setActiveContainer(container)
    setPopcornStoreActive(true)
    setActivePopcorn({
      ...activePopcorn,
      container: container,
    })
    activePopcorn.container = container
    router.push(`/containers/${container._id}`, { shallow: true })
  }

  const HandleProductSelect = async (product: SanityTypes.Product) => {
    setActiveProduct(product)
    if (wholesaler) {
      setActivePrice((product.wholesalePrice as number) * 100)
    } else {
      setActivePrice((product.retailPrice as number) * 100)
    }
  }

  const HandleSetQuantity = (quantity: number) => {
    if (
      quantity > 0 &&
      quantity < 100 &&
      quantity !== activeQuantity &&
      activeQuantity !== 0 &&
      activeQuantity !== 100
    ) {
      if (quantity > activeQuantity) {
        setActiveQuantity(activeQuantity + 1)
      } else {
        setActiveQuantity(activeQuantity - 1)
      }
    }
  }

  const HandleAddToCart = async () => {
    if (popcornStoreActive) {
      if (
        activePopcorn.container &&
        activePopcorn.flavor.length > 0 &&
        activePopcorn.size &&
        activeQuantity > 0 &&
        activeQuantity < 100 &&
        activePopcorn.flavor.length < 4
      ) {
        const newCart = [...cart]
        const stripePopcorn = await StripePopcornProduct(activePopcorn)
        if (stripePopcorn === null) {
          return
        }
        for (let i = 0; i < activeQuantity; i++) {
          newCart.push({
            item: activePopcorn,
            stripeProduct: stripePopcorn,
          })
        }
        setCart(newCart)
        setActivePopcorn({} as SanityTypes.Popcorn)
        setActiveContainer(null)
        setActiveFlavor(null)
        setActiveSize(null)
        setActiveQuantity(1)
        setPopcornStoreActive(false)
        setActiveProduct(null)
        setActivePrice(0)
        router.push('/', { shallow: true })
      }
    } else {
      // This is a SanityTypes.Product type that we are adding to the cart
      if (activeProduct && activeQuantity > 0 && activeQuantity < 100) {
        const newCart = [...cart]
        const stripeProduct = await StripeProduct(activeProduct)
        if (stripeProduct === null) {
          return
        }
        if (!activeProduct.category) return
        if (!activeProduct.category._id) return
        if (!activeProduct.category.name) return
        const prodCategory: SanityTypes.ProductCategory = {
          _id: activeProduct.category._id,
          name: activeProduct.category.name,
        }
        const storeProd: SanityTypes.StoreProduct = {
          product: activeProduct,
          productCategory: prodCategory,
        }
        for (let i = 0; i < activeQuantity; i++) {
          newCart.push({
            item: storeProd,
            stripeProduct: stripeProduct,
          })
        }
        setCart(newCart)
        setActivePopcorn({} as SanityTypes.Popcorn)
        setActiveContainer(null)
        setActiveFlavor(null)
        setActiveSize(null)
        setActiveQuantity(1)
        setPopcornStoreActive(false)
        setActiveProduct(null)
        setActivePrice(0)
        setTimeout(() => {
          router.push('/', { shallow: true })
        }, 1000)
      }
    }
  }

  const HandleCheckout = () => {
    const stripeCart = CheckoutFormat(
      cart.map((item) => {
        if (!item) return
        if (!item.stripeProduct) return
        return item.stripeProduct
      }) as StripeProduct[]
    )
    if (stripeCart.length === 0) return
    if (!customer) return

    Checkout({
      customer: customer,
      stripeCart: stripeCart,
    })
    setCart([])
    setPopcornStoreActive(false)
    setActivePopcorn({} as SanityTypes.Popcorn)
    setActiveContainer(null)
    setActiveFlavor(null)
    setActiveSize(null)
    setActiveQuantity(1)
    setActiveProduct(null)
    setActivePrice(0)
  }

  const getPrice = async () => {
    const getPriceMarkup = async () => {
      const container = activePopcorn.container
      const flavors = activePopcorn.flavor
      const size = activePopcorn.size

      if (!container || !flavors || !size) return null
      if (!flavors.length) return null
      if (!container.name) return null
      if (!size.name) return null

      const containerName = container.name
      if (!containerName) return null
      if (flavors.length === 0) return null
      const markups = await Promise.all(
        flavors.map(async (flavor) => {
          if (!flavor) return null
          const categoryId = flavor.category?._ref
          if (!categoryId) return null
          const markup: Markup = await fetch('/api/post/sanity/markups', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              categoryId: categoryId,
              flavorId: flavor._id,
              containerName: containerName,
              size: size._id,
            }),
          })
            .then((res) => {
              return res.json()
            })
            .then((markup: Markup[]) => {
              return markup[0]
            })
          return markup
        })
      )
      return markups
    }

    const markups = await getPriceMarkup()
    if (!markups) return null
    if (!markups.length) return null
    let value = 0
    if (!markups[0]) return null
    const totals = markups.map((markup) => {
      if (!markup) return null
      if (wholesaler) {
        markup.category.map((category) => {
          category.markupWholesale.map((markup) => {
            value += markup.value
          })
        })
        return value
      } else {
        let value = 0
        markup.category.map((category) => {
          category.markupRetail.map((markup) => {
            value += markup.value
          })
        })
        return value
      }
    })
    if (!totals) return null
    if (!totals.length) return null
    const price = totals.reduce((a, b) => {
      if (!a) return b
      if (!b) return a
      return a + b
    })
    if (wholesaler) {
      value += markups[0]?.category[0]?.container[0]?.startingWholesalePrice
      value += markups[0]?.size[0]?.markupWholesale
    } else {
      value += markups[0]?.category[0]?.container[0]?.startingRetailPrice
      value += markups[0]?.size[0]?.markupRetail
    }
    if (price) {
      value += price
    }
    return value
  }

  useEffect(() => {
    if (activePopcorn.container && activePopcorn.flavor && activePopcorn.size) {
      const PriceGetter = async () => {
        const price = await getPrice()
        if (price) {
          setActivePrice(price * 100)
        } else {
          setActivePrice(0)
        }
      }

      PriceGetter()
    }
    if (activeProduct) {
      HandleAddToCart()
    }
  }, [activePopcorn, activeProduct])

  const contextValue = useMemo(
    () => ({
      cart,
      popcornStoreActive,
      activeContainer,
      activeFlavor,
      activeSize,
      activeProduct,
      customer,
      status,
      activePopcorn,
      activePrice,
      activeQuantity,
      sizesForTin,
      setSizesForTin,
      setActivePopcorn,
      setActivePrice,
      setPopcornStoreActive,
      setCart,
      setCustomer,
      setStatus,
      setActiveContainer,
      setActiveFlavor,
      setActiveSize,
      setActiveProduct,
      CheckoutFormat,
      HandleSizeSelect,
      HandleContainerSelect,
      HandleProductSelect,
      HandleSetQuantity,
      HandleAddToCart,
      HandleCheckout,
      router,
      wholesaler,
      showCart,
      setShowCart,
      setWholesaler,
      HandleDeleteItem,
      subTotal,
      setSubTotal,
      data,
      opened,
      open,
      close,
    }),
    [
      cart,
      popcornStoreActive,
      activeContainer,
      activeFlavor,
      activeSize,
      activeProduct,
      customer,
      status,
      activePopcorn,
      activePrice,
      activeQuantity,
      sizesForTin,
      setSizesForTin,
      setActivePopcorn,
      setActivePrice,
      setPopcornStoreActive,
      setCart,
      setCustomer,
      setStatus,
      setActiveContainer,
      setActiveFlavor,
      setActiveSize,
      setActiveProduct,
      CheckoutFormat,
      HandleAddToCart,
      HandleSizeSelect,
      HandleContainerSelect,
      HandleProductSelect,
      HandleSetQuantity,
      HandleCheckout,
      router,
      wholesaler,
      showCart,
      setShowCart,
      setWholesaler,
      HandleDeleteItem,
      subTotal,
      setSubTotal,
      data,
      opened,
      open,
      close,
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
