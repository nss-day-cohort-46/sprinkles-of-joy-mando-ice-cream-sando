import { getReviewById } from '../reviews/ReviewProvider.js'
import { review } from '../reviews/Review.js'
const eventHub = document.querySelector("#container")

export const Product = (product, category, productReviews) => {
    let reviewHTML = "<p>No Reviews Yet...</p>"
    const reviews = review(productReviews)
    if (productReviews.length > 0) {
        reviewHTML = reviews
    } 

    return `
      <section class="baked_good">
          <header class="baked_good__header">
              <h4>${product.name}</h4>
              <p>$${product.price}</p>
          </header>
          <div>
              <button id="addProduct--${product.id}">Add to Cart</button>
              <button id="addReview--${product.id}">Add Review</button>
              <p>${product.description} [${category.name}]</p>
          </div>
          <div class="reviewContainer">
            ${reviewHTML}
          </div>
      </section>
  `
}

eventHub.addEventListener("click", evt => {
    if (evt.target.id.startsWith("reviewLink--")) {
        const [prefix, reviewId] = evt.target.id.split("--")
        const contentTarget = document.querySelector('.contactFormContainer')
        contentTarget.innerHTML = reviewModal(parseInt(reviewId))
    }
})

const reviewModal = (reviewId) => {
    const currentReview = getReviewById(reviewId)
    return `
    <div id="review__modal" class="modal--parent">
    <div class="modal--content">
        <h3>${currentReview.title}</h3>
        <p>${currentReview.text}</p>
        <button id="formModal--close">Close</button>
    </div>
</div>
    `
}

eventHub.addEventListener("click", evt => {
    if (evt.target.id.startsWith("addProduct--")) {
        const [prefix, productId] = evt.target.id.split("--")
        const addProductEvent = new CustomEvent("addToCart", {
            detail: {
                addedProduct: parseInt(productId)
            }
        })
        eventHub.dispatchEvent(addProductEvent)
    }
})

eventHub.addEventListener("click", evt => {
    if (evt.target.id.startsWith("addReview--")) {
        const [prefix, productId] = evt.target.id.split("--")
        const addReviewEvent = new CustomEvent("saveReview", {
            detail: {
                productId: parseInt(productId)
            }
        })
        eventHub.dispatchEvent(addReviewEvent)
    }
})