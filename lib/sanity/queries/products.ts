const Products = `*[_type == "products"] {
  _id,
  name,
  description,
  image,
  wholesalePrice,
  retailPrice,
  category->{
    _id,
    name
  },
  width,
  height,
  length,
  weight
}`

export default Products
