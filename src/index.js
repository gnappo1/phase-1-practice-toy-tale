{/* <div class="card">
  <h2>Woody</h2>
  <img src="[toy_image_url]" class="toy-avatar" />
  <p>4 Likes</p>
  <button class="like-btn" id="[toy_id]">Like ❤️</button>
</div> */}


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
      toyCollection.innerHTML += `
        <div class="card">
          <h2>${data.name}</h2>
          <img src=${data.image} class="toy-avatar" alt=${data.name}/>
          <p>${data.likes} Likes</p>
          <button class="like-btn" id=${data.id}>Like ❤️</button>
        </div>
      `
      e.target.reset()
    } catch (error) {
      alert(error)
    }
  }
  
  postToy()

})

//! Invoke logic
fetchData("http://localhost:3000/toys")
.then(toys => toys.forEach(toy => {
  toyCollection.innerHTML += `
    <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" alt=${toy.name}/>
      <p>${toy.likes} Likes</p>
      <button class="like-btn" id=${toy.id}>Like ❤️</button>
    </div>
  `
}))
.then(() => {
  const allToyLikeButtons = document.querySelectorAll("div.card button")
  allToyLikeButtons.forEach(button => button.addEventListener("click", (e) => {
    let paragraph = e.target.previousElementSibling
    let likesNum = parseInt(paragraph.innerText.replace(" Likes", ""))
    paragraph.innerText = `${++likesNum} Likes`
  }))
})


