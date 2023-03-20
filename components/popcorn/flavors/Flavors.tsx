'use client'

import styles from '../Popcorn.module.scss'
import type { FlavorNames } from 'types/PopcornFlavors'
import { allRootColors } from '@utils/allRootColors'
import * as PopcornData from '@utils/PopcornData'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import testImg from '@public/images/mascot.png'

interface FlavorsProps {
  flavors: FlavorNames[]
  activeFlavors: FlavorNames[]
  setActiveFlavors: React.Dispatch<React.SetStateAction<FlavorNames[]>>
}

const Flavors = (props: FlavorsProps) => {
  const { flavors, activeFlavors, setActiveFlavors } = props

  useEffect(() => {
    activeFlavors.forEach((flavor) => {
      const div = document.getElementById(flavor)
      if (!flavor) return
      if (!div) return
      if (!div.classList.contains(styles.flavorWrapper)) return
      div.classList.add(styles.expandView)
    })
  }, [activeFlavors])

  const NewActiveFlavor = (flavor: FlavorNames) => {
    const isFlavor = activeFlavors.includes(flavor)
    const div = document.getElementById(flavor)
    if (isFlavor) {
      activeFlavors.splice(activeFlavors.indexOf(flavor), 1)

      if (!div) return
      if (!div.classList.contains(styles.flavorWrapper)) return
      div.classList.remove(styles.expandView)
      div.classList.add(styles.flavorWrapper)
      setActiveFlavors([...activeFlavors])
    } else {
      setActiveFlavors([...activeFlavors, flavor])
    }
  }

  const FlavorInput = (flavor: FlavorNames) => {
    return (
      <div
        id={flavor + '_toggle'}
        className={activeFlavors.includes(flavor) ? styles.active : styles.inactive}
      >
        <Image
          className={styles.picture}
          src={testImg}
          alt="test"
          width={120}
          height={120}
        />
        <div className={styles.positionFlavorTitle}>
          <h2 className={styles.flavorTitle}>{flavor}</h2>
        </div>{' '}
        <input
          type="button"
          onClick={() => {
            NewActiveFlavor(flavor)
          }}
          className={styles.input}
        />
        {activeFlavors.includes(flavor) && (
          <div className={styles.ExpandedVisible}>
            <h2 className={styles.sizeTitle}>Swipe/Dropdown for Size</h2>
            <div className={styles.SizeOptions}>
              <div className={styles.sizeFlavors}>
                <h3>choose up to 3 additional flavors</h3>
                <input type="checkbox" />
              </div>
              <div className={styles.quantity}>
                <h3>QUANTITY</h3>
                <input
                  type="tel"
                  className={styles.numberInput}
                  placeholder={'0'}
                  min={0}
                  max={9}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={styles.itemsWrapper}>
      <h2 className={styles.subHeader}>Regular</h2>
      {flavors.map((flavor) => {
        if (PopcornData.RegularFlavors.includes(flavor)) {
          return (
            <div key={flavor} id={flavor} className={styles.flavorWrapper}>
              {FlavorInput(flavor)}
            </div>
          )
        }
      })}
      <h2 className={styles.subHeader}>Savory</h2>
      {flavors.map((flavor) => {
        if (PopcornData.SavoryFlavors.includes(flavor)) {
          return (
            <div key={flavor} id={flavor} className={styles.flavorWrapper}>
              {FlavorInput(flavor)}
            </div>
          )
        }
      })}
      <h2 className={styles.subHeader}>Candy</h2>
      {flavors.map((flavor) => {
        if (PopcornData.CandyFlavors.includes(flavor)) {
          return (
            <div key={flavor} id={flavor} className={styles.flavorWrapper}>
              {FlavorInput(flavor)}
            </div>
          )
        }
      })}
      <h2 className={styles.subHeader}>Premium</h2>
      {flavors.map((flavor) => {
        if (PopcornData.PremiumFlavors.includes(flavor)) {
          return (
            <div key={flavor} className={styles.flavorWrapper} id="bubble">
              {FlavorInput(flavor)}
            </div>
          )
        }
      })}
    </div>
  )
}

export default Flavors
