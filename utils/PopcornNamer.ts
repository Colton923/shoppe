type PopcornName = {
  size: string
  flavor: string[]
}

export default function PopcornNamer(item: PopcornName) {
  let name = ''
  name += item.size
  name += ' of '
  if (item.flavor.length > 1) {
    item.flavor.forEach((flavor) => {
      name += flavor
      name += ', '
    })
  } else {
    name += item.flavor[0]
    name += ' '
  }
  name += 'Popcorn'
  return name
}
