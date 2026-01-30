import {renderSideBar, setupNoteItems, deleteButton} from '../../js/render.js'



describe('test suite: render.js', () => {
      const notesList =[ 
      {
      title: 'note-title',
      id: '123'
    }]

    const notesLists =[ 
      {
      title: 'note-1',
      id: '123'
    },{
      title: 'note-2',
      id: '000'
    }
  ]

  beforeEach(() => {


    document.getElementById('render-container').innerHTML= `
         <div class="side-bar js-side-bar">
        </div>`
  })

  afterEach(() => {
    document.getElementById('render-container').innerHTML = '';
  })




  it('check if fn renders the sidebar', () => {

  renderSideBar(notesList);
  const noteItems = document.querySelectorAll('.js-note-item')

  expect(noteItems.length).toEqual(1);
  expect(noteItems[0].dataset.noteId).toBe('123')
  expect(noteItems[0].innerText).toBe('note-title')

  })

  it('check empty array', () => {
 renderSideBar([])
  const noteItem = document.querySelectorAll('.js-note-item')
  expect(noteItem.length).toEqual(0)
  }) 

  it ('check mutiple notes are in order', () => {
    renderSideBar(notesLists)
    const noteItem = document.querySelectorAll('.js-note-item')
    expect(noteItem[0].innerText).toBe('note-1');
    expect(noteItem[1].innerText).toBe('note-2');
  })



  it ('check setupNoteItems item', () => {
    renderSideBar(notesList)

    const displaySpy = jasmine.createSpy('displayNoteContent');
    const closeSideBarSpy = jasmine.createSpy('closeSideBar');
    const resetEditorSpy = jasmine.createSpy('resetEditor');

    setupNoteItems(displaySpy, closeSideBarSpy, resetEditorSpy);

    const note = document.querySelector('.js-note-item')
    note.click()
    expect(note.innerText).toBe('note-title');
    expect(displaySpy).toHaveBeenCalledWith('123');
    expect(closeSideBarSpy).toHaveBeenCalledWith();
    expect(resetEditorSpy).toHaveBeenCalledWith();
  })
})

describe ('test suit: delete button', () => {
let 
  getCurrentIdSpy,
  setCurrentIdSpy,
  deleteFromCloudSpy,
  deleteNoteSpy,
  renderSideBarSpy,
  getNotesSpy,
  clearDataSpy,
  saveToStorageSpy,
  supaBaseSpy;


   afterEach(() => {
    document.getElementById('render-container2').innerHTML = ''
   })

   beforeEach (() => {


    document.getElementById('render-container2').innerHTML = `
    <button class="delete-button js-delete-button">Delete</button> 
    `


      getCurrentIdSpy = jasmine.createSpy('getCurrentId').and.returnValue('123');
      setCurrentIdSpy = jasmine.createSpy('setCurrentId');
      deleteFromCloudSpy = jasmine.createSpy('deleteFromCloud').and.resolveTo(true);
      deleteNoteSpy = jasmine.createSpy('deleteNote')
      renderSideBarSpy = jasmine.createSpy('renderSideBar')
      getNotesSpy = jasmine.createSpy('getNotes').and.returnValue([]);
      clearDataSpy = jasmine.createSpy('clearData');
      saveToStorageSpy = jasmine.createSpy('SaveToStorage');

      deleteButton({
        
          getCurrentId: getCurrentIdSpy,
          setCurrentId: setCurrentIdSpy,
          deleteFromCloud: deleteFromCloudSpy,
          deleteNote: deleteNoteSpy,
          renderSideBar: renderSideBarSpy,
          getNotes: getNotesSpy,
          saveToStorage: saveToStorageSpy,
          clearData: clearDataSpy,
          supaBase: supaBaseSpy
      })
   })

  it ('check delete logic', async() => {
          const deleteButton = document.querySelector('.js-delete-button');
          deleteButton.click();
          await new Promise(resolve => setTimeout(resolve, 0))

         expect(getCurrentIdSpy).toHaveBeenCalled();
         expect(setCurrentIdSpy).toHaveBeenCalledWith(null);
         expect(deleteFromCloudSpy).toHaveBeenCalledWith('123',supaBaseSpy );
         expect(deleteNoteSpy).toHaveBeenCalledWith('123');
         expect(renderSideBarSpy).toHaveBeenCalledWith([]);
         expect(saveToStorageSpy).toHaveBeenCalled();
         expect(clearDataSpy).toHaveBeenCalled();
  })

  it('delete button if no notes are selected ', () => { 
    getCurrentIdSpy.and.returnValue(null);
    spyOn(window, 'alert');
    const deleteButton = document.querySelector('.js-delete-button');
    deleteButton.click();

    expect(window.alert).toHaveBeenCalledWith('Please select a note to delete first');
    expect(deleteFromCloudSpy).not.toHaveBeenCalled();
  })

  it('does not update hte Ui', async() => {
    deleteFromCloudSpy.and.resolveTo(false)
    const deleteButton = document.querySelector('.js-delete-button');
    deleteButton.click();
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(deleteFromCloudSpy).toHaveBeenCalled();
    expect(deleteNoteSpy).not.toHaveBeenCalled()
    expect(renderSideBarSpy).not.toHaveBeenCalled();
    expect(saveToStorageSpy).not.toHaveBeenCalled();

    
  })
})