import Stripe from 'stripe'
import type { NextApiRequest, NextApiResponse } from 'next'
import { StripeCart } from 'types/StripeCart'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const stripeCart: StripeCart[] = req.body.stripeCart

  try {
    if (!stripeCart[0].item?.id) return
    const GetPriceIDFromProductID = async (
      prodID: string,
      stripe: Stripe
    ): Promise<string> => {
      return stripe.prices
        .list({
          product: prodID,
        })
        .then((prices) => {
          if (prices.data.length === 0) {
            throw new Error('prices.data.length === 0')
          }
          return prices.data[0].id
        })
    }
    const priceIDs = await Promise.all(
      stripeCart.map(async (item) => {
        if (item.item?.id) {
          console.log('item.item.id', item.item.id)
          return await GetPriceIDFromProductID(item.item.id, stripe)
        } else return
      })
    )
    res.status(200).json(priceIDs)
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
