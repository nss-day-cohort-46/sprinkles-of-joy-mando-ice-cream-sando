import { getCategories, useCategories } from "./CategoryProvider.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".filter__category")

let categories = []

// Error fix #1 - added missing .then syntax
export const CategorySelect = () => {
  getCategories()
  .then(() => {
    categories = useCategories()
    render(categories)
  }
  )
}

const render = (categories) => {
  debugger
  contentTarget.innerHTML = `
      <select class="dropdown" id="categorySelect">
          <option value="0">All baked goods...</option>
          ${categories.map(category => `<option value="${category.id}">${category.name}</option>`).join("")}
      </select>
  `
}

eventHub.addEventListener("change", changeEvent => {
  if (changeEvent.target.id === "categorySelect") {
    const categoryCustomEvent = new CustomEvent("categorySelected", {
      detail: {
        selectedCategory: changeEvent.target.value
      }
    })
    eventHub.dispatchEvent(categoryCustomEvent)
  }
})
