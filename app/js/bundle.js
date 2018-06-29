/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.choosePageRendering = choosePageRendering;
exports.fetchLab = fetchLab;
exports.showDetailPage = showDetailPage;

var _dom = __webpack_require__(/*! ./dom */ "./src/dom.js");

function choosePageRendering() {
  console.log('choosePage hash is ' + window.location.hash);
  if (window.location.hash === '#recipes') {
    fetchLab();
  } else {
    showDetailPage();
  }
}

function fetchLab() {

  console.log('fetchLab hash is ' + window.location.hash || null);

  fetch('http://localhost:3001/api/recipes').then(function (res) {
    return res.json();
  }).then(function (data) {
    var markup = '<ul>\n    ' + data.map(function (recipe) {
      return '<li><a href="#recipe/' + recipe._id + '">' + recipe.title + '</a></li>';
    }).join('') + '\n    </ul>';
    _dom.navbar.innerHTML = markup;

    var output = '';

    data.forEach(function (recipe) {
      output += '\n        <div class="recipe-preview">\n        <h2><a href="#recipe/' + recipe._id + '">' + recipe.title + '</a></h2>\n        <img src="/img/recipes/' + recipe.image + '" />\n        <p>' + recipe.description + '</p>\n        </div>\n      ';
    });

    _dom.siteWrap.innerHTML = output;
  });
}

function showDetailPage() {

  console.log('showDetailPage hash is ' + window.location.hash);

  var navLinkId = window.location.hash.substring(8);

  fetch('http://localhost:3001/api/recipes/' + navLinkId, {
    method: 'get'
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    var recipeContent = '\n    <div class="recipe-preview">\n    <h2>Recipe for ' + data.title + '</h2>\n    <img src="/img/recipes/' + data.image + '" />\n    <h2>Ingredients</h2>\n    <ul>\n    <li>' + data.ingredients[0] + '</li>\n    <li>' + data.ingredients[1] + '</li>\n    <li>' + data.ingredients[2] + '</li>\n  </ul>\n  <h2>Instructions</h2>\n    <ul>\n      <li>' + data.preparation[0].step + '</li>\n      <li>' + data.preparation[1].step + '</li>\n      <li>' + data.preparation[2].step + '</li>\n    </ul>\n    </div>\n  ';
    _dom.siteWrap.innerHTML = recipeContent;
  });
}

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fixNav = fixNav;
var nav = exports.nav = document.getElementById('main');
var navbar = exports.navbar = nav.querySelector('.navitems');
var siteWrap = exports.siteWrap = document.querySelector('.site-wrap');

// fix the navigation to the top of the page

var topOfNav = nav.offsetTop;

function fixNav() {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}

// Show and hide the navigation

var logo = document.querySelector('.logo');

logo.addEventListener('click', showMenu);

function showMenu(e) {
  document.body.classList.toggle('show');
  var navLinks = document.querySelectorAll('.navitems a');
  navLinks.forEach(function (link) {
    return link.addEventListener('click', dump);
  });
  e.preventDefault();
}

function dump() {
  document.body.classList.toggle('show');
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dom = __webpack_require__(/*! ./dom */ "./src/dom.js");

var _api = __webpack_require__(/*! ./api */ "./src/api.js");

// fetchLab();

if (!location.hash) {
  location.hash = '#recipes';
}

window.addEventListener('hashchange', _api.choosePageRendering);
window.addEventListener('scroll', _dom.fixNav);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map