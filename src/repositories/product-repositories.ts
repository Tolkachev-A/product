let products = [{ id: 1, name: "tomato" }, { id: 2, name: "cucumber" }]

export const productRepositories = {
  findProducts( title: string | null | undefined ) {
    if (title) {
      const filterProducts = products.filter(p => p.name.indexOf(title) > -1)
      if (filterProducts) {
        return products
      }
    }
    return products
  },

  createProduct( title: string ) {
    const newProduct = { id: new Date().getMilliseconds(), name: title }
    products.push(newProduct)
    return products
  },
  deleteProduct( id: string ) {
    if (id) {

      const newProducts = products.filter(p => p.id.toString() !== id)

      if (newProducts.length < products.length) {
        products = newProducts
        return true

      }
    }
    return false
  },
  updateProduct( idProduct: string, title: string ) {

    const updateProduct = products.find(p => p.id.toString() === idProduct)
    if (updateProduct) {
      updateProduct.name = title

      return true
    }
    return false
  }
}
