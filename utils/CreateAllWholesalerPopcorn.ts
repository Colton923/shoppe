import PopcornNamer from './PopcornNamer'
import Stripe from 'stripe'

//@ts-ignore
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
})

type StripePopcorn = {
  name: string
  metadata: {
    flavor: string
    size: string
    wholesalePrice: number
  }
}

export default function CreateAllWholesalePopcorns() {
  const sizes: string[] = [
    'Small Box',
    'Medium Box',
    'Large Box',
    'Small Bag',
    'Medium Bag',
    'Large Bag',
    '1 Gal.',
    '2 Gal.',
    '3 Gal.',
    'Small Clear Bag',
    'Medium Clear Bag',
    'Large Clear Bag',
    'X Large Clear Bag',
  ]
  const flavors = {
    regular: ['Plain', 'Butter'],
    savory: [
      'Bacon & Cheese',
      'Bacon Ranch',
      'Creamy Dill',
      'Honey Mustard',
      'Hot Jalepeno',
      'Parmesan Garlic',
      'Pizza',
      'Ranch',
      'Sour Cream & Chives',
      'Spicy Buffalo',
    ],
    candy: [
      'Banana',
      'Black Cherry',
      'Blue Raspberry',
      'Cherry',
      'Cotton Candy',
      'Grape',
      'Green Apple',
      'Lemon',
      'Marshmallow',
      'Orange',
      'Strawberry',
      'Tangerine',
      'Watermelon',
    ],
    deluxe: [
      'Birthday Cake',
      'Caramel',
      'Caramel Apple',
      'Cheddar Cheese',
      'Hot Cinnamon',
      'Kettle Corn',
      'Lime',
      'Peach',
      'Red Raspberry',
      'Tutti Fruitti',
      'Sea Salt Caramel',
      'White Cheddar',
    ],
    premium: [
      'Caramel w/Almonds',
      'Caramel w/Cashews',
      'Caramel w/Peanuts',
      'Caramel w/Pecans',
      'Kettle w/Almonds',
      'Kettle w/Cashews',
      'Kettle w/Peanuts',
      'Kettle w/Pecans',
      'Jalapeno Cheese',
      'Spicy Nacho',
    ],
  }

  const flavorTypes = Object.keys(flavors) as (keyof typeof flavors)[]

  const WholesaleBoxPrices = {
    regular: {
      small: 200,
      medium: 225,
      large: 275,
    },
    savory: {
      small: 250,
      medium: 300,
      large: 350,
    },
    candy: {
      small: 300,
      medium: 350,
      large: 400,
    },
    deluxe: {
      small: 350,
      medium: 400,
      large: 450,
    },
    premium: {
      small: 400,
      medium: 450,
      large: 500,
    },
  }

  const WholesaleGalPrices = {
    regular: {
      1: 700,
      2: 1500,
      3: 2100,
    },
    savory: {
      1: 900,
      2: 1800,
      3: 2600,
    },
    candy: {
      1: 1100,
      2: 2200,
      3: 3100,
    },
    deluxe: {
      1: 1300,
      2: 2500,
      3: 3600,
    },
    premium: {
      1: 2100,
      2: 3800,
      3: 5800,
    },
  }

  const WholesaleClearBagPrices = {
    regular: {
      small: 225,
      medium: 275,
      large: 325,
      x: 450,
    },
    savory: {
      small: 250,
      medium: 350,
      large: 450,
      x: 625,
    },
    candy: {
      small: 350,
      medium: 400,
      large: 525,
      x: 750,
    },
    deluxe: {
      small: 450,
      medium: 525,
      large: 675,
      x: 825,
    },
    premium: {
      small: 500,
      medium: 600,
      large: 750,
      x: 900,
    },
  }

  const popcorns: StripePopcorn[] = []

  sizes.map((size) => {
    flavorTypes.map((flavorType) => {
      flavors[flavorType].map((flavor) => {
        if (size.includes('Box')) {
          popcorns.push({
            name: PopcornNamer({ flavor: [flavor], size: size }),
            metadata: {
              flavor,
              size,
              wholesalePrice:
                //@ts-ignore
                WholesaleBoxPrices[flavorType][size.split(' ')[0].toLowerCase()],
            },
          })
        } else if (size.includes('Gal.')) {
          popcorns.push({
            name: PopcornNamer({ flavor: [flavor], size: size }),
            metadata: {
              flavor,
              size,
              //@ts-ignore
              wholesalePrice: WholesaleGalPrices[flavorType][size.split(' ')[0]],
            },
          })
        } else if (size.includes('Clear Bag')) {
          popcorns.push({
            name: PopcornNamer({ flavor: [flavor], size: size }),
            metadata: {
              flavor,
              size,
              wholesalePrice:
                //@ts-ignore
                WholesaleClearBagPrices[flavorType][
                  size.split(' ')[0].toLowerCase()
                ],
            },
          })
        }
      })
    })
  })
  let count = 0
  try {
    popcorns.map(async (popcorn) => {
      const MakeProduct = async (popcorn: any) => {
        console.log(popcorn)
        await stripe.products
          .create({
            name: popcorn.name,
            type: 'good',
            metadata: {
              flavor: popcorn.metadata.flavor,
              size: popcorn.metadata.size,
              wholesalePrice: popcorn.metadata.wholesalePrice,
            },
          })
          .then(async (response) => {
            await stripe.prices
              .create({
                product: response.id,
                unit_amount: popcorn.metadata.wholesalePrice,
                currency: 'usd',
              })
              .catch((error) => {
                console.log(error)
              })
          })
          .catch((error) => {
            console.log(error)
          })
      }
      count++
      setTimeout(() => {
        MakeProduct(popcorn).then(() => {
          console.log('made product')
        })
      }, 1000 * count)
    })
  } catch (error) {
    console.log(error)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'success' }),
  }
}
