import { ButtonProps } from './Button'
import styles from './Button.module.scss'
import { useButtonContext } from './ButtonContext'

const Input = (props: ButtonProps) => {
  const { title, onClick, size } = props
  const { setSize } = useButtonContext()

  return (
    <div className={styles.button}>
      <div className={styles.button__backdrop}></div>
      <input
        className={styles.button__button}
        type="button"
        value={title}
        onClick={onClick}
      />
    </div>
  )
}

export default Input
