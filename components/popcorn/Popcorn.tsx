import Flavors from './flavors/Flavors'
import styles from './Popcorn.module.scss'
import Sizes from './sizes/Sizes'
import { useLocalContext } from './context/LocalContext'
import Static from './static/Static'

const PopcornComponent = () => {
  const { setActiveSizes, products, flavors, sizes, activeSizes } = useLocalContext()
  Static()

  if (!products || flavors.length === 0 || sizes.length === 0) return null

  return (
    <div className={styles.wrapper}>
      {activeSizes.length === 0 ? (
        <Sizes />
      ) : (
        <>
          <h1 className={styles.componentTitle}>Popcorn</h1>
          <div className={styles.back} onClick={() => setActiveSizes([])}>
            <span>Back</span>
          </div>
          <Flavors />
        </>
      )}
    </div>
  )
}

export default PopcornComponent
