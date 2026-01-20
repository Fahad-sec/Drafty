
function sideBar() {
  const sideHeaderButton = document.querySelector('.js-side-header-button');
  const sidebar = document.querySelector('.js-side-bar');
  const sideHeader = document.querySelector('.js-side-header');
  sideHeaderButton.addEventListener('click', () => {
    sidebar.classList.toggle('side-bar-hidden');
    sideHeader.classList.toggle('side-header-hide');
    
    if (sideHeaderButton.innerHTML === '&lt;') {
    sideHeaderButton.innerHTML = '&gt;'
    } else {
      sideHeaderButton.innerHTML = '&lt;'
    }
  })
};

function reloadPage() {
  const draftyHeader = document.querySelector('.js-logo-img');
  draftyHeader.addEventListener('click', () => {
    window.location.reload();
  });
};

reloadPage();
sideBar();