import styles from '../Popcorn.module.scss'
import type { FlavorNames } from 'types/PopcornFlavors'
import Image from 'next/image'
import testImg from '@public/images/mascot.png'
import type { SizeNames } from 'types/PopcornSizes'
import { useLocalContext } from '../context/LocalContext'

const Flavors = () => {
  const {
    activeSizes,
    activeFlavors,
    setSelectedSize,
    filteredFlavors,
    quantity,
    localPrice,
    setQuantity,
    setActiveFlavors,
    activeProduct,
    cart,
    setCart,
    setLocalPrice,
  } = useLocalContext()

  const Arrow = () => (
    <svg
      data-bbox="9 70.9 181 59"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      style={{
        position: 'absolute',
        stroke: 'white',
        fill: 'white',
        transform: 'scale(0.8)',
        top: '10%',
        zIndex: 1,
      }}
    >
      <g>
        <path d="M159 70.9l-2.2 2.4L183.6 99H9v3h174.6l-26.2 25.3 2.1 2.6 30.5-29.3-31-29.7z"></path>
      </g>
    </svg>
  )

  const AddButton = (quantity: number) => {
    const resetDivs = document.getElementsByClassName(styles.flavorWrapper)
    for (let i = 0; i < resetDivs.length; i++) {
      if (resetDivs[i].classList.contains(styles.expandView)) {
        resetDivs[i].classList.remove(styles.expandView)
      }
    }
    setActiveFlavors([])
    if (!activeProduct || quantity === 0) return
    for (let i = 0; i < quantity; i++) {
      cart.push(activeProduct)
    }
    setCart(cart)
    setQuantity(1)
  }

  const NewActiveFlavor = (flavor: FlavorNames) => {
    const isFlavor = activeFlavors.includes(flavor)
    const div = document.getElementsByClassName(styles.flavorWrapper)
    const divs = Array.from(div)
    activeFlavors.splice(activeFlavors.indexOf(flavor), 1)
    divs.forEach((div) => {
      if (isFlavor) {
        if (!div) return
        if (!div.classList.contains(styles.flavorWrapper)) return
        div.classList.remove(styles.expandView)
        div.classList.add(styles.flavorWrapper)
      } else {
        if (!div) return
        div.classList.remove(styles.expandView)
      }
    })
    setActiveFlavors([flavor])
  }

  return (
    <>
      {Object.entries(filteredFlavors).map(([category]) => (
        <div className={styles.itemsWrapper} key={category}>
          <h2 className={styles.subHeader}>{category}</h2>
          {/* @ts-ignore */}
          {filteredFlavors[category].map((flavor: FlavorNames) => (
            <div key={flavor} id={flavor} className={styles.flavorWrapper}>
              <div
                id={flavor + '_toggle'}
                className={
                  activeFlavors.includes(flavor) ? styles.active : styles.inactive
                }
              >
                <Image
                  className={styles.picture}
                  src={testImg}
                  alt="test"
                  width={120}
                  height={120}
                />
                <div className={styles.positionFlavorTitle}>
                  <h2 className={styles.flavorTitle}>{flavor}</h2>
                </div>{' '}
                <input
                  type="button"
                  onClick={() => {
                    NewActiveFlavor(flavor)
                  }}
                  className={styles.input}
                />
                {activeFlavors.includes(flavor) ? (
                  <div className={styles.ExpandedVisible}>
                    <div className={styles.sizePicker}>
                      <select
                        className={styles.sizeSelect}
                        onInput={(e) => {
                          //@ts-ignore
                          const value = e.target.value
                          setSelectedSize(value)
                        }}
                      >
                        <option value={''}>Select Size</option>
                        {activeSizes.map((size: SizeNames) => {
                          return (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                    <div className={styles.SizeOptions}>
                      <div className={styles.quantity}>
                        <h3>QUANTITY</h3>
                        <input
                          type="tel"
                          className={styles.numberInput}
                          placeholder={'0'}
                          min={0}
                          max={9}
                          value={quantity}
                          onChange={(e) => {
                            const value = e.target.value
                            if (value === '') {
                              setQuantity(0)
                              return
                            }
                            setQuantity(parseInt(value))
                          }}
                        />
                      </div>
                      <div className={styles.addToCart}>
                        <Arrow />
                        <input
                          type="button"
                          className={styles.addToCartButton}
                          value={'Add'}
                          onClick={() => {
                            AddButton(quantity)
                          }}
                        />
                      </div>
                      <h3 className={styles.price}>
                        PRICE: ${(localPrice / 100).toFixed(2)}
                      </h3>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export default Flavors
