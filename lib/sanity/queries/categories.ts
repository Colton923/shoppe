const Categories = `*[_type == "categories"] {
  _id,
  name,
  markupRetail[] {
    container->{
      _id,
      name
    },
    value
  },
  markupWholesale[] {
    name->{
      _id,
      name
    },
    value
  }
}`

export default Categories
