# IV - Client Side with ExpressJS 

## Reading

A good video on the [Fetch API](https://youtu.be/Oive66jrwBs)

`npm i`

`npm run boom!`

Note the cleaned up package.json:

```js
{
  "name": "frontend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "browser-sync start --server \"app\" --files \"app\"",
    "sassy": "node-sass --watch \"scss\"  --output \"app/css/\" --source-map true",
    "boom!": "concurrently \"npm run start\" \"npm run sassy\" "
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.24.4",
    "concurrently": "^3.5.1",
    "node-sass": "^4.9.0"
  },
  "dependencies": {
  }
}
```

Also note the added flag on the `sassy` script: `--source-map true`. We will use this later on.

Let's use our new api.

In `app/index.js`:

```js
function fetchLab(callback) {
  fetch('http://localhost:3001/api/recipes')
  // .then( res => console.log(res) )
  .then( res => res.json() )
  // .then( res => console.log(res.json()) )
  .then( data => callback(data) )
  // .then ( data => console.log(data))
}
```

See if the data is being called:

```js
fetchLab( (content) => {
  console.log(content)
```

And rewrite the javascript for the menu using the new properties.

```js
fetchLab( (content) => {
  console.log(content)
  const markup =
  `<ul>
  ${content.map(
    recipe => `<li><a href="#${recipe._id}">${recipe.title}</a></li>`
  ).join('')}
  </ul>`;
  navbar.innerHTML = markup;
})
```

Test the hamburger.

Let's continue to build out the content in the body of the page so that a preview of all recipes are visible.

```js
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
```

After removing the old scripts which permitted navigation using hashes, the entire `index.js` script looks like this:

```js
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

fetchLab( (content) => {
  console.log(content)
  const markup =
  `<ul>
  ${content.map(
    recipe => `<li><a href="#${recipe._id}">${recipe.title}</a></li>`
  ).join('')}
  </ul>`;
  navbar.innerHTML = markup;

  // let generatedContent = '';
  // for (let i = 0; i < content.length; i++){
  //   generatedContent += `
  //   <div class="recipe-preview">
  //   <h2><a href="recipe/${content[i]._id}">${content[i].title}</a></h2>
  //   <img src="/img/recipes/${content[i].image}" />
  //   <p>${content[i].description}</p>
  //   <span onclick="deleteme('${content[i]._id}')">✖︎</span>
  //   </div>
  //   `
  // }
  // siteWrap.innerHTML = generatedContent;

  let output = '';

  content.forEach((recipe) => {
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
})

function fetchLab(callback) {
  fetch('http://localhost:3001/api/recipes')
  .then( res => res.json() )
  .then( data => callback(data) )
}

window.addEventListener('scroll', fixNav);
```

Note: I left (the commented) for loop alternative in the code above for comparison.

Since we are using Promises we can refactor our code further to remove callbacks.

```js
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
  
  })
}

fetchLab();
```

And delete or comment out the original `fetchLab()` function that used the callback.

Tidy up the index file and css.

```html
<header>
    <h1>Recipes!</h1>
</header>
```

`_header.scss`:

```css
header {
  height: 10vh;
  background: url(../img/recipes/pho.png) center no-repeat;
```

`_forms.scss`:

```css
form * {
  font-size: 0.875rem;
}

input, textarea {
  display: block;
  margin: 1rem;
  width: 90%;
  padding: 0.25rem;
}
button {
  padding: 0.5rem;
  background-color: $link;
  color: #fff; 
  margin: 0 1rem;
  border-radius: 3px;
  border: none;
}
```

`_structure.scss`:

```css
.site-wrap {
  max-width: 90vw;
  margin: 20px auto;
  background: white;;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.05);
  transform: scale(0.98);
  transition: transform 0.5s;
}

.recipe-preview {
  padding: 1rem;
  border-bottom: 1rem solid $badass;
  h2 {
    margin-bottom: 0.5rem;
    a {
      color: $link;
    }
  }
  ul {
    padding: 1rem;
  }
  p {
    margin: 1rem 0;
  }
}

body.fixed-nav .site-wrap {
  transform: scale(1);
}
```

## Delete a Recipe

```js
function deleteme(thingtodelete) {
  fetch(`http://localhost:3001/api/recipes/${thingtodelete}`, {
    method: 'delete'
  })
  .then(location.href = '/')
}
```

## View Recipe Details

Collect the links after generating them:

```js
  siteWrap.innerHTML = generatedContent;
  
  const newLinks = document.querySelectorAll('.site-wrap h2 a')
  newLinks.forEach( link => link.addEventListener('click', detailme) )
```

```js
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
```

### Add a Recipe

We have the form from a previous class. Update it with recipe content:

```html
  <form id="addRecipe">
    <input type="text" placeholder="title" name="title" id="title">
    <input type="text" placeholder="image" name="image" id="image">
    <textarea type="text" placeholder="description" name="description" id="description"></textarea>
    <button type="submit">Submit</button>
  </form>
