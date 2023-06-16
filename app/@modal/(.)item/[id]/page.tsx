'use client'

import styles from './Modal.module.scss'
import { useLocalContext } from '@components/context/LocalContext'
import { useRouter } from 'next/navigation'
import ActiveProduct from '@components/popcorn/activeProduct/ActiveProduct'
import { useEffect, useState } from 'react'
const PageModal = ({ params }: any) => {
  const { sanityProducts, urlFor, setLocalPrice } = useLocalContext()
  const router = useRouter()
  const [item, setItem] = useState<any>(null)

  useEffect(() => {
    if (!sanityProducts || !params) return
    const test = sanityProducts.find((item: any) => item._id === params.id)
    if (!test) return
    setItem(test)
    setLocalPrice(test.price * 100)
  }, [sanityProducts])

  if (!item) return null

  return (
    <div className={styles.modal}>
      <div className={styles.wrapper}>
        <button className={styles.button} onClick={() => router.back()}>
          Close
        </button>
        <div className={styles.candyComponent}>
          <ActiveProduct
            image={item.image ? urlFor(item.image).url() : ''}
            activeFlavors={[item.name]}
          />
          <p className={styles.description}>{item.description}</p>
        </div>
      </div>
    </div>
  )
}

export default PageModal
