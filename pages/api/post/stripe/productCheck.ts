import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import getStripe from '@lib/stripe/getStripe'

const stripe = getStripe()

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
  const product = await stripe.products.create({
    name,
  })

  if (retailPrice) {
    await stripe.prices.create({
      product: product.id,
      unit_amount: retailPrice,
      currency: 'usd',
    })
  }
  if (wholesalePrice) {
    await stripe.prices.create({
      product: product.id,
      unit_amount: wholesalePrice,
      currency: 'usd',
      metadata: {
        wholesale: 'true',
      },
    })
  }

  return product
}

const updateWholesalePrice = async (
  stripe: Stripe,
  product: Stripe.Product,
  wholesalePrice: number
) => {
  const prices = await stripe.prices.list({ product: product.id })

  const wholesalePriceObj = prices.data.find(
    (price) => price.metadata?.wholesale === 'true'
  )

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
        wholesale: 'true',
      },
    })
  }
}

const updateRetailPrice = async (
  stripe: Stripe,
  product: Stripe.Product,
  retailPrice: number
) => {
  const prices = await stripe.prices.list({ product: product.id })

  const retailPriceObj = prices.data.find(
    (price) => price.metadata?.wholesale !== 'true'
  )

  if (retailPriceObj) {
    await stripe.prices.create({
      product: product.id,
      unit_amount: retailPrice,
      currency: retailPriceObj.currency,
    })

    await stripe.prices.update(retailPriceObj.id, {
      active: false,
    })
  } else {
    await stripe.prices.create({
      product: product.id,
      unit_amount: retailPrice,
      currency: 'usd',
    })
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' })
    return
  }

  const { name, retailPrice, wholesalePrice } = req.body
  const stripeClient = await stripe

  if (!name || !retailPrice || !wholesalePrice) {
    res.status(400).json({ message: 'Missing required parameters' })
    return
  }

  if (!stripe) {
    res.status(500).json({ message: 'Internal Server Error' })
    return
  }

  try {
    let product = await getProductByName(stripeClient, name)

    if (!product) {
      product = await createProduct(stripeClient, name, retailPrice, wholesalePrice)
    } else {
      const prices = await stripeClient.prices.list({ product: product.id })

      if (!prices.data.some((price: any) => price.metadata?.wholesale === 'true')) {
        await updateWholesalePrice(stripeClient, product, wholesalePrice)
      }
      if (!prices.data.some((price: any) => price.unit_amount === retailPrice)) {
        await updateRetailPrice(stripeClient, product, retailPrice)
      }
    }

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
