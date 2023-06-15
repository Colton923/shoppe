import { Arima, Poppins } from 'next/font/google'

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

export { arima, poppins }
