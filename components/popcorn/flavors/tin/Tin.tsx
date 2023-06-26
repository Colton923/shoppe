import Link from 'next/link'
import * as SanityTypes from 'types/SanityItem'
import { Text, Container, Center, Group, Badge } from '@mantine/core'
interface TinProps {
  sizes: SanityTypes.Size[]
  localActiveFlavors: SanityTypes.Flavor[]
}

const Tin = (props: TinProps) => {
  const { sizes, localActiveFlavors } = { ...props }
  return (
    <Container
      m={0}
      p={0}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '0.2rem',
        flexWrap: 'wrap',
        width: '100%',
        position: 'sticky',
        top: '80vh',
        zIndex: 100,
        alignSelf: 'center',
      }}
    >
      <Container w={'33%'} p={'sm'}>
        <Group align="right">
          <Text>Selected Flavors: </Text>
          {localActiveFlavors.length > 0 &&
            localActiveFlavors.map((flavor) => (
              <Badge c="grape" variant="light" key={'selectedFlavor' + flavor._id}>
                {flavor.name}
              </Badge>
            ))}
        </Group>
      </Container>
      <Container
        w={'33%'}
        p={0}
        style={{
          border: '1px solid black',
          borderRadius: '1rem',
          backgroundColor: 'rgba(139,0,0,1)',
          color: 'rgba(255,255,255,1)',
          boxShadow: '0 0 1rem 0.5rem rgba(0,0,0,0.1)',
        }}
      >
        <Group align="center">
          {localActiveFlavors.length > 0 && (
            <Link
              href={{
                pathname: '/item/popcorn',
              }}
              style={{
                width: '100%',
                textDecoration: 'none',
                color: 'black',
                cursor: 'pointer',
              }}
            >
              <Center>
                <Text p={'xs'} fw={'bolder'} fz={'xs'} c={'black'} ta={'center'}>
                  Checkout
                </Text>
              </Center>
            </Link>
          )}
        </Group>
      </Container>
      <Container w={'33%'} p={'sm'}>
        <Group align="left">
          {sizes.length > 0 && (
            <Container>
              <Text>Available Sizes:</Text>
              {sizes.map((size) => (
                <Badge key={'available-size' + size._id} c={'indigo'}>
                  {size.name}
                </Badge>
              ))}
            </Container>
          )}
        </Group>
      </Container>
    </Container>
  )
}

export default Tin
