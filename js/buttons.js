

export function buttonListener() {
  const clearButton = document.querySelector('.js-clear-button');



  clearButton?.addEventListener('click', () => {

 clearData();
})

}


export function clearData(id) {
    const notePad = document.querySelector('.js-note-pad');
  const title = document.querySelector('.js-notes-title');
  if (notePad) notePad.value = '';
  if(title) title.value = '';
  
 
  id = null
}


export function editButtonListener(saveButtonEdit) {
      const editBtn =  document.querySelector('.edit-btn');
      const titleInput = document.querySelector('.js-notes-title');
      const contentInput = document.querySelector('.js-note-pad');

      let isEditing = false;

      editBtn?.addEventListener('click', () => {
      isEditing = !isEditing;

      if (isEditing) {
        titleInput.readOnly = false;
        contentInput.readOnly = false;
        editBtn.textContent = 'Close Editor';
        editBtn.style.backgroundColor = 'red';
        contentInput.focus();

      } else {
        resetEditor(editBtn, titleInput, contentInput);
        //saveButtonEdit();
      }

      })
}

export function resetEditor() {
      const editBtn =  document.querySelector('.edit-btn');
      const titleInput = document.querySelector('.js-notes-title');
      const contentInput = document.querySelector('.js-note-pad');
  
    titleInput.readOnly = true;
    contentInput.readOnly = true;
    editBtn.textContent = 'Edit Note';
    editBtn.style.backgroundColor = ''
}
