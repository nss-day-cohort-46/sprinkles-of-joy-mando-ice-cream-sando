import { review } from '../reviews/Review.js'
import { authHelper } from '../auth/authHelper.js'
import { getReviewById, deleteReview } from '../reviews/ReviewProvider.js'
import { ProductList } from './ProductList.js'

const eventHub = document.querySelector("#container")

export const Product = (product, category, productReviews) => {
    const reviews = review(productReviews)
    let reviewHTML = ""
    if (productReviews.length > 0) {
        reviewHTML = reviews
    } else {
        reviewHTML = "<p>No Reviews Yet...</p>"
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
          <h4>Reviews:</h4>
            ${reviewHTML}
          </div>
      </section>
  `
}

eventHub.addEventListener("click", evt => {
    if (evt.target.id.startsWith("reviewLink--")) {
        const [prefix, reviewId, name] = evt.target.id.split("--")
        const contentTarget = document.querySelector('.contactFormContainer')
        contentTarget.innerHTML = reviewModal(parseInt(reviewId),name)
    }
})

const reviewModal = (reviewId,name) => {
    const currentReview = getReviewById(reviewId)
    let deleteButton = ""
    if(currentReview.customerId === parseInt(authHelper.getCurrentUserId())){
        deleteButton = `<button id="deleteReview--${reviewId}">Delete</button>`
    }
    return `
    <div id="review__modal" class="modal--parent">
    <div class="modal--content">
        <h3>Title : ${currentReview.title}</h3>
        <p>Text : ${currentReview.text}</p>
        <p>Author : ${name}</p>
        <button id="formModal--close">Close</button>
        ${deleteButton}
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

eventHub.addEventListener("click", evt => {
    if (evt.target.id.startsWith("deleteReview--")) {
        const [prefix, reviewId] = evt.target.id.split("--")
        deleteReview(reviewId).then(document.querySelector('.contactFormContainer').innerHTML = "")
        .then(ProductList())
    }  
})