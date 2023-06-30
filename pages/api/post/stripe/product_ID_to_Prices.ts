import Stripe from 'stripe'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
    throw new Error('Missing Stripe secret key env variable')
  }

  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
  })
  const id = req.body.id
  if (!id) {
    res.status(400).json({
      statusCode: 400,
      message: 'Invalid request',
    })
    return
  }
  if (!stripe) {
    res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    })
    return
  }

  try {
    const product = await stripe.products.retrieve(id)
    const prices = await stripe.prices.list({ product: product.id })
    res.status(200).json({ prices })
    return
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Internal server error'
    res.status(500).json({
      statusCode: 500,
      message: errorMessage,
    })
    return
  }
}

export default handler
