import client from '@lib/sanity/client'
import queries from '@lib/sanity/queries'
import * as SanityTypes from 'types/SanityItem'
import Flavors from '@components/popcorn/flavors/Flavors'
export async function getContainer(id: string) {
  return await client.fetch(queries.container(id))
}

export async function getFlavors() {
  return await client.fetch(queries.flavors)
}

export async function getCategories() {
  return await client.fetch(queries.categories)
}

export async function getSizes() {
  return await client.fetch(queries.sizes)
}

export async function getData(id: string) {
  const flavors: SanityTypes.Flavor[] = await getFlavors()
  const categories: SanityTypes.Category[] = await getCategories()
  const sizes: SanityTypes.Size[] = await getSizes()
  const contain: SanityTypes.Container[] = await getContainer(id)

  const promises = await Promise.all([flavors, categories, sizes, contain])

  return promises
}

export default async function Page({ params }: { params: { container: string } }) {
  const { container } = params
  const [flavors, categories, sizes, contain] = await getData(container)

  if (!flavors || !categories || !sizes || !contain) {
    return <div>loading...</div>
  }

  return (
    <>
      <Flavors
        flavors={flavors}
        categories={categories}
        sizes={sizes}
        container={contain}
      />
    </>
  )
}
