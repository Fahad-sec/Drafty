import {resetCurrentNoteId} from './render.js'


const clearButton = document.querySelector('.js-clear-button');

clearButton.addEventListener('click', () => {
 clearData();
})

export function clearData() {
  document.querySelector('.js-note-pad').value = '';
  document.querySelector('.js-notes-title').value = '';
  resetCurrentNoteId();
}

