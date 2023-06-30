'use client'

import { useLocalContext } from '@components/context/LocalContext'
import Flavors from '@components/popcorn/flavors/Flavors'

export default function Page({ params }: { params: { container: string } }) {
  const { data } = useLocalContext()
  const container = data.containers.filter((c) => c._id === params.container)
  if (!container) return null

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Flavors container={container} />
    </div>
  )
}
