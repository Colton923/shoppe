import styles from './Flavors.module.scss'
import type { FlavorNames } from 'types/PopcornFlavors'
import { useLocalContext } from '../context/LocalContext'
import * as Images from './Images'

const Flavors = () => {
  const { activeFlavors, filteredFlavors, NewActiveFlavor } = useLocalContext()

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
                  NewActiveFlavor(flavor)
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
