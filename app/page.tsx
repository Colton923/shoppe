'use client'

import Popcorn from '@components/popcorn/Popcorn'
import styles from '@styles/Home.module.scss'

import LocalContextProvider from '@components/context/LocalContext'
import FirebaseContextProvider from '@components/context/FirebaseContext'
import Navbar from '@components/navbar/Navbar'
import Cart from '@components/cart/Cart'

import Footer from '@components/footer/Footer'

export default function Index() {
  return (
    <LocalContextProvider>
      <FirebaseContextProvider>
        <Navbar />
        <Popcorn />
        <div className={styles.cartOverlay} id={'cartOverlay'}>
          <Cart />
        </div>
        <Footer />
      </FirebaseContextProvider>
    </LocalContextProvider>
  )
}
