'use client'

import * as SanityTypes from 'types/SanityItem'
import { useLocalContext } from '@components/context/LocalContext'
import styles from './Sizes.module.scss'
interface SelectSizeProps {
  sizes: SanityTypes.Size[]
}

const SelectSize = (props: SelectSizeProps) => {
  const { sizes } = { ...props }
  const { setActivePopcorn, activePopcorn } = useLocalContext()

  return (
    <div className={styles.category} id="selectSizes">
      <h2>Please Select a Size</h2>
      <select
        name="category"
        id="category"
        className={styles.select}
        onChange={(e) => {
          console.log(e.target.value)
          const size = sizes.find((size: any) => size.name === e.target.value)
          if (!size) return
          setActivePopcorn({
            ...activePopcorn,
            size: size,
          })
        }}
      >
        {sizes.map((size: SanityTypes.Size) => (
          <option key={size._id} value={size.name}>
            {size.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectSize
