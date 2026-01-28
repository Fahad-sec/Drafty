import { buttonListener, editButtonListener} from '../../js/buttons.js'


describe('test suite: buttons', () => {
 let resetFn;

afterEach(() => {
  document.getElementById('test-clear-input-container').innerHTML = '';
})

beforeEach(() => {


  document.getElementById('test-clear-input-container').innerHTML= `
  <input placeholder="Title" class="notes-title js-notes-title" >
  <textarea class="note-pad js-note-pad" placeholder="Start typing your notes...." readonly></textarea>

  <button class="clear-button js-clear-button">Clear</button>
  `
  resetFn = jasmine.createSpy('resetCurrentNoteId')
  buttonListener(resetFn);

   const title = document.querySelector('.js-notes-title')
   const notePad = document.querySelector('.js-note-pad');

   title.value = 'this is the title';
   notePad.value =  'this is the content of the note'



});




  it('clears input AND Calls resetid function', () => {
    document.querySelector('.js-clear-button').click(); 

    expect( 
      document.querySelector('.js-notes-title').value
    ).toBe('')

    expect(
      resetFn
    ).toHaveBeenCalled();
  })

})


describe('test suit: edit-button',() => {

  afterEach(() => {
    document.querySelector('#test-clear-input-container').innerHTML = '';
  })

  
  let saveSpy;
  beforeEach(() => {
    document.querySelector('#test-clear-input-container').innerHTML = `
  <button class="edit-btn">Edit</button>
  <input placeholder="Title" class="notes-title js-notes-title" readonly>
  <textarea class="note-pad js-note-pad" placeholder="Start typing your notes...." readonly></textarea>
 
 `
      saveSpy = jasmine.createSpy('saveButtonEdit');
      editButtonListener(saveSpy);
    
  });


  it ('toggle edit mode on',() => {
      const editBtn =  document.querySelector('.edit-btn');
      const titleInput = document.querySelector('.js-notes-title');
      const contentInput = document.querySelector('.js-note-pad');

      editBtn.click();
      expect(titleInput.readOnly).toBe(false);
      expect(contentInput.readOnly).toBe(false);
      expect(document.activeElement).toBe(contentInput);
      expect(editBtn.style.backgroundColor).toBe('red');
      expect(editBtn.innerHTML).toBe('Close Editor');
  }) 

  it ('toggle edit mode close', () => {
      const editBtn =  document.querySelector('.edit-btn');
      const titleInput = document.querySelector('.js-notes-title');
      const contentInput = document.querySelector('.js-note-pad');
      editBtn.click();
      editBtn.click();
    expect (editBtn.style.backgroundColor).toBe('');
    expect (editBtn.innerHTML).toBe('Edit Note');
    expect (contentInput.readOnly).toBe(true);
    expect (titleInput.readOnly).toBe(true);
  })
})