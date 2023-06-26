'use client'

import * as SanityTypes from 'types/SanityItem'
import urlFor from '@lib/sanity/urlFor'
import Tin from '@components/popcorn/flavors/tin/Tin'
import { useLocalContext } from '@components/context/LocalContext'
import { useEffect, useState } from 'react'
import {
  BackgroundImage,
  Badge,
  Card,
  Title,
  Text,
  Container,
  Group,
  Center,
  Space,
} from '@mantine/core'
import mascot from 'public/icons/favicon.ico'
import intToCash from '@utils/intToCash'
interface FlavorsProps {
  container: SanityTypes.Container[]
}

export default function Flavors(props: FlavorsProps) {
  const { container } = { ...props }
  const {
    setActiveFlavor,
    router,
    setActivePopcorn,
    data,
    activePopcorn,
    setPopcornStoreActive,
    wholesaler,
  } = useLocalContext()
  const [localActiveFlavors, setLocalActiveFlavors] = useState<SanityTypes.Flavor[]>(
    []
  )
  const [localSizes, setLocalSizes] = useState<SanityTypes.Size[]>([])
  const categories = data.categories
  const flavors = data.flavors
  const HandleFlavorSelected = (flavor: SanityTypes.Flavor) => {
    if (!flavor.name) return

    if (localActiveFlavors.includes(flavor)) {
      const newFlavors = localActiveFlavors.filter(
        (flavor: SanityTypes.Flavor) => flavor.name !== flavor.name
      )
      setLocalActiveFlavors(newFlavors)
      return
    }
    setLocalActiveFlavors([...localActiveFlavors, flavor])

    setActiveFlavor(flavor)
  }

  useEffect(() => {
    if (localActiveFlavors.length === 0) return
    const sizes = data.sizes
    const sizesWithFlavors = sizes.filter((size: SanityTypes.Size) => {
      if (!size.maxFlavors) return false
      if (
        size.maxFlavors >= localActiveFlavors.length &&
        size.container?.name === container[0].name
      ) {
        return true
      }
      return false
    })
    setActivePopcorn({
      ...activePopcorn,
      flavor: localActiveFlavors,
      size: sizesWithFlavors[0],
      container: container[0],
    })
    setLocalSizes(sizesWithFlavors)
    setPopcornStoreActive(true)
    if (!activePopcorn.container?.name) return
    if (activePopcorn.container.name !== 'Tin') {
      router.push('/item/' + 'popcorn', { shallow: true })
    }
  }, [localActiveFlavors])

  if (!container) return
  if (!container[0]) return
  if (!container[0].name) return

  const isTin = container[0].name === 'Tin'

  const Flavor = (flavor: SanityTypes.Flavor, category: SanityTypes.Category) => {
    let value = 0
    if (wholesaler) {
      if (category.markupWholesale === undefined) return

      value = category.markupWholesale.reduce((a: any, b: any) => {
        if (a.value > b.value) {
          return a
        }
        return b
      }).value as number
    } else {
      if (category.markupRetail === undefined) return
      value = category.markupRetail.reduce((a: any, b: any) => {
        if (a.value <= b.value) {
          return a
        }
        return b
      }).value as number
    }
    value = value * 100

    const imgString = flavor.image
      ? (urlFor(flavor.image).url() as string)
      : (mascot.src as string)
    return (
      <Card
        key={flavor._id + 'flavor'}
        withBorder
        padding={'sm'}
        radius={'sm'}
        p={'sm'}
        m={'lg'}
        {...(localActiveFlavors.filter((f) => f.name === flavor.name).length > 0
          ? { shadow: 'xl' }
          : {})}
        style={{
          width: '200px',
          height: '280px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'column',
        }}
        bg={'rgba(255,255,255,0.8)'}
        onClick={() => HandleFlavorSelected(flavor)}
      >
        <Card.Section p={0} m={0} h={200} w={200}>
          <BackgroundImage src={imgString} h={200} w={200}>
            <Badge color="dark" variant="light" size="xl" p={'xs'} m={'xs'}>
              +{intToCash(value)}
            </Badge>
          </BackgroundImage>
        </Card.Section>
        <Card.Section>
          <Title
            m={0}
            p={'3px'}
            style={{
              fontWeight: 900,
              fontSize: '1rem',
              color: 'rgba(139, 0, 0, 1)',
            }}
          >
            {flavor.name}
          </Title>
        </Card.Section>
      </Card>
    )
  }
  return (
    <Container
      size="xl"
      p={0}
      m={0}
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'space-between',
        justifyContent: 'space-between',
      }}
    >
      <Title
        m={'sm'}
        style={{
          fontWeight: 900,
          fontSize: '3rem',
          color: 'rgba(139, 0, 0, 1)',
        }}
      >
        Flavors
      </Title>
      <Center>
        <Text fz={'xs'} w={'40%'}>
          {isTin
            ? 'Select up to four flavors. 3 Gallon Tins can hold up to 4 flavors, 2 Gallon Tins can hold up to 3 flavors, 1 Gallon Tins can hold up to 2 flavors.'
            : 'Select any of the flavors below'}
        </Text>
      </Center>
      <Space h="md" />
      <Group>
        {isTin && (
          <>
            {localActiveFlavors.length > 0 && (
              <Tin
                sizes={localSizes}
                localActiveFlavors={localActiveFlavors}
                containerId={container[0]._id}
              />
            )}
          </>
        )}
      </Group>
      <Space h="md" />
      {categories.map((category) => {
        if (!category) return null

        return (
          <Container key={category._id + 'category'}>
            <Text
              fz={'xl'}
              fw={'bolder'}
              c={'red'}
              w={'50%'}
              style={{
                textIndent: '1rem',
              }}
            >
              {category.name}
            </Text>
            <Container
              size="xl"
              m={'sm'}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}
            >
              {flavors.map((flavor) => {
                if (
                  !flavor ||
                  !flavor.category ||
                  flavor.category._ref !== category._id
                )
                  return null
                return Flavor(flavor, category)
              })}
            </Container>
          </Container>
        )
      })}
    </Container>
  )
}
