import { bakeryAPI } from "../Settings.js"

export const saveReview = (reviewObject) => {
  return fetch(`${bakeryAPI.baseURL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reviewObject)
  })
}

let reviews = []

export const getReviews = () => {
return fetch(`${bakeryAPI.baseURL}/reviews`)
    .then( response => response.json())
    .then(
      parsedReviews => {
        reviews = parsedReviews
      }
    )
}

export const useReviews = () => {
  return reviews.slice()
}

// TO DO
// 1. get and use reviews
// 2. when populating products, pass an argument of a review object
// 3. add html for product reviews under each product
// 4. add exception so "No reviews yet" displays for unreviewed product
// 5. modal css classes so each review appears when clicked, closes when clicked