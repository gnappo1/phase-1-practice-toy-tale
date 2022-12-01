
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form");
  const toyCollection = document.querySelector("#toy-collection")
  let addToy = false;

  const handleClick = (event) => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }

  }

  const handleSubmit = (event) => { 
    event.preventDefault()
    toy = {}
    // toy.id = toyCollection.childNodes.length + 1
    toy.name = event.target.name.value
    toy.image = event.target.image.value
    toy.likes = 0
    // renderToy(toy)

    const configObj = {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toy)
    }

    fetch("http://localhost:3000/toys", configObj)
    .then(response => response.json())
    .then(newToy => renderToy(newToy))
    .catch(error => alert(error))


    event.target.reset()
  }

  addBtn.addEventListener("click", handleClick);
  toyForm.addEventListener("submit", handleSubmit);

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
