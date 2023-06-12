'use client'

import { useEffect, useState } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity'
import styles from './Candy.module.scss'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2022-03-25',
  useCdn: true,
})

const Candy = () => {
  const [products, setProducts] = useState<any[] | null>(null)

  const urlFor = (source: string) => {
    const builder = imageUrlBuilder(client)

    return builder.image(source)
  }

  useEffect(() => {
    const getData = async () => {
      await client
        .fetch(
          `*[_type == "candy"]{
            _id,
            name,
            description,
            price,
            image
          }`
        )
        .then((data: any) => setProducts(data))
        .catch(console.error)

      return
    }
    getData()
  }, [])

  console.log(products)

  if (!products) return <div>Loading...</div>
  if (products.length === 0) return <div>No products</div>

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Candy</h2>
      <div className={styles.candyComponent}>
        {products.map((product: any) => (
          <li key={product._id} className={styles.item}>
            {product.image && (
              <img
                className={styles.image}
                src={
                  urlFor(product.image)
                    .width(300)
                    .height(300)
                    .fit('crop')
                    .auto('format')
                    .url() || ''
                }
                alt={product.name}
              />
            )}
            <h3 className={styles.name}>{product.name}</h3>
            <p className={styles.description}>
              {product.description.length > 13
                ? product.description.substring(0, 13) + '...'
                : product.description}
            </p>
            <p className={styles.price}>${product.price}</p>
          </li>
        ))}
      </div>
    </div>
  )
}

export default Candy
