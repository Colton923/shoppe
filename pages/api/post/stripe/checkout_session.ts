import type { NextApiRequest, NextApiResponse } from 'next'
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //[ { price: 'price_1MioUSHtHKdtig1SrUPTX1GV', quantity: 3 } ]
  const { line_items, shipping } = req.body
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        success_url: 'http://main-st-shoppe.com/?success=true',
        cancel_url: 'http://main-st-shoppe.com/?canceled=true',
        currency: 'usd',
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: parseInt(shipping),
                currency: 'usd',
              },
              display_name: 'Shipping & Handling',
              delivery_estimate: {
                minimum: {
                  unit: 'day',
                  value: 3,
                },
                maximum: {
                  unit: 'day',
                  value: 7,
                },
              },
            },
          },
        ],
      })

      res.status(200).json({ id: session.id })
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
