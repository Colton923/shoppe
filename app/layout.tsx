import '../styles/globals.scss'
import styles from '@styles/Home.module.scss'
import LocalContextProvider from '@components/context/LocalContext'
import FirebaseContextProvider from '@components/context/FirebaseContext'

import Clientize from '@components/clientize/Clientize'

export default async function RootLayout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  const { children, modal } = props
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="description" content="Main St. Shoppe" />
        <meta name="author" content="Webdev Solutions LLC" />
        <link rel="icon" type="image/x-icon" href="/icons/favicon.ico" />
      </head>
      <body>
        <main>
          <LocalContextProvider>
            <FirebaseContextProvider>
              <Clientize>
                <div className={styles.pageContent} id={'pageContent'}>
                  {children}
                  {modal}
                </div>
              </Clientize>
            </FirebaseContextProvider>
          </LocalContextProvider>
        </main>
      </body>
    </html>
  )
}
