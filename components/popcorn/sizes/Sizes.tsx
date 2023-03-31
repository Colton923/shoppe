import styles from './Sizes.module.scss'
import type { SizeNames } from 'types/PopcornSizes'
import { useLocalContext } from '@components/context/LocalContext'
import BoxImage from '@public/images/Box.jpeg'
import BagImage from '@public/images/caramel1.png'
import TinImage from '@public/images/Tin.png'
import Image from 'next/image'

const Sizes = () => {
  const { setActiveSizes, sizes, setLocalSizes } = useLocalContext()
  const bagSizes: (typeof sizes)[number][] = sizes.filter((size) =>
    size.includes('Clear Bag')
  ) as (typeof sizes)[number][]
  const boxSizes: (typeof sizes)[number][] = sizes.filter((size) =>
    size.includes('Box')
  ) as (typeof sizes)[number][]
  const tinSizes: (typeof sizes)[number][] = sizes.filter((size) =>
    size.includes('Gal')
  ) as (typeof sizes)[number][]

  const Arrow = () => (
    <svg
      data-bbox="9 70.9 181 59"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className={styles.arrow}
    >
      <g>
        <path d="M159 70.9l-2.2 2.4L183.6 99H9v3h174.6l-26.2 25.3 2.1 2.6 30.5-29.3-31-29.7z"></path>
      </g>
    </svg>
  )

  return (
    <div className={styles.itemsWrapper}>
      <div className={styles.category}>
        <Image
          src={BoxImage}
          alt="Box"
          width={2048}
          height={2048}
          className={styles.boxImage}
        />
        <h2 className={styles.header}>
          <p className={styles.headerText}>SHOP</p>
          <p className={styles.headerText}>SHOP</p>
        </h2>
        <h2 className={styles.header}>
          <p className={styles.headerCaps}>BOXES</p>
          <p className={styles.headerCaps}>BOXES</p>
        </h2>
        <input
          type="button"
          className={styles.button}
          onClick={() => {
            setActiveSizes(boxSizes)
            setLocalSizes(boxSizes)
          }}
        />
        <Arrow />
      </div>
      <div className={styles.category}>
        <Image
          src={BagImage}
          alt="Bag"
          width={2048}
          height={2048}
          className={styles.bagImage}
        />
        <h2 className={styles.header}>
          <p className={styles.headerText}>SHOP</p>
          <p className={styles.headerText}>SHOP</p>
        </h2>
        <h2 className={styles.header}>
          <p className={styles.headerCaps}>BAGS</p>
          <p className={styles.headerCaps}>BAGS</p>
        </h2>
        <input
          type="button"
          className={styles.button}
          onClick={() => {
            setActiveSizes(bagSizes)
            setLocalSizes(bagSizes)
          }}
        />
        <Arrow />
      </div>
      <div className={styles.category}>
        <Image
          src={TinImage}
          alt="Tin"
          width={2048}
          height={2048}
          className={styles.tinImage}
        />
        <h2 className={styles.header}>
          <p className={styles.headerText}>SHOP</p>
          <p className={styles.headerText}>SHOP</p>
        </h2>
        <h2 className={styles.header}>
          <p className={styles.headerCaps}>TINS</p>
          <p className={styles.headerCaps}>TINS</p>
        </h2>
        <input
          type="button"
          className={styles.button}
          onClick={() => {
            setActiveSizes(tinSizes)
            setLocalSizes(tinSizes)
          }}
        />
        <Arrow />
      </div>
    </div>
  )
}

export default Sizes
