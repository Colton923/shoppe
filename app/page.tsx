import Popcorn from '@components/popcorn/Popcorn'
import styles from '@styles/Home.module.scss'
import Candy from '@components/candy/Candy'
import client from '@lib/sanity/client'
import queries from '@lib/sanity/queries'

export async function getProducts() {
  const products = await client.fetch(queries.products)
  return products
}

export async function getContainers() {
  const containers = await client.fetch(queries.containers)
  return containers
}

export async function getFlavors() {
  const flavors = await client.fetch(queries.flavors)
  return flavors
}
export async function getSizes() {
  const sizes = await client.fetch(queries.sizes)
  return sizes
}
export async function getCategories() {
  const categories = await client.fetch(queries.categories)
  return categories
}

export default async function Page() {
  const products = await getProducts()
  const containers = await getContainers()
  const flavors = await getFlavors()
  const sizes = await getSizes()
  const categories = await getCategories()

  if (!products) return null
  if (!containers) return null
  if (!flavors) return null
  if (!sizes) return null
  if (!categories) return null
  const data = {
    products: products,
    containers: containers,
    flavors: flavors,
    sizes: sizes,
    categories: categories,
  }

  return (
    <div className={styles.defaultContainer}>
      <Popcorn data={data} />
      <Candy products={products} />
    </div>
  )
}
