import styles from './Footer.module.scss'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.gridLayout}>
        <div className={styles.footerLeft}>
          <h2 className={styles.footerTitle}>
            Some kind of slogan goes here that is about this long in sentence length
            to make the layout work.
          </h2>
          <h3 className={styles.footerSubtitle}>106 South Main Street Lamar, CO</h3>
        </div>
        <div className={styles.footerRight}>
          <div className={styles.footerLinks}>
            <Link className={styles.link} href="/about">
              About
            </Link>
            <Link className={styles.link} href="/contact">
              Contact
            </Link>
            <Link className={styles.link} href="/privacy">
              Privacy
            </Link>
            <Link className={styles.link} href="/terms">
              Terms
            </Link>
          </div>
          <div className={styles.footerSocial}>
            <Link
              className={styles.link}
              href="https://www.facebook.com/MainStShoppe/Link"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3C8.925 3 4 7.925 4 14c0 4.75 3.05 8.775 7.275 10.15v-7.125H9.25v-2.775h2.025V9.975c0-2.025 1.2-3.15 3.075-3.15.875 0 1.8.075 2.025.1v2.4h-1.2c-1.125 0-1.35.525-1.35 1.325v1.8h2.7l-.35 2.775h-2.35v7.125C21.95 22.775 25 18.75 25 14c0-6.075-4.925-11-11-11z" />
              </svg>
            </Link>
            <Link
              className={styles.link}
              href="https://www.instagram.com/mainstshoppe/Link"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4.63 4.63 0 1011.37 16 4.63 4.63 0 0016 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
