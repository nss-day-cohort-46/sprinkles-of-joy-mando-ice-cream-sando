import { bakeryAPI } from "../Settings.js"

let customers = []

export const useCustomers = () => customers.slice()

export const getCustomers = () => {
  return fetch(`${bakeryAPI.baseURL}/customers`)
    .then(response => response.json())
    .then(parsedResponse => {
      customers = parsedResponse
    })
}
export const getCustomer = (id) => {
  return fetch(`${bakeryAPI.baseURL}/customers/${id}`)
    .then(response => response.json())
}

// takes a customer object and posts it to the api
export const saveCustomer = (customerObject) => {
  return fetch(`${bakeryAPI.baseURL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(customerObject)
  })
}

export const customerLogin = (email, password) => {
  return fetch(`${bakeryAPI.baseURL}/customers?email=${email}&password=${password}`)
    .then(res => res.json())
    .then(user => user.length ? user[0] : false)
}
