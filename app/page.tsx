'use client'

import Popcorn from '@components/popcorn/Popcorn'
import styles from '@styles/Home.module.scss'
import Footer from '@components/footer/Footer'
import LocalContextProvider from '@components/context/LocalContext'
import Navbar from '@components/navbar/Navbar'
import Cart from '@components/cart/Cart'

export default function Index() {
  return (
    <div className={styles.pageContent} id={'pageContent'}>
      <LocalContextProvider>
        <Navbar />
        {/* <Progress stage={progress} /> */}
        <Popcorn />

        <Footer />
        <div className={styles.cartOverlay} id={'cartOverlay'}>
          <Cart />
        </div>
      </LocalContextProvider>
    </div>
  )
}
