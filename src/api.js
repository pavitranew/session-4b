import {navbar, siteWrap} from './dom';

export function choosePageRendering(){
  console.log('choosePage hash is ' + window.location.hash)
  if(window.location.hash === '#recipes'){
    fetchLab()
  } else {
    showDetailPage()
  }
}

export function fetchLab() {

  console.log('fetchLab hash is ' + window.location.hash || null)

  fetch('http://localhost:3001/api/recipes')
  .then( res => res.json() )
  .then( data => {
    const markup =
    `<ul>
    ${data.map(
      recipe => `<li><a href="#recipe/${recipe._id}">${recipe.title}</a></li>`
    ).join('')}
    </ul>`;
    navbar.innerHTML = markup;
  
    let output = '';
  
    data.forEach((recipe) => {
      output += `
        <div class="recipe-preview">
        <h2><a href="#recipe/${recipe._id}">${recipe.title}</a></h2>
        <img src="/img/recipes/${recipe.image}" />
        <p>${recipe.description}</p>
        </div>
      `
    })
  
    siteWrap.innerHTML = output;
  
  })
}

export function showDetailPage(){

  console.log('showDetailPage hash is ' + window.location.hash)

  let navLinkId = window.location.hash.substring(8);

  fetch(`http://localhost:3001/api/recipes/${navLinkId}`, {
    method: 'get'
  }).then(response => response.json())
  .then( data => {
    let recipeContent = `
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
  siteWrap.innerHTML = recipeContent;
  })
}
