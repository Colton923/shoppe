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
      <div className={styles.flavorsHeading}>
        <h1 className={styles.title}>Flavors</h1>
        <p>Pick any of the flavors below.</p>
        <p>Tins can hold up to 4 flavors.</p>
      </div>
      {activeSizes.find((size) => size.includes('Gal')) && (
        <Tin localFlavors={localFlavors} />
      )}
      <div className={styles.allFlavorsWrapper}>
        {Object.entries(filteredFlavors).map(([category]) => (
          <div className={styles.itemsWrapper} key={category}>
            <h2 className={styles.subHeader}>{category}</h2>
            <div className={styles.items}>
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

                  <input
                    type="button"
                    onClick={() => {
                      HandleSelectFlavor(flavor)
                    }}
                    className={styles.input}
                  />
                  <div className={styles.flavorTitleWrapper}>
                    <h2 className={styles.flavorTitle}>{flavor}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Flavors
