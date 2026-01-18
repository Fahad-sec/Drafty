import {reloadPage} from './storage.js'
const clearButton = document.querySelector('.js-clear-button');

clearButton.addEventListener('click', () => {
  reloadPage();
})