import '../styles/globals.scss'
import LocalContextProvider from '@components/context/LocalContext'
import FirebaseContextProvider from '@components/context/FirebaseContext'
import { poppins } from '@styles/fonts'
import Clientize from '@components/clientize/Clientize'

export default async function RootLayout(props: {
  children: React.ReactNode
  modal: React.ReactNode
  authModal: React.ReactNode
}) {
  const { children, modal, authModal } = props

  return (
    <html lang="en-US">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Main St. Shoppe" />
        <meta name="author" content="Webdev Solutions LLC" />
        <link rel="icon" type="image/x-icon" href="/icons/favicon.ico" />
        <title>Main St. Shoppe</title>
      </head>
      <body>
        <main id={'pageContent'} style={poppins.style}>
          <LocalContextProvider>
            <FirebaseContextProvider>
              <Clientize>
                {children}
                {modal}
                {authModal}
              </Clientize>
            </FirebaseContextProvider>
          </LocalContextProvider>
        </main>
      </body>
    </html>
  )
}
