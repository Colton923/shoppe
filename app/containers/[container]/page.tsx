import client from '@lib/sanity/client'
import queries from '@lib/sanity/queries'
import * as SanityTypes from 'types/SanityItem'
import Flavors from '@components/popcorn/flavors/Flavors'

export async function getContainer(id: string) {
  return await client.fetch(queries.container(id))
}

export default async function Page({ params }: { params: { container: string } }) {
  const { container } = params
  const contain: SanityTypes.Container[] = await getContainer(container)
  if (!contain.length) {
    if (!(contain.length > 0)) {
      return
    }
  }
  return (
    <>
      <Flavors container={contain} />
    </>
  )
}
