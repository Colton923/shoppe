import styles from './Popcorn.module.scss'
import Containers from './containers/Containers'
import * as SanityTypes from 'types/SanityItem'

interface DataProps {
  data: {
    containers: SanityTypes.Container[]
  }
}

const PopcornComponent = (props: DataProps) => {
  const { containers } = { ...props.data }

  return (
    <>
      <Containers containers={containers} />
    </>
  )
}

export default PopcornComponent
