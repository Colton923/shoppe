'use client'

import { useLocalContext } from '@components/context/LocalContext'
import styles from './Item.module.scss'
import * as SanityTypes from 'types/SanityItem'
import { usePathname } from 'next/navigation'
import PopcornNamer from '@utils/PopcornNamer'
import { useEffect, useState } from 'react'
import urlFor from '@lib/sanity/urlFor'
import SelectSize from '@components/selectSize/SelectSize'
import {
  Text,
  Image,
  Chip,
  Title,
  Space,
  Card,
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

  useEffect(() => {
    if (!pathname) return
    if (popcornStoreActive) {
      if (
        !activePopcorn?.flavor ||
        !activePopcorn.flavor[0] ||
        !activePopcorn.flavor[0].image
      )
        return
      HandleSetQuantity(1)
      setImagesrc(urlFor(activePopcorn.flavor[0].image).url())
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
  }, [pathname])

  if (!pathname) return null
  if (!item && !activePopcorn) return null
  if (!sizeData) return null
  if (!activePrice) return null
  if (popcornStoreActive) {
    return (
      <Flex justify={'flex-start'} direction={'column'} align={'flex-start'}>
        <Card
          shadow="md"
          padding="xl"
          radius="lg"
          style={{
            justifyContent: 'flex-end',
            alignItems: 'space-between',
            display: 'flex',
            flexDirection: 'column',
            margin: '0 auto',
            maxWidth: '90%',
          }}
        >
          <Group align={'center'}>
            <Space h="lg" />
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
            <Space h="lg" />
            <Space h="lg" />
          </Group>
          <Flex direction="row" justify="flex-end" align={'space-between'}>
            <Image
              className={styles.image}
              src={imagesrc}
              width={300}
              height={300}
              style={{ objectFit: 'contain' }}
              m={0}
            />
            <Group w={'50%'} spacing="xl">
              <Title order={2} className={styles.title}>
                {PopcornNamer(activePopcorn)}
              </Title>
              <Text p={'md'} m={'sm'} classNames={styles.description}>
                {activePopcorn.flavor.length > 1
                  ? 'Selected Flavors: '
                  : 'Selected Flavor: '}
              </Text>
              <SelectSize sizenames={sizeData} />
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
              {activePopcorn.flavor.map((flavor) => {
                return (
                  <Text
                    p={'md'}
                    m={'sm'}
                    key={flavor._id + 'flavorName'}
                    classNames={styles.description}
                  >
                    {flavor.name}
                  </Text>
                )
              })}
              <Text
                p={'md'}
                size="xl"
                weight={700}
                className={styles.price}
                mt={'xl'}
                mr={'xl'}
                ta={'right'}
                w={'100%'}
              >
                {intToCash(activePrice * activeQuantity)}
              </Text>
              <Space h="lg" />
            </Group>
          </Flex>
          <Space h="lg" />
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
              HandleAddToCart()
            }}
          >
            Add to Cart
          </Button>
          <Space h="lg" />
        </Card>
      </Flex>
    )
  } else {
    if (!item) return null
    return (
      <Flex justify={'flex-start'} direction={'column'} align={'flex-start'}>
        <Card
          shadow="md"
          padding="xl"
          radius="lg"
          style={{
            justifyContent: 'flex-end',
            alignItems: 'space-between',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '90%',
          }}
        >
          <Group align={'center'}>
            <Space h="lg" />
            <Button
              onClick={() => {
                router.back()
              }}
              variant={'light'}
              color={'dark'}
              radius={'xl'}
              size={'lg'}
              p={'sm'}
              className={styles.addToCartButton}
            >
              Back
            </Button>
            <Space h="lg" />
            <Space h="lg" />
          </Group>
          <Flex direction="row" justify="flex-end" align={'space-between'}>
            <Image
              className={styles.image}
              src={imagesrc}
              width={300}
              height={300}
              style={{ objectFit: 'contain' }}
            />
            <Title order={2} className={styles.title}>
              {item.name}
            </Title>
            <Group w={'50%'}>
              <Text p={'md'} classNames={styles.description}>
                {item.description}
              </Text>
              <Text
                p={'md'}
                size="sm"
                weight={700}
                className={styles.price}
                ta={'right'}
                w={'100%'}
              >
                {wholesaler
                  ? intToCash((item.wholesalePrice as number) * 100)
                  : intToCash((item.retailPrice as number) * 100)}
              </Text>
              <Space h="lg" />
            </Group>
          </Flex>
          <Space h="lg" />
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
              HandleProductSelect(item)
              router.back()
            }}
          >
            Add to Cart
          </Button>
          <Space h="lg" />
        </Card>
      </Flex>
    )
  }
}
