import styles from './Tin.module.scss'
import Link from 'next/link'
import * as SanityTypes from 'types/SanityItem'

interface TinProps {
  sizes: SanityTypes.Size[]
  localActiveFlavors: SanityTypes.Flavor[]
  containerId: string
}

const Tin = (props: TinProps) => {
  const { sizes, localActiveFlavors, containerId } = { ...props }
  return (
    <div className={styles.tin}>
      <div className={styles.flavorCounter}>
        <h2 className={styles.flavorCounter__title}>Selected Flavors</h2>
        {localActiveFlavors.length > 0 &&
          localActiveFlavors.map((flavor) => (
            <h2
              className={styles.flavorCounter__count}
              key={'selectedFlavor' + flavor._id}
            >
              {flavor.name}
            </h2>
          ))}
      </div>
      {localActiveFlavors.length > 0 && (
        <Link
          className={styles.tin__continue}
          href={{
            pathname: `/containers/${containerId}/flavors/${localActiveFlavors
              .map((flavor: SanityTypes.Flavor) => flavor.name as string)
              .join('+')}/size/${sizes
              .map((size: SanityTypes.Size) => size._id as string)
              .join('+')}`,
          }}
        >
          Continue to Checkout
        </Link>
      )}
      {sizes.length > 0 && (
        <div className={styles.availableSizes}>
          <h2 className={styles.availableSizes__title}>Available Sizes</h2>
          <div className={styles.availableSizes__sizes}>
            {sizes.map((size) => (
              <div
                key={'available-size' + size._id}
                className={styles.availableSizes__size}
              >
                <h2 className={styles.availableSizes__size__title}>{size.name}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Tin
