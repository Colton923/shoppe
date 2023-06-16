'use client'

import { useMemo, memo, createContext, useContext, useState, useEffect } from 'react'
import { FlavorNames } from '../../types/PopcornFlavors'
import { SizeNames } from '../../types/PopcornSizes'
import { StripeProduct } from '../../types/stripe/StripeProduct'
import styles from './Context.module.scss'
import type { StripeCart } from '@components/popcorn/cart/Cart'
import imageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity'
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import { useRouter } from 'next/navigation'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2022-03-25',
  useCdn: true,
})

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

type Product = {
  name: string
  metadata: {
    flavor: string
    size: string
    retailPrice: number
  }
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
  setActiveProduct: (product: StripeProduct | undefined) => void
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
  sanityProducts: any
  setSanityProducts: (sanityProducts: any) => void
  urlFor: (source: any) => ImageUrlBuilder
  localFlavors: FlavorNames[]
  setLocalFlavors: (flavors: FlavorNames[]) => void
  HandleSizeSelect: (size: SizeNames) => void
}
interface Props {
  children: React.ReactNode
}

export const LocalContext = createContext<LocalContextScope | null>(null)

export const LocalContextProvider = (props: Props) => {
  const { children } = props
  const [activeProduct, setActiveProduct] = useState<StripeProduct | undefined>(
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
  const [sanityProducts, setSanityProducts] = useState<any[] | null>(null)
  const [checkNewProducts, setCheckNewProducts] = useState<boolean>(true)
  const [localFlavors, setLocalFlavors] = useState<FlavorNames[]>([])

  const router = useRouter()

  const urlFor = (source: string) => {
    const builder = imageUrlBuilder(client)

    return builder.image(source)
  }

  useEffect(() => {
    // this needs to be called inside the ssr for making page intercept
    document.body.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    const getData = async () => {
      await client
        .fetch(
          `*[_type == "candy"]{
            _id,
            name,
            description,
            price,
            image
          }`
        )
        .then(async (data: any) => {
          setSanityProducts(data)
        })
        .catch(console.error)
    }
    if (sanityProducts?.length === 0 || sanityProducts === null) {
      getData()
    }
  }, [])

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
  const HandleSizeSelect = (size: SizeNames) => {
    setSelectedSize(size)
  }

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
    if (!foundProduct) return
    if (!foundProduct.metadata) return
    if (!foundProduct.metadata.retailPrice) return
    setActiveProduct(foundProduct)
    setLocalPrice(parseInt(foundProduct.metadata.retailPrice) * quantity)
  }, [activeFlavors, selectedSize, products])

  useEffect(() => {
    const makeStripeProducts = async () => {
      await fetch('/api/post/stripe/makeStripeProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sanityProducts,
        }),
      })
        .then((res) => res.json())
        .then((data: any) => {
          const newProds: Product[] = data.productsCreated
          if (newProds.length === 0) {
            return
          }
          const stripeProductArr: StripeProduct[] = []

          newProds.forEach((item: Product) => {
            if (item.metadata?.retailPrice === undefined) return
            if (item.name === undefined) return
            stripeProductArr.push({
              name: item.name,
              metadata: {
                retailPrice: item.metadata.retailPrice.toString(),
              },
            })
          })
          const newProducts = products.concat(stripeProductArr)
          setProducts(newProducts)
        })

        .catch(console.error)
    }
    if (sanityProducts ? sanityProducts?.length > 0 : false) {
      if (checkNewProducts) {
        makeStripeProducts()
        setCheckNewProducts(false)
      }
    }
  }, [sanityProducts])

  useEffect(() => {
    setStripeCart(MakeCart(cart))
  }, [checkingOut, cart])

  useEffect(() => {
    if (activeSizes.length !== 3) return
    if (localFlavors.length >= 0) {
      setLocalSizes(activeSizes)
    }
    if (localFlavors.length > 1) {
      setLocalSizes(activeSizes.filter((size) => !size.includes('1 Gal.')))
    }
    if (localFlavors.length > 2) {
      setLocalSizes(
        activeSizes.filter(
          (size) => !size.includes('2 Gal.') && !size.includes('1 Gal.')
        )
      )
    }
    if (localFlavors.length > 3) {
      setActiveFlavors(localFlavors)
      setSelectedSize('3 Gal.')
    }
  }, [localFlavors])
  const additionalFlavorProduct: StripeProduct = {
    name: `additional flavor`,
    metadata: {
      retailPrice: '100',
    },
    id: 'prod_O5dsPNSjFfytws',
    active: true,
  }

  const AddButton = (quantity: number) => {
    if (!activeProduct || quantity === 0) return
    const newCart = [...cart]
    console.log(activeFlavors)
    if (activeFlavors.length > 1) {
      activeProduct.name = `${activeProduct.name} - ${activeFlavors.join(' & ')}`
      for (let i = 0; i < activeFlavors.length - 1; i++) {
        additionalFlavorProduct.description = activeFlavors[i].toString()
        additionalFlavorProduct.name = `${activeFlavors[i + 1]}`
        newCart.push(additionalFlavorProduct)
      }
    }
    for (let i = 0; i < quantity; i++) {
      newCart.push(activeProduct)
    }
    router.replace('/')
    document.body.scrollTo({
      top: document.getElementById(activeProduct.name)?.offsetTop,
      behavior: 'smooth',
    })
    setCart(newCart)
    setQuantity(1)
    setActiveProduct(undefined)
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
      setActiveProduct,
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
      sanityProducts,
      setSanityProducts,
      urlFor,
      localFlavors,
      setLocalFlavors,
      HandleSizeSelect,
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
      setActiveProduct,
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
      sanityProducts,
      setSanityProducts,
      urlFor,
      localFlavors,
      setLocalFlavors,
      HandleSizeSelect,
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
