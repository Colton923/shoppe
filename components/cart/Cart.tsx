'use client'

import ShoppingCartItem from './ShoppingCartItem'
import * as SanityTypes from 'types/SanityItem'
import { Drawer, Group, Title, Text, Container, ScrollArea } from '@mantine/core'
import CustomerForm from '@components/customer/Customer'
import { useLocalContext } from '@components/context/LocalContext'

export default function Cart() {
  const {
    subTotal,
    cart,
    HandleCheckout,
    HandleDeleteItem,
    opened,
    close,
    wholesaler,
  } = useLocalContext()

  const HandleDrawerClose = () => {
    close()
  }
  const FormatSubtotal = (subTotal: number) => {
    if (!subTotal) return '$0.00'
    const subTotalStr = subTotal.toString()
    const subTotalArr = subTotalStr.split('')
    const cents = subTotalArr.slice(subTotalArr.length - 2, subTotalArr.length)
    const dollars = subTotalArr.slice(0, subTotalArr.length - 2)
    const dollarsStr = dollars.join('')
    const centsStr = cents.join('')
    return `$${dollarsStr}.${centsStr}`
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
            wholesaler={wholesaler}
          />
        )
      }
    )
    const returnArea = <ScrollArea h={'33vh'}>{returnCart}</ScrollArea>

    return returnArea
  }

  return (
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
      <Container size="xl" p={'sm'}>
        <Group spacing="md">
          <Title order={3} style={{ textAlign: 'center' }}>
            {'Cart'}
          </Title>
          {cart.length > 0 ? (
            <ShoppingCart />
          ) : (
            <Text style={{ textAlign: 'center' }}>Your cart is empty</Text>
          )}
          <CustomerForm />
          <Text style={{ textAlign: 'center' }}>
            {`Subtotal: ${FormatSubtotal(subTotal)}`}
          </Text>
        </Group>
      </Container>
    </Drawer>
  )
}
