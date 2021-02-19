import { bakeryAPI } from "../Settings.js"

export const saveReview = (reviewObject) => {
    return fetch(`${bakeryAPI.baseURL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(reviewObject)
    })
  }

const getReviews = () => {
  return fetch(`${bakeryAPI.baseURL}/reviews`)
  .then( )
}