let nextId =1;

function createNote(textContent) {
  const note = {
    title: `Note ${nextId}`,
    id: nextId,
    body: textContent
  };
  nextId++;
  return note;
};

const notesList = []


const saveButton = document.querySelector('.js-save-button');

saveButton.addEventListener('click', () => {
  const noteContent = document.querySelector('.js-note-pad').value;
  
  const newNote = createNote(noteContent);

  notesList.push(newNote);
  console.log(notesList)

});




