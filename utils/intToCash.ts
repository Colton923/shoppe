export default function intToCash(int: number): string {
  const dollars = Math.floor(int / 100)
  const cents = int % 100
  return `$${dollars}.${cents < 10 ? '0' : ''}${cents}`
}
