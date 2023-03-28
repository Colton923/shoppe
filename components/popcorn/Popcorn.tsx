import Flavors from './flavors/Flavors'
import styles from './Popcorn.module.scss'
import Sizes from './sizes/Sizes'
import { useLocalContext } from '@components/context/LocalContext'
import Static from './static/Static'
import Cart from './cart/Cart'
import Category from './category/Category'

const PopcornComponent = () => {
  const {
    setActiveSizes,
    products,
    flavors,
    sizes,
    activeSizes,
    activeFlavors,
    setActiveFlavors,
    activeCategory,
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
      ) : activeCategory === '' ? (
        <>
          <div className={styles.back} onClick={() => setActiveFlavors([])}>
            <span>Back</span>
          </div>
          <Category />
        </>
      ) : (
        <>
          <div className={styles.back} onClick={() => setActiveFlavors([])}>
            <span>Back</span>
          </div>
          <Cart />
        </>
      )}
    </div>
  )
}

export default PopcornComponent
