'use client'

import Navbar from '@components/navbar/Navbar'
import Footer from '@components/footer/Footer'
import Cart from '@components/cart/Cart'
import { useLocalContext } from '@components/context/LocalContext'
const Clientize = ({ children }: { children: React.ReactNode }) => {
  const {
    subTotal,
    showCart,
    cart,
    HandleCheckout,
    customer,
    setStatus,
    status,
    setCart,
    setShowCart,
    HandleDeleteItem,
    open,
    opened,
    close,
  } = useLocalContext()

  return (
    <>
      <Navbar />
      {showCart && (
        <Cart
          cart={cart}
          customer={customer}
          setCart={setCart}
          setShowCart={setShowCart}
          setStatus={setStatus}
          showCart={showCart}
          status={status}
          HandleCheckout={HandleCheckout}
          HandleDeleteItem={HandleDeleteItem}
          subTotal={subTotal}
          opened={opened}
          open={open}
          close={close}
        />
      )}
      {children}
      <Footer />
    </>
  )
}

export default Clientize
