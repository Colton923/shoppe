'use client'

import Popcorn from '@components/popcorn/Popcorn'
import Candy from '@components/candy/Candy'
import * as SanityTypes from 'types/SanityItem'
import { useLocalContext } from '@components/context/LocalContext'

export type Data = {
  products: SanityTypes.Product[]
  containers: SanityTypes.Container[]
  flavors: SanityTypes.Flavor[]
  sizes: SanityTypes.Size[]
  categories: SanityTypes.Category[]
}

export default function Page() {
  const { data } = useLocalContext()

  return (
    <>
      <Popcorn data={data} />
      <Candy products={data.products} />
    </>
  )
}
