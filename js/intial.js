
function sideBar() {
  const sideHeaderButton = document.querySelector('.js-side-header-button');
  
  sideHeaderButton?.addEventListener('click', () => {

    sideBarClose()
    if (sideHeaderButton.innerHTML === '&lt;') {
    sideHeaderButton.innerHTML = '&gt;'
    } else {
      sideHeaderButton.innerHTML = '&lt;'
    }
  })
};

function reloadPage() {
  const draftyHeader = document.querySelector('.js-logo-img');
  draftyHeader?.addEventListener('click', () => {
    window.location.reload();
  });
};



export function sideBarClose() {
    const sidebar = document.querySelector('.js-side-bar');
  const sideHeader = document.querySelector('.js-side-header');
   sidebar.classList.toggle('side-container-hidden');
    sideHeader.classList.toggle('side-header-hidden');
}


export function sideBarOpen() {
  const sidebar = document.querySelector('.js-side-bar');
  const sideHeader = document.querySelector('.js-side-header'); 
  sidebar.classList.remove('side-container-hidden');
  sideHeader.classList.remove('side-header-hidden');
}

export function globalFunctions () {
  reloadPage();
  sideBar();
  sideBarClose();
}

