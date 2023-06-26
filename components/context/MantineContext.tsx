'use client'
import { createContext, memo, useMemo, useContext, useState } from 'react'
import { MantineProvider, MantineProviderProps } from '@mantine/core'

const DarkColors = [
  '#0c0002',
  '#150004',
  '#1c0004',
  '#210003',
  '#290806',
  '#330e06',
  '#3c1305',
  '#4a2303',
  '#543500',
  '#584900',
]

const LightColors = [
  '#f6eefc',
  '#f6dbf2',
  '#fac7e1',
  '#ffb3c8',
  '#ffb1b7',
  '#ffb0a5',
  '#ffb293',
  '#ffc493',
  '#ffd897',
  '#ffeba0',
]

type MantineContextScope = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  colorset?: typeof DarkColors | typeof LightColors
}

export interface Props {
  children: React.ReactNode
}

export const MantineContext = createContext<MantineContextScope | null>(null)

export const MantineContextProvider = (props: Props) => {
  const { children } = props

  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [colorset, setColorset] = useState<typeof DarkColors | typeof LightColors>(
    DarkColors
  )

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    setColorset(theme === 'light' ? DarkColors : LightColors)
  }

  const contextValue = useMemo<MantineContextScope | null>(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  )

  return (
    <MantineContext.Provider value={contextValue as MantineContextScope}>
      <MantineProvider
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: theme,
          colors: {
            lightColors: [
              '#f6eefc',
              '#f6dbf2',
              '#fac7e1',
              '#ffb3c8',
              '#ffb1b7',
              '#ffb0a5',
              '#ffb293',
              '#ffc493',
              '#ffd897',
              '#ffeba0',
            ],
            darkColors: [
              '#0c0002',
              '#150004',
              '#1c0004',
              '#210003',
              '#290806',
              '#330e06',
              '#3c1305',
              '#4a2303',
              '#543500',
              '#584900',
            ],
          },
        }}
      >
        {children}
      </MantineProvider>
    </MantineContext.Provider>
  )
}

export default memo(MantineContextProvider)

export const useMantineContext = () => {
  const context = useContext(MantineContext)
  if (!context) {
    throw new Error('useMantineContext must be used within a MantineContextProvider')
  }
  return context
}
