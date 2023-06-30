import initializeStripe from './initializeStripe'
import { collection, doc, addDoc, getDoc } from 'firebase/firestore'
import { db } from './firebaseClient'
import { onSnapshot } from 'firebase/firestore'

export type StripeCheckoutSessionProduct = {
  price: string
  quantity: number
  name: string
}

export async function checkoutSession(
  uid: string,
  products: StripeCheckoutSessionProduct[]
) {
  const lineItems = products.map((product) => {
    return {
      price: product.price,
      quantity: product.quantity,
      name: product.name,
    }
  })

  const itemNameArr = products.map((product) => {
    return product.name
  })

  const itemNames = itemNameArr.join(', ')
  const userRef = collection(db, 'users')
  const docRef = doc(userRef, uid)
  const userData = await getDoc(docRef)
  const myData = userData.data()
  const params: any = {
    success_url: window.location.origin + '/',
    cancel_url: window.location.origin + '/',
    customerEmail: myData ? (myData.email ? myData?.email : '') : '',
    line_items: lineItems,
    metadata: {
      firebaseUID: uid,
      itemNames: itemNames,
    },
    mode: 'payment',
  }
  const checkoutRef = collection(docRef, 'checkout_sessions')
  const checkoutSessionRef = await addDoc(checkoutRef, params)

  try {
    onSnapshot(checkoutSessionRef, async (snapshot) => {
      const data = snapshot.data()
      if (data?.sessionId) {
        const stripe = await initializeStripe()
        stripe?.redirectToCheckout({
          sessionId: data.sessionId,
        })
      }
    })
  } catch (e) {
    console.log('error', e)
  }
}

export default checkoutSession
