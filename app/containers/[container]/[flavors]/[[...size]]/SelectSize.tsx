'use client'

import { useLocalContext } from '@components/context/LocalContext'
import styles from './Sizes.module.scss'
import * as SanityTypes from 'types/SanityItem'
import { Select, Title, Container } from '@mantine/core'
type Props = {
  sizeIds: string[]
}

const SelectSize = (props: Props) => {
  const { sizeIds } = { ...props }
  const { data, setActivePopcorn, activePopcorn } = useLocalContext()
  const sizes = data.sizes.filter((size: SanityTypes.Size) => {
    if (sizeIds.includes(size._id)) {
      return true
    }
    return false
  })

  const sizeData = sizes.map((size: SanityTypes.Size) => size.name) as string[]

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
        boxShadow: '3px 3px 1px 0px rgba(139,0,0,0.75)',
        backgroundColor: 'rgba(255,255,255,1',
      }}
      w={'50%'}
      m={'lg'}
      p={'lg'}
    >
      <Title> Please Select a Size</Title>
      <Select
        data={sizeData}
        placeholder="Select a Size"
        onChange={(e: string) => {
          const size = sizes.find((size: any) => size.name === e)
          if (!size) return
          setActivePopcorn({
            ...activePopcorn,
            size: size,
          })
        }}
        defaultValue={sizeData[0]}
      ></Select>
    </Container>
  )
}

export default SelectSize
