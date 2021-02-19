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

const deleteOrderProduct = orderProductId => {
  return fetch(`${bakeryAPI.baseURL}/orderproducts/${orderProductId}`, {
    method: "DELETE"
  })
}

// listens for delete order event. Deletes all orderProducts data, then the order data.
eventHub.addEventListener("deleteOrder", deleteEvt => {
  getOrderProducts()
    .then()
    .then(() => {
      const orderId = deleteEvt.detail
      const orderProducts = useOrderProducts()
      const filteredOrdProd = orderProducts.filter(item => item.orderId === orderId)

      for (const item of filteredOrdProd) {
        deleteOrderProduct(item.id)
      }
    })
    .then(() => {
      const orderId = deleteEvt.detail
      deleteOrder(orderId)
    })
})