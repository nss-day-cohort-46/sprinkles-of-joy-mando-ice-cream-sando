import { getProducts, useProducts } from "./ProductProvider.js"
import { getCategories, useCategories } from "../categories/CategoryProvider.js"
import { Product } from "./Product.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".menu__items")

// let bakeryProducts = []
// let bakeryCategories = []

export const ProductList = () => {
  getProducts()
    .then(getCategories)
    .then(() => {
      const bakeryProducts = useProducts()
      const bakeryCategories = useCategories()
      render(bakeryProducts, bakeryCategories)
    })
}

// Error fix - fixed naming issue in the .find
const render = (bakeryProducts, bakeryCategories) => {
  contentTarget.innerHTML = bakeryProducts.map(product => {
    const productCategory = bakeryCategories.find(category => category.id === product.categoryId)

    return Product(product, productCategory)
  }).join("")
}


// listen for category selection, filter products by selection 
eventHub.addEventListener("categorySelected", evt => {
  const selectedCategory = evt.detail.selectedCategory
  
    if (selectedCategory === 0 ){
      ProductList()
    } else {
      getCategories()
      .then(getProducts)
      .then(() => {
        const products = useProducts()
        const categories = useCategories()
        const filteredProducts = products.filter(p => p.categoryId === selectedCategory)
        render(filteredProducts, categories)
      })
    }
  
  })