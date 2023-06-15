'use client'

import { useLocalContext } from '@components/context/LocalContext'
import { usePathname } from 'next/navigation'
import styles from './Item.module.scss'
import { useRouter } from 'next/navigation'
import ActiveProduct from '@components/popcorn/activeProduct/ActiveProduct'

export default function Page() {
  const { sanityProducts, urlFor } = useLocalContext()
  const router = useRouter()
  const params = usePathname()
  if (!sanityProducts) return null

  if (!params) return null
  const itemId = params.split('/')[2]
  const item = sanityProducts.find((item: any) => item._id === itemId)

  return (
    <div>
      <div className={styles.wrapper}>
        <button className={styles.button} onClick={() => router.back()}>
          Close
        </button>
        <h2 className={styles.title}>{item.name}</h2>
        <div className={styles.candyComponent}>
          <ActiveProduct
            image={item.image ? urlFor(item.image).url() : ''}
            activeFlavors={[item.name]}
            activePrice={item.price * 100}
          />
          <p className={styles.description}></p>
        </div>
      </div>
    </div>
  )
}
