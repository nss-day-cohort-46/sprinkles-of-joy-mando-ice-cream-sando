import { bakeryAPI } from "../Settings.js"
import { saveOrderProducts } from "./OrderProductProvider.js"
import { OrderList } from "./OrderList.js"

const eventHub = document.querySelector("#container")

let orders = []

export const useOrders = () => orders.slice()

export const getOrders = () => {
  return fetch(`${bakeryAPI.baseURL}/orders?_expand=status`)
    .then(response => response.json())
    .then(response => {
      orders = response
    })
}

export const saveOrder = (order, productsInOrder) => {
  return fetch(`${bakeryAPI.baseURL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
    .then(res => res.json())    //// gets the object that was just saved
    .then((createdOrder) => {  //// createdOrder is now the the order obj that was just saved
      const orderProducts = productsInOrder.map(product => {
        return {
          "orderId": createdOrder.id,
          "productId": product.id
        }
      })
      return saveOrderProducts(orderProducts)
    })
    .then(() => getOrders())
    .then(dispatchStateChangeEvent)
}

const dispatchStateChangeEvent = () => {
  const ordersStateChangedEvent = new CustomEvent("ordersStateChanged")
  
  eventHub.dispatchEvent(ordersStateChangedEvent)
}

const deleteOrder = orderId => {
  return fetch(`${bakeryAPI.baseURL}/orders/${orderId}`, {
    method: "DELETE"
  })
  .then(OrderList)
}

// calls delete order function with the orderId of the clicked order
eventHub.addEventListener("deleteOrder", deleteEvt => {
  const orderId = deleteEvt.detail
  deleteOrder(orderId)
})