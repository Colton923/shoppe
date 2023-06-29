'use client'

import { useLocalContext } from '@components/context/LocalContext'
import Cart from '@components/cart/Cart'

const Clientize = () => {
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
    </>
  )
}

export default Clientize
