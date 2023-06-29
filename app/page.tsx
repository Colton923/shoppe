import * as SanityTypes from 'types/SanityItem'
import Candy from '@components/candy/Candy'
import Containers from '@components/popcorn/containers/Containers'

export type Data = {
  products: SanityTypes.Product[]
  containers: SanityTypes.Container[]
  flavors: SanityTypes.Flavor[]
  sizes: SanityTypes.Size[]
  categories: SanityTypes.Category[]
}

export default function Page() {
  return (
    <>
      <Containers />
      <Candy />
    </>
  )
}
