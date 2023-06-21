const FlavorCategory = (
  categoryId: string,
  flavorId: string,
  containerName: string,
  size: string
) => `*[_type == "flavors" && _id == "${flavorId}"] {
  _id,
  name,
  "category": *[_type == "categories" && _id == "${categoryId}"] {
    _id,
    markupRetail,
    markupWholesale,
    "container": *[_type == "containers" && name == "${containerName}"] {
      startingRetailPrice,
      startingWholesalePrice
    }
  },
  "size": *[_type == "sizes" && _id == "${size}" && container._ref in *[_type == "containers" && name == "${containerName}"]._id] {
    _id,
    name,
    markupRetail,
    markupWholesale,
    "container": *[_type == "containers" && name == "${containerName}"] {
      startingRetailPrice,
      startingWholesalePrice
    },
    width,
    height,
    length,
    weight,
    maxFlavors,
  },
}`

export default FlavorCategory
