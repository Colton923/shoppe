import Flavors from './flavors/Flavors'
import styles from './Popcorn.module.scss'
import Sizes from './sizes/Sizes'
import { useLocalContext } from '@components/context/LocalContext'
import Static from './static/Static'
import Cart from './cart/Cart'
import Category from './category/Category'
import Footer from '@components/footer/Footer'
import Login from '@components/login/Login'
import Register from '@components/register/Register'
import { useFirebaseContext } from '@components/context/FirebaseContext'

const PopcornComponent = () => {
  const {
    setActiveSizes,
    products,
    flavors,
    sizes,
    activeFlavors,
    setActiveFlavors,
    activeSizes,
    setSelectedSize,
    selectedSize,
    checkingOut,
    setCheckingOut,
    setLocalSizes,
    isRegisterOverlay,
    isLoginOverlay,
  } = useLocalContext()
  const { loggedIn } = useFirebaseContext()

  Static()

  if (!products || flavors.length === 0 || sizes.length === 0) return null
  return (
    <div className={styles.wrapper} id="wrapper">
      {!loggedIn && isRegisterOverlay && <Register />}
      {!loggedIn && isLoginOverlay && <Login />}
      {checkingOut ? (
        <>
          <div
            className={styles.back}
            onClick={() => {
              setCheckingOut(false)
              setSelectedSize('Small Box')
              setSelectedSize(selectedSize)
              setLocalSizes(activeSizes)
            }}
          >
            <span>Back</span>
          </div>
          <Cart />
        </>
      ) : activeSizes.length === 0 ? (
        <Sizes />
      ) : activeFlavors.length === 0 ? (
        <>
          <div className={styles.back} onClick={() => setActiveSizes([])}>
            <span>Back</span>
          </div>
          <Flavors />
        </>
      ) : activeSizes.length > 0 && activeFlavors.length > 0 ? (
        <>
          <div
            className={styles.back}
            onClick={() => {
              setSelectedSize(selectedSize)
              setActiveFlavors([])
              setLocalSizes(activeSizes)
            }}
          >
            <span>Back</span>
          </div>
          <Category />
        </>
      ) : null}
      <Footer />
    </div>
  )
}

export default PopcornComponent
