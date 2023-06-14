'use client'

import { useLocalContext } from '@components/context/LocalContext'
import { usePathname } from 'next/navigation'
import styles from './Item.module.scss'

export default function Page() {
  const { sanityProducts, urlFor } = useLocalContext()
  const params = usePathname()
  if (!sanityProducts) return <div>Loading...</div>

  if (!params) return <div>Loading...</div>
  const itemId = params.split('/')[2]
  const item = sanityProducts.find((item: any) => item._id === itemId)

  return (
    <div>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{item.name}</h2>
        <div className={styles.candyComponent}>
          <li key={item._id} className={styles.item}>
            {item.image && (
              <img
                className={styles.image}
                src={item.image ? urlFor(item.image).url() : ''}
                alt={item.name}
              />
            )}
            <p className={styles.description}></p>
            <p className={styles.price}>${item.price}</p>
          </li>
        </div>
      </div>
    </div>
  )
}
