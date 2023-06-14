import type { NextApiRequest, NextApiResponse } from 'next'
import * as admin from 'firebase-admin'
// this handler updates stripe products based on sanity data.

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)

type Product = {
  name: string
  metadata: {
    flavor: string
    size: string
    retailPrice: number
  }
}
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  })
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body.sanityProducts

  const products: Product[] = data.map((product: any) => {
    return {
      name: product.name,
      metadata: {
        flavor: product.name,
        size: product.description ? product.description : 'N/A',
        retailPrice: product.price * 100,
      },
    }
  })
  try {
    await stripe.products
      .list({
        active: true,
      })
      .then(async (response: any) => {
        const newProducts = products.filter((product: any) => {
          return !response.data.some((item: any) => {
            return item.name === product.name
          })
        })
        if (newProducts.length > 0) {
          const addedProducts = newProducts.map(async (product: any) => {
            await stripe.products
              .create({
                name: product.name,
                type: 'good',
                metadata: {
                  flavor: product.metadata.flavor,
                  size: product.metadata.size,
                  retailPrice: product.metadata.retailPrice,
                },
              })
              .then(async (response: any) => {
                await stripe.prices
                  .create({
                    product: response.id,
                    unit_amount: product.metadata.retailPrice,
                    currency: 'usd',
                  })
                  .then((response: any) => {
                    admin
                      .firestore()
                      .collection('products')
                      .doc(response.product)
                      .set({
                        active: true,
                        description: null,
                        images: null,
                        name: product.name,
                        metadata: {
                          flavor: product.metadata.flavor,
                          size: product.metadata.size,
                          retailPrice: product.metadata.retailPrice,
                        },
                        role: null,
                        stripe_metadata_flavor: product.metadata.flavor,
                        stripe_metadata_retailPrice: product.metadata.retailPrice,
                        stripe_metadata_size: product.metadata.size,
                        tax_code: null,
                      })

                    return {
                      name: product.name,
                      id: response.product,
                      metadata: {
                        flavor: product.metadata.flavor,
                        size: product.metadata.size,
                        retailPrice: product.metadata.retailPrice,
                      },
                    }
                  })
                  .catch((error: any) => {
                    console.log(error)
                  })
              })
              .catch((error: any) => {
                console.log(error)
              })
          })
          await Promise.all(addedProducts).then((response: any) => {
            res
              .status(200)
              .json({ status: 'Products Created', productsCreated: addedProducts })
          })
        } else {
          res
            .status(200)
            .json({ productsCreated: [], status: 'No Products Created' })
        }
      })
  } catch (err: any) {
    res.status(err.statusCode || 500).json(err.message)
  }
}
