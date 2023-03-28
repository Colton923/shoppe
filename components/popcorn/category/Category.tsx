import styles from './Category.module.scss'
import type { SizeNames } from 'types/PopcornSizes'
import { useLocalContext } from '@components/context/LocalContext'

/*
 * This component knows the container (tin, box, bag) and the flavor ()
 */

const Category = () => {
  const { activeSizes, setSelectedSize } = useLocalContext()

  return (
    <div className={styles.category}>
      <h2>Please Select a Size</h2>
      <select
        name="category"
        id="category"
        className={styles.select}
        onChange={(e) => {
          setSelectedSize(e.target.value as SizeNames)
        }}
      >
        <option value="">Select a Size</option>
        {activeSizes.map((size: SizeNames) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Category
