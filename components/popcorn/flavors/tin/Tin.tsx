import styles from './Tin.module.scss'
import { useLocalContext } from '@components/context/LocalContext'
import Button from '@components/button/Button'

const Tin = () => {
  const { setActiveFlavors, localSizes, localFlavors, setLocalFlavors } =
    useLocalContext()

  return (
    <div className={styles.tin}>
      <div className={styles.flavorCounter}>
        <h2 className={styles.flavorCounter__title}>Selected Flavors</h2>
        {localFlavors.map((flavor) => (
          <h2
            className={styles.flavorCounter__count}
            key={'selectedFlavor' + flavor}
          >
            {flavor}
          </h2>
        ))}
      </div>
      <div className={styles.tin__continue}>
        <Button
          title="Continue"
          onClick={() => {
            setActiveFlavors(localFlavors)
            setLocalFlavors([])
          }}
        />
      </div>
      <div className={styles.availableSizes}>
        <h2 className={styles.availableSizes__title}>Available Sizes</h2>
        <div className={styles.availableSizes__sizes}>
          {localSizes.map((size) => (
            <div key={size} className={styles.availableSizes__size}>
              <h2 className={styles.availableSizes__size__title}>{size}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tin
