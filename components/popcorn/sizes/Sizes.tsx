import styles from './Sizes.module.scss'
import type { SizeNames } from 'types/PopcornSizes'
import { allRootColors } from '@utils/allRootColors'

interface SizesProps {
  sizes: SizeNames[]
  setActiveSizes: React.Dispatch<React.SetStateAction<SizeNames[]>>
}

const Sizes = (props: SizesProps) => {
  const { sizes, setActiveSizes } = props

  const bagSizes: SizeNames[] = sizes.filter((size) => size.includes('Clear Bag'))
  const boxSizes: SizeNames[] = sizes.filter((size) => size.includes('Box'))
  const tinSizes: SizeNames[] = sizes.filter((size) => size.includes('Gal'))

  const handleSizeClick = (sizes: SizeNames[]) => {
    setActiveSizes(sizes)
  }

  const Arrow = () => (
    <svg
      data-bbox="9 70.9 181 59"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
    >
      <g>
        <path d="M159 70.9l-2.2 2.4L183.6 99H9v3h174.6l-26.2 25.3 2.1 2.6 30.5-29.3-31-29.7z"></path>
      </g>
    </svg>
  )

  return (
    <div className={styles.itemsWrapper}>
      <div className={styles.category}>
        <h2 className={styles.header}>
          SHOP<span style={{ fontSize: '3rem' }}>BOXES</span>
        </h2>
        <input
          type="button"
          className={styles.button}
          onClick={() => {
            handleSizeClick(boxSizes)
          }}
        />
        <Arrow />
      </div>
      <div className={styles.category}>
        <h2 className={styles.header}>
          SHOP <span style={{ fontSize: '3rem' }}>BAGS</span>
        </h2>
        <input
          type="button"
          className={styles.button}
          onClick={() => {
            handleSizeClick(bagSizes)
          }}
        />
        <Arrow />
      </div>
      <div className={styles.category}>
        <h2 className={styles.header}>
          SHOP <span style={{ fontSize: '3rem' }}>TINS</span>
        </h2>
        <input
          type="button"
          className={styles.button}
          onClick={() => {
            handleSizeClick(tinSizes)
          }}
        />
        <Arrow />
      </div>
    </div>
  )
}

export default Sizes
