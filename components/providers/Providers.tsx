import LocalContextProvider from '@components/context/LocalContext'
import FirebaseContextProvider from '@components/context/FirebaseContext'
import MantineContextProvider from '@components/context/MantineContext'

export default function Providers({
  children,
  data,
}: {
  children: React.ReactNode
  data: any
}) {
  return (
    <MantineContextProvider>
      <LocalContextProvider data={data}>
        <FirebaseContextProvider>{children}</FirebaseContextProvider>
      </LocalContextProvider>
    </MantineContextProvider>
  )
}
