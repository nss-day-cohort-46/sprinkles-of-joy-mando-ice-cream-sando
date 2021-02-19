

export const Order = (customerOrder, productArray) => {
  let totalPrice = 0
  let productArrayHTMLrep = productArray.map(product => {
    totalPrice += product.price                             //adding the price of each individual item
    return `<li>${product.name}</li>`                       //putting the individual product name into list elements
  }).join("")
  
  debugger

  const deleteButton = () => {
    if (customerOrder.status.id === 1){
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
