import '../styles/globals.scss'
import { poppins } from '@styles/fonts'
import styles from '../styles/Home.module.scss'
import client from '@lib/sanity/client'
import queries from '@lib/sanity/queries'
import Footer from '@components/footer/Footer'
import Navbar from '@components/navbar/Navbar'
import Cart from '@components/cart/Cart'
import Providers from '@components/providers/Providers'

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

export default async function RootLayout(props: {
  children: React.ReactNode
  modal: React.ReactNode
  authModal: React.ReactNode
}) {
  const { children, modal, authModal } = props

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
    <html lang="en-US">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Main St. Shoppe" />
        <meta name="author" content="Webdev Solutions LLC" />
        <link rel="icon" type="image/x-icon" href="/icons/favicon.ico" />
        <title>Main St. Shoppe</title>
      </head>
      <body>
        <main
          id={'pageContent'}
          style={poppins.style}
          className={styles.pageContent}
        >
          <Providers data={data}>
            <Navbar />
            <Cart />
            {children}
            {modal}
            {authModal}
          </Providers>
          <Footer />
        </main>
      </body>
    </html>
  )
}
