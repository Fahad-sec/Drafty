
import {clearData} from '../../js/buttons.js'
window.resetCurrentNoteId = jasmine.createSpy('resetCurrentNoteId')

describe('test suite: buttons', () => {

beforeEach(() => {
  document.body.innerHTML= `
  <input placeholder="Title" class="notes-title js-notes-title" >
  <textarea class="note-pad js-note-pad" placeholder="Start typing your notes...." readonly></textarea>

  <button class="clear-button js-clear-button">Clear</button>
  `
  const clearButton = 
  document.querySelector('.js-clear-button')
  
  clearButton.addEventListener('click', () => {
  clearData()

  })

  spyOn(localStorage, 'setItem');

   document.querySelector('.js-notes-title').value = 'this is a note title';
   document.querySelector('.js-note-pad').value = 'this is the note content'
});




  it('clears input', () => {
    document.querySelector('.js-clear-button').click();

    expect( 
      document.querySelector('.js-notes-title').value.length
    ).toEqual(0)
  })

})