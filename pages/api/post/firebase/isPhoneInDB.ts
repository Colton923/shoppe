import * as admin from 'firebase-admin'

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  })
}

export type isPhoneInDB = {
  body: {
    phone: string
  }
}

const handler = async (req: isPhoneInDB, res: any) => {
  await admin
    .firestore()
    .collection('users')
    .where('phone', '==', req.body.phone)
    .limit(1)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        return res.status(200).json({ phoneInDB: false })
      } else {
        return res.status(200).json({ phoneInDB: true })
      }
    })
    .catch((error) => {
      return res.status(500).json({ error })
    })
}

export default handler
