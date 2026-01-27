import {clearData} from '../../js/buttons.js'
window.resetCurrentNoteId = jasmine.createSpy('resetCurrentNoteId');

window.saveButtonEdit = jasmine.createSpy('saveButtonEdit')

describe('test suite: buttons', () => {

afterEach(() => {
  document.getElementById('test-clear-input-container').innerHTML = '';
})

beforeEach(() => {
  document.getElementById('test-clear-input-container').innerHTML= `
  <input placeholder="Title" class="notes-title js-notes-title" >
  <textarea class="note-pad js-note-pad" placeholder="Start typing your notes...." readonly></textarea>

  <button class="clear-button js-clear-button">Clear</button>
  `
  

   const title = document.querySelector('.js-notes-title')
   const notePad = document.querySelector('.js-note-pad');

   title.value = 'this is the title';
   notePad.value =  'this is the content of the note'

   const clearButton = 
  document.querySelector('.js-clear-button')
  
  clearButton.addEventListener('click', () => {
  clearData(notePad, title)

  })

});




  it('clears input', () => {
    document.querySelector('.js-clear-button').click(); 
    console.log('test worked');

    expect( 
      document.querySelector('.js-notes-title').value
    ).toBe('')
  })

})