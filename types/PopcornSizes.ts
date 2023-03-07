export type PopcornSizes = {
  box: Box
  bag: Bag
  ecoFriendlyCardtin: EcoFriendlyCardtin
  clearBags: ClearBags
}

type Box = {
  small: {
    name: 'Small Box'
  }
  medium: {
    name: 'Medium Box'
  }
  large: {
    name: 'Large Box'
  }
}

type Bag = {
  small: {
    name: 'Small Bag'
  }
  medium: {
    name: 'Medium Bag'
  }
  large: {
    name: 'Large Bag'
  }
}

type EcoFriendlyCardtin = {
  oneGallon: {
    name: '1 Gal.'
    maxFlavors: 1
  }
  twoGallon: {
    name: '2 Gal.'
    maxFlavors: 2
  }
  threeGallon: {
    name: '3 Gal.'
    maxFlavors: 4
  }
}

type ClearBags = {
  small: {
    name: 'Small Clear Bag'
    size: '9"x2.5"x4"'
  }
  medium: {
    name: 'Medium Clear Bag'
    size: '13.25"x2.5"x4"'
  }
  large: {
    name: 'Large Clear Bag'
    size: '17"x2.5"x4"'
  }
  xLarge: {
    name: 'X Large Clear Bag'
    size: '13.5"x3.5"x6"'
  }
}
