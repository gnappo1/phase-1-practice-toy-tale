let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollection = document.getElementById("toy-collection")
const newToyForm = document.querySelector("#add-toy-form")
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});
// });

fetch('http://localhost:3000/toys')
.then(response => response.json())
.then(toys => toys.forEach(toy => renderToy(toy)))

function renderToy(toyData) {
  const div = document.createElement("div")
  div.className = "card"
  const h2 = document.createElement("h2")
  h2.innerText = toyData["name"]
  const img = document.createElement("img")
  img.className = "toy-avatar"
  img.src = toyData["image"]
  img.alt = toyData["name"]
  const p = document.createElement("p")
  p.innerText = `${toyData["likes"]} Likes`
  const button = document.createElement("button")
  button.addEventListener("click", e => {
    p.innerText = `${++toyData["likes"]} Likes`
  })
  button.className = "like-btn"
  button.id = toyData["id"]
  button.textContent = "Like ❤️"

  div.append(h2, img, p, button) //! The div is still NOT on the page
  toyCollection.append(div)

//   toyCollection.innerHTML += `
//     <div class="card">
//     <h2>${toyData["name"]}</h2>
//     <img src=${toyData["image"]} alt=${toyData["name"]} class="toy-avatar" />
//     <p>${toyData["likes"]} Likes</p>
//     <button class="like-btn" id=${toyData["id"]}>Like ❤️</button>
//   </div>
// `
}

newToyForm.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
  //! fill in the form logic using the suggestions in the internal server and the lecture about event from last Thursday
}