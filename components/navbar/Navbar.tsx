import Link from 'next/link'
import styles from './Navbar.module.scss'
import Image from 'next/image'
import CartIcon from '@public/icons/svg/cart.svg'
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
      {/* <div> */}
      {/* <div className={styles.title}>
          <h2
            className={styles.titleText}
            onClick={() => {
              window.location.href = '/'
            }}
          >
            Main St. Shoppe
          </h2>
          <h2 className={styles.fancyText}>
            <Link
              className={styles.textLink}
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}}`}
            ></Link>
            <Link
              className={styles.textLink}
              href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}
            ></Link>
          </h2>
        </div> */}
      {/* <span></span>
      </div> */}

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="#8b0000"
            stroke="#8b0000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.hamburger}
            onClick={() => {
              if (!loggedIn) {
                setIsRegisterOverlay(!isRegisterOverlay)
              } else {
                alert('You are already logged in.')
              }
            }}
          >
            <path d="M 64 1 C 29.26 1 1 29.26 1 64 C 1 76.01 4.3905469 87.689531 10.810547 97.769531 C 11.700547 99.169531 13.549219 99.579453 14.949219 98.689453 C 16.349219 97.799453 16.759141 95.950781 15.869141 94.550781 C 10.069141 85.430781 7 74.86 7 64 C 7 32.57 32.57 7 64 7 C 95.43 7 121 32.57 121 64 C 121 74.96 117.88047 85.609062 111.98047 94.789062 C 111.08047 96.179063 111.49086 98.039453 112.88086 98.939453 C 113.38086 99.259453 113.94 99.419922 114.5 99.419922 C 115.49 99.419922 116.4493 98.929062 117.0293 98.039062 C 123.5493 87.889062 127 76.12 127 64 C 127 29.26 98.74 1 64 1 z M 64 31 C 51.32 31 41 41.32 41 54 C 41 66.68 51.32 77 64 77 C 76.68 77 87 66.68 87 54 C 87 41.32 76.68 31 64 31 z M 64 37 C 73.37 37 81 44.63 81 54 C 81 63.37 73.37 71 64 71 C 54.63 71 47 63.37 47 54 C 47 44.63 54.63 37 64 37 z M 64 88.597656 C 48.745 88.597656 33.490859 94.404531 21.880859 106.01953 C 21.840859 106.05953 21.809297 106.09086 21.779297 106.13086 L 21.490234 106.44922 C 20.380234 107.67922 20.469219 109.56945 21.699219 110.68945 C 33.299219 121.20945 48.32 127 64 127 C 79.68 127 94.700781 121.20969 106.30078 110.67969 C 107.53078 109.56969 107.61977 107.66945 106.50977 106.43945 L 106.35938 106.28906 C 106.28938 106.19906 106.19914 106.09953 106.11914 106.01953 C 94.509141 94.404531 79.255 88.597656 64 88.597656 z M 64 94.597656 C 76.8425 94.597656 89.684844 99.175078 99.839844 108.33008 C 89.719844 116.52008 77.11 121 64 121 C 50.89 121 38.280156 116.52008 28.160156 108.33008 C 38.315156 99.175078 51.1575 94.597656 64 94.597656 z"></path>
          </svg>
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
