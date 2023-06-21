const Size = (sizeId: string[]) => `*[_type == "sizes" && _id in [${sizeId
  .map((id) => `"${id}"`)
  .join(', ')}]] {
  _id,
  name,
  container->{
    _id,
    name
  },
  markupRetail,
  markupWholesale,
  width,
  height,
  length,
  weight,
  maxFlavors
}`

export default Size
