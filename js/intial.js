
function sideBar() {
  const headerButton = document.querySelector('.js-header-button');
  const sidebar = document.querySelector('.js-side-bar');
  const sideHeader = document.querySelector('.js-side-header');
  headerButton.addEventListener('click', () => {
    sidebar.classList.toggle('side-bar-hidden')
    sideHeader.classList.toggle('side-header-hide')
  })
};

sideBar()