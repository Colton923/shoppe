'use client'

import { useLocalContext } from '@components/context/LocalContext'
import CheckoutButton from '@components/cart/CheckoutButton'
import { Paper, Text, TextInput, Space } from '@mantine/core'
import ShippingCalculator from '@utils/ShippingCalculator'
import { useEffect } from 'react'
import { useFirebaseContext } from '@components/context/FirebaseContext'

const Customer = () => {
  const {
    customer,
    setCustomer,
    status,
    HandleCheckout,
    setWholesaler,
    wholesaler,
    subTotal,
  } = useLocalContext()
  const { loggedIn } = useFirebaseContext()

  const HandleCustomerCheckout = async () => {
    if (!HandleCheckout) return
    setCustomer({ ...customer, wholesaler: wholesaler })

    if (
      customer.address === '' ||
      customer.city === '' ||
      customer.state === '' ||
      customer.zip === '' ||
      parseInt(customer.zip) < 10000 ||
      parseInt(customer.zip) > 99999 ||
      customer.name === ''
    ) {
      alert('Please fill out all fields')
    } else {
      if (wholesaler === true && subTotal < 300) {
        alert('Wholesale orders must be at least $300')
        return
      }
      if (customer.zip) {
        const shippingCost = await ShippingCalculator({ zip: customer.zip }).then(
          (res) => {
            if (res) return res
            return 0
          }
        )
        customer.shippingCost = shippingCost ?? 0
        HandleCheckout()
      }
    }
  }

  useEffect(() => {
    if (loggedIn) {
      setWholesaler(true)
    }
  }, [loggedIn])

  return (
    <Paper p="md" shadow="xs">
      <Text align="center" size="xl">
        Please Verify your Shipping Address
      </Text>
      <div style={{ marginTop: 20 }}>
        <Text>Name</Text>
        <TextInput
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          placeholder="First and Last Name"
        />
        <Text>Address</Text>
        <TextInput
          value={customer.address}
          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
          placeholder="Street Address"
        />
        <Text>City</Text>
        <TextInput
          value={customer.city}
          onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
          placeholder="City"
        />
        <Text>State</Text>
        <TextInput
          value={customer.state}
          onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
          placeholder="State"
        />
        <Text>Zip</Text>
        <TextInput
          value={customer.zip}
          onChange={(e) => setCustomer({ ...customer, zip: e.target.value })}
          placeholder="Zip"
        />
      </div>
      <Space h={20} />
      <CheckoutButton HandleCheckout={HandleCustomerCheckout} status={status} />
      <Space h={20} />
    </Paper>
  )
}

export default Customer
