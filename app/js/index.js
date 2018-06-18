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
    listItem => `<li><a href="#${listItem.label}">${listItem.label}</a></li>`
  ).join('')}
  </ul>`;
  navbar.innerHTML = markup;
})

// 2 set the content when the user navigates

function navigate() {
  // substr removes the hash - returns the part of a string between the start index and a number of characters after it.
  let newloc = location.hash.substr(1);
  fetchLab((content) => {
    let newContent = content.filter(contentItem => contentItem.label == newloc);
    siteWrap.innerHTML = `
    <h2>${newContent[0].header}</h2>
    ${newContent[0].image}
    ${newContent[0].content}
    `;
  })
}

// NEW function for getting data - uses fetch and promises

function fetchLab(callback) {
  fetch('https://api.mlab.com/api/1/databases/bcl/collections/entries?apiKey=oZ92RXFzah01L1xNSWAZWZrm4kn6zF0n')
  // .then( res => console.log(res) )
  .then( res => res.json() )
  // .then( res => console.log(res) )
  .then( data => callback(data) )
}

// OLD - XMLHttpRequest replaced by fetch above

// function fetchData(hash, callback) {
//   var xhr = new XMLHttpRequest();

//   xhr.onload = function () {
//     callback(JSON.parse(xhr.response));
//   };

//   xhr.open('GET', 'http://localhost:3004/content', true);
//   xhr.send();
// }


if (!location.hash) {
  location.hash = '#watchlist';
}

navigate();

window.addEventListener('scroll', fixNav);
window.addEventListener('hashchange', navigate);