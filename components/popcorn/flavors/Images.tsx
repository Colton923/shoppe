import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import { FlavorNames } from 'types/PopcornFlavors'
import { useLocalContext } from '@components/context/LocalContext'
import styles from './Flavors.module.scss'
import Plain from '@public/images/caramel1.png'
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
  'Bacon Ranch': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Birthday Cake': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Black Cherry': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Blue Raspberry': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Caramel Apple': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Caramel w/Almonds': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Caramel w/Cashews': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Caramel w/Peanuts': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Caramel w/Pecans': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Cheddar Cheese': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Cotton Candy': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Creamy Dill': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Green Apple': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Honey Mustard': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Hot Cinnamon': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Hot Jalepeno': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Jalapeno Cheese': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Kettle Corn': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Kettle w/Almonds': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Kettle w/Cashews': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Kettle w/Peanuts': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Kettle w/Pecans': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Parmesan Garlic': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Red Raspberry': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Sea Salt Caramel': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Sour Cream & Chives': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Spicy Buffalo': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Spicy Nacho': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'Tutti Fruitti': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  'White Cheddar': {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  Banana: {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  Cherry: {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  Grape: {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  Lemon: {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  Lime: {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  Orange: {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  Marshmallow: {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  Peach: {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  Pizza: {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  Ranch: {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  Strawberry: {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
  Tangerine: {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },

  Watermelon: {
    src: '/public/flavors/Butter.png',
    width: 200,
    height: 200,
  },
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
