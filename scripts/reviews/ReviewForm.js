import {saveReview} from "./ReviewProvider.js"
import {authHelper} from "../auth/authHelper.js"

const eventHub = document.querySelector('#container')
const contentTarget = document.querySelector('.contactFormContainer')
let productId
eventHub.addEventListener("saveReview", evt => {
    const currentCustomerId = parseInt(authHelper.getCurrentUserId())
    if(currentCustomerId){
        productId = evt.detail.productId
        contentTarget.innerHTML = reviewForm()
    }else{
        alert("please login to leave a review")
    }
})


const reviewForm = () => {
    return `
    <div id="contact__modal" class="modal--parent">
    <div class="modal--content">
        <h3>Contact Form</h3>
        <form action="" id="reviewForm">
            <fieldset>
                <label for="reviewTitle">title</label>
                <input type="text" id="reviewTitle" name="reviewTitle">
            </fieldset>
            <fieldset>
                <label for="reviewText">review</label>
                <textarea type="text" id="reviewText" name="reviewText"></textarea>
            </fieldset>
            <input type="radio" id="1" name="rating" value="1">
            <label for="rating1">1</label>
            <input type="radio" id="2" name="rating" value="2">
            <label for="rating2">2</label>
            <input type="radio" id="3" name="rating" value="3">
            <label for="rating3">3</label>
            <input type="radio" id="4" name="rating" value="4">
            <label for="rating4">4</label>
            <input type="radio" id="5" name="rating" value="5">
            <label for="rating5">5</label>
            <button id="reviewSubmit">Submit</button>
        </form>
        <button id="formModal--close">Close</button>
    </div>
</div>
`
}

eventHub.addEventListener("click", evt => {
    if (evt.target.id === "reviewSubmit") {
        evt.preventDefault()
            const title = document.querySelector('#reviewTitle').value
            const text = document.querySelector('#reviewText').value
            const ratings = document.getElementsByName('rating')
            const currentCustomerId = parseInt(authHelper.getCurrentUserId())
            let ratingValue
            for (const rating of ratings) {
                if(rating.checked){
                    ratingValue = rating.value
                }    
            }
            const newReview = {
                title: title,
                text : text,
                rating : parseInt(ratingValue),
                customerId : currentCustomerId,
                productId : productId
            }
            if (title === "" || text === "" || ratingValue === "") {
                alert("Please complete all fields before submitting your message.")
            } else {
                saveReview(newReview)
                const thisForm = document.querySelector('#reviewForm')
                thisForm.reset()
                alert("Sucess! Thanks For your review")
            }
    }
})