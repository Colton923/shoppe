import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import { FlavorNames } from 'types/PopcornFlavors'
import { useLocalContext } from '@components/context/LocalContext'
import styles from './Flavors.module.scss'
import Plain from '@public/images/caramel1.webp'
import Butter from '@public/images/caramel2.png'
import Caramel from '@public/images/caramel3.png'
import BaconAndCheese from '@public/images/caramel4.png'

type LocalProps = {
  name: FlavorNames
}

const AllImages: Record<FlavorNames, StaticImageData> = {
  Plain: Plain,
  Butter: Butter,
  Caramel: Caramel,
  'Bacon & Cheese': BaconAndCheese,
  'Bacon Ranch': Plain,
  'Birthday Cake': Plain,
  'Black Cherry': Plain,
  'Blue Raspberry': Plain,
  'Caramel Apple': Plain,
  'Caramel w/Almonds': Plain,
  'Caramel w/Cashews': Plain,
  'Caramel w/Peanuts': Plain,
  'Caramel w/Pecans': Plain,
  'Cheddar Cheese': Plain,
  'Cotton Candy': Plain,
  'Creamy Dill': Plain,
  'Green Apple': Plain,
  'Honey Mustard': Plain,
  'Hot Cinnamon': Plain,
  'Hot Jalepeno': Plain,
  'Jalapeno Cheese': Plain,
  'Kettle Corn': Plain,
  'Kettle w/Almonds': Plain,
  'Kettle w/Cashews': Plain,
  'Kettle w/Peanuts': Plain,
  'Kettle w/Pecans': Plain,
  'Parmesan Garlic': Plain,
  'Red Raspberry': Plain,
  'Sea Salt Caramel': Plain,
  'Sour Cream & Chives': Plain,
  'Spicy Buffalo': Plain,
  'Spicy Nacho': Plain,
  'Tutti Fruitti': Plain,
  'White Cheddar': Plain,
  Banana: Plain,
  Cherry: Plain,
  Grape: Plain,
  Lemon: Plain,
  Lime: Plain,
  Orange: Plain,
  Marshmallow: Plain,
  Peach: Plain,
  Pizza: Plain,
  Ranch: Plain,
  Strawberry: Plain,
  Tangerine: Plain,
  Watermelon: Plain,
}

export const Images = (props: LocalProps) => {
  const { name } = { ...props }
  const { activeFlavors } = useLocalContext()
  if (!AllImages[name]) return null
  const staticImage: StaticImageData = AllImages[name]

  return (
    <Image
      src={staticImage}
      alt="Plain"
      width={200}
      height={200}
      className={activeFlavors.includes(name) ? styles.smallPicture : styles.picture}
    />
  )
}
