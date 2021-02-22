import { getCustomers, useCustomers } from "../customers/CustomerProvider.js";

export const review = (productReviews) => {
    const reviewHTML = ""
            const allCustomers = useCustomers()
            return productReviews.map(review => {
                const customer = allCustomers.find(c => c.id === review.customerId)
                const [fname, lname] = customer.name.split(" ")

                let stars = ""
                for (let index = 0; index < review.rating; index++) {
                    stars += " ⭐ ";
                }
                let blankStars = ""
                for (let index = 0; index < 5 - review.rating; index++) {
                    blankStars += " ☆ ";
                }
                return `<div>${fname}<a href="#" id="reviewLink--${review.id}--${customer.name}">${stars} ${blankStars}</a></div>`
            }).join("")
        

}
