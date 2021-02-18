import { saveContact } from './ContactProvider.js'

const eventHub = document.querySelector('#container')
const contentTarget = document.querySelector('.contactFormContainer')

eventHub.addEventListener('click', evt => {
    if (evt.target.id === "contactLink") {
        contentTarget.innerHTML = contactForm()
    }
})

const contactForm = () => {
    return `
    <div id="contact__modal" class="modal--parent">
    <div class="modal--content">
        <h3>Contact Form</h3>
        <form action="">
            <fieldset>
                <label for="contact-name">Name</label>
                <input type="text" id="contact-name" name="contact-name">
            </fieldset>
            <fieldset>
                <label for="contact-email">Email</label>
                <input type="text" id="contact-email" name="contact-email">
            </fieldset>
            <fieldset>
                <label for="contact-phone">Phone: Format 555-555-5555</label>
                <input type="tel" id="contact-phone" name="ccontact-phone" pattern ="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required>
            </fieldset>
            <fieldset>
                <label for="contact-message">Message</label>
                <textarea type="text" id="contact-message" name="contact-message"></textarea>
            </fieldset>
            <button id="contactSubmit">Submit</button>
        </form>
        <button id="formModal--close">Close</button>
    </div>
</div>
`
}

eventHub.addEventListener("click", evt => {
    if (evt.target.id === "contactSubmit") {
        evt.preventDefault()
        const name = document.querySelector('#contact-name').value
        const email = document.querySelector('#contact-email').value
        const phone = document.querySelector('#contact-phone').value
        const message = document.querySelector('#contact-message').value

        const newContact = {
            name: name,
            email: email,
            phone: phone,
            message: message
        }

        if (name === "" || email === "" || phone === "" || message === "") {
            alert("Please complete all fields before submitting your message.")
        } else {
            saveContact(newContact)
        }
    }
})


eventHub.addEventListener("click", event => {
    if (event.target.id === "formModal--close") {
        event.preventDefault()
        closeModal()
    }
})

const closeModal = () => {
    contentTarget.innerHTML = ""
}
