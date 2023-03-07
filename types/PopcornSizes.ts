import type { PropType } from './support'

export type SizeNames = PropType<PopcornSizes, keyof PopcornSizes>
export type SizeSizes = PropType<ClearBags, 'size'>
export type SizeMaxFlavors = PropType<EcoFriendlyCardtin, 'maxFlavors'>
export type PopcornSizes = Box | Bag | EcoFriendlyCardtin | ClearBags

type Box = SmallBox | MediumBox | LargeBox

type SmallBox = {
  name: 'Small Box'
}

type MediumBox = {
  name: 'Medium Box'
}

type LargeBox = {
  name: 'Large Box'
}

type Bag = SmallBag | MediumBag | LargeBag

type SmallBag = {
  name: 'Small Bag'
}

type MediumBag = {
  name: 'Medium Bag'
}

type LargeBag = {
  name: 'Large Bag'
}

type EcoFriendlyCardtin = OneGallon | TwoGallon | ThreeGallon

type OneGallon = {
  name: '1 Gal.'
  maxFlavors: 1
}

type TwoGallon = {
  name: '2 Gal.'
  maxFlavors: 2
}

type ThreeGallon = {
  name: '3 Gal.'
  maxFlavors: 4
}

type ClearBags = SmallClearBag | MediumClearBag | LargeClearBag | XLargeClearBag

type SmallClearBag = {
  name: 'Small Clear Bag'
  size: '9"x2.5"x4"'
}

type MediumClearBag = {
  name: 'Medium Clear Bag'
  size: '13.25"x2.5"x4"'
}

type LargeClearBag = {
  name: 'Large Clear Bag'
  size: '17"x2.5"x4"'
}
type XLargeClearBag = {
  name: 'X Large Clear Bag'
  size: '13.5"x3.5"x6"'
}
