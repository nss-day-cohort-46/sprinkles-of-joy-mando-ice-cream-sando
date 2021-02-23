import { authHelper } from "../auth/authHelper.js"
import { getProducts, useProducts } from "../products/ProductProvider.js"
import { getStatuses, useStatuses } from "../statuses/StatusProvider.js"
import { Order } from "./Order.js"
import { getOrderProducts, useOrderProducts } from "./OrderProductProvider.js"
import { getOrders, useOrders } from "./OrderProvider.js"

const eventHub = document.querySelector("#container")
const contentContainer = document.querySelector(".userOrders")

let customerOrders = []
let orderProducts = []
let products = []
let statuses = []

export const OrderList = () => {
  if (authHelper.isUserLoggedIn()) {

    getOrders().then(getOrderProducts).then(getProducts).then(getStatuses)
      .then(() => {
        const currentCustomerId = parseInt(authHelper.getCurrentUserId())
        orderProducts = useOrderProducts()   //all orderProducts
        products = useProducts()      // all products
        statuses = useStatuses()

        customerOrders = useOrders().filter(order => order.customerId === currentCustomerId && order.statusId !== 4)      // orders that match the customer id
        let customerOrderProducts = customerOrders.map(co => orderProducts.filter(op => op.orderId === co.id)) // array of arrays of orderProducts for each order... for each order in customer orders find the orderProducts that match the orderId
        let arrayOfProductArrays = [] // empty array that will end up being our final array of array of products
        for (const orderProductArray of customerOrderProducts) {
          let productArray = [] // for each array in customerOrderProducts create a new array that will house our products
          for (const orderProduct of orderProductArray) {
            let product = products.find(product => product.id === orderProduct.productId) // for each orderProduct find the Product that has the matching id
            productArray.push(product) // put the product into the newly created array
          }
          arrayOfProductArrays.push(productArray) // put the new array of products that represent 1 order into the total array that represents all orders
        }
        render(arrayOfProductArrays, customerOrders, statuses)  // passing the array of arrays of products and the array of orders
      })
  }
}

const render = (arrayOfProductArrays, arrayOfOrders, arrayOfStatuses) => {
  let ordersHtmlRepresentation = ""

  for (let index = 0; index < arrayOfOrders.length; index++) {    //looping through two arrays at once based on their index
    const productArray = arrayOfProductArrays[index]
    const order = arrayOfOrders[index]
    ordersHtmlRepresentation += Order(order, productArray) // sending the single order and a single array of products related to that order into the Order function
  }


  contentContainer.innerHTML = `
  <div id="orders__modal" class="modal--parent">
        <div class="modal--content">
        <header>  
        <h3>Previous Orders</h3>
        <select class="dropdown" id="statusSelect">
        <option>Sort by order status...</option>
        <option value="0">View all orders</option>

          ${arrayOfStatuses.map(s => `<option value="${s.id}">${s.label}</option>`).join("")}
          </select>
          </header>
          <div>
            <h5>Ordered on</h5>
            ${ordersHtmlRepresentation}
          </div>
          <button id="modal--close">Close</button>
        </div>
    </div>
      `
}

eventHub.addEventListener("change", evt => {
  if (evt.target.id === "statusSelect") {
    const statusEvent = new CustomEvent("statusSelected", {
      detail: {
        selectedStatus: parseInt(evt.target.value)
      }
    })
    eventHub.dispatchEvent(statusEvent)
  }
})

eventHub.addEventListener("statusSelected", evt => {
  const selectedCategory = evt.detail.selectedStatus
  if (selectedCategory === 0) {
    OrderList()
  } else {
    const currentCustomerId = parseInt(authHelper.getCurrentUserId())
    orderProducts = useOrderProducts()   //all orderProducts
    products = useProducts()
    statuses = useStatuses()

    customerOrders = useOrders().filter(order => order.customerId === currentCustomerId && order.statusId === selectedCategory)      // orders that match the customer id
        let customerOrderProducts = customerOrders.map(co => orderProducts.filter(op => op.orderId === co.id)) // array of arrays of orderProducts for each order... for each order in customer orders find the orderProducts that match the orderId
        let arrayOfProductArrays = [] // empty array that will end up being our final array of array of products
        for (const orderProductArray of customerOrderProducts) {
          let productArray = [] // for each array in customerOrderProducts create a new array that will house our products
          for (const orderProduct of orderProductArray) {
            let product = products.find(product => product.id === orderProduct.productId) // for each orderProduct find the Product that has the matching id
            productArray.push(product) // put the product into the newly created array
          }
          arrayOfProductArrays.push(productArray) // put the new array of products that represent 1 order into the total array that represents all orders
        }
        render(arrayOfProductArrays, customerOrders, statuses)
  }
})


eventHub.addEventListener("showPastOrders", () => {
  OrderList()
})

eventHub.addEventListener("click", event => {
  if (event.target.id === "modal--close") {
    closeModal()
  }
})

const closeModal = () => {
  contentContainer.innerHTML = ""
}
