import { ButtonProps } from './Button'
import styles from './Button.module.scss'
import { useButtonContext } from './ButtonContext'

const Input = (props: ButtonProps) => {
  const { title, onClick, size, type } = props
  const { setSize } = useButtonContext()

  return (
    <div className={styles.button}>
      <input
        className={styles.button__button}
        type={type}
        value={title || 'input-value'}
        onClick={onClick}
        onChange={() => {
          null
        }}
      />
    </div>
  )
}

export default Input
