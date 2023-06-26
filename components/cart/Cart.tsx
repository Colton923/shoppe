import ShoppingCartItem from './ShoppingCartItem'
import SubTotal from './SubTotal'
import CheckoutButton from './CheckoutButton'
import ShippingCalculator from '@utils/ShippingCalculator'
import { Customer } from 'types/Customer'
import * as SanityTypes from 'types/SanityItem'
import {
  Drawer,
  Group,
  Title,
  Text,
  Container,
  Space,
  ScrollArea,
} from '@mantine/core'
interface CartProps {
  HandleCheckout?: any
  customer: Customer
  setStatus: (status: string) => void
  status: string
  showCart: boolean
  setCart: (cart: SanityTypes.SanityItem[]) => void
  cart: SanityTypes.SanityItem[]
  setShowCart: (showCart: boolean) => void
  HandleDeleteItem: (id: string) => void
  subTotal: number
  opened: boolean
  open: () => void
  close: () => void
}

export default function Cart(props: CartProps) {
  const {
    subTotal,
    HandleCheckout,
    customer,
    setStatus,
    status,
    setCart,
    setShowCart,
    cart,
    HandleDeleteItem,
    opened,
    close,
  } = { ...props }

  const CheckoutToStripe = async () => {
    const customerHandler = async () => {
      if (!HandleCheckout) return
      if (!customer) return
      if (
        customer.address === '' ||
        customer.city === '' ||
        customer.state === '' ||
        customer.zip === '' ||
        parseInt(customer.zip) < 10000 ||
        parseInt(customer.zip) > 99999 ||
        customer.name === ''
      )
        return
      if (customer.zip) {
        const shippingCost = await ShippingCalculator({ zip: customer.zip }).then(
          (res) => {
            if (res) return res
            return 0
          }
        )
        customer.shippingCost = shippingCost ?? 0
      }
      return customer
    }
    const ret = await customerHandler().then((res) => {
      if (res) {
        if (!HandleCheckout) return
        HandleCheckout()
        console.log('checking Out')
        return null
      } else {
        return undefined
      }
    })
    return Promise.resolve(ret).then(() => {
      console.log('cart.tsx promise resolved')
      setShowCart(false)
      setCart([])
    })
  }

  const HandleThisCheckout = () => {
    if (status === 'Checkout') {
      return CheckoutToStripe()
    } else if (status === 'Pay' && HandleCheckout) {
      setStatus('Checkout')
      return HandleCheckout()
    } else {
      return () => {
        return null
      }
    }
  }

  const HandleDrawerClose = () => {
    setShowCart(false)
    close()
  }

  const ShoppingCart = () => {
    const currentCart: SanityTypes.SanityItem[] = [...cart]
    const reducedCart = currentCart.reduce(
      (acc: SanityTypes.SanityItem[], item: SanityTypes.SanityItem) => {
        if (!acc.length) return [...acc, item]
        if (!acc) return [...acc, item]
        if (
          acc.find((accItem) => accItem.stripeProduct?.id === item.stripeProduct?.id)
        )
          return acc
        return [...acc, item]
      },
      []
    )

    const quant = reducedCart.map((item: SanityTypes.SanityItem) => {
      const count = currentCart.filter(
        (cartItem: SanityTypes.SanityItem) =>
          cartItem.stripeProduct?.id === item.stripeProduct?.id
      ).length
      return count
    })

    const returnCart = reducedCart.map(
      (item: SanityTypes.SanityItem, index: number) => {
        return (
          <ShoppingCartItem
            item={item}
            key={index + 'shoppingCart'}
            quantity={quant[index]}
            HandleCheckout={HandleCheckout}
            HandleDeleteItem={HandleDeleteItem}
          />
        )
      }
    )
    const returnArea = <ScrollArea h={'50vh'}>{returnCart}</ScrollArea>

    return returnArea
  }

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        overlayProps={{ opacity: 0.75, blur: 4, onClick: close }}
        keepMounted={true}
        closeButtonProps={{
          onClick: HandleDrawerClose,
        }}
        position="right"
      >
        <Container size="xl">
          <Group spacing="md">
            <Title order={3} style={{ textAlign: 'center' }}>
              {HandleCheckout ? '' : 'Cart'}
            </Title>
          </Group>
          <Group spacing="md">
            {cart.length > 0 ? (
              <ShoppingCart />
            ) : (
              <Text style={{ textAlign: 'center' }}>Your cart is empty</Text>
            )}
          </Group>
          <Group spacing="md">
            <SubTotal subTotal={subTotal} />
            <CheckoutButton HandleCheckout={HandleThisCheckout} status={status} />
          </Group>
        </Container>
      </Drawer>
    </>
  )
}
