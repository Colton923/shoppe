import Link from 'next/link'
import styles from './Navbar.module.scss'
import Image from 'next/image'
import CartIcon from '@public/icons/svg/cart.svg'
import personIcon from '@public/icons/svg/account.svg'
import { useLocalContext } from '@components/context/LocalContext'
import { useFirebaseContext } from '@components/context/FirebaseContext'

const Navbar = () => {
  const {
    isCartOverlay,
    setIsCartOverlay,
    isRegisterOverlay,
    setIsRegisterOverlay,
  } = useLocalContext()
  const { loggedIn } = useFirebaseContext()

  return (
    <>
      <div className={styles.stickyNav}>
        <div className={styles.fancyText}>
          <Link
            className={styles.textLink}
            href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}}`}
          ></Link>
          <Link
            className={styles.textLink}
            href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}
          ></Link>
        </div>
        <div className={styles.bottomRow}>
          <div className={styles.hamburger}>
            <Image
              src={personIcon}
              alt="Account Icon"
              width={32}
              height={32}
              onClick={() => {
                if (!loggedIn) {
                  setIsRegisterOverlay(!isRegisterOverlay)
                } else {
                  alert('You are already logged in.')
                }
              }}
            />
          </div>

          <div className={styles.title}>
            <h2
              className={styles.titleText}
              onClick={() => {
                window.location.href = '/'
              }}
            >
              Main St. Shoppe
            </h2>
          </div>
          <div className={styles.hamburger} id="cart">
            <Image
              src={CartIcon}
              alt="Cart Icon"
              width={35}
              height={35}
              className={styles.cartIcon}
              onClick={() => {
                setIsCartOverlay(!isCartOverlay)
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
