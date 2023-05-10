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
    retailPrice: number
    wholesalePrice?: number
  }
}

export default function CreateAllPopcorns() {
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

  const RetailBoxPrices = {
    regular: {
      small: 300,
      medium: 350,
      large: 450,
    },
    savory: {
      small: 400,
      medium: 500,
      large: 600,
    },
    candy: {
      small: 500,
      medium: 600,
      large: 700,
    },
    deluxe: {
      small: 600,
      medium: 700,
      large: 800,
    },
    premium: {
      small: 700,
      medium: 800,
      large: 900,
    },
  }

  const RetailGalPrices = {
    regular: {
      1: 900,
      2: 1700,
      3: 2300,
    },
    savory: {
      1: 1100,
      2: 2000,
      3: 2800,
    },
    candy: {
      1: 1300,
      2: 2400,
      3: 3300,
    },
    deluxe: {
      1: 1500,
      2: 2700,
      3: 3800,
    },
    premium: {
      1: 2200,
      2: 4000,
      3: 6000,
    },
  }

  const RetailClearBagPrices = {
    regular: {
      small: 350,
      medium: 450,
      large: 550,
      x: 800,
    },
    savory: {
      small: 450,
      medium: 600,
      large: 800,
      x: 1150,
    },
    candy: {
      small: 600,
      medium: 700,
      large: 950,
      x: 1400,
    },
    deluxe: {
      small: 800,
      medium: 950,
      large: 1250,
      x: 1550,
    },
    premium: {
      small: 900,
      medium: 1100,
      large: 1400,
      x: 1700,
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
              retailPrice:
                //@ts-ignore
                RetailBoxPrices[flavorType][size.split(' ')[0].toLowerCase()],
            },
          })
        } else if (size.includes('Gal.')) {
          popcorns.push({
            name: PopcornNamer({ flavor: [flavor], size: size }),
            metadata: {
              flavor,
              size,
              //@ts-ignore
              retailPrice: RetailGalPrices[flavorType][size.split(' ')[0]],
            },
          })
        } else if (size.includes('Clear Bag')) {
          popcorns.push({
            name: PopcornNamer({ flavor: [flavor], size: size }),
            metadata: {
              flavor,
              size,
              retailPrice:
                //@ts-ignore
                RetailClearBagPrices[flavorType][size.split(' ')[0].toLowerCase()],
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
              retailPrice: popcorn.metadata.retailPrice,
            },
          })
          .then(async (response) => {
            await stripe.prices
              .create({
                product: response.id,
                unit_amount: popcorn.metadata.retailPrice,
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
