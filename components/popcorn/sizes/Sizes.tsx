import styles from './Sizes.module.scss'
import type { SizeNames } from 'types/PopcornSizes'
import { useLocalContext } from '../context/LocalContext'

const Sizes = () => {
  const { setActiveSizes, sizes } = useLocalContext()
  const bagSizes: SizeNames[] = sizes.filter((size) => size.includes('Clear Bag'))
  const boxSizes: SizeNames[] = sizes.filter((size) => size.includes('Box'))
  const tinSizes: SizeNames[] = sizes.filter((size) => size.includes('Gal'))

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
      <div
        className={styles.category}
        style={{ backgroundColor: 'var(--candyPink)' }}
      >
        <h2 className={styles.header}>
          SHOP<span style={{ fontSize: '3rem' }}>BOXES</span>
        </h2>
        <input
          type="button"
          className={styles.button}
          onClick={() => {
            setActiveSizes(boxSizes)
          }}
        />
        <Arrow />
      </div>
      <div
        className={styles.category}
        style={{ backgroundColor: 'var(--candyGreen)' }}
      >
        <h2 className={styles.header}>
          SHOP <span style={{ fontSize: '3rem' }}>BAGS</span>
        </h2>
        <input
          type="button"
          className={styles.button}
          onClick={() => {
            setActiveSizes(bagSizes)
          }}
        />
        <Arrow />
      </div>
      <div
        className={styles.category}
        style={{ backgroundColor: 'var(--candyPurple)' }}
      >
        <h2 className={styles.header}>
          SHOP <span style={{ fontSize: '3rem' }}>TINS</span>
        </h2>
        <input
          type="button"
          className={styles.button}
          onClick={() => {
            setActiveSizes(tinSizes)
          }}
        />
        <Arrow />
      </div>
    </div>
  )
}

export default Sizes
