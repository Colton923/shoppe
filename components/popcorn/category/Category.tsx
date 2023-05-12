import styles from './Category.module.scss'
import type { SizeNames } from 'types/PopcornSizes'
import { useLocalContext } from '@components/context/LocalContext'
import ActiveProduct from '../activeProduct/ActiveProduct'

const Category = () => {
  const { localSizes, setSelectedSize, selectedSize, localPrice, activeFlavors } =
    useLocalContext()
  if (!selectedSize) setSelectedSize(localSizes[0])

  return (
    <div className={styles.category} id="selectSize">
      <h2>Please Select a Size</h2>
      <select
        name="category"
        id="category"
        className={styles.select}
        onChange={(e) => {
          setSelectedSize(e.target.value as SizeNames)
        }}
        value={selectedSize}
        defaultValue={selectedSize}
      >
        {localSizes.map((size: SizeNames) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <ActiveProduct
        activeSize={selectedSize ? selectedSize : localSizes[0]}
        activePrice={localPrice}
        activeFlavors={activeFlavors}
        key={selectedSize}
      />
    </div>
  )
}

export default Category
