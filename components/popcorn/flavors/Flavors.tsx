import styles from './Flavors.module.scss'
import type { FlavorNames } from 'types/PopcornFlavors'
import { useLocalContext } from '@components/context/LocalContext'
import * as Images from './Images'

const Flavors = () => {
  const { activeFlavors, filteredFlavors, activeSizes, setActiveFlavors } =
    useLocalContext()
  const localFlavors: FlavorNames[] = []

  return (
    <>
      {Object.entries(filteredFlavors).map(([category]) => (
        <div className={styles.itemsWrapper} key={category}>
          <h2 className={styles.subHeader}>{category}</h2>
          {/* @ts-ignore */}
          {filteredFlavors[category].map((flavor: FlavorNames) => (
            <div
              key={flavor}
              id={flavor + '_toggle'}
              className={
                activeFlavors.includes(flavor) ? styles.active : styles.inactive
              }
            >
              {Images.Images({ name: flavor })}
              <div className={styles.positionFlavorTitle}>
                <h2 className={styles.flavorTitle}>{flavor}</h2>
              </div>
              <input
                type="button"
                onClick={() => {
                  localFlavors.push(flavor)
                  console.log(localFlavors)
                  console.log(activeSizes)
                  if (
                    localFlavors.length ===
                    (activeSizes.filter((size) => size.includes('Gal')).length > 0
                      ? activeSizes.filter((size) => size.includes('1')).length > 0
                        ? 2
                        : activeSizes.filter((size) => size.includes('2')).length > 0
                        ? 3
                        : activeSizes.filter((size) => size.includes('3')).length > 0
                        ? 4
                        : 1
                      : 1)
                  ) {
                    setActiveFlavors(localFlavors)
                  }
                }}
                className={styles.input}
              />
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export default Flavors
