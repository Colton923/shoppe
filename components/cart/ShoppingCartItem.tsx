import styles from '@components/popcorn/containers/Containers.module.scss'
import intToCash from '@utils/intToCash'
import { SanityItem, Popcorn, StoreProduct } from 'types/SanityItem'
import PopcornNamer from '@utils/PopcornNamer'
import { Button, Grid, Col, Text, Container, Space } from '@mantine/core'

interface ShoppingCartItemProps {
  item: SanityItem
  quantity: number
  HandleCheckout?: () => void
  HandleDeleteItem: (id: string) => void
}

const ShoppingCartItem = (props: ShoppingCartItemProps) => {
  const { item, quantity, HandleCheckout, HandleDeleteItem } = props

  const { metadata } = { ...item.stripeProduct }
  if (!metadata) return null
  const { size, retailPrice } = metadata
  if (!item) return null

  const NameHelper = () => {
    if (item.item) {
      const popcorn = item.item as Popcorn
      if (popcorn.flavor) {
        return PopcornNamer(popcorn)
      }
      const product = item.item as StoreProduct
      if (product.product) {
        return product.product.name
      }
    }
  }

  return (
    <Container
      className={styles.clickable}
      style={{
        borderRadius: '0.2rem',
        maxHeight: '250px',
        boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.2)',
        maxWidth: '90%',
      }}
      m={'md'}
    >
      <Space h="md" />
      <Grid gutter="md" style={{ gap: '5px' }}>
        <Col span={12}>
          <Text>{NameHelper()}</Text>
        </Col>
        <Col span={6}>
          <Text>Quantity: {quantity}</Text>
          <Text>
            Price: {intToCash(quantity * parseInt(retailPrice ? retailPrice : '0'))}
          </Text>
        </Col>
        <Col span={12}>
          <Button
            onClick={() => {
              if (!item?.stripeProduct?.id) return
              HandleDeleteItem(item?.stripeProduct?.id)
            }}
          >
            Remove Item
          </Button>
        </Col>
      </Grid>
      <Space h="md" />
    </Container>
  )
}

export default ShoppingCartItem
