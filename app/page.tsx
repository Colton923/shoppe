'use client'

import Popcorn from '@components/popcorn/Popcorn'
import styles from '@styles/Home.module.scss'
import Candy from '@components/candy/Candy'
import { useLocalContext } from '@components/context/LocalContext'
export default function Index() {
  const { checkingOut } = useLocalContext()
  return (
    <div className={styles.defaultContainer}>
      <Popcorn />
      {!checkingOut && <Candy />}
    </div>
  )
}
