
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection")
  let addToy = false;

  const handleClick = () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }

  }

  addBtn.addEventListener("click", handleClick);

  const renderToy = (toyObj) => {
    // create the DOM elements that each toy card should have
    const toyDiv = document.createElement("div")
    const toyName = document.createElement("h2")
    const toyImg = document.createElement("img")
    const toyLikes = document.createElement("p")
    const likeBtn = document.createElement("button")

    // assign properties to the elements
    // toyDiv.className += " card"
    toyDiv.classList.add("card")
    toyName.innerText = toyObj.name
    toyImg.src = toyObj.image
    toyImg.classList.add("toy-avatar")
    toyLikes.innerText = `${toyObj.likes} likes`
    likeBtn.id = toyObj.id
    likeBtn.classList.add("like-btn")
    likeBtn.innerText = "Like"

    toyDiv.append(toyName, toyImg, toyLikes, likeBtn)
    toyCollection.appendChild(toyDiv)

    // toyDiv.appendChild(toyImg)
    // toyDiv.appendChild(toyLikes)
    // toyDiv.appendChild(likeBtn)
  }

  const fetchData = () => {
    fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(data => {
      console.log(data)
      data.forEach(renderToy)
    })
  }

  fetchData()

});
