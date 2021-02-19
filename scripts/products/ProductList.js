import { getProducts, useProducts } from "./ProductProvider.js"
import { getCategories, useCategories } from "../categories/CategoryProvider.js"
import { Product } from "./Product.js"
import { CategorySelect } from "../categories/CategorySelect.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".menu__items")

let bakeryProducts = []
let bakeryCategories = []

export const ProductList = () => {
  getProducts()
    .then(getCategories)
    .then(() => {
      bakeryProducts = useProducts()
      bakeryCategories = useCategories()
      render()
    })
}

// Error fix - fixed naming issue in the .find
const render = () => {
  contentTarget.innerHTML = bakeryProducts.map(product => {
    const productCategory = bakeryCategories.find(category => category.id === product.categoryId)

    return Product(product, productCategory)
  }).join("")
}


// listen for category selection 
eventHub.addEventListener("categorySelected", evt => {
  console.log(evt.detail.selectedCategory)
  
    if (evt.detail.selectedCategory === 0 ){
      CategorySelect()
    } else {
      getCategories()
      .then(getProducts)
      .then(() => {
        const products = useProducts()
        const categories = useCategories()
        const filteredProducts = 
  
        render()
      })
    }
  
  })