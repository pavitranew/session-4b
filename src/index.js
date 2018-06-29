import {fixNav} from './dom';
import {fetchLab, choosePageRendering} from './api';

// fetchLab();

if (!location.hash) {
  location.hash = '#recipes';
}

window.addEventListener('hashchange', choosePageRendering);
window.addEventListener('scroll', fixNav);