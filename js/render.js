const sideBarElement = document.querySelector('.js-side-bar')

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

sideBarElement.addEventListener('click', () => {
  const noteElement = event.target.closest(`.note-item`);

  if (noteElement) {
    const id = noteElement.dataset.noteId;
    console.log('clicked note id :', id);
  }
})