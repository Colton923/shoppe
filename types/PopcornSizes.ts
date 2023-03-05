export type PopcornSizes = {
  box: Box
  bag: Bag
  ecoFriendlyCardtin: EcoFriendlyCardtin
  clearBags: ClearBags
}

type Box = {
  small: {
    name: 'Small'
  }
  medium: {
    name: 'Medium'
  }
  large: {
    name: 'Large'
  }
}

type Bag = {
  small: {
    name: 'Small'
  }
  medium: {
    name: 'Medium'
  }
  large: {
    name: 'Large'
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
    name: 'Small'
    size: '9"x2.5"x4"'
  }
  medium: {
    name: 'Medium'
    size: '13.25"x2.5"x4"'
  }
  large: {
    name: 'Large'
    size: '17"x2.5"x4"'
  }
  xLarge: {
    name: 'X-Large'
    size: '13.5"x3.5"x6"'
  }
}
