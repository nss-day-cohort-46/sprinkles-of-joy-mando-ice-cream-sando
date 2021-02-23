import { bakeryAPI } from "../Settings.js"
import { deleteOrder } from "./OrderProvider.js"

let orderProducts = []

const eventHub = document.querySelector("#container")

export const useOrderProducts = () => orderProducts.slice()

export const getOrderProducts = () => {
  return fetch(`${bakeryAPI.baseURL}/orderproducts`)
    .then(response => response.json())
    .then(apiData => {
      orderProducts = apiData
    })
}

export const saveOrderProducts = (orderProductsArray) => {
  const orderProductsPromiseArray = orderProductsArray.map(op => {
    return fetch(`${bakeryAPI.baseURL}/orderproducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(op)
    })
  })
  return Promise.all(orderProductsPromiseArray)
}

// listens for archive order event. Deletes all orderProducts data, then the order data.
eventHub.addEventListener("deleteOrder", deleteEvt => {

      const orderId = deleteEvt.detail
      deleteOrder(orderId)
})