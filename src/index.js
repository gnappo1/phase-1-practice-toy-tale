let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {
// });
const addBtn = document.querySelector("#new-toy-btn");
const toyCollection = document.querySelector("#toy-collection")
const addNewToyForm = document.querySelector(".add-toy-form")
const toyFormContainer = document.querySelector(".container");

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});
//! New code here

const URL = "http://localhost:3000/toys"

const createToyCard = (toyInfo) => {
  const toyCard = document.createElement("div")
  toyCard.className = "card"
  toyCard.id = `toy-${toyInfo.id}`
  const h2 = document.createElement("h2")
  h2.textContent = toyInfo.name
  const img = document.createElement("img")
  img.src = toyInfo.image
  img.alt = toyInfo.name
  img.className = "toy-avatar"
  const p = document.createElement("p")
  p.textContent = `${toyInfo.likes} Likes`
  const btn = document.createElement("button")
  btn.textContent = "Like ❤️"
  btn.className = "like-btn"
  btn.id = toyInfo.id
  btn.addEventListener("click", event => {
    fetch(`${URL}/${toyInfo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({likes: ++toyInfo.likes})
    })
    .then(response => response.json())
    .then(updatedToy => {
      event.target.parentElement.querySelector("p").textContent = `${updatedToy.likes} Likes`
    })
    .catch(error => alert(error))
  })

  toyCard.append(h2, img, p, btn)
  toyCollection.append(toyCard)

  // toyCollection.innerHTML += `
  //   <div class="card">
  //     <h2>${toyInfo.name}</h2>
  //     <img src="${toyInfo.image}" alt="${toyInfo.name}" class="toy-avatar" />
  //     <p>${toyInfo.likes} Likes</p>
  //     <button class="like-btn" id="${toyInfo.id}">Like ❤️</button>
  // </div>
  // `

}
//! Fetch all toys

fetch(URL)
.then(response => response.json())
.then(toysData => toysData.forEach(createToyCard))
.catch(error => alert(error))

//! Start working on form
addNewToyForm.addEventListener("submit", function(event){
  event.preventDefault()
  const name = event.target.name.value
  const image = event.target.image.value
  if (name.trim() && image.trim()) { //! If the user inputted data
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name, image, likes:0})
    })
    .then(response => response.json())
    .then(newToyCreated => {
      createToyCard(newToyCreated)//! make sure you use the toy from the second then!!! It will also have an id!!!
      event.target.reset()
    }) 
    .catch(error => alert(error))
  } else {
    alert("Please fill out the whole form!")
  }
})