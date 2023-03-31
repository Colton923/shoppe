import Stripe from 'stripe'
import type { NextApiRequest, NextApiResponse } from 'next'
import { StripeCart } from '@components/popcorn/cart/Cart'

//@ts-ignore
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const stripeCart: StripeCart[] = req.body.stripeCart
  console.log('stripeCart', stripeCart)
  // stripeCart [
  //   {
  //     item: {
  //       role: null,
  //       stripe_metadata_size: 'X Large Clear Bag',
  //       active: true,
  //       name: 'X Large Clear Bag of Butter Popcorn',
  //       description: null,
  //       stripe_metadata_flavor: 'Butter',
  //       images: [],
  //       stripe_metadata_retailPrice: '800',
  //       metadata: [Object],
  //       tax_code: null,
  //       id: 'prod_NTm8cewkh7rZgt'
  //     },
  //     quantity: 2
  //   }
  // ]

  try {
    if (!stripeCart[0].item.id) return
    const GetPriceIDFromProductID = async (
      prodID: string,
      stripe: Stripe
    ): Promise<string> => {
      return stripe.prices
        .search({
          //@ts-ignore
          query: `product:"${prodID}"`,
        })
        .then((prices) => {
          return prices.data[0].id
        })
    }

    const priceIDs = await Promise.all(
      stripeCart.map(async (item) => {
        if (item.item.id) {
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
