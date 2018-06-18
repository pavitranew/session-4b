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
  console.log(content)
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
    
})

// NEW function for getting data - uses fetch and promises

function fetchLab(callback) {
  fetch('http://localhost:3001/api/recipes')
  // .then( res => console.log(res) )
  .then( res => res.json() )
  // .then( res => console.log(res) )
  .then( data => callback(data) )
}

window.addEventListener('scroll', fixNav);