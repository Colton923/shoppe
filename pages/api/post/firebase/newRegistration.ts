import * as admin from 'firebase-admin'
import type { FormData } from 'components/register/Register'
import { MailService } from '@sendgrid/mail'

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
    html: `<html>
    <head>
        <title>New Wholesale Registration</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                margin: 0;
                padding: 20px;
            }

            .container {
                background-color: #ffffff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }

            .header {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
            }

            .details {
                margin-bottom: 10px;
            }

            .approve-button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #4CAF50;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">New Wholesale Registration</div>
            <div class="details">
                <p>Company Name: ${formData.businessName}</p>
                <p>Address: ${formData.address}</p>
                <p>Email: ${formData.email}</p>
                <p>Phone: ${formData.phoneNumber}</p>
                <p>TIN: ${formData.tin}</p>
            </div>
            <a class="approve-button" href="https://us-central1-main-st-shoppe.cloudfunctions.net/emailHook?email=${formData.email}">Approve</a>
        </div>
    </body>
    </html>
    `,
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
