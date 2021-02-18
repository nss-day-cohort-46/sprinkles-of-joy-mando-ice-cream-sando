const eventHub = document.querySelector('#container')
const contentTarget = document.querySelector('.contactFormContainer')

eventHub.addEventListener('click', evt => {
    if (evt.target.id === "contactLink") {
        contentTarget.innerHTML = contactForm()
    }
})

const contactForm = () => {
return`
<div> This Worked</div>
`
}

eventHub.addEventListener("click", event => {
    if (event.target.id === "modal--close") {
      closeModal()
    }
  })
  
  const closeModal = () => {
    contentContainer.innerHTML = ""
  }
  