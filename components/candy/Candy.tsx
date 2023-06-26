'use client'

import Link from 'next/link'
import * as SanityTypes from 'types/SanityItem'
import { useLocalContext } from '@components/context/LocalContext'
import urlFor from '@lib/sanity/urlFor'
import {
  Title,
  Space,
  Card,
  Badge,
  Text,
  Group,
  Container,
  BackgroundImage,
  Center,
} from '@mantine/core'
import { Carousel, Embla } from '@mantine/carousel'
import intToCash from '@utils/intToCash'
import { useEffect, useState, useCallback } from 'react'
import styles from './Candy.module.scss'
interface ProductsProps {
  products: SanityTypes.Product[]
}

const Candy = (props: ProductsProps) => {
  const { setActiveProduct, popcornStoreActive, wholesaler } = useLocalContext()
  const { products } = { ...props }
  const [embla, setEmbla] = useState<Embla | null>(null)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<SanityTypes.Category[]>([])

  useEffect(() => {
    if (!embla) return
    setLoading(false)
  }, [embla, products])

  products.map((product: SanityTypes.Product) => {
    if (!product.category) {
      return
    }
    if (!product.category._id) {
      return
    }
    if (!product.category.name) {
      return
    }
    if (categories.find((category) => category._id === product?.category?._id)) {
      return
    }
    if (product.category) {
      setCategories([...categories, product.category as SanityTypes.Category])
    }
  })

  if (popcornStoreActive) {
    return null
  }

  const SanityItemsInCategories = (category: SanityTypes.Category) => {
    const items: SanityTypes.Product[] = []
    products.map((product: SanityTypes.Product) => {
      if (!product.category) return
      if (product.category._id === category._id) {
        items.push(product)
      }
    })
    return (
      <Carousel
        align="start"
        slideGap={'md'}
        bg={'transparent'}
        containScroll=""
        dragFree={true}
        draggable={true}
        inViewThreshold={0.1}
        getEmblaApi={setEmbla}
        withIndicators={true}
        w={'100%'}
        slideSize={'33% 100%'}
        p={0}
        m={0}
        style={
          loading
            ? { visibility: 'hidden' }
            : {
                width: '100%',
                height: '400px',
                visibility: 'visible',
                margin: 'auto',
                marginBottom: '0',
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center',
              }
        }
      >
        <Carousel.Slide key={'item1'} w={'100%'} style={{ alignSelf: 'center' }}>
          <Card
            shadow="sm"
            withBorder
            padding={'sm'}
            radius={'sm'}
            style={{
              width: '280px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
            }}
            bg={'rgba(255,255,255,0.8)'}
          >
            <Card.Section>
              <Title
                style={{
                  fontWeight: 900,
                  fontSize: '2rem',
                  letterSpacing: '0.1rem',
                  color: 'rgba(139, 0, 0, 1)',
                  margin: 'auto',
                  textIndent: '0.5rem',
                }}
              >
                {category.name}
              </Title>
            </Card.Section>
          </Card>
        </Carousel.Slide>
        {items.map((item: SanityTypes.Product) => (
          <Carousel.Slide
            key={item._id + 'item'}
            w={'100vw'}
            style={{ alignSelf: 'center' }}
          >
            <Link
              href={`/item/${item._id}`}
              id={item._id}
              key={item._id + 'link'}
              onClick={() => {
                setActiveProduct(item)
              }}
              style={{ textDecoration: 'none', backgroundColor: 'transparent' }}
            >
              <Card
                shadow="sm"
                withBorder
                radius={'sm'}
                p={0}
                style={{
                  maxWidth: '280px',
                  minWidth: '240px',
                  maxHeight: '365px',
                }}
                className={styles.clickable}
              >
                <Card.Section>
                  <BackgroundImage
                    src={urlFor(item.image ? item.image : '').url()}
                    h={175}
                    p={0}
                    m={0}
                  >
                    <Badge
                      bg={'rgba(139,0,0,1)'}
                      c={'white'}
                      p={'xs'}
                      m={'xl'}
                      className={styles.activeText}
                    >
                      {wholesaler ? (
                        <Text fz="xs">{item.wholesalePrice}</Text>
                      ) : (
                        <Text fz="md">
                          {intToCash((item.retailPrice as number) * 100)}
                        </Text>
                      )}
                    </Badge>
                  </BackgroundImage>
                </Card.Section>
                <Card.Section>
                  <Group position="left" p={'sm'} m={'sm'}>
                    <Title fz={'md'} weight={400}>
                      {item.name as string}
                    </Title>
                    <Text fz="xs">{item.description}</Text>
                  </Group>
                </Card.Section>
              </Card>
            </Link>
          </Carousel.Slide>
        ))}
      </Carousel>
    )
  }

  if (categories.length === 0) {
    return null
  }
  return (
    <>
      <Space h="lg" />
      {categories.map((category: SanityTypes.Category, index: number) => (
        <Container
          size="xl"
          key={category._id + 'category'}
          p={0}
          m={0}
          opacity={0.8}
          miw={'100vw'}
          bg={index % 2 === 0 ? 'rgba(139,0,0,0.8)' : 'var(--creamGrey)'}
        >
          {SanityItemsInCategories(category)}
        </Container>
      ))}
      <Space h="lg" />
    </>
  )
}

export default Candy
