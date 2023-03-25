import styles from './Flavors.module.scss'
import type { FlavorNames } from 'types/PopcornFlavors'
import testImg from '@public/images/Tin.png'
import type { SizeNames } from 'types/PopcornSizes'
import { useLocalContext } from '../context/LocalContext'
import * as Images from './Images'
import Image from 'next/image'

type LocalProps = {
  name: FlavorNames
}

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
  } = useLocalContext()

  const Arrow = (flavor: string) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="125"
      height="125"
      viewBox="0 0 50 50"
      style={{
        fill: 'rgba(255,255,255,0.05)',
        transform: 'scale(1) ',
        borderRadius: '30x',
        overflow: 'hidden',
        position: 'absolute',
        cursor: 'pointer',
      }}
      id={flavor}
    >
      <path d="M 9 4 C 6.2545455 4 4 6.2545455 4 9 L 4 41 C 4 43.745455 6.2545455 46 9 46 L 41 46 C 43.745455 46 46 43.745455 46 41 L 46 9 C 46 6.2545455 43.745455 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.654545 6 44 7.3454545 44 9 L 44 41 C 44 42.654545 42.654545 44 41 44 L 9 44 C 7.3454545 44 6 42.654545 6 41 L 6 9 C 6 7.3454545 7.3454545 6 9 6 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
    </svg>
  )

  const AddButton = (quantity: number) => {
    setActiveFlavors([])
    if (!activeProduct || quantity === 0) return
    for (let i = 0; i < quantity; i++) {
      cart.push(activeProduct)
    }
    setCart(cart)
    setQuantity(1)
    const cartDiv = document.getElementById('cart')
    if (cartDiv) {
      cartDiv.classList.add(styles.cartActive)
      setTimeout(() => {
        cartDiv.classList.remove(styles.cartActive)
      }, 1000)
    }
  }

  const NewActiveFlavor = (flavor: FlavorNames) => {
    activeFlavors.splice(activeFlavors.indexOf(flavor), 1)

    setActiveFlavors([flavor])
  }

  return (
    <>
      {Object.entries(filteredFlavors).map(([category]) => (
        <div className={styles.itemsWrapper} key={category}>
          <h2 className={styles.subHeader}>{category}</h2>
          {/* @ts-ignore */}
          {filteredFlavors[category].map((flavor: FlavorNames) => (
            <div
              key={flavor}
              id={flavor + '_toggle'}
              className={
                activeFlavors.includes(flavor) ? styles.active : styles.inactive
              }
            >
              {Images.Images({ name: flavor })}
              <div className={styles.positionFlavorTitle}>
                <h2 className={styles.flavorTitle}>{flavor}</h2>
              </div>
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
                          <option
                            key={size}
                            value={size}
                            style={{ fontSize: '1rem' }}
                          >
                            {size}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <div className={styles.SizeOptions}>
                    <div className={styles.quantity}>
                      <h3 className={styles.quantityText}>QUANTITY</h3>
                      <input
                        type="tel"
                        className={styles.numberInput}
                        placeholder={'0'}
                        min={0}
                        max={9}
                        value={quantity}
                        onClick={(e) => {
                          setQuantity(
                            parseInt(e.currentTarget.value) + 1 > 10
                              ? 1
                              : parseInt(e.currentTarget.value) + 1
                          )
                        }}
                      />
                    </div>

                    <div className={styles.addToCart} id={flavor + 'add'}>
                      {Arrow(flavor + 'arrow')}
                      <input
                        type="button"
                        className={styles.addToCartButton}
                        onClick={() => {
                          AddButton(quantity)
                        }}
                      />
                    </div>
                    <div className={styles.itemInfo}>
                      <h3 className={styles.infoPrice}>
                        ${(localPrice / 100).toFixed(2)}
                      </h3>
                      <h3 className={styles.infoName}>{flavor}</h3>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export default Flavors
//  className={styles.flavorWrapper}
