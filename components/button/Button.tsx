import styles from './Button.module.scss'

interface ButtonProps {
  title: string
  onClick: () => void
}

const Button = (props: ButtonProps) => {
  return (
    <div className={styles.button}>
      <div className={styles.button__backdrop}></div>
      <input
        className={styles.button__button}
        type="button"
        value={props.title}
        onClick={props.onClick}
      />
    </div>
  )
}
export default Button
