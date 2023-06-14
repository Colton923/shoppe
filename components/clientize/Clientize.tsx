'use client'

import Navbar from '@components/navbar/Navbar'
import Footer from '@components/footer/Footer'
import Cart from '@components/cart/Cart'
import styles from '@styles/Home.module.scss'

const Clientize = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <Cart />
      {children}

      <Footer />
    </div>
  )
}

export default Clientize
