'use client'
import Flavors from '@components/popcorn/flavors/Flavors'
import { useLocalContext } from '@components/context/LocalContext'
import { usePathname } from 'next/navigation'
export default function Page() {
  const { data } = useLocalContext()
  const pathname = usePathname()
  if (!pathname) return null
  const containerId = pathname.split('/')[2]
  const container = data.containers.filter((c) => c._id === containerId)
  return (
    <>
      <Flavors container={container} />
    </>
  )
}
