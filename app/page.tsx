'use client'

import Popcorn from '@components/popcorn/Popcorn'
import styles from '@styles/Home.module.scss'
import Footer from '@components/footer/Footer'
import LocalContextProvider from '@components/popcorn/context/LocalContext'
import Navbar from '../components/navbar/Navbar'

export default function Index() {
  return (
    <div className={styles.pageContent}>
      <Navbar />

      <LocalContextProvider>
        {/* <Progress stage={progress} /> */}
        <Popcorn />
        <Footer />
      </LocalContextProvider>
    </div>
  )
}
