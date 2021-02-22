import { getProducts, useProducts } from "./ProductProvider.js"
import { getCategories, useCategories } from "../categories/CategoryProvider.js"
import { Product } from "./Product.js"
import { getReviews, useReviews } from "../reviews/ReviewProvider.js"
import { getCustomers } from "../customers/CustomerProvider.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".menu__items")

// let bakeryProducts = []
// let bakeryCategories = []

export const ProductList = () => {
  getProducts()
    .then(getCategories)
    .then(getReviews)
    // .then(getCustomers)
    .then(() => {
      const bakeryProducts = useProducts()
      const bakeryCategories = useCategories()
      const allReviews = useReviews()
      render(bakeryProducts, bakeryCategories, allReviews)
    })
}

// Error fix - fixed naming issue in the .find
const render = (bakeryProducts, bakeryCategories, allReviews) => {
  contentTarget.innerHTML = bakeryProducts.map(product => {
    const productCategory = bakeryCategories.find(category => category.id === product.categoryId)

    const productReviews = allReviews.filter(review => review.productId === product.id)
    return Product(product, productCategory, productReviews)
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