'use client'

import styles from './Modal.module.scss'
import { useLocalContext } from '@components/context/LocalContext'
import { useRouter } from 'next/navigation'
import ActiveProduct from '@components/popcorn/activeProduct/ActiveProduct'

const PageModal = ({ params }: any) => {
  const { sanityProducts, urlFor } = useLocalContext()
  const router = useRouter()
  if (!params) return null
  if (!sanityProducts) return null
  const item = sanityProducts.find((item: any) => item._id === params.id)

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
            activePrice={item.price * 100}
          />
          <p className={styles.description}>{item.description}</p>
        </div>
      </div>
    </div>
  )
}

export default PageModal
