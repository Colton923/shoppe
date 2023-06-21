const ProductsInCategory = (
  categoryId: string
) => `*[_type == "products" && category._ref == ${categoryId}] {
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

export default ProductsInCategory
