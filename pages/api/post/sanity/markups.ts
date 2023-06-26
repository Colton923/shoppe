import type { NextApiRequest, NextApiResponse } from 'next'
import client from '@lib/sanity/client'
import queries from '@lib/sanity/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { categoryId, flavorId, containerName, size } = req.body
  if (req.method === 'POST') {
    try {
      const markups = await client.fetch(
        queries.flavorCategory(categoryId, flavorId, containerName, size)
      )
      res.status(200).json(markups)
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
