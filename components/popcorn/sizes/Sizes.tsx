import styles from './Sizes.module.css'
import type { SizeNames } from 'types/PopcornSizes'
import { allRootColors } from '@utils/allRootColors'

interface SizesProps {
  sizes: SizeNames[]
  activeSizes: SizeNames[]
  setActiveSizes: React.Dispatch<React.SetStateAction<SizeNames[]>>
}

const Sizes = (props: SizesProps) => {
  const { sizes, activeSizes, setActiveSizes } = props
  const bagSizes: SizeNames[] = sizes.filter((size) => size.includes('Clear Bag'))
  const boxSizes: SizeNames[] = sizes.filter((size) => size.includes('Box'))
  const tinSizes: SizeNames[] = sizes.filter((size) => size.includes('Gal'))

  const SizeInput = (size: SizeNames) => {
    return (
      <div className={activeSizes.includes(size) ? styles.active : styles.inactive}>
        <h1 className={styles.description}>{size} </h1>
        <div className={styles.image}>Image Placeholder</div>
        <input
          type="button"
          onClick={() => {
            if (activeSizes.includes(size)) {
              const newActiveSizes = activeSizes.filter(
                (activeSize) => activeSize !== size
              )
              setActiveSizes(newActiveSizes)
              return
            } else {
              setActiveSizes([size])
            }
          }}
          className={styles.input}
          style={
            activeSizes.includes(size)
              ? {
                  backgroundImage: `linear-gradient(45deg,${
                    allRootColors[
                      Math.floor(Math.random() * allRootColors.length - 1)
                    ]
                  },${
                    allRootColors[
                      Math.floor(Math.random() * allRootColors.length - 1)
                    ]
                  } 100%)`,
                  borderRadius: '30px',
                }
              : {}
          }
        />
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.category}>
        <h2 className={styles.header} style={{ color: 'var(--canePink)' }}>
          Boxes
        </h2>
        {boxSizes.map((size: string) => {
          return (
            <div key={size} className={styles.sizeWrapper}>
              {SizeInput(size as SizeNames)}
            </div>
          )
        })}
      </div>
      <div className={styles.category}>
        <h2 className={styles.header} style={{ color: 'var(--canePink)' }}>
          Bags
        </h2>
        {bagSizes.map((size: string) => {
          return (
            <div key={size} className={styles.sizeWrapper}>
              {SizeInput(size as SizeNames)}
            </div>
          )
        })}
      </div>
      <div className={styles.category}>
        <h2 className={styles.header} style={{ color: 'var(--canePink)' }}>
          Tins
        </h2>
        {tinSizes.map((size: string) => {
          return (
            <div key={size} className={styles.sizeWrapper}>
              {SizeInput(size as SizeNames)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Sizes
