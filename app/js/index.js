const nav = document.getElementById('main');
const navbar = nav.querySelector('.navitems');
const siteWrap = document.querySelector('.site-wrap');



//newLinks.forEach( link => link.addEventListener('click', detailme) );


// fix the navigation to the top of the page

let topOfNav = nav.offsetTop;

function fixNav() {
 
  if(window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');0000001
    document.body.style.paddingTop = 0;
  }
}

// Show and hide the navigation

const logo = document.querySelector('.logo')

logo.addEventListener('click', showMenu);

function showMenu(e) {
  document.body.classList.toggle('show');
  const navLinks = document.querySelectorAll('.navitems a');
  navLinks.forEach(link => link.addEventListener('click', dump))
  e.preventDefault();
}

function dump(){
  document.body.classList.toggle('show');
}

function fetchLab() {
  fetch('http://localhost:3001/api/recipes')
  .then( res => res.json() )
  .then( data => {
    const markup =
    `<ul>
    ${data.map(
      recipe => `<li><a href="javascript:void(0);" onclick="detailme('${recipe._id}')">${recipe.title}</a></li>`
    ).join('')}
    </ul>`;
    navbar.innerHTML = markup;
  
    let output = '';
  
    data.forEach((recipe) => {
      output += `
        <div class="recipe-preview">
        <h2><a href="javascript:void(0);" onclick="detailme('${recipe._id}')">${recipe.title}</a></h2>
        <img src="/img/recipes/${recipe.image}" />
        <p>${recipe.description}</p>
        <span onclick="deleteme('${recipe._id}');">✖︎</span>
        </div>
      `
    })
  
    siteWrap.innerHTML = output;
  
  })

 
}

fetchLab();

function deleteme(thingtodelete) {
  fetch(`http://localhost:3001/api/recipes/${thingtodelete}`, {
    method: 'delete'
  })
  .then(location.href = '/')
}





function detailme(idd) {

 
 event.preventDefault();

  let recipeId = idd;

  fetch(`http://localhost:3001/api/recipes/${recipeId}`, {
    method: 'get'
  })
  .then(response => response.json())
  .then(data => {
    
    let singleRecipeContent = `
      <div class="recipe-preview">
      <h2>Recipe for ${data.title}</h2>
      <img src="/img/recipes/${data.image}" />
      <h2>Ingredients</h2>
      <ul>
      <li>${data.ingredients[0]}</li>
      <li>${data.ingredients[1]}</li>
      <li>${data.ingredients[2]}</li>
    </ul>
    <h2>Instructions</h2>
      <ul>
        <li>${data.preparation[0].step}</li>
        <li>${data.preparation[1].step}</li>
        <li>${data.preparation[2].step}</li>
      </ul>
      </div>
    `
    siteWrap.innerHTML = singleRecipeContent;
  })
  
}

// end view details

// add
const addForm = document.getElementById('addRecipe');
addForm.addEventListener('submit', addRecipe)

function addRecipe(){
  event.preventDefault();
  let title = document.getElementById('title').value;
  let image = document.getElementById('image').value;
  let description = document.getElementById('description').value;
  fetch('http://localhost:3001/api/recipes/', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({title:title, image:image, description:description})
  })
  .then((res) => res.json())
  .then((data) => console.log(data))
}
// end add



window.addEventListener('scroll', fixNav);


