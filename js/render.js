import {displayNoteContent, deleteNote} from './storage.js'

export let currentOpenNoteId = null;
 export function resetCurrentNoteId () {
  currentOpenNoteId = null;
 }

 const sideBarElement = document.querySelector('.js-side-bar');
export function renderSideBar(data) {

  if (!data) {
    console.error('rendersidebar received inavlid data', data);
    return;
  }

  let html = '';
data.forEach((note) => {
  console.log(note);

   html += `
  <div class="note-item js-note-item" data-note-id="${note.id}">
  ${note.title}
  </div>
  `;
})
  sideBarElement.innerHTML = html;


}


sideBarElement.addEventListener('click', (event) => {
  const noteElement = event.target.closest(`.js-note-item`);

  if (noteElement) {
    currentOpenNoteId = noteElement.dataset.noteId;
    const id = noteElement.dataset.noteId;
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

