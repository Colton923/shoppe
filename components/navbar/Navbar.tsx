'use client'

import Link from 'next/link'
import styles from './Navbar.module.scss'
import Image from 'next/image'
import CartIcon from '@public/icons/svg/cart.svg'
import Background from '@public/images/Popcorn_Background.png'

const Navbar = () => {
  return (
    <>
      <div className={styles.navBackground}>
        <div className={styles.bg} />
      </div>
      <div className={styles.gridLayout}>
        <span></span>
        <div className={styles.title}>
          <h2
            className={styles.titleText}
            onClick={() => {
              window.location.href = '/'
            }}
          >
            Main St. <br />
            Shoppe
          </h2>
          <h2 className={styles.fancyText}>
            <Link className={styles.textLink} href={'email@email.com'}>
              email@email.com
            </Link>
            <Link className={styles.textLink} href={'123-1234-1234'}>
              123-1234-1234
            </Link>
          </h2>
        </div>
        <span></span>
      </div>
      <div className={styles.stickyNav}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.hamburger}
        >
          <line
            className={styles.hamburgerLine}
            x1="3"
            y1="12"
            x2="27"
            y2="12"
          ></line>
          <line className={styles.hamburgerLine} x1="3" y1="6" x2="27" y2="6"></line>
          <line
            className={styles.hamburgerLine}
            x1="3"
            y1="18"
            x2="27"
            y2="18"
          ></line>
          <line
            className={styles.hamburgerLine}
            x1="3"
            y1="24"
            x2="27"
            y2="24"
          ></line>
        </svg>
        <div className={styles.hamburger} id="cart">
          <Image
            src={CartIcon}
            alt="Cart Icon"
            width={35}
            height={35}
            className={styles.cartIcon}
          />
        </div>
      </div>
    </>
  )
}

export default Navbar
