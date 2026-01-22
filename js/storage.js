import {renderSideBar} from './render.js'
import {clearData} from './buttons.js'
import {resetCurrentNoteId, currentOpenNoteId} from './render.js'


const SUPABASE_URL = "https://rhppahvvdlornlezxwpp.supabase.co";
const SUPABASE_KEY = "sb_publishable_l2WvLQtxogH0zA1ejehZcw_mv8HuEFH";

const {createClient} = supabase;
const supaBase = createClient(SUPABASE_URL, SUPABASE_KEY );

const getUID = () => {
    let uid = localStorage.getItem('drafty_v2_uid');
    if (!uid) {
      uid = 'user_' + Math.random().toString(36).substring(2, 12);
      localStorage.setItem('drafty_v2_uid', uid);
    }
    return uid;
};

const CURRENT_USER_ID = getUID();
console.log("drafty v2 intiliazing for user", CURRENT_USER_ID);



export let notesList = JSON.parse(localStorage.getItem('notesList')) ||[];


let nextId = notesList.length > 0 ? notesList[notesList.length -1].id + 1 : 1;

function createNote(textContent, title) {
  const note = {
    title: title || (textContent ? textContent.substring(0, 8) + '...' : `Note${nextId}`),
    id: nextId,
    body: textContent
  };
  nextId++;
  return note;
};


const saveButton = document.querySelector('.js-save-button');

saveButton.addEventListener('click', () => {
  const noteContent = document.querySelector('.js-note-pad').value;
  const notesTitle = document.querySelector('.js-notes-title').value;
  
  const existingNote = notesList.find(note => note.id === Number(currentOpenNoteId));

  if (existingNote) {
     existingNote.title = notesTitle;
     existingNote.body = noteContent;
     
  } else if (noteContent === '' && notesTitle === '') {
        return;
  }
  
  else {
    const newNote = createNote(noteContent, notesTitle);
    notesList.push(newNote);

  }
  
  renderSideBar(notesList);
  clearData();  
  saveToStorage();
  resetCurrentNoteId();



});



export async function fetchNotes () {
  const {data, error} = await supaBase
  .from('Notes')
  .select('*')
  .eq('user_id', CURRENT_USER_ID)
  .order('created_at', { ascending: false });

  if (error) {
    console.error('error loding notes', error.message)
    
  }else {
    console.log('success', data)
    return data;
  }
}


  async function renderCloud() {
    const notes = await fetchNotes();

    renderSideBar(notes);
  }
  

  renderCloud() 



export function reloadPage () {
  window.location.reload()
}

function saveToStorage() {
  localStorage.setItem('notesList', JSON.stringify(notesList));
}


export function displayNoteContent(id) {
  const selectedNote = notesList.find(note => note.id === Number(id))

  if (selectedNote) {
    document.querySelector('.js-notes-title').value = selectedNote.title;
    document.querySelector('.js-note-pad').value = selectedNote.body;
  }
 }


export function deleteNote(id) {
  const index  = notesList.findIndex(note => note.id == Number(id));

  if (index !== -1) {
    notesList.splice(index, 1);
    saveToStorage();
    clearData();
    renderSideBar(notesList);
    resetCurrentNoteId();
  }
}