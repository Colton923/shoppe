'use client'

import Popcorn from '@components/popcorn/Popcorn'
import styles from '@styles/Home.module.scss'

import LocalContextProvider from '@components/context/LocalContext'
import Navbar from '@components/navbar/Navbar'
import Cart from '@components/cart/Cart'

export default function Index() {
  return (
    <LocalContextProvider>
      <Navbar />
      <Popcorn />
      <div className={styles.cartOverlay} id={'cartOverlay'}>
        <Cart />
      </div>
    </LocalContextProvider>
  )
}
