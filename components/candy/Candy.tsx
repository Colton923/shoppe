import styles from './Candy.module.scss'
import { useLocalContext } from '@components/context/LocalContext'
import Link from 'next/link'
import { StripeProduct } from 'types/stripe/StripeProduct'

const Candy = () => {
  const { urlFor, sanityProducts, setActiveProduct, products } = useLocalContext()

  if (!sanityProducts) return null
  if (sanityProducts.length === 0) return <div>No products</div>
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Candy</h2>
      <div className={styles.candyComponent}>
        {sanityProducts.map((product: any) => (
          <Link
            href={`/item/${product._id}`}
            key={product._id}
            className={styles.item}
            id={product.name}
            onClick={() => {
              const thisProduct: StripeProduct | undefined = products.find((p) => {
                if (p.name === product.name) {
                  return p
                } else {
                  return null
                }
              })
              if (thisProduct) {
                setActiveProduct(thisProduct)
              }
            }}
          >
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
            {!product.image && (
              <div
                className={styles.image}
                style={{
                  backgroundImage: `url(https://main-st-shoppe.com/icons/favicon.ico)`,
                }}
              />
            )}
            <h3 className={styles.name}>
              {window.innerWidth < 768
                ? product.name.length > 25
                  ? product.name.substring(0, 25) + '...'
                  : product.name
                : product.name.length > 35
                ? product.name.substring(0, 35) + '...'
                : product.name}
            </h3>
            <p className={styles.description}>
              {window.innerWidth < 768
                ? product.description.length > 25
                  ? product.description.substring(0, 25) + '...'
                  : product.description
                : product.description.length > 35
                ? product.description.substring(0, 35) + '...'
                : product.description}
            </p>
            <p className={styles.price}>${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Candy
