import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../utils/firebaseClient'
import { collection, getDocs } from 'firebase/firestore'
import type { StripeProduct } from 'types/stripe/StripeProduct'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const colRef = collection(db, 'products')
  const products: StripeProduct[] = []
  await getDocs(colRef)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const dat = doc.data() as StripeProduct
        if (!dat) return
        dat.id = doc.id
        products.push(dat)
      })
    })
    .then(() => {
      res.status(200).json(products)
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
}
