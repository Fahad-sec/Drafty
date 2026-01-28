import {sideBar, sideBarClose, sideBarOpen} from '../../js/intial.js'

describe ('test suit: intial.js', () => {

   afterEach(() => {
    document.getElementById('intial-test-container').innerHTML = '';
   })
  beforeEach(() => {
    document.getElementById('intial-test-container').innerHTML = `
    <button class="side-header-button js-side-header-button">&lt;</button>
          <div class="side-bar js-side-bar">
        </div>
          <div class="side-header js-side-header">
          My Notes
    `

  })

  it('sidebar function', () => {
     const closeSpy = {sideBarClose};

    spyOn(closeSpy, 'sideBarClose').and.callThrough()

        const sideHeaderButton = document.querySelector('.js-side-header-button');
        sideBar(closeSpy.sideBarClose);

    sideHeaderButton.click();

    expect(sideHeaderButton.innerHTML).toBe('&gt;');
    sideHeaderButton.click();
    expect(sideHeaderButton.innerHTML).toBe('&lt;');
    expect(closeSpy.sideBarClose).toHaveBeenCalled()
    
  })

  it('sidebarClose', () => {

      const sideHeaderButton = document.querySelector('.js-side-header-button');
      const sideHeader = document.querySelector('.js-side-header')
      const sideBarCheck = document.querySelector('.js-side-bar')
      sideBar(sideBarClose);
     
      sideHeaderButton.click()

      expect(sideHeader.classList.contains('side-header-hidden')).toBe(true);

      expect(sideBarCheck.classList.contains('side-container-hidden')).toBe(true)
  })

  it('sideBarOpen', () => {
      const sideHeaderButton = document.querySelector('.js-side-header-button');
      const sideHeader = document.querySelector('.js-side-header')
      const sideBarCheck = document.querySelector('.js-side-bar')

      sideBarOpen();
      expect(sideHeader.classList.contains('side-header-hidden')).toBe(false);

      expect(sideBarCheck.classList.contains('side-container-hidden')).toBe(false)    

  })
   

})


