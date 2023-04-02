import type { NextApiRequest, NextApiResponse } from 'next'
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //[ { price: 'price_1MioUSHtHKdtig1SrUPTX1GV', quantity: 3 } ]
  const { line_items } = req.body
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        success_url: 'http://localhost:3000/?success=true',
        cancel_url: 'http://localhost:3000/?canceled=true',
        currency: 'usd',
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
