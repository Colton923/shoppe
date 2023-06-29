import * as admin from 'firebase-admin'
import { RegisterForm } from 'types/RegisterForm'
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
    formData: RegisterForm
  }
}

const handler = async (req: newRegistration, res: any) => {
  const { formData } = req.body

  const mailService = new MailService()
  mailService.setApiKey(process.env.SENDGRID_API_KEY as string)
  const msg = {
    to: 'fogtownltd@gmail.com',
    from: 'colton923@gmail.com',
    subject: 'New Wholesale Registration',
    text: 'New Wholesale Registration',
    html: `<html>
    <head>
        <title>New Wholesale Registration</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 20px;
                margin: 0;
                display: flex;
                justify-content: center;
                font-weight: bold;
            }
            .container {
                display: flex;
                flex-direction: column;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                background-color: #f2f2f2;
                padding: 20px;
                justify-content: flex-start;
                max-height: 600px;
                min-width: 365px;
            }
            .header {
                font-size: 30px;
                text-align: center;
                padding: 20px 0 0 0;
                transform: skewX(-10deg);
                text-decoration: underline white;
            }
            .details {
                margin: 75px;
                display: grid;
                grid-template-columns: 100px 1fr;
                align-self: center;
                border: 1px solid white;
                border-radius: 10px;
                padding: 10px;
                box-shadow: 0px 0px 10px white;
            }
            .approve-button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #000;
                color: #ffffff;
                text-align: center;
                text-decoration: none;
                border-radius: 5px;
                width: 150px;
                margin: auto 0 auto auto;
            }
            p {
                text-align: center;
                padding: 5px;
                font-size: 1.2rem;
                border-bottom: 1px solid white;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">New Wholesale Registration</div>
            <div class="details">
                <p>Company Name: </p>
                <p>${formData.businessName}</p>
                <p>Address: </p>
                <p>${formData.address}</p>
                <p>Email: </p>
                <p>${formData.email}</p>
                <p>Phone: </p>
                <p>${formData.phoneNumber}</p>
                <p>TIN: </p>
                <p>${formData.tin}</p>
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
