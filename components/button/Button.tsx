import styles from './Button.module.scss'
import { ButtonContextProvider } from './ButtonContext'
import Input from './Input'

export interface ButtonProps {
  title: string
  onClick: () => void
  size?: string
  type?: string
}

const Button = (props: ButtonProps) => {
  const { title, onClick, type } = props

  return (
    <ButtonContextProvider key={title}>
      <Input
        {...{
          title,
          onClick,
          type,
        }}
      />
    </ButtonContextProvider>
  )
}
export default Button
