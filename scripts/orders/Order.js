const eventHub = document.querySelector("#container")

export const Order = (customerOrder, productArray) => {
  let totalPrice = 0
  let productArrayHTMLrep = productArray.map(product => {
    totalPrice += product.price                             //adding the price of each individual item
    return `<li>${product.name}</li>`                       //putting the individual product name into list elements
  }).join("")

// if the order is ready for pickup, add a delete button to the order
  const deleteButton = () => {
    if (customerOrder.status.id === 1) {
      return `<button id="deleteOrder--${customerOrder.id}">Delete</button>`
    } else {
      return ``
    }
  }

  return `
    <div class="order">
      <p>${new Date(customerOrder.timestamp).toLocaleString('en-US')}</p>
      <p>${customerOrder.status.label}</p>
      <ul>${productArrayHTMLrep}</ul>
    <p>${totalPrice}</p>
    </div>
    ${deleteButton()}
  `
}

//if the delete button is clicked, broadcast event with orderId for detail
eventHub.addEventListener("click", evt => {
  if (evt.target.id.startsWith("deleteOrder--")) {
    const [prefix, orderId] = evt.target.id.split("--")
    const deleteOrderEvent = new CustomEvent("deleteOrder", {
      detail: parseInt(orderId)
    })
    eventHub.dispatchEvent(deleteOrderEvent)
  }
})