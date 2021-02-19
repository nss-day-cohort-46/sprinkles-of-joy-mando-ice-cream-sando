import { bakeryAPI } from "../Settings.js"

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

eventHub.addEventListener("deleteOrder", deleteEvt => {
  const orderId = deleteEvt.detail
  // iterated over orderProducts to get array of correct objcets, then run delete function
  deleteOrderProduct(orderProductId)
})