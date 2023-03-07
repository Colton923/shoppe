export type PopcornFlavors = {
  regular: RegularFlavor
  savory: SavoryFlavor
  candy: CandyFlavor
  deluxe: DeluxeFlavor
  premium: PremiumFlavor
}

type RegularFlavor = {
  regular: {
    plain: {
      name: 'Plain'
    }
    butter: {
      name: 'Butter'
    }
  }
}

type SavoryFlavor = {
  savory: {
    baconAndCheese: {
      name: 'Bacon & Cheese'
    }
    baconRanch: {
      name: 'Bacon Ranch'
    }
    creamyDill: {
      name: 'Creamy Dill'
    }
    honeyMustard: {
      name: 'Honey Mustard'
    }
    hotJalepeno: {
      name: 'Hot Jalepeno'
    }
    parmesanGarlic: {
      name: 'Parmesan Garlic'
    }
    pizza: {
      name: 'Pizza'
    }
    ranch: {
      name: 'Ranch'
    }
    sourCreamAndChives: {
      name: 'Sour Cream & Chives'
    }
    spicyBuffalo: {
      name: 'Spicy Buffalo'
    }
  }
}

type CandyFlavor = {
  candy: {
    banana: {
      name: 'Banana'
    }
    blackCherry: {
      name: 'Black Cherry'
    }
    blueRaspberry: {
      name: 'Blue Raspberry'
    }
    cherry: {
      name: 'Cherry'
    }
    cottonCandy: {
      name: 'Cotton Candy'
    }
    grape: {
      name: 'Grape'
    }
    greenApple: {
      name: 'Green Apple'
    }
    lemon: {
      name: 'Lemon'
    }
    marshmallow: {
      name: 'Marshmallow'
    }
    orange: {
      name: 'Orange'
    }
    strawberry: {
      name: 'Strawberry'
    }
    tangerine: {
      name: 'Tangerine'
    }
    watermelon: {
      name: 'Watermelon'
    }
  }
}

type DeluxeFlavor = {
  deluxe: {
    birthdayCake: {
      name: 'Birthday Cake'
    }
    caramel: {
      name: 'Caramel'
    }
    caramelApple: {
      name: 'Caramel Apple'
    }
    cheddarCheese: {
      name: 'Cheddar Cheese'
    }
    hotCinnamon: {
      name: 'Hot Cinnamon'
    }
    kettleCorn: {
      name: 'Kettle Corn'
    }
    lime: {
      name: 'Lime'
    }
    peach: {
      name: 'Peach'
    }
    redRaspberry: {
      name: 'Red Raspberry'
    }
    tuttiFruitti: {
      name: 'Tutti Fruitti'
    }
    seaSaltCaramel: {
      name: 'Sea Salt Caramel'
    }
    whiteCheddar: {
      name: 'White Cheddar'
    }
  }
}

type PremiumFlavor = {
  premium: {
    caramelWithAlmonds: {
      name: 'Caramel w/Almonds'
    }
    caramelWithCashews: {
      name: 'Caramel w/Cashews'
    }
    caramelWithPeanuts: {
      name: 'Caramel w/Peanuts'
    }
    caramelWithPecans: {
      name: 'Caramel w/Pecans'
    }
    kettleWithAlmonds: {
      name: 'Kettle w/Almonds'
    }
    kettleWithCashews: {
      name: 'Kettle w/Cashews'
    }
    kettleWithPeanuts: {
      name: 'Kettle w/Peanuts'
    }
    kettleWithPecans: {
      name: 'Kettle w/Pecans'
    }
    jalapenoCheese: {
      name: 'Jalapeno Cheese'
    }
    spicyNacho: {
      name: 'Spicy Nacho'
    }
  }
}
