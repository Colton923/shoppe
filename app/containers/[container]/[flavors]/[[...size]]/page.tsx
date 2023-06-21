import * as SanityTypes from 'types/SanityItem'
import client from '@lib/sanity/client'
import queries from '@lib/sanity/queries'
import ActiveProduct from '@components/popcorn/activeProduct/ActiveProduct'
import SelectSize from './SelectSize'
import styles from './Sizes.module.scss'

export async function getSize(id: string[]) {
  return await client.fetch(queries.size(id))
}

export default async function Size({
  params,
}: {
  params: {
    container: string[]
    flavors: string[]
    size: string[]
  }
}) {
  const { size } = params
  const sizeIds = size
    .filter((s) => {
      if (s.includes('-')) {
        return true
      }
      return false
    })
    .map((s) => s.split('%2B'))
    .flat()

  const sizes = await getSize(sizeIds)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'space-between',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <SelectSize sizes={sizes} />
      <div className={styles.activeProduct}>
        <ActiveProduct />
      </div>
    </div>
  )
}
