import type { Popcorn } from 'types/SanityItem'

export default function PopcornNamer(item: Popcorn) {
  let name = ''
  if (item.size) {
    name += item.size.name as string
    name += (' ' + item.size.container?.name) as string
    name += ' of '
  }

  if (item.flavor.length > 1) {
    item.flavor.forEach((flavor) => {
      name += flavor.name as string
      name += ', '
    })
    name += 'Popcorn'
    return name
  } else {
    console.log('item.flavor[0]', item.flavor[0])
    name += item.flavor[0].name as string
    name += ' '
    name += 'Popcorn'
    return name
  }
}
