const sideBarElement = document.querySelector('.js-side-bar')

export function renderSideBar(data) {
sideBarElement.innerHTML = '';

data.forEach((note) => {
  const html = `
  <div class="note-item" data-id="${note.id}">
  ${note.title}
  </div>
  `;
  sideBarElement.innerHTML += html;
})

}
