import {displayNoteContent, deleteNote} from './storage.js'
const sideBarElement = document.querySelector('.js-side-bar')

let currentOpenNoteId = null;


export function renderSideBar(data) {
sideBarElement.innerHTML = '';

data.forEach((note) => {
  const html = `
  <div class="note-item" data-note-id="${note.id}">
  ${note.title}
  </div>
  `;
  sideBarElement.innerHTML += html;
})

}


sideBarElement.addEventListener('click', (event) => {
  const noteElement = event.target.closest(`.note-item`);

  if (noteElement) {
    currentOpenNoteId = noteElement.dataset.noteId;
    const id = noteElement.dataset.noteId;
    console.log('clicked note id :', id);
      displayNoteContent(currentOpenNoteId)

  }
  
})

const deleteButton = document.querySelector('.js-delete-button');

deleteButton.addEventListener('click', () => {

  if (currentOpenNoteId) {
     deleteNote(currentOpenNoteId);
     currentOpenNoteId = null;
     saveToStorage();
  }
})

