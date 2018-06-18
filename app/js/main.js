const nav = document.getElementById('main');
const navbar = nav.querySelector('.navitems');
const siteWrap = document.querySelector('.site-wrap');

const logo = document.querySelector('.logo')

logo.addEventListener('click', showMenu);

function showMenu() {
  document.body.classList.toggle('show');
  const navLinks = document.querySelectorAll('.navitems a');
  navLinks.forEach(link => link.addEventListener('click', dump))
  console.log(navLinks)
  event.preventDefault();
}

function dump(){
  document.body.classList.toggle('show');
}

let topOfNav = nav.offsetTop;

function fixNav() {
  if(window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}

fetchData(null, function (content) {
  const markup =
    `<ul>
    ${content.map(
      listItem => `<li><a href="${listItem.link}">${listItem.label}</a></li>`
    ).join('')}
    </ul>`;
  navbar.innerHTML = markup;
  // const logo = document.querySelector('#main ul li');
  // logo.classList.add('logo');
  // logo.firstChild.innerHTML = '<img src="img/logo.svg" />';
  
})

function navigate() {
  let newloc = window.location.hash;
  fetchData(newloc, function (content) {
    let newContent = content.filter( contentItem => contentItem.link == newloc );
    siteWrap.innerHTML = `
    <h2>${newContent[0].header}</h2>
    ${newContent[0].image}
    ${newContent[0].content}
    `;
  })
}

function fetchData(hash, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function () {
    callback(JSON.parse(xhr.response));
  };
  
  xhr.open('GET', 'http://localhost:3004/content', true);
  xhr.send();
}


if (!location.hash) {
  location.hash = '#watchlist';
}

navigate();

window.addEventListener('scroll', fixNav);
window.addEventListener('hashchange', navigate);