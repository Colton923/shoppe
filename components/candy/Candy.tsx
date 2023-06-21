'use client'

import styles from './Candy.module.scss'
import Link from 'next/link'
import * as SanityTypes from 'types/SanityItem'
import { useLocalContext } from '@components/context/LocalContext'
import urlFor from '@lib/sanity/urlFor'

interface ProductsProps {
  products: SanityTypes.Product[]
}

const Candy = (props: ProductsProps) => {
  const { setActiveProduct, popcornStoreActive, wholesaler } = useLocalContext()
  const { products } = { ...props }
  const SanityItemsInCategories = (category: SanityTypes.Category) => {
    const items: SanityTypes.Product[] = []
    products.map((product: SanityTypes.Product) => {
      console.log(product)
      console.log(category)
      if (!product.category) return
      if (product.category._id === category._id) {
        items.push(product)
      }
    })
    return (
      <div className={styles.candyComponent}>
        {items.map((item: SanityTypes.Product) => (
          <Link
            href={`/item/${item._id}`}
            key={item._id}
            className={styles.item}
            id={item._id}
            onClick={() => {
              setActiveProduct(item)
            }}
          >
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
          </Link>
        ))}
      </div>
    )
  }

  const Sanity = () => {
    const categories: { _id: string; name: string }[] = []
    products.map((product: SanityTypes.Product) => {
      if (!product.category) {
        return
      }
      if (!product.category._id) {
        return
      }
      if (!product.category.name) {
        return
      }
      categories.filter((category: SanityTypes.Category) => {
        if (category._id === product?.category?._id) {
          return
        }
      })
      categories.push({
        _id: product.category._id,
        name: product.category.name,
      })
    })
    return (
      <div className={styles.candyComponent}>
        {categories.map((category: SanityTypes.Category) => (
          <div key={category._id}>
            <h2 className={styles.title}>{category.name as string}</h2>
            <div className={styles.candyComponent}>
              {SanityItemsInCategories(category)}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (popcornStoreActive) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <Sanity />
    </div>
  )
}

export default Candy
