import Flavors from './flavors/Flavors'
import styles from './Popcorn.module.scss'
import Sizes from './sizes/Sizes'
import { useLocalContext } from './context/LocalContext'
import Static from './static/Static'

const PopcornComponent = () => {
  const {
    setActiveSizes,
    products,
    flavors,
    sizes,
    activeSizes,
    activeFlavors,
    setActiveFlavors,
  } = useLocalContext()
  Static()

  if (!products || flavors.length === 0 || sizes.length === 0) return null

  return (
    <div className={styles.wrapper}>
      {activeSizes.length === 0 ? (
        <Sizes />
      ) : activeFlavors.length === 0 ? (
        <>
          <div className={styles.back} onClick={() => setActiveSizes([])}>
            <span>Back</span>
          </div>
          <Flavors />
        </>
      ) : (
        <div className={styles.back} onClick={() => setActiveFlavors([])}>
          <span>Back</span>

          <div className={styles.cart}>
            <span>Cart</span>

            <div className={styles.cartItems}>
              <span>Items</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PopcornComponent
