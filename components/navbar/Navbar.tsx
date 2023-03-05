'use client'

import Link from 'next/link'
import styles from './Navbar.module.css'
import Image from 'next/image'

const Navbar = () => {
  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.otherBackground}></div>
      <div className={styles.topNav}>
        <h1 className={styles.fancyText}>
          -Popcorn- & -Candy-
          <br />
          Lamar, CO
        </h1>
        <h1
          className={styles.titleText}
          onClick={() => {
            window.location.href = '/'
          }}
        >
          Main St. Shoppe
        </h1>
        <div className={styles.signIn}>
          <Image
            src={'/icons/svg/user.svg'}
            width={50}
            height={50}
            alt={'signIn'}
            className={styles.input}
            style={{ backgroundColor: 'var(--candyPink)' }}
            onClick={() => {
              alert('Sign In not implemented yet')
            }}
          />
        </div>
        <div className={styles.search}>
          <Image
            src={'/icons/svg/search.svg'}
            width={50}
            height={50}
            alt={'search'}
            className={styles.input}
            style={{ backgroundColor: 'var(--candyYellow)' }}
            onInput={() => {
              alert('Search not implemented yet')
            }}
          />
        </div>
        <div className={styles.cart}>
          <Image
            src={'/icons/svg/cart.svg'}
            width={50}
            height={50}
            alt={'cart'}
            className={styles.input}
            style={{ backgroundColor: 'var(--candyGreen)' }}
            onInput={() => {
              alert('Cart not implemented yet')
            }}
          />
        </div>
      </div>
      <div className={styles.bottomNav}>
        <div className={styles.navWrapper}>
          <Link href={'/about'} className={styles.navText}>
            <div className={styles.navAbout}>
              About Us
              <Image
                src={'/icons/svg/couple.svg'}
                width={50}
                height={50}
                alt={'couple'}
              />
            </div>
          </Link>
          <Link href={'/shop'} className={styles.navText}>
            <div className={styles.navShop}>
              Shop
              <Image
                src={'/icons/svg/candy.svg'}
                width={50}
                height={50}
                alt={'candy'}
              />
            </div>
          </Link>
          <Link href={'/register'} className={styles.navText}>
            <div className={styles.navWholesale}>
              Wholesale
              <Image src={'/icons/svg/box.svg'} width={50} height={50} alt={'box'} />
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar
