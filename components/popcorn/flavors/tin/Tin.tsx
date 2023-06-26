import Link from 'next/link'
import * as SanityTypes from 'types/SanityItem'
import { Text, Container, Center, Badge } from '@mantine/core'
interface TinProps {
  sizes: SanityTypes.Size[]
  localActiveFlavors: SanityTypes.Flavor[]
  containerId: string
}

const Tin = (props: TinProps) => {
  const { sizes, localActiveFlavors, containerId } = { ...props }
  return (
    <Container
      size="md"
      m={0}
      p={0}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '0.2rem',
        flexWrap: 'wrap',
        width: '100vw',
      }}
    >
      <Container w={'33%'} p={'sm'}>
        <Text>Selected Flavors</Text>
        {localActiveFlavors.length > 0 &&
          localActiveFlavors.map((flavor) => (
            <Badge c="grape" variant="light" key={'selectedFlavor' + flavor._id}>
              {flavor.name}
            </Badge>
          ))}
      </Container>
      <Container
        w={'33%'}
        p={0}
        style={{
          border: '1px solid black',
          borderRadius: '1rem',
          backgroundColor: 'white',
          boxShadow: '0 0 1rem 0.5rem rgba(0,0,0,0.1)',
          position: 'fixed',
          top: '50%',
          right: '3px',
          height: '70px',
          width: '130px',
        }}
      >
        {localActiveFlavors.length > 0 && (
          <Link
            href={{
              pathname: '/item/popcorn',
            }}
            style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}
          >
            <Center>
              <Text p={'sm'} fw={'bolder'} fz={'md'} c={'red'} ta={'center'}>
                Continue to Checkout
              </Text>
            </Center>
          </Link>
        )}
      </Container>
      <Container w={'33%'} p={'sm'}>
        {sizes.length > 0 && (
          <Container>
            <Text>Available Sizes</Text>
            {sizes.map((size) => (
              <Badge key={'available-size' + size._id} c={'indigo'}>
                {size.name}
              </Badge>
            ))}
          </Container>
        )}
      </Container>
    </Container>
  )
}

export default Tin
