import {renderSideBar} from './render.js'


export let notesList = JSON.parse(localStorage.getItem('notesList')) ||[];


let nextId = notesList.length > 0 ? notesList[notesList.length -1].id + 1 : 1;

function createNote(textContent, title) {
  const note = {
    title: title || (textContent ? textContent.substring(0, 8) + '...' : `Note${nextId}`),
    id: nextId,
    body: textContent
  };
  nextId++;
  return note;
};


const saveButton = document.querySelector('.js-save-button');

saveButton.addEventListener('click', () => {
  const noteContent = document.querySelector('.js-note-pad').value;
  const notesTitle = document.querySelector('.js-notes-title').value;
  
  const newNote = createNote(noteContent, notesTitle);

  notesList.push(newNote);
  console.log(notesList)
  saveToStorage();
  renderSideBar(notesList);
  

});
renderSideBar(notesList)

function resetPage () {
  window.location.reload()
}

function saveToStorage() {
  localStorage.setItem('notesList', JSON.stringify(notesList));
}


console.log(JSON.parse(localStorage.getItem('notesList')))

