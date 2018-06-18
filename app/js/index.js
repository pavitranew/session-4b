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

// CONTENT

// 1 build the navbar dynamically from database

fetchLab( (content) => {
  const markup =
  `<ul>
  ${content.map(
    recipe => `<li><a href="#${recipe._id}">${recipe.title}</a></li>`
  ).join('')}
  </ul>`;
  navbar.innerHTML = markup;

  let generatedContent = '';
  for (let i = 0; i < content.length; i++){
    generatedContent += `
    <div class="recipe-preview">
    <h2><a href="recipe/${content[i]._id}">${content[i].title}</a></h2>
    <img src="/img/recipes/${content[i].image}" />
    <p>${content[i].description}</p>
    <span onclick="deleteme('${content[i]._id}')">✖︎</span>
    </div>
    `
  }
  siteWrap.innerHTML = generatedContent;

  const newLinks = document.querySelectorAll('.site-wrap h2 a')
  newLinks.forEach( link => link.addEventListener('click', detailme) )
    
})

// NEW function for getting data - uses fetch and promises

const ApiUrl = 'http://localhost:3001/api/recipes';

function fetchLab(callback) {
  const ApiUrl = 'http://localhost:3001/api/recipes';
  console.log(ApiUrl)
  fetch('http://localhost:3001/api/recipes')
  .then( res => res.json() )
  .then( data => callback(data) )
}

function deleteme(thingtodelete) {
  console.log(thingtodelete)
  fetch(`http://localhost:3001/api/recipes/${thingtodelete}`, {
    method: 'delete'
  })
  .then(location.href = '/')
}

// function fetchOne(recipeId, callback) {
//   // let id = this.getAttribute('href');
//   // console.log(`${ApiUrl}/${recipeId}`)
//   fetch(`http://localhost:3001/api/recipes/${recipeId}`, {
//     method: 'get'
//   })
//   .then(response => response.json())
//   // .then(res => console.log(res))
//   .then(data => callback(data))
// }

// function detailme() {
//   event.preventDefault();
//   let recipeId = this.getAttribute('href').substring(7);
//   console.log(recipeId)
//   fetchOne(recipeId, (content) => {
//     // console.log('content '+content.title)
//     let singleRecipeContent = `
//       <div class="recipe-preview">
//       <h2>Recipe for ${content.title}</h2>
//       <img src="/img/recipes/${content.image}" />
//       <h2>Ingredients</h2>
//       <ul>
//       <li>${content.ingredients[0]}</li>
//       <li>${content.ingredients[1]}</li>
//       <li>${content.ingredients[2]}</li>
//     </ul>
//     <h2>Instructions</h2>
//       <ul>
//         <li>${content.preparation[0].step}</li>
//         <li>${content.preparation[1].step}</li>
//         <li>${content.preparation[2].step}</li>
//       </ul>
//       </div>
//     `
//     siteWrap.innerHTML = singleRecipeContent;
//   })
//   event.preventDefault();
// }


window.addEventListener('scroll', fixNav);