import styles from './Sizes.module.scss'
import * as SanityTypes from 'types/SanityItem'

interface SizesProps {
  HandleSizeSelect: (size: SanityTypes.Size) => void
  sizes: SanityTypes.Size[]
}

export default async function Sizes(props: SizesProps) {
  const { HandleSizeSelect, sizes } = { ...props }

  return (
    <div className={styles.category} id="selectSize">
      <h2>Please Select a Size</h2>
      <select
        name="category"
        id="category"
        className={styles.select}
        onChange={(e) => {
          const size = sizes.find((size: any) => size.name === e.target.value)
          if (!size) return
          HandleSizeSelect(size)
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
