import '../styles/globals.scss'
import Diamonds from '../components/svgs/Diamonds'
import styles from '@styles/Home.module.scss'

interface Props {
  children: React.ReactNode
}

export default async function RootLayout({ children }: Props) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="description" content="Go-Events" />
        <link rel="icon" type="image/x-icon" href="/icons/favicon.ico" />
      </head>
      <body>
        <main>
          <Diamonds />
          <div className={styles.pageContent} id={'pageContent'}>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
