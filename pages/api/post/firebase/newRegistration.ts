import * as admin from 'firebase-admin'
import type { FormData } from 'components/register/Register'
import mail, { MailService } from '@sendgrid/mail'

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

  const mailService = new MailService()
  mailService.setApiKey(process.env.SENDGRID_API_KEY as string)

  const msg = {
    to: 'colton923@gmail.com',
    from: 'colton923@gmail.com',
    subject: 'New Wholesale Registration',
    text: 'New Wholesale Registration',
    html: `<p>New Wholesale Registration
    Company Name: ${formData.businessName}
    Address: ${formData.address}
    Email: ${formData.email}
    Phone: ${formData.phoneNumber}
    TIN: ${formData.tin}</p>
    <a href='https://us-central1-shoppe-386214.cloudfunctions.net/wholesaleApprove?email=${formData.email}'>Approve</a>`,
  }
  mailService.send(msg)

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
