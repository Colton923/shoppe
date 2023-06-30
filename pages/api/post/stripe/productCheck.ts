import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
    throw new Error('Missing Stripe secret key env variable')
  }

  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
  })

  const getProductByName = async (stripe: Stripe, name: string) => {
    const products = await stripe.products.list()
    return products.data.find((product) => product.name === name)
  }

  const createProduct = async (
    stripe: Stripe,
    name: string,
    retailPrice: number | undefined,
    wholesalePrice: number | undefined
  ) => {
    if (retailPrice !== undefined && wholesalePrice === undefined) {
      const product = await stripe.products.create({
        name,
        metadata: {
          retailPrice: retailPriceMetadata,
        },
      })
      await stripe.prices.create({
        product: product.id,
        unit_amount: retailPrice,
        currency: 'usd',
        metadata: {
          wholesale: 'false',
        },
      })
      return product
    } else if (retailPrice === undefined && wholesalePrice !== undefined) {
      const product = await stripe.products.create({
        name,
        metadata: {
          retailPrice: wholesalePriceMetadata,
        },
      })

      await stripe.prices.create({
        product: product.id,
        unit_amount: wholesalePrice,
        currency: 'usd',
        metadata: {
          wholesale: 'true',
        },
      })
      return product
    }
  }

  const updateWholesalePrice = async (
    stripe: Stripe,
    product: Stripe.Product,
    wholesalePrice: number | undefined
  ) => {
    const prices = await stripe.prices.list({ product: product.id })
    const wholesalePriceObj = prices.data.find(
      (price) => price.metadata?.wholesale === 'true'
    )

    if (!wholesalePrice) return
    if (wholesalePriceObj) {
      await stripe.prices.create({
        product: product.id,
        unit_amount: wholesalePrice,
        currency: wholesalePriceObj.currency,
        metadata: {
          wholesale: 'true',
        },
      })

      await stripe.prices.update(wholesalePriceObj.id, {
        active: false,
      })
    } else {
      await stripe.prices.create({
        product: product.id,
        unit_amount: wholesalePrice,
        currency: 'usd',
        metadata: {
          wholesale: 'false',
        },
      })
    }
  }

  const updateRetailPrice = async (
    stripe: Stripe,
    product: Stripe.Product,
    retailPrice: number | undefined
  ) => {
    const prices = await stripe.prices.list({ product: product.id })
    const retailPriceObj = prices.data.find(
      (price) => price.metadata?.wholesale !== 'true'
    )
    if (!retailPrice) return
    if (retailPriceObj) {
      await stripe.prices.create({
        product: product.id,
        unit_amount: retailPrice,
        currency: retailPriceObj.currency,
        metadata: {
          wholesale: 'false',
        },
      })

      await stripe.prices.update(retailPriceObj.id, {
        active: false,
      })
    } else {
      await stripe.prices.create({
        product: product.id,
        unit_amount: retailPrice,
        currency: 'usd',
        metadata: {
          wholesale: 'false',
        },
      })
    }
  }

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' })
    return
  }
  const { name, retailPrice, wholesalePrice } = req.body
  const retailPriceMetadata = retailPrice ? retailPrice.toString() : ''
  const wholesalePriceMetadata = wholesalePrice ? wholesalePrice.toString() : ''

  if (!name && (!retailPrice || !wholesalePrice)) {
    res.status(400).json({ message: 'Missing required parameters' })
    return
  }

  try {
    let product = await getProductByName(stripe, name)

    if (!product) {
      product = await createProduct(stripe, name, retailPrice, wholesalePrice)
    } else {
      const prices = await stripe.prices.list({ product: product.id })

      if (wholesalePrice && !retailPrice) {
        if (
          !prices.data.some((price: any) => price.metadata?.wholesale === 'true')
        ) {
          await updateWholesalePrice(stripe, product, wholesalePrice)
        }
      }
      if (retailPrice && !wholesalePrice) {
        if (!prices.data.some((price: any) => price.unit_amount === retailPrice)) {
          await updateRetailPrice(stripe, product, retailPrice)
        }
      }
    }
    if (product) {
      if (retailPrice && retailPrice !== product.metadata.retailPrice) {
        product.metadata.retailPrice = retailPriceMetadata
        await stripe.products.update(product.id, {
          metadata: {
            retailPrice: retailPriceMetadata,
          },
        })
        await updateRetailPrice(stripe, product, retailPrice)
      }
      if (wholesalePrice && wholesalePrice !== product.metadata.wholesalePrice) {
        product.metadata.wholesalePrice = wholesalePriceMetadata
        await stripe.products.update(product.id, {
          metadata: {
            wholesalePrice: wholesalePriceMetadata,
          },
        })
        await updateWholesalePrice(stripe, product, wholesalePrice)
      }
      res.status(200).json(product || {})
      return
    } else {
      res.status(400).json({ message: 'Missing required parameters' })
      return
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
