
let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy)
    {
      toyFormContainer.style.display = "block";
    }
    else
    {
      toyFormContainer.style.display = "none";
    }
  });

  const newToyForm = document.querySelector('form.add-toy-form')
  newToyForm.addEventListener('submit', (event) => {
     event.preventDefault();
     handleAdd(event);
     document.querySelector('form.add-toy-form').reset();
   })


  fetchToys();
});

function fetchToys() {
  return fetch('http://localhost:3000/toys')
  .then(res=>res.json())
  .then(toyData=>toyData.forEach(toy=>renderCard(toy))
    )
  //.then(likeHandler)
}



function renderCard(toy) {
  const toyDiv = document.querySelector('#toy-collection')
    let card = document.createElement('div');
    let img = document.createElement('img');
    let h2 = document.createElement('h2');
    let p = document.createElement('p');
    let likeBtn = document.createElement('button');

    let url = toy.image;
    let name = toy.name;
    let likes = toy.likes;
    let id = toy.id

    toyDiv.appendChild(card);
    card.classList.add("card");
    card.setAttribute('id', id)

    card.appendChild(h2)
    h2.innerHTML = name;

    card.appendChild(img);
    img.classList.add('toy-avatar');
    img.src = url;

    card.appendChild(p);
    p.innerHTML = `${likes} likes`

    card.appendChild(likeBtn);
    likeBtn.classList.add("like-btn");
    likeBtn.innerHTML = 'like';

    likeBtn.addEventListener('click', function(){
      p.innerHTML = (likes+= 1) + ' likes';
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method : 'PATCH',
        headers : {
          'Content-Type' : 'application/JSON',
          'Accept' : 'application/JSON'
        },
        body : JSON.stringify({
          'likes' : `${likes}`
        })
      })
    })

}

function handleAdd(event){
  let imgInput = event.target['image'].value;
    let nameInput = event.target['name'].value;

    // let newToy = {
    //   'name': nameInput,
    //   'url' : imgInput
    // }

    fetch('http://localhost:3000/toys', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/JSON',
        'Accept' : 'application/JSON'
      },
      body : JSON.stringify({
        "name" : nameInput,
        "image" : imgInput,
        "likes" : 0
      })
    }).then(res=>res.json())
    .then(toy=>renderCard(toy))


}