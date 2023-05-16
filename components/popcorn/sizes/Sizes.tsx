import styles from './Sizes.module.scss'
import { useLocalContext } from '@components/context/LocalContext'
import BagImage from '@public/images/caramel1.png'
import TinImage from '@public/images/Tin.png'
import Image from 'next/image'

const Sizes = () => {
  const { setActiveSizes, sizes, setLocalSizes } = useLocalContext()
  const bagSizes: (typeof sizes)[number][] = sizes.filter((size) =>
    size.includes('Clear Bag')
  ) as (typeof sizes)[number][]
  const tinSizes: (typeof sizes)[number][] = sizes.filter((size) =>
    size.includes('Gal')
  ) as (typeof sizes)[number][]

  return (
    <div className={styles.itemsWrapper}>
      <div className={styles.category}>
        <Image
          src={BagImage}
          alt="Bag"
          width={2048}
          height={2048}
          className={styles.bagImage}
        />
        <div className={styles.header}>
          <h2 className={styles.headerText}>SHOP</h2>
          <h2 className={styles.headerCaps}>BAGS</h2>
        </div>
        <input
          type="button"
          className={styles.button}
          onClick={() => {
            setActiveSizes(bagSizes)
            setLocalSizes(bagSizes)
          }}
        />
        {/* <Arrow /> */}
      </div>
      <div className={styles.category}>
        <Image
          src={TinImage}
          alt="Tin"
          width={2048}
          height={2048}
          className={styles.tinImage}
        />
        <div className={styles.header}>
          <h2 className={styles.headerText}>SHOP</h2>
          <h2 className={styles.headerCaps}>TINS</h2>
        </div>
        <input
          type="button"
          className={styles.button}
          onClick={() => {
            setActiveSizes(tinSizes)
            setLocalSizes(tinSizes)
          }}
        />
      </div>
    </div>
  )
}

export default Sizes
