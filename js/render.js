import {displayNoteContent, deleteNote} from './storage.js'
import {supaBase, CURRENT_USER_ID, saveToStorage} from './storage.js';
import {resetEditor} from './buttons.js'

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

   html += `
  <div class="note-item js-note-item" data-note-id="${note.id}">
  ${note.title}
  </div>
  `;
})
  sideBarElement.innerHTML = html;



}


sideBarElement.addEventListener('click',  (event) => {
  const noteElement = event.target.closest(`.js-note-item`);

  if (noteElement) {
    currentOpenNoteId = noteElement.dataset.noteId;
      displayNoteContent(currentOpenNoteId);
      
      resetEditor()

  } else {
    console.log('note-item error')
  }
  
})

const deleteButton = document.querySelector('.js-delete-button');

deleteButton.addEventListener('click', async () => {

  if (!currentOpenNoteId) {
    alert('select a note to delete first')
    return;
  } 
  
  const success = await deleteFromCloud(currentOpenNoteId);

  if (success){
     deleteNote(currentOpenNoteId);
     resetCurrentNoteId();
     displayNoteContent(currentOpenNoteId)
     renderSideBar(notesList);
     saveToStorage();

  }
})

async function deleteFromCloud (noteId) {
  const {error} = await supaBase
  .from('Notes')
  .delete()
  .eq('id', noteId)
  .eq('user_id', CURRENT_USER_ID);
  if (error) {
    console.log(error);
    return false;
  } else {
    return true;
  }
}