```

```js
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
```

## Babel and Webpack

Additional installs for Webpack and Babel:

`npm i --save-dev babel-core babel-loader babel-preset-env webpack webpack-cli concurrently`

We'll be installing [Babel](https://babeljs.io/docs/setup/#installation) with [webpack](https://webpack.js.org/concepts/) support and therefore need a [loader](https://webpack.js.org/loaders/babel-loader/).

Create `webpack.config.js` in the `myapp` project folder:

```js
const path = require('path');

module.exports = {
  devtool: 'source-map',
  mode: 'production',
  entry: './myapp.js',
  output: {
    path: path.resolve(__dirname, './public/js/'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  }
};
```

Note again the use of the `require` and `module.exports` pattern that we saw in `routes/index.js`.

Create `myapp.js` in the project folder:

```js
const getMessage = () => 'Hello World';
document.getElementById('output').innerHTML = getMessage();
```

Add webpack and a boom to our scripts:

```js
  "scripts": {
    "start": "nodemon ./bin/www",
    "build": "webpack --progress --watch",
    "boom!": "concurrently \"npm run start\" \"npm run build\" "
  },
```

`npm run boom!`

Note `public/js/bundle.js` and `bundle.js.map`.

Add a link to our bundle in `layout.jade` (be sure to change the directory names in public):

```txt
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/css/style.css')
  body
    block content
    script(src='/js/bundle.js')
```

Add an #output div to `index.jade`:

```txt
extends layout

block content
  h1= title
  p Welcome to #{title}
  - const upAnimal = animal.toUpperCase()
  p My animal is #{upAnimal}
  .image
    img.animal(src="https://picsum.photos/400/200?random" alt=`${animal}`)
  #output
```

Refresh the page to compile jade and note the result of the `getMessage` function in the browser.

```js
const getMessage = () => 'Hello World';
document.getElementById('output').innerHTML = getMessage();
```

This indicates that the webpack installation is running properly.

Open `bundle.js`. It is being optimized for production and unintelligable.

Change webpack's `mode` to development in `webpack.config.js`:

```js
const path = require('path');

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: './myapp.js',
  output: {
    path: path.resolve(__dirname, './public/js/'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  }
};
```

Kill and restart the Express installation with boom! and inspect the bundle again. Note that `myapp.js` has been incorporated _and_ translated according to our preset by Babel. 

## ES6 Modules

[Modules](https://webpack.js.org/concepts/modules/) are a way of breaking up JavaScript into smaller, more focused bits of functionality that can be combined.

We are already using [Node modules](https://nodejs.org/api/modules.html) in our projects. The `exports` and `require` statements working within our app are `Node` modules.

The other important module architecture, ES6 modules, is not natively supported in the browser so we need to bundle them. Having installed Webpack for bundling we can now use native [ES6 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).

### ES6 Module Exports and Imports

Create `src` directory with `config.js` inside.

Edit `config.js`:

```js
const apiKey = 'abcdef';
```

Import it into `myapp.js` (note: paths are not necessary for node modules):

```js
import apiKey from './src/config';
console.log(apiKey);

const getMessage = () => 'Hello World';
document.getElementById('output').innerHTML = getMessage();
```

Refresh the browser. Note empty object in the browser's console.

Exporting data - using _default_ and _named_ exports.

In `config.js`:

```js
const apiKey = 'abcdef';

export default apiKey;
```

Refresh the browser. Note the new variable in the browser's console.

Because we exported it as default we can rename on import.

In `myapp.js`:

```js
import foo from './src/config';
console.log(foo);
```

ES6 Modules can only have one default export but _can_ have multiple named exports.

A named export in `config.js`:

`export const apiKey = 'abcdef';`

requires an import that selects it in `myapp.js`:

```js
import { apiKey } from './src/config';
console.log(apiKey);
```

Multiple named exports:

```js
export const apiKey = 'abcdef';
export const url = 'https://mlab.com';
```

```js
import { apiKey, url } from './src/config';
console.log(apiKey, url);
```

Multiple named exports encourage code encapsulation and reuse across multiple projects.

Functions can be internal to a module or exported:

```js
export const apiKey = 'abcdef';
export const url = 'https://mlab.com';

export function sayHi(name) {
  console.log(`Say hello ${name}`);
}
```

```js
import { apiKey, url, sayHi } from './src/config';
sayHi('daniel');
```

Review [the documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) on MDN for options including `import as`, `export as` and exporting multiples.

Note the resemblance (and difference) between ES6 module importing and Node.

In `app.js`:

```js
var express = require('express');
var routes = require('./routes/index');
...
module.exports = app;
```

In `myapp` and `config`:

```js
import { apiKey, url, sayHi } from './src/config';
...
export default apiKey;
```
