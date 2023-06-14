'use client'

import styles from './Modal.module.scss'
import { useLocalContext } from '@components/context/LocalContext'
import { useRouter } from 'next/navigation'

const PageModal = ({ params }: any) => {
  const { sanityProducts, urlFor } = useLocalContext()
  const router = useRouter()
  if (!params) return <div>Loading...</div>
  if (!sanityProducts) return <div>Loading...</div>
  const item = sanityProducts.find((item: any) => item._id === params.id)

  return (
    <div className={styles.modal}>
      <div className={styles.wrapper}>
        <button className={styles.button} onClick={() => router.back()}>
          Close
        </button>
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

export default PageModal
