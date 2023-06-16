'use client'

import Navbar from '@components/navbar/Navbar'
import Footer from '@components/footer/Footer'
import Cart from '@components/cart/Cart'
import Tin from '@components/popcorn/flavors/tin/Tin'
import { useLocalContext } from '@components/context/LocalContext'

const Clientize = ({ children }: { children: React.ReactNode }) => {
  const { activeSizes } = useLocalContext()
  return (
    <>
      <Navbar />
      <Cart />
      {children}
      {activeSizes.find((size) => size.includes('Gal')) && <Tin />}
      <Footer />
    </>
  )
}

export default Clientize
