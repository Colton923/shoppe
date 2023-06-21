'use client'

import styles from './Flavors.module.scss'
import * as SanityTypes from 'types/SanityItem'
import Link from 'next/link'
import urlFor from '@lib/sanity/urlFor'
import Tin from '@components/popcorn/flavors/tin/Tin'
import { useLocalContext } from '@components/context/LocalContext'
import { useEffect, useState } from 'react'

interface FlavorsProps {
  flavors: SanityTypes.Flavor[]
  categories: SanityTypes.Category[]
  container: SanityTypes.Container[]
  sizes: SanityTypes.Size[]
}

export default function Flavors(props: FlavorsProps) {
  const { flavors, categories, container, sizes } = { ...props }
  const { setActiveFlavor, router, setActivePopcorn, activePopcorn } =
    useLocalContext()
  const [localActiveFlavors, setLocalActiveFlavors] = useState<SanityTypes.Flavor[]>(
    []
  )
  const [localSizes, setLocalSizes] = useState<SanityTypes.Size[]>([])
  const isTin = container[0].name === 'Tin'

  useEffect(() => {
    if (localActiveFlavors.length === 0) return

    const sizesWithFlavors = sizes.filter((size: SanityTypes.Size) => {
      if (!size.maxFlavors) return false
      if (
        size.maxFlavors >= localActiveFlavors.length &&
        size.container?.name === container[0].name
      ) {
        return true
      }
      return false
    })
    setActivePopcorn({
      ...activePopcorn,
      flavor: localActiveFlavors,
      size: sizesWithFlavors[0],
      container: container[0],
    })
    console.log('sizesWithFlavors', sizesWithFlavors)
    console.log('localActiveFlavors', localActiveFlavors)
    console.log('container', container[0])
    setLocalSizes(sizesWithFlavors)
    if (isTin) {
      if (
        localActiveFlavors.length ===
        sizes.reduce((a, b) => {
          if (!a.maxFlavors) return b
          if (!b.maxFlavors) return a
          if (a.maxFlavors > b.maxFlavors) {
            return a
          }
          return b
        }).maxFlavors
      ) {
        router.push(
          `/containers/${container[0]._id}/flavors/${localActiveFlavors
            .map((flavor: SanityTypes.Flavor) => flavor.name as string)
            .join('+')}/size/${sizesWithFlavors
            .map((size: SanityTypes.Size) => size._id as string)
            .join('+')}`
        )
      }
    } else {
      router.push(
        `/containers/${container[0]._id}/flavors/${localActiveFlavors
          .map((flavor: SanityTypes.Flavor) => flavor.name as string)
          .join('+')}/size/${sizesWithFlavors
          .map((size: SanityTypes.Size) => size._id as string)
          .join('+')}`
      )
    }
  }, [localActiveFlavors])

  const Flavor = (flavor: SanityTypes.Flavor) => {
    return (
      <div className={styles.itemsWrapper} key={flavor._id}>
        <div className={styles.items}>
          <div
            key={flavor.name}
            id={flavor.name + '_toggle'}
            className={styles.inactive}
            onClick={() => {
              document
                .getElementById(flavor.name + '_toggle')
                ?.classList.toggle(styles.active)
            }}
          >
            {flavor.image && (
              <img
                src={urlFor(flavor.image).url()}
                alt={flavor.name}
                className={styles.flavorImage}
              />
            )}
            <div
              onClick={() => {
                if (!flavor.name) return
                if (
                  localActiveFlavors.filter((f) => f.name === flavor.name).length > 0
                ) {
                  setLocalActiveFlavors(
                    localActiveFlavors.filter((f) => f.name !== flavor.name)
                  )
                  setActiveFlavor(null)
                } else {
                  setLocalActiveFlavors([...localActiveFlavors, flavor])

                  setActiveFlavor(flavor)
                }
              }}
              className={styles.input}
            >
              <div className={styles.flavorTitleWrapper}>
                <h2 className={styles.flavorTitle}>{flavor.name}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      {isTin && (
        <Tin
          sizes={localSizes}
          localActiveFlavors={localActiveFlavors}
          containerId={container[0]._id}
        />
      )}
      <div className={styles.flavorsHeading}>
        <h1 className={styles.title}>Flavors</h1>
        <p>Pick any of the flavors below.</p>
      </div>
      <div className={styles.allFlavorsWrapper}>
        {categories.map((category: SanityTypes.Category) => {
          if (!category) return null

          return (
            <div className={styles.flavorsWrapper} key={category._id}>
              <h2 className={styles.subHeader}>{category.name}</h2>
              <div className={styles.flavors}>
                {flavors.map((flavor: SanityTypes.Flavor) => {
                  if (!flavor) return null
                  if (!flavor.category) return null
                  if (flavor.category._ref === category._id) {
                    return Flavor(flavor)
                  }
                  return null
                })}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
