import {saveButtonEdit} from '../../js/storage.js'


describe('test suit: storage.js', () => {
       
  afterEach(() => {
    
     document.getElementById('storage-container').innerHTML = `
     `
  })
         let 
     setCurrentIdSpy,getCurrentIdSpy,renderFnSpy, sideBarOpenFnSpy, clearDataFnSpy, supaBaseSpy, saveToCloudSpy
  beforeEach(() => {

     document.getElementById('storage-container').innerHTML = `
               <textarea class="note-pad js-note-pad" placeholder="Start typing your notes...." readonly></textarea>

               
            <input placeholder="Title" class="notes-title js-notes-title" readonly>
                          <button class="save-button js-save-button">Save</button>

     `

     setCurrentIdSpy = jasmine.createSpy('setCurrentId');
     getCurrentIdSpy = jasmine.createSpy('getCurrentId');
     renderFnSpy = jasmine.createSpy('renderFn');
     sideBarOpenFnSpy = jasmine.createSpy('sideBarOpenFn');
     clearDataFnSpy = jasmine.createSpy('clearDataFn');
     supaBaseSpy = jasmine.createSpy('supaBase');
     saveToCloudSpy = jasmine.createSpy('saveToCloud').and.resolveTo({
      id: '123',
      title: 'title'
     })

     


  })

  it('save-button', async () => {


    window.notesList = [];
    window.saveToStorage = jasmine.createSpy('saveToStorage')




       saveButtonEdit({
      setCurrentId : setCurrentIdSpy,
      getCurrentId: getCurrentIdSpy,
      renderFn: renderFnSpy,
      sideBarOpenFn: sideBarOpenFnSpy,
      clearDataFn : clearDataFnSpy,
      supaBase: supaBaseSpy,
      saveToCloud: saveToCloudSpy
     })

    document.querySelector('.js-note-pad').value = 'my notes';
    document.querySelector('.js-notes-title').value = 'title'

    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(getCurrentIdSpy).toHaveBeenCalled();  
  
  })
}) 