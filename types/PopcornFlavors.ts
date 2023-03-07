import type { PropType } from './support'

export type FlavorNames = PropType<PopcornFlavors, keyof PopcornFlavors>

export type FlavorCategory<T> = T extends RegularFlavor
  ? 'RegularFlavor'
  : T extends SavoryFlavor
  ? 'SavoryFlavor'
  : T extends CandyFlavor
  ? 'CandyFlavor'
  : T extends DeluxeFlavor
  ? 'DeluxeFlavor'
  : T extends PremiumFlavor
  ? 'PremiumFlavor'
  : never

const tester = 'Creamy Dill'

type test = {
  name: typeof tester
}

type Testing = FlavorCategory<test>

export type PopcornFlavors =
  | RegularFlavor
  | SavoryFlavor
  | CandyFlavor
  | DeluxeFlavor
  | PremiumFlavor

type Flavor = {
  name: string
}

type RegularFlavor = Plain | Butter

type Plain = Flavor & {
  name: 'Plain'
}

type Butter = Flavor & {
  name: 'Butter'
}

type SavoryFlavor =
  | BaconAndCheese
  | BaconRanch
  | CreamyDill
  | HoneyMustard
  | HotJalepeno
  | ParmesanGarlic
  | Pizza
  | Ranch
  | SourCreamAndChives
  | SpicyBuffalo

type BaconAndCheese = Flavor & {
  name: 'Bacon & Cheese'
}

type BaconRanch = Flavor & {
  name: 'Bacon Ranch'
}

type CreamyDill = Flavor & {
  name: 'Creamy Dill'
}

type HoneyMustard = Flavor & {
  name: 'Honey Mustard'
}

type HotJalepeno = Flavor & {
  name: 'Hot Jalepeno'
}

type ParmesanGarlic = Flavor & {
  name: 'Parmesan Garlic'
}

type Pizza = Flavor & {
  name: 'Pizza'
}

type Ranch = Flavor & {
  name: 'Ranch'
}

type SourCreamAndChives = Flavor & {
  name: 'Sour Cream & Chives'
}

type SpicyBuffalo = Flavor & {
  name: 'Spicy Buffalo'
}

type CandyFlavor =
  | Banana
  | BlackCherry
  | BlueRaspberry
  | Cherry
  | CottonCandy
  | Grape
  | GreenApple
  | Lemon
  | Marshmallow
  | Orange
  | Strawberry
  | Tangerine
  | Watermelon

type Banana = Flavor & {
  name: 'Banana'
}

type BlackCherry = Flavor & {
  name: 'Black Cherry'
}

type BlueRaspberry = Flavor & {
  name: 'Blue Raspberry'
}

type Cherry = Flavor & {
  name: 'Cherry'
}

type CottonCandy = Flavor & {
  name: 'Cotton Candy'
}

type Grape = Flavor & {
  name: 'Grape'
}

type GreenApple = Flavor & {
  name: 'Green Apple'
}

type Lemon = Flavor & {
  name: 'Lemon'
}

type Marshmallow = Flavor & {
  name: 'Marshmallow'
}

type Orange = Flavor & {
  name: 'Orange'
}

type Strawberry = Flavor & {
  name: 'Strawberry'
}

type Tangerine = Flavor & {
  name: 'Tangerine'
}

type Watermelon = Flavor & {
  name: 'Watermelon'
}

type DeluxeFlavor =
  | BirthdayCake
  | Caramel
  | CaramelApple
  | CheddarCheese
  | HotCinnamon
  | KettleCorn
  | Lime
  | Peach
  | RedRaspberry
  | TuttiFruitti
  | SeaSaltCaramel
  | WhiteCheddar

type BirthdayCake = Flavor & {
  name: 'Birthday Cake'
}

type Caramel = Flavor & {
  name: 'Caramel'
}

type CaramelApple = Flavor & {
  name: 'Caramel Apple'
}

type CheddarCheese = Flavor & {
  name: 'Cheddar Cheese'
}

type HotCinnamon = Flavor & {
  name: 'Hot Cinnamon'
}

type KettleCorn = Flavor & {
  name: 'Kettle Corn'
}

type Lime = Flavor & {
  name: 'Lime'
}

type Peach = Flavor & {
  name: 'Peach'
}

type RedRaspberry = Flavor & {
  name: 'Red Raspberry'
}

type TuttiFruitti = Flavor & {
  name: 'Tutti Fruitti'
}

type SeaSaltCaramel = Flavor & {
  name: 'Sea Salt Caramel'
}

type WhiteCheddar = Flavor & {
  name: 'White Cheddar'
}

type PremiumFlavor =
  | CaramelWithAlmonds
  | CaramelWithCashews
  | CaramelWithPeanuts
  | CaramelWithPecans
  | KettleWithAlmonds
  | KettleWithCashews
  | KettleWithPeanuts
  | KettleWithPecans
  | JalapenoCheese
  | SpicyNacho

type CaramelWithAlmonds = Flavor & {
  name: 'Caramel w/Almonds'
}

type CaramelWithCashews = Flavor & {
  name: 'Caramel w/Cashews'
}

type CaramelWithPeanuts = Flavor & {
  name: 'Caramel w/Peanuts'
}

type CaramelWithPecans = Flavor & {
  name: 'Caramel w/Pecans'
}

type KettleWithAlmonds = Flavor & {
  name: 'Kettle w/Almonds'
}

type KettleWithCashews = Flavor & {
  name: 'Kettle w/Cashews'
}

type KettleWithPeanuts = Flavor & {
  name: 'Kettle w/Peanuts'
}

type KettleWithPecans = Flavor & {
  name: 'Kettle w/Pecans'
}

type JalapenoCheese = Flavor & {
  name: 'Jalapeno Cheese'
}

type SpicyNacho = Flavor & {
  name: 'Spicy Nacho'
}
