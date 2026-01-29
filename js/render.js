
export let currentOpenNoteId = null;
  currentOpenNoteId = null;
 

export function renderSideBar(data) {
 const sideBarElement = document.querySelector('.js-side-bar');

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

export function getCurrentId() {
  return currentOpenNoteId;
}

export function setCurrentId(id) {
  currentOpenNoteId = id
}

export function setupNoteItems(displayNoteContent, sideBarClose, resetEditor) {
sideBarElement.addEventListener('click',  (event) => {
  const noteElement = event.target.closest(`.js-note-item`);

  if (noteElement) {
    const id  = noteElement.dataset.noteId;
      setCurrentId(id);
      displayNoteContent(id);
      sideBarClose();
    
      resetEditor()

  } else {
    console.log('note-item error')
  }
  
})
}

export  function deleteButton({
  getCurrentId,
  setCurrentId,
  deleteFromCloud,
  deleteNote,
  displayNoteContent,
  renderSideBar,
  getNotes,
  clearData,
  saveToStorage,

})

{
      const deleteButton = document.querySelector('.js-delete-button');

        deleteButton.addEventListener('click', async () => {
          
        const  currentId = getCurrentId()
          if (!currentId) {
            alert('select a note to delete first')
            return;
          } 
          
          const success = await deleteFromCloud(currentId);

          if (success){
            deleteNote(currentId);
            setCurrentId(null);
            clearData(setCurrentId)
           // displayNoteContent(currentId);
            renderSideBar(getNotes());

            saveToStorage();

          }
        })
}



