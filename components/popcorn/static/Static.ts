'use client'

import { useEffect } from 'react'
import { FlavorNames } from '../../../types/PopcornFlavors'
import { SizeNames } from '../../../types/PopcornSizes'
import type { FilteredFlavors } from '@components/context/LocalContext'
import type { StripeProduct } from '../../../types/stripe/StripeProduct'
import * as PopcornData from '@utils/PopcornData'
import { useLocalContext } from '@components/context/LocalContext'

const Static = () => {
  const { setProducts, setFlavors, setSizes, setFilteredFlavors } = useLocalContext()
  useEffect(() => {
    console.log('rendering static data')

    try {
      fetch('/api/get/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data: StripeProduct[]) => {
          if (data.length === 0) return
          setProducts(data)
          const AllFlavors: FlavorNames[] = data.reduce((acc, product) => {
            if (product.metadata?.flavor) {
              acc.push(product.metadata?.flavor as FlavorNames)
            }
            return acc
          }, [] as FlavorNames[])

          const UniqueFlavors = [...new Set(AllFlavors)]
          setFlavors(UniqueFlavors)

          const AllSizes = data.reduce((acc, product) => {
            if (product.metadata?.size) {
              acc.push(product.metadata?.size as SizeNames)
            }
            return acc
          }, [] as SizeNames[])

          const UniqueSizes = [...new Set(AllSizes)]

          setSizes(UniqueSizes)
          setFilteredFlavors(
            UniqueFlavors.reduce(
              (acc, flavor) => {
                if (PopcornData.RegularFlavors.includes(flavor)) {
                  acc.Regular.push(flavor)
                }
                if (PopcornData.SavoryFlavors.includes(flavor)) {
                  acc.Savory.push(flavor)
                }
                if (PopcornData.CandyFlavors.includes(flavor)) {
                  acc.Candy.push(flavor)
                }
                if (PopcornData.PremiumFlavors.includes(flavor)) {
                  acc.Premium.push(flavor)
                }
                return acc
              },
              {
                Regular: [] as FlavorNames[],
                Savory: [] as FlavorNames[],
                Candy: [] as FlavorNames[],
                Premium: [] as FlavorNames[],
              } as FilteredFlavors
            )
          )
        })
        .catch((err) => {
          console.error(err)
        })
    } catch (err) {
      console.error(err)
    }
  }, [])

  return null
}

export default Static
