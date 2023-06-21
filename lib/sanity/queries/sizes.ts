const Sizes = `*[_type == "sizes"] {
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

export default Sizes
