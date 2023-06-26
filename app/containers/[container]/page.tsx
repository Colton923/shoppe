'use client'
import Flavors from '@components/popcorn/flavors/Flavors'
import { useLocalContext } from '@components/context/LocalContext'

export default function Page() {
  const { activeContainer } = useLocalContext()

  if (!activeContainer) {
    return null
  }

  return (
    <>
      <Flavors container={[activeContainer]} />
    </>
  )
}
