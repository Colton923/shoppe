import styles from './Flavors.module.css'
import type { FlavorNames } from 'types/PopcornFlavors'
import { allRootColors } from '@utils/allRootColors'
import * as PopcornData from '@utils/PopcornData'
interface FlavorsProps {
  flavors: FlavorNames[]
  activeFlavors: FlavorNames[]
  setActiveFlavors: React.Dispatch<React.SetStateAction<FlavorNames[]>>
}

const Flavors = (props: FlavorsProps) => {
  const { flavors, activeFlavors, setActiveFlavors } = props

  const FlavorInput = (flavor: FlavorNames) => {
    return (
      <div
        className={activeFlavors.includes(flavor) ? styles.active : styles.inactive}
      >
        <h1 className={styles.description}>{flavor} </h1>
        <div className={styles.image}>Image Placeholder</div>
        <input
          type="button"
          onClick={() => {
            if (activeFlavors.includes(flavor)) {
              const newActiveFlavors = activeFlavors.filter(
                (activeFlavor) => activeFlavor !== flavor
              )
              setActiveFlavors(newActiveFlavors)
              return
            } else {
              setActiveFlavors([flavor])
            }
          }}
          className={styles.input}
          style={
            activeFlavors.includes(flavor)
              ? {
                  backgroundImage: `linear-gradient(45deg,${
                    allRootColors[
                      Math.floor(Math.random() * allRootColors.length - 1)
                    ]
                  },${
                    allRootColors[
                      Math.floor(Math.random() * allRootColors.length - 1)
                    ]
                  } 100%)`,
                  borderRadius: '30px',
                }
              : {}
          }
        />
      </div>
    )
  }

  // if (activeFlavors.length === 1) {
  //   return (
  //     <div className={styles.wrapper}>
  //       <div className={styles.category}>
  //         <div className={styles.flavorWrapper}>{FlavorInput(activeFlavors[0])}</div>
  //       </div>
  //     </div>
  //   )
  // }
  return (
    <div className={styles.wrapper}>
      {/* <h1
        style={{
          position: 'absolute',
          top: '50px',
          left: '100px',
        }}
      >
        Maybe add a roll up animation for when something is selected and save some
        screen space
      </h1> */}
      <div className={styles.category}>
        <h2 className={styles.header} style={{ color: 'var(--canePink)' }}>
          Regular
        </h2>
        {flavors.map((flavor) => {
          if (PopcornData.RegularFlavors.includes(flavor)) {
            return (
              <div key={flavor} className={styles.flavorWrapper}>
                {FlavorInput(flavor)}
              </div>
            )
          }
        })}
      </div>
      <div className={styles.category}>
        <h2 className={styles.header} style={{ color: 'var(--caneRed)' }}>
          Savory
        </h2>
        {flavors.map((flavor) => {
          if (PopcornData.SavoryFlavors.includes(flavor)) {
            return (
              <div key={flavor} className={styles.flavorWrapper}>
                {FlavorInput(flavor)}
              </div>
            )
          }
        })}
      </div>
      <div className={styles.category}>
        <h2 className={styles.header} style={{ color: 'var(--brightRed)' }}>
          Candy
        </h2>
        {flavors.map((flavor) => {
          if (PopcornData.CandyFlavors.includes(flavor)) {
            return (
              <div key={flavor} className={styles.flavorWrapper}>
                {FlavorInput(flavor)}
              </div>
            )
          }
        })}
      </div>
      <div className={styles.category}>
        <h2 className={styles.header} style={{ color: 'var(--brightOrange)' }}>
          Premium
        </h2>
        {flavors.map((flavor) => {
          if (PopcornData.PremiumFlavors.includes(flavor)) {
            return (
              <div key={flavor} className={styles.flavorWrapper}>
                {FlavorInput(flavor)}
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default Flavors
