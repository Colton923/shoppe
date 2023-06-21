import Link from 'next/link'
import styles from './Navbar.module.scss'
import Image from 'next/image'
import CartIcon from '@public/icons/svg/cart.svg'
import personIcon from '@public/icons/svg/account.svg'
import { useFirebaseContext } from '@components/context/FirebaseContext'
import { useLocalContext } from '@components/context/LocalContext'

const Navbar = () => {
  const { loggedIn } = useFirebaseContext()
  const { setShowCart, showCart } = useLocalContext()

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
          <Link href={'/login'} className={styles.hamburger}>
            <Image
              src={personIcon}
              alt="Account Icon"
              width={32}
              height={32}
              onClick={() => {
                if (!loggedIn) {
                } else {
                  alert('You are already logged in.')
                }
              }}
            />
          </Link>

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
                setShowCart(!showCart)
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
