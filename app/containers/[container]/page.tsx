'use client'

import { useLocalContext } from '@components/context/LocalContext'
import { usePathname } from 'next/navigation'
import Flavors from '@components/popcorn/flavors/Flavors'

export default function Page() {
  const { data } = useLocalContext()
  const pathname = usePathname()

  if (!pathname) return null
  const containerId = pathname.split('/')[2]
  const container = data.containers.filter((c) => c._id === containerId)
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
