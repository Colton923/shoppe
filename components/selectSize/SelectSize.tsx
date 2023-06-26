'use client'

import { useLocalContext } from '@components/context/LocalContext'
import { Select, Text, Container } from '@mantine/core'
type Props = {
  sizenames: string[]
}

const SelectSize = (props: Props) => {
  const { sizenames } = { ...props }
  const { data, setActivePopcorn, activePopcorn } = useLocalContext()

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
        backgroundColor: 'transparent',
      }}
      w={'100%'}
      m={'lg'}
      p={'lg'}
    >
      <Text fw={'bold'}> Please Select a Size</Text>
      <Select
        data={sizenames}
        placeholder="Select a Size"
        onChange={(e: string) => {
          const size = data.sizes.find((size: any) => size.name === e)
          if (!size) return
          setActivePopcorn({
            ...activePopcorn,
            size: size,
          })
        }}
        defaultValue={sizenames[0]}
      ></Select>
    </Container>
  )
}

export default SelectSize
