'use client'

import { useMemo, memo, createContext, useContext, useState, useEffect } from 'react'

type RGBA = {
  r: number
  g: number
  b: number
  a: number
}

type Theme = {
  colors: {
    0: RGBA
    1: RGBA
    2: RGBA
    3: RGBA
    4: RGBA
    5: RGBA
    6: RGBA
    7: RGBA
    8: RGBA
    9: RGBA
  }
}

type ButtonContextScope = {
  active: boolean
  setActive: (active: boolean) => void
  size: Pick<Range, number>
  setSize: (size: Pick<Range, number>) => void
  boxShadow: Pick<Range, number>
  setBoxShadow: (boxShadow: Pick<Range, number>) => void
  border: Pick<Range, number>
  setBorder: (border: Pick<Range, number>) => void
  theme: Theme
  setTheme: (theme: Theme) => void
}

interface Props {
  children: React.ReactNode
}

type Range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export const ButtonContext = createContext<ButtonContextScope | null>(null)

export const ButtonContextProvider = (props: Props) => {
  const { children } = props
  const [active, setActive] = useState(false)
  const [size, setSize] = useState<Pick<Range, number>>([0])
  const [boxShadow, setBoxShadow] = useState<Pick<Range, number>>([0])
  const [border, setBorder] = useState<Pick<Range, number>>([0])
  const [theme, setTheme] = useState<Theme>({
    colors: {
      0: { r: 255, g: 255, b: 255, a: 1 },
      1: { r: 255, g: 255, b: 255, a: 0.9 },
      2: { r: 255, g: 255, b: 255, a: 0.8 },
      3: { r: 255, g: 255, b: 255, a: 0.7 },
      4: { r: 255, g: 255, b: 255, a: 0.6 },
      5: { r: 255, g: 255, b: 255, a: 0.5 },
      6: { r: 255, g: 255, b: 255, a: 0.4 },
      7: { r: 255, g: 255, b: 255, a: 0.3 },
      8: { r: 255, g: 255, b: 255, a: 0.2 },
      9: { r: 255, g: 255, b: 255, a: 0.1 },
    },
  } as Theme)

  const contextValue: ButtonContextScope = useMemo(
    () => ({
      active,
      setActive,
      size,
      setSize,
      boxShadow,
      setBoxShadow,
      border,
      setBorder,
      theme,
      setTheme,
    }),
    [active, size, boxShadow, border, theme]
  )

  return (
    <ButtonContext.Provider value={contextValue as ButtonContextScope}>
      {children}
    </ButtonContext.Provider>
  )
}

export default memo(ButtonContextProvider)

export const useButtonContext = () => {
  const context = useContext(ButtonContext)
  if (!context) {
    throw new Error('useButtonContext must be used within a ButtonContextProvider')
  }
  return context
}
