import {reloadPage} from './storage.js'
const clearButton = document.querySelector('.js-clear-button');

clearButton.addEventListener('click', () => {
  document.querySelector('.js-note-pad').value = '';
  document.querySelector('.js-notes-title').value = '';
})