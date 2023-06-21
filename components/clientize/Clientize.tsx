'use client'

import Navbar from '@components/navbar/Navbar'
import Footer from '@components/footer/Footer'
import Cart from '@components/cart/Cart'
import { useLocalContext } from '@components/context/LocalContext'
const Clientize = ({ children }: { children: React.ReactNode }) => {
  const { showCart } = useLocalContext()

  return (
    <>
      <Navbar />

      {showCart && <Cart />}
      {children}
      <Footer />
    </>
  )
}

export default Clientize
