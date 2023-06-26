'use client'

import { useLocalContext } from '@components/context/LocalContext'
import styles from 'app/@modal/Modal.module.scss'
import * as SanityTypes from 'types/SanityItem'
import { usePathname } from 'next/navigation'
import PopcornNamer from '@utils/PopcornNamer'
import { useEffect, useState, Suspense, useCallback } from 'react'
import urlFor from '@lib/sanity/urlFor'
import SelectSize from '@components/selectSize/SelectSize'
import {
  Text,
  Image,
  Chip,
  Title,
  Space,
  Card,
  Badge,
  Flex,
  Group,
  Button,
} from '@mantine/core'
import intToCash from '@utils/intToCash'

export default function Page() {
  const {
    popcornStoreActive,
    activePopcorn,
    activeQuantity,
    HandleAddToCart,
    HandleSetQuantity,
    activePrice,
    data,
    router,
    wholesaler,
    HandleProductSelect,
  } = useLocalContext()
  const [item, setItem] = useState<SanityTypes.Product | null>(null)
  const [imagesrc, setImagesrc] = useState<string | null>(null)
  const [sizeData, setSizeData] = useState<string[] | null>(null)
  const pathname = usePathname()
  const onDismiss = useCallback(() => {
    router.back()
    setTimeout(() => {
      router.push('/')
    }, 100)
  }, [])

  useEffect(() => {
    if (!pathname) return
    if (popcornStoreActive) {
      if (!activePopcorn?.flavor || !activePopcorn.flavor[0]) return
      HandleSetQuantity(1)
      if (activePopcorn.flavor[0].image) {
        setImagesrc(urlFor(activePopcorn.flavor[0].image).url())
      }
      const sizes = data.sizes.filter((size: SanityTypes.Size) => {
        if (size.container?._id === activePopcorn.container?._id) {
          return true
        }

        return false
      })
      const sizeData = sizes.reduce((acc: string[], size: SanityTypes.Size) => {
        if (size.name) {
          acc.push(size.name)
        }
        return acc
      }, [])
      setSizeData(sizeData)
      return
    } else {
      const id = pathname.split('/').pop()
      data.products.forEach((product: SanityTypes.Product) => {
        if (product._id === id) {
          setItem(product)
          if (!product.image) return
          setImagesrc(urlFor(product.image).url())
        }
      })
    }
  }, [])

  if (popcornStoreActive) {
    if (!activePrice) return
    return (
      <div className={styles.popcornModal}>
        <Card
          shadow="md"
          padding="sm"
          radius="lg"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          <Group align="center" w={'100%'}>
            <Button
              onClick={() => {
                router.back()
              }}
              variant={'light'}
              color={'dark'}
              radius={'xl'}
              className={styles.addToCartButton}
            >
              Back
            </Button>
          </Group>
          <Group
            align="center"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Image
              className={styles.image}
              src={imagesrc}
              width={300}
              height={300}
              style={{ objectFit: 'contain' }}
            />
          </Group>
          <Title
            w={'150px'}
            ta={'center'}
            order={2}
            className={styles.title}
            m={'sm'}
          >
            {PopcornNamer(activePopcorn)}
          </Title>
          <Group w={'180px'}>
            <Flex direction="row" align={'center'}>
              <Text p={'xs'} ta={'center'}>
                Quantity:
              </Text>
              <Text fw={'bold'} p={'xs'} ta={'center'}>
                {activeQuantity}
              </Text>
            </Flex>
            <Flex direction="row" justify={'space-between'}>
              <Chip
                onChange={(checked: boolean) => {
                  HandleSetQuantity(activeQuantity + 1)
                }}
                checked={false}
                defaultChecked={false}
                radius="xl"
                p={'xs'}
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
                p={'xs'}
              >
                -
              </Chip>
            </Flex>
          </Group>
          <Group w={'25%'} style={{ minWidth: '250px' }}>
            <Suspense fallback={<p>Loading...</p>}>
              <SelectSize sizenames={sizeData !== null ? sizeData : ['']} />
            </Suspense>
          </Group>
          <Group m={'xs'} w={'25%'} style={{ minWidth: '250px' }} align="center">
            <Text p={'xs'} m={0} classNames={styles.description}>
              Selected Flavors:
            </Text>
            <Group align="center">
              {activePopcorn.flavor.map((flavor) => {
                return (
                  <Badge
                    key={flavor._id + 'badgeName'}
                    color="blue"
                    radius="xl"
                    size={'sm'}
                    p={'xs'}
                  >
                    {flavor.name}
                  </Badge>
                )
              })}
            </Group>
          </Group>
          <Button
            variant={'light'}
            color={'dark'}
            radius={'xl'}
            size={'lg'}
            p={'sm'}
            className={styles.addToCartButton}
            onClick={() => {
              HandleAddToCart()
              onDismiss()
            }}
          >
            <Text
              p={'xs'}
              size="xs"
              weight={700}
              className={styles.price}
              ta={'left'}
              w={'100%'}
            >
              Add to Cart
            </Text>
            <Text
              p={'xs'}
              size="xs"
              weight={700}
              className={styles.price}
              ta={'right'}
              w={'100%'}
            >
              {intToCash(activePrice * activeQuantity)}
            </Text>
          </Button>
        </Card>
      </div>
    )
  } else {
    return (
      <div className={styles.modal}>
        <Card shadow="md" padding="xs" radius="lg" className={styles.card}>
          <Group align={'center'}>
            <Button
              onClick={() => {
                router.back()
              }}
              variant={'light'}
              color={'dark'}
              radius={'xl'}
              size={'lg'}
              m={'sm'}
              p={'sm'}
              className={styles.addToCartButton}
            >
              Back
            </Button>
          </Group>
          <Group
            spacing="md"
            align="center"
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}
          >
            <Image
              className={styles.image}
              src={imagesrc}
              width={'300px'}
              height={'300px'}
              style={{ objectFit: 'contain' }}
            />
            <Title order={2} className={styles.title}>
              {item?.name !== null ? item?.name : 'Loading...'}
            </Title>
          </Group>
          <Text p={'md'} classNames={styles.description} ta={'left'}>
            {item?.description !== null ? item?.description : 'Loading...'}
          </Text>
          <Button
            variant={'light'}
            color={'dark'}
            radius={'xl'}
            size={'lg'}
            m={'sm'}
            p={'sm'}
            className={styles.addToCartButton}
            mr={'xl'}
            mt={'xl'}
            onClick={() => {
              HandleProductSelect(item as SanityTypes.Product)
              onDismiss()
            }}
          >
            Add to Cart
            <Text
              p={'md'}
              size="lg"
              weight={700}
              className={styles.price}
              ta={'right'}
            >
              {wholesaler
                ? intToCash((item?.wholesalePrice as number) * 100)
                : intToCash((item?.retailPrice as number) * 100)}
            </Text>
          </Button>
          <Space h="lg" />
        </Card>
      </div>
    )
  }
}
