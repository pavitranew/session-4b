const nav = document.getElementById('main');
const navbar = nav.querySelector('.navitems');
const siteWrap = document.querySelector('.site-wrap');

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

// NEW function for getting data - uses fetch and promises

const ApiUrl = 'http://localhost:3001/api/recipes';

function fetchLab() {
  fetch('http://localhost:3001/api/recipes')
  .then( res => res.json() )
  .then( data => {
    const markup =
    `<ul>
    ${data.map(
      recipe => `<li><a href="#${recipe._id}">${recipe.title}</a></li>`
    ).join('')}
    </ul>`;
    navbar.innerHTML = markup;
  
    let output = '';
  
    data.forEach((recipe) => {
      output += `
        <div class="recipe-preview">
        <h2><a href="recipe/${recipe._id}">${recipe.title}</a></h2>
        <img src="/img/recipes/${recipe.image}" />
        <p>${recipe.description}</p>
        <span onclick="deleteme('${recipe._id}')">✖︎</span>
        </div>
      `
    })
  
    siteWrap.innerHTML = output;
  
    const newLinks = document.querySelectorAll('.site-wrap h2 a')
    newLinks.forEach( link => link.addEventListener('click', detailme) )
  })
}

function deleteme(thingtodelete) {
  console.log(thingtodelete)
  fetch(`http://localhost:3001/api/recipes/${thingtodelete}`, {
    method: 'delete'
  })
  .then(location.href = '/')
}

function detailme() {
  event.preventDefault();

  let recipeId = this.getAttribute('href').substring(7);

  fetch(`http://localhost:3001/api/recipes/${recipeId}`, {
    method: 'get'
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
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

fetchLab();
window.addEventListener('scroll', fixNav);


const addForm = document.getElementById('addRecipe');
addForm.addEventListener('submit', addRecipe)

function addRecipe(){
  event.preventDefault();
  let label = document.getElementById('label').value;
  let header = document.getElementById('header').value;
  let description = document.getElementById('description').value;
  fetch('http://localhost:3001/api/recipes/', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({label:label, header:header, description:description})
  })
  .then((res) => res.json())
  .then((data) => console.log(data))
}