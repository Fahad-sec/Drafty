import {renderSideBar,} from './render.js'
import {clearData} from './buttons.js'
import {resetCurrentNoteId, currentOpenNoteId} from './render.js'


const SUPABASE_URL = "https://rhppahvvdlornlezxwpp.supabase.co";
const SUPABASE_KEY = "sb_publishable_l2WvLQtxogH0zA1ejehZcw_mv8HuEFH";

const {createClient} = supabase;
export const supaBase = createClient(SUPABASE_URL, SUPABASE_KEY );

const getUID = () => {
    let uid = localStorage.getItem('drafty_v2_uid');
    if (!uid) {
      uid = 'user_' + Math.random().toString(36).substring(2, 12);
      localStorage.setItem('drafty_v2_uid', uid);
    }
    return uid;
};

export const CURRENT_USER_ID = getUID();
console.log("drafty v2 intiliazing for user", CURRENT_USER_ID);



export let notesList = JSON.parse(localStorage.getItem('notesList')) ||[];

export async function fetchNotes () {
  const {data, error} = await supaBase
  .from('Notes')
  .select('*')
  .eq('user_id', CURRENT_USER_ID)
  .order('created_at', { ascending: false });

  if (error) {
    console.error('error loding notes', error.message)
    
  }else {
    return data;
  }
}

async function saveToCloud(content, title, id) {
  const {data, error} = await supaBase
  .from('Notes')
  .upsert({
    id:  id || undefined,
    created_at: new Date(),
    user_id: CURRENT_USER_ID,
    title: title  || 'no-title',
    content: content || '',
  })
  .select()

  if (error) {
    console.error('Cloud error', error)
  } 
  return data[0];
} 

const saveButton = document.querySelector('.js-save-button');


  saveButton.addEventListener('click', async () => {
 const noteContent = document.querySelector('.js-note-pad').value;
  const notesTitle = document.querySelector('.js-notes-title').value;
  
  const savedNote = await saveToCloud(noteContent, notesTitle, currentOpenNoteId)

   if (savedNote) {
    const index = notesList.findIndex(n => n.id === savedNote.id);
    if (index !== -1) {
      notesList[index] = savedNote;
    } else {
      notesList.push(savedNote)
    }
   } 
  
  renderSideBar(notesList);
  clearData();  
  renderCloud();
   resetCurrentNoteId();

  saveToStorage();


});


  async function renderCloud() {
    const notes = await fetchNotes();

    renderSideBar(notes);
  }
  

  renderCloud() 



export function reloadPage () {
  window.location.reload()
}

export function saveToStorage() {
  localStorage.setItem('notesList', JSON.stringify(notesList));
}



export async function displayNoteContent(id) {
  const selectedNote =   notesList.find(note => note.id === Number(id))

  if (selectedNote) {
    document.querySelector('.js-notes-title').value = selectedNote.title;
    document.querySelector('.js-note-pad').value = selectedNote.content;
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