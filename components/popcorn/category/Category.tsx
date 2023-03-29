'use client'

import styles from './Category.module.scss'
import type { SizeNames } from 'types/PopcornSizes'
import { useLocalContext } from '@components/context/LocalContext'
import ActiveProduct from '../activeProduct/ActiveProduct'
import { useEffect } from 'react'

const Category = () => {
  const { activeSizes, setSelectedSize, selectedSize } = useLocalContext()

  useEffect(() => {
    if (!selectedSize) return
    if (activeSizes.includes(selectedSize)) return
    setSelectedSize(activeSizes[0])
  }, [])

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
        value={selectedSize}
      >
        {activeSizes.map((size: SizeNames) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <ActiveProduct />
    </div>
  )
}

export default Category
