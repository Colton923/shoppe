import { Arima, Poppins, Pacifico } from 'next/font/google'

const arima = Arima({
  weight: ['400', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-arima',
})

const poppins = Poppins({
  weight: ['400', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-poppins',
})

const cursive = Pacifico({
  weight: ['400'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-cursive',
})

export { arima, poppins, cursive }
