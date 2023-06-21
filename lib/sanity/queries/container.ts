const Container = (id: string) => `*[_type == "containers" && _id == "${id}"] {
  _id,
  name,
  startingRetailPrice,
  startingWholesalePrice,
  image,
}`
export default Container
