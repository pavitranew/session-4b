# IV - Client Side with ExpressJS

`npm i`

`npm run boom!`

Package JSON:

```js
{
  "name": "frontend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "browser-sync start --server \"app\" --files \"app\"",
    "sassy": "node-sass --watch \"scss\"  --output \"app/css/\"",
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
