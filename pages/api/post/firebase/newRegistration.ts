import * as admin from 'firebase-admin'
import type { FormData } from 'components/register/Register'

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  })
}

export type newRegistration = {
  body: {
    formData: FormData
  }
}

const handler = async (req: newRegistration, res: any) => {
  const { formData } = req.body

  await admin
    .firestore()
    .collection('wholesaleRegistration')
    .add(formData)
    .then(() => {
      res.status(200).json({ success: true })
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
}

export default handler
