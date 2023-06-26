'use client'

import { useLocalContext } from '@components/context/LocalContext'
import styles from './Item.module.scss'
import client from '@lib/sanity/client'
import queries from '@lib/sanity/queries'
import * as SanityTypes from 'types/SanityItem'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import urlFor from '@lib/sanity/urlFor'
import { Text, Image, Title, Space, Card, Flex, Group, Button } from '@mantine/core'
import intToCash from '@utils/intToCash'
export default function Page() {
  const { router, wholesaler, HandleProductSelect } = useLocalContext()
  const [item, setItem] = useState<SanityTypes.Product | null>(null)
  const [imagesrc, setImagesrc] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return
    const id = pathname.split('/').pop()
    const getItem = async (id: string) => {
      return await client.fetch(queries.product(id))
    }

    if (!id) return
    getItem(id).then((item: SanityTypes.Product[]) => {
      setItem(item[0])
      if (!item[0].image) return
      setImagesrc(urlFor(item[0].image).url())
    })
  }, [pathname])

  if (!pathname) return null
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
            alt={item.name}
            width={300}
            height={300}
            style={{ objectFit: 'contain' }}
            m={'xl'}
          />
          <Group w={'50%'} spacing="xl">
            <Title order={2} className={styles.title}>
              {item.name}
            </Title>
            <Text p={'md'} m={'sm'} classNames={styles.description}>
              {item.description}
            </Text>
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
