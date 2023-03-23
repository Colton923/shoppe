'use client'

import Popcorn from '@components/popcorn/Popcorn'
import styles from '@styles/Home.module.scss'
import Footer from '@components/footer/Footer'
import LocalContextProvider from '@components/popcorn/context/LocalContext'

export default function Index() {
  return (
    <div className={styles.pageContent}>
      <LocalContextProvider>
        <div className={styles.container}>
          {/* <Progress stage={progress} /> */}
          <Popcorn />
        </div>
        <Footer />
      </LocalContextProvider>
    </div>
  )
}
