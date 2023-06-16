import styles from './Category.module.scss'
import type { SizeNames } from 'types/PopcornSizes'
import { useLocalContext } from '@components/context/LocalContext'
import ActiveProduct from '../activeProduct/ActiveProduct'

const Category = () => {
  const { localSizes, selectedSize, activeFlavors, HandleSizeSelect } =
    useLocalContext()

  return (
    <div className={styles.category} id="selectSize">
      <h2>Please Select a Size</h2>
      <select
        name="category"
        id="category"
        className={styles.select}
        onChange={(e) => {
          HandleSizeSelect(e.target.value as SizeNames)
        }}
        value={selectedSize}
      >
        {localSizes.map((size: SizeNames) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <ActiveProduct
        activeSize={selectedSize}
        activeFlavors={activeFlavors}
        key={selectedSize}
      />
    </div>
  )
}

export default Category
