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

const editBtn =  document.querySelector('.edit-btn');
const titleInput = document.querySelector('.js-notes-title');
const contentInput = document.querySelector('.js-note-pad');

let isEditing = false;

editBtn.addEventListener('click', () => {
  isEditing = !isEditing;

  if (isEditing) {
    titleInput.readOnly = false;
    contentInput.readOnly = false;
    editBtn.textContent = 'Close Editor';
    editBtn.style.backgroundColor = 'red';
    contentInput.focus();

  } else {
    resetEditor();
  }
})

export function resetEditor() {
  
    titleInput.readOnly = true;
    contentInput.readOnly = true;
    editBtn.textContent = 'Edit Note';
    editBtn.style.backgroundColor = ''
}