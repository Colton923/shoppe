import * as admin from 'firebase-admin'

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  })
}

export type isApproved = {
  body: {
    email: string
  }
}

const handler = async (req: isApproved, res: any) => {
  await admin
    .firestore()
    .collection('wholesaleRegistration')
    .where('email', '==', req.body.email)
    .limit(1)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        return res.status(300).json({ isApproved: false })
      } else {
        if (querySnapshot.docs[0].data().approved !== 'approved')
          return res.status(201).json({ isApproved: false })
        return res.status(200).json({ isApproved: true })
      }
    })
    .catch((error) => {
      return res.status(500).json({ error })
    })
}

export default handler
