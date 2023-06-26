'use client'

import { useLocalContext } from '@components/context/LocalContext'
import styles from './ActiveProduct.module.scss'
import PopcornNamer from '@utils/PopcornNamer'
import intToCash from '@utils/intToCash'
import Button from '@components/button/Button'
import urlFor from '@lib/sanity/urlFor'
import { useEffect, useState } from 'react'
import {
  Grid,
  Image,
  Col,
  Text,
  Input,
  Chip,
  Title,
  Space,
  Container,
} from '@mantine/core'

const ActiveProduct = () => {
  const {
    activePopcorn,
    activeQuantity,
    HandleAddToCart,
    HandleSetQuantity,
    activePrice,
  } = useLocalContext()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!activePopcorn?.flavor) return
    if (!activePopcorn?.flavor[0]) return
    HandleSetQuantity(1)
  }, [activePopcorn])

  if (!activePopcorn.flavor) return null
  if (!activePopcorn.flavor[0]) return null

  if (activePrice === 0) return null

  return (
    <Container
      size="lg"
      style={{
        display: 'flex',
        borderRadius: '0.2rem',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'space-between',
        boxShadow: '3px 3px 1px 0px rgba(139,0,0,0.75)',
        backgroundColor: 'rgba(255,255,255,1',
      }}
      w={'50%'}
      m={'lg'}
    >
      <Grid gutter="md" style={{ gap: '16px' }}>
        <Col span={12}>
          {activePopcorn.flavor[0].image && (
            <Image
              radius={'sm'}
              src={`${urlFor(activePopcorn.flavor[0].image).url()}`}
            />
          )}
        </Col>
        <Col
          span={12}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Title style={{ textAlign: 'center' }} fz={'lg'} fw={'bolder'}>
            {PopcornNamer(activePopcorn)}
          </Title>
          <Space h="md" />
          <Grid
            gutter="sm"
            m={'sm'}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Col
              span={6}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text m={'sm'} p={'sm'}>
                Quantity:
              </Text>
              <Chip
                onChange={(checked: boolean) => {
                  return
                }}
                checked={false}
                defaultChecked={false}
                radius="xl"
                size={'sm'}
              >
                {activeQuantity}
              </Chip>
            </Col>
            <Col span={6} m={'sm'}>
              <Chip
                onChange={(checked: boolean) => {
                  HandleSetQuantity(activeQuantity + 1)
                }}
                checked={false}
                defaultChecked={false}
                radius="xl"
                size={'sm'}
                m={'sm'}
              >
                +
              </Chip>
              <Chip
                onChange={(checked: boolean) => {
                  HandleSetQuantity(activeQuantity - 1)
                }}
                checked={false}
                defaultChecked={false}
                radius="xl"
                size={'sm'}
                m={'sm'}
              >
                -
              </Chip>
            </Col>
            <Col
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
              span={12}
            >
              <Text fz={'md'}>
                Price:{' '}
                <Text fz={'md'} fw={'bold'}>
                  {' '}
                  {intToCash(activeQuantity * activePrice)}
                </Text>
              </Text>
            </Col>
          </Grid>
        </Col>
        <Col span={12}>
          <Button title="Add to Cart" onClick={HandleAddToCart} />
        </Col>
      </Grid>
    </Container>
  )
}

export default ActiveProduct
