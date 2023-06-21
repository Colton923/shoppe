const Product = (
  productId: string
) => `*[_type == "products" && _id == "${productId}"] {
  _id,
  name,
  description,
  image,
  wholesalePrice,
  retailPrice,
  category->{
    _ref,
    type,
  },
  width,
  height,
  length,
  weight
}`

export default Product
