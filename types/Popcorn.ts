import type { PopcornFlavors } from './PopcornFlavors'
import type { PopcornSizes } from './PopcornSizes'

export type Popcorn = {
  flavor: PopcornFlavors[]
  size: PopcornSizes
  price: number
}
