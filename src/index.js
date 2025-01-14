

// document.addEventListener("DOMContentLoaded", () => {
  //! Global Variables
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");
  const toyForm = document.querySelector("form")
  
  
  
  //! Helper Functions
  //! we create an async func to wrap our fetch logic
  //! best practice: try..catch statement inside
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/toys")
      const data = await response.json()
      return data
    } catch (error) {
      alert(error)
    }
  }
  
const displayToy = (toy) => {
  const div = document.createElement("div")
  div.className = "card"

  const h2 = document.createElement("h2")
  h2.innerText = toy.name
  
  const img = document.createElement("img")
  img.className = "toy-avatar"
  img.src = toy.image
  img.alt = toy.name

  const p = document.createElement("p")
  p.innerText = `${toy.likes} Likes`
  
  const button = document.createElement("button")
  button.className = "like-btn"
  button.id = toy.id
  button.innerText = "Like ❤️"
  button.addEventListener("click", () => {
    p.innerText = `${++toy.likes} Likes`
  })

  div.append(h2, img, p, button)
  toyCollection.append(div)
}
//! Attach Listeners

addBtn.addEventListener("click", () => {
  toyFormContainer.classList.toggle("collapsed")
});

//! The second arg is a anonymous arrow callback async function
toyForm.addEventListener("submit", (e) => {
  e.preventDefault() //! ALWAYS THE FIRST STEP

  //! Extract the data and package it inside an object
  const newToy = {
    name: e.target.name.value.trim(),
    image: e.target.image.value.trim(),
    likes: 0
  }

  //! Validate the data!
  if (!newToy.name || !newToy.image) {
    alert("Please fill out both name and image fields!")
    return
  }

  //! Define and Fire the logic for the POST request
  const postToy = async () => {
    try {
      //! Fire the Request to the server, DO NOT FORGET about the second configuration object
      const response = await fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newToy)
      })
      //! Extract the json data out of the Response body
      const data = await response.json()
      //! Append the newly created data onto the page
      displayToy(data)
      e.target.reset()
    } catch (error) {
      alert(error)
    }
  }
  
  postToy()

})

//! Invoke logic
fetchData("http://localhost:3000/toys")
  .then(toys => toys.forEach(toy => displayToy(toy)))


