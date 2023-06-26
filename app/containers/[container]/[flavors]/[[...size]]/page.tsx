import SelectSize from './SelectSize'
import ActiveProduct from '@components/popcorn/activeProduct/ActiveProduct'
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
      <SelectSize sizeIds={sizeIds} />
      <ActiveProduct />
    </div>
  )
}
