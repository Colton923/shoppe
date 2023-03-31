'use client'

import styles from './Flavors.module.scss'
import type { FlavorNames } from 'types/PopcornFlavors'
import { useLocalContext } from '@components/context/LocalContext'
import * as Images from './Images'
import Tin from './tin/Tin'
import { useState } from 'react'

const Flavors = () => {
  const { activeFlavors, filteredFlavors, activeSizes, setActiveFlavors } =
    useLocalContext()
  const [localFlavors, setLocalFlavors] = useState<FlavorNames[]>([])

  const HandleSelectFlavor = (flavor: FlavorNames) => {
    if (localFlavors.includes(flavor)) {
      setLocalFlavors(localFlavors.filter((f) => f !== flavor))
    } else {
      setLocalFlavors([...localFlavors, flavor])
    }
    if (activeSizes.find((size) => size.includes('Gal'))) {
      return
    } else {
      if (activeFlavors.includes(flavor)) {
        setActiveFlavors(activeFlavors.filter((f) => f !== flavor))
      } else {
        setActiveFlavors([...activeFlavors, flavor])
      }
    }
  }

  return (
    <>
      {activeSizes.find((size) => size.includes('Gal')) && (
        <Tin localFlavors={localFlavors} />
      )}
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
                  HandleSelectFlavor(flavor)
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
