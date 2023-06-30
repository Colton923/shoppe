'use client'

import { useLocalContext } from '@components/context/LocalContext'
import styles from 'app/@modal/Modal.module.scss'
import * as SanityTypes from 'types/SanityItem'
import PopcornNamer from '@utils/PopcornNamer'
import { Suspense, lazy } from 'react'
import urlFor from '@lib/sanity/urlFor'
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

export default function Page({ params }: { params: { id: string } }) {
  const {
    popcornStoreActive,
    activePopcorn,
    activeQuantity,
    HandleAddToCart,
    HandleSetQuantity, // Haven't adjusted this.
    activePrice,
    data,
    router,
    HandleProductSelect,
    wholesaler,
    onDismiss,
  } = useLocalContext()

  if (!data) return <></>
  const SelectSize = lazy(() => import('@components/selectSize/SelectSize'))

  const sizeData = () => {
    return data.sizes.reduce((acc: string[], size: SanityTypes.Size) => {
      if (!size.maxFlavors) return acc
      if (size.maxFlavors >= activePopcorn.flavor.length) {
        if (!size.name) return acc
        if (!size.container) return acc
        if (!size.container._id) return acc
        if (!activePopcorn.container) return acc
        if (!(activePopcorn.container._id === size.container._id)) return acc
        acc.push(size.name)
      }

      return acc //return acc.sort in prod
    }, [])
  }

  const Item = () => {
    return data.products[data.products.findIndex((item) => item._id === params.id)]
  }

  if (popcornStoreActive) {
    if (!activePrice) return
    return (
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
              activePopcorn.flavor.pop()
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
        <Group align="center" style={{ display: 'flex', justifyContent: 'center' }}>
          {activePopcorn.flavor[0].image ? (
            <Image
              className={styles.image}
              src={urlFor(
                activePopcorn.flavor[0].image ? activePopcorn.flavor[0].image : ''
              ).url()}
              width={300}
              height={300}
              style={{ objectFit: 'contain' }}
              alt="Popcorn Image"
            />
          ) : (
            <div
              style={{
                width: '300px',
                height: '300px',
                backgroundColor: 'gray',
                backdropFilter: 'blur(25px)',
                borderRadius: '0.2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                size="lg"
                weight={700}
                style={{ color: 'white', textAlign: 'center' }}
              >
                Image Not Found
              </Text>
            </div>
          )}
        </Group>
        <Title w={'150px'} ta={'center'} order={2} className={styles.title} m={'sm'}>
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
              onChange={() => {
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
              onChange={() => {
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
            <SelectSize sizenames={sizeData()} />
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
    )
  } else {
    return (
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
            src={urlFor(Item().image ? (Item().image as string) : '').url()}
            width={'300px'}
            height={'300px'}
            style={{ objectFit: 'contain' }}
            alt="Popcorn Image"
          />
          <Flex direction="column" align={'center'}>
            <Title order={2} className={styles.title} ta={'center'}>
              {Item().name}
            </Title>
            <Flex
              w={'180px'}
              m={'sm'}
              align="center"
              direction={'column'}
              justify={'center'}
            >
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
                  onChange={() => {
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
                  onChange={() => {
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
            </Flex>
          </Flex>
        </Group>
        <Text p={'md'} classNames={styles.description} ta={'left'}>
          {Item().description}
        </Text>
        <Button
          variant={'light'}
          color={'dark'}
          radius={'xl'}
          size={'lg'}
          p={'sm'}
          className={styles.addToCartButton}
          mr={'xl'}
          mt={'xl'}
          onClick={() => {
            HandleProductSelect(Item())
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
              ? intToCash((Item()?.wholesalePrice as number) * 100 * activeQuantity)
              : intToCash((Item()?.retailPrice as number) * 100 * activeQuantity)}
          </Text>
        </Button>
        <Space h="lg" />
      </Card>
    )
  }
}
