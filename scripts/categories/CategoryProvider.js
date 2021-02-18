import { bakeryAPI } from "../Settings.js"

let categories = []

// Error fix - added return  
export const useCategories = () => {
  return categories.slice()
}

// Error fix - added return  
export const getCategories = () => {
  return fetch(`${bakeryAPI.baseURL}/categories`)
    .then(response => response.json())
    .then(categoriesArray => {
      categories = categoriesArray
    })
}
