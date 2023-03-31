'use client'

import styles from './Tin.module.scss'
import { useLocalContext } from '@components/context/LocalContext'
import { FlavorNames } from 'types/PopcornFlavors'
import { useEffect, useState } from 'react'
import Button from '@components/button/Button'

interface TinProps {
  localFlavors: FlavorNames[]
}

const Tin = (props: TinProps) => {
  const { localFlavors } = props
  const {
    activeSizes,
    setSelectedSize,
    setActiveFlavors,
    localSizes,
    setLocalSizes,
  } = useLocalContext()

  useEffect(() => {
    if (localFlavors.length >= 0) {
      setLocalSizes(activeSizes)
    }
    if (localFlavors.length > 1) {
      setLocalSizes(activeSizes.filter((size) => !size.includes('1 Gal.')))
    }
    if (localFlavors.length > 2) {
      setLocalSizes(
        activeSizes.filter(
          (size) => !size.includes('2 Gal.') && !size.includes('1 Gal.')
        )
      )
    }
    if (localFlavors.length > 3) {
      setActiveFlavors(localFlavors)
      setSelectedSize('3 Gal.')
    }
  }, [localFlavors, localSizes])

  return (
    <div className={styles.tin}>
      <div className={styles.flavorCounter}>
        <h2 className={styles.flavorCounter__title}>Selected Flavors</h2>
        <h2 className={styles.flavorCounter__count}>{localFlavors.length}</h2>
      </div>
      <div className={styles.tin__continue}>
        <Button
          title="Continue"
          onClick={() => {
            setActiveFlavors(localFlavors)
          }}
        />
      </div>
      <div className={styles.availableSizes}>
        <h2 className={styles.availableSizes__title}>Available Sizes</h2>
        <div className={styles.availableSizes__sizes}>
          {localSizes.map((size) => (
            <div key={size} className={styles.availableSizes__size}>
              <h2 className={styles.availableSizes__size__title}>{size}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tin
