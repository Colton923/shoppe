import styles from './Button.module.scss'
import { ButtonContextProvider } from './ButtonContext'
import Input from './Input'

export interface ButtonProps {
  title: string
  onClick: () => void
  size?: string
}

const Button = (props: ButtonProps) => {
  const { title, onClick } = props

  return (
    <ButtonContextProvider key={title}>
      <Input
        {...{
          title,
          onClick,
        }}
      />
    </ButtonContextProvider>
  )
}
export default Button
