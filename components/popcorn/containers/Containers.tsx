import styles from './Containers.module.scss'
import * as SanityTypes from 'types/SanityItem'
import Link from 'next/link'

interface ContainerProps {
  containers: SanityTypes.Container[]
}

export default function Containers(props: ContainerProps) {
  const { containers } = { ...props }

  return (
    <div className={styles.itemsWrapper}>
      {containers.map((container: SanityTypes.Container) => (
        <div className={styles.category} key={container._id}>
          {container.image && (
            <img
              src={container.image}
              alt={container.name}
              className={styles.bagImage}
            />
          )}
          <div className={styles.header}>
            <h2 className={styles.headerText}>SHOP</h2>
            <h2 className={styles.headerCaps}>{container.name}s</h2>
          </div>
          <Link
            className={styles.button}
            href={{
              pathname: `/containers/${container._id}`,
            }}
          />
        </div>
      ))}
    </div>
  )
}
