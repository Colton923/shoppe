'use client'

import { useLocalContext } from '@components/context/LocalContext'
import { Select, Text, Container } from '@mantine/core'
type Props = {
  sizenames: string[]
}

const SelectSize = (props: Props) => {
  const { sizenames } = { ...props }
  const { data, setActivePopcorn, activePopcorn } = useLocalContext()

  if (!sizenames) return null
  return (
    <Container
      style={{
        display: 'flex',
        borderRadius: '0.2rem',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
        backgroundColor: 'transparent',
      }}
      w={'100%'}
      m={0}
      p={'xs'}
    >
      <Text fw={'bold'}> Please Select a Size</Text>
      <Select
        data={sizenames}
        onChange={(e: string) => {
          const size = data.sizes.find((size: any) => size.name === e)
          if (!size) return
          setActivePopcorn({
            ...activePopcorn,
            size: size,
          })
        }}
        required={true}
        placeholder={sizenames[0]}
        defaultValue={sizenames.length ? sizenames[0] : 'Select a Size'}
      ></Select>
    </Container>
  )
}

export default SelectSize
