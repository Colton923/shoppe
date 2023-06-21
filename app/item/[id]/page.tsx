'use client'

import { useLocalContext } from '@components/context/LocalContext'
import styles from './Item.module.scss'
import client from '@lib/sanity/client'
import queries from '@lib/sanity/queries'
import * as SanityTypes from 'types/SanityItem'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import urlFor from '@lib/sanity/urlFor'

export default function Page() {
  const { router, wholesaler } = useLocalContext()
  const [item, setItem] = useState<SanityTypes.Product | null>(null)

  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return
    const id = pathname.split('/').pop()
    const getItem = async (id: string) => {
      return await client.fetch(queries.product(id))
    }

    if (!id) return
    getItem(id).then((item: SanityTypes.Product) => {
      setItem(item)
    })
  }, [pathname])

  if (!pathname) return null
  if (!item) return null

  return (
    <div className={styles.modal}>
      <div className={styles.wrapper}>
        <button className={styles.button} onClick={() => router.back()}>
          Close
        </button>
        <div className={styles.item}>
          {item.image && (
            <img className={styles.image} src={urlFor(item.image).url() || ''} />
          )}
          <div className={styles.imageContainer}>
            {item.image && (
              <img
                className={styles.image}
                src={urlFor(item.image as string).url()}
                alt={item.name as string}
              />
            )}
          </div>
          <div className={styles.textContainer}>
            <h3 className={styles.itemName}>{item.name as string}</h3>
            <h4 className={styles.itemDescription}>{item.description}</h4>
            {wholesaler ? (
              <h4 className={styles.itemPrice}>{item.wholesalePrice}</h4>
            ) : (
              <h4 className={styles.itemPrice}>{item.retailPrice}</h4>
            )}
          </div>

          <p className={styles.description}>{item.description}</p>
        </div>
      </div>
    </div>
  )
}
