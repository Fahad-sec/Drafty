import {renderSideBar} from '../../js/render.js'



describe('test suite: render.js', () => {
      const notesList =[ 
      {
      title: 'this is a note',
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
  expect(noteItems[0].innerText).toBe('this is a note')

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
})