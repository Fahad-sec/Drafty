export function buttonListener(resetCurrentNoteId) {
  const clearButton = document.querySelector('.js-clear-button');
  const notePad = document.querySelector('.js-note-pad');
  const title = document.querySelector('.js-notes-title');
  clearButton?.addEventListener('click', () => {

 clearData(notePad, title, resetCurrentNoteId);
})

}


export function clearData(notePad, title, resetCurrentNoteId) {
  if (notePad) notePad.value = '';
  if(title) title.value = '';
  
  if ( resetCurrentNoteId ) { 
  resetCurrentNoteId();
}}


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
        saveButtonEdit();
      }

      })
}

export function resetEditor(btn, title, content) {
  
    title.readOnly = true;
    content.readOnly = true;
    btn.textContent = 'Edit Note';
    btn.style.backgroundColor = ''
}
