import {renderSideBar,} from './render.js'
import {clearData} from './buttons.js'
import {resetCurrentNoteId, currentOpenNoteId} from './render.js'


const SUPABASE_URL = "https://rhppahvvdlornlezxwpp.supabase.co";
const SUPABASE_KEY = "sb_publishable_l2WvLQtxogH0zA1ejehZcw_mv8HuEFH";

const {createClient} = supabase;
export const supaBase = createClient(SUPABASE_URL, SUPABASE_KEY );

export let CURRENT_USER_ID = null
async function intializingApp() {
  const {data: {user}}  = await supaBase.auth.getUser();


  if (user) {
    CURRENT_USER_ID = user.id;
    renderCloud();
  } else {
    document.getElementById('auth-modal').style.display = 'flex';
  }
}

intializingApp();

export let notesList = JSON.parse(localStorage.getItem('notesList')) ||[];

export async function fetchNotes () {
  const {data: {user}} = await supaBase.auth.getUser();
  if (!user) {
    console.log('no user logged in');
    return [];
  }


   const {data, error} = await supaBase
  .from('Notes')
  .select('*')
  .eq('user_id', user.id)
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
  return data [0];
} 

const saveButton = document.querySelector('.js-save-button');

  saveButton.addEventListener('click', async () => {
 const noteContent = document.querySelector('.js-note-pad').value;
  const notesTitleInput = document.querySelector('.js-notes-title').value;
  const notesTitle = notesTitleInput || noteContent.substring(0, 20);

  const savedNote = await saveToCloud(noteContent, notesTitle, currentOpenNoteId)

   if (savedNote) {
    const index = notesList.findIndex(n => n.id === savedNote.id);
    if (index !== -1) {
      notesList[index] = savedNote;
    } else {
      notesList.push(savedNote)
    }
   } 
  
  clearData();  
  renderCloud();
  resetCurrentNoteId();
  saveToStorage();


});


  export async function renderCloud() {
    const notes = await fetchNotes();

    if (notes) {
      notesList = notes
      renderSideBar(notesList)
    }
  }
  renderCloud() 

export function reloadPage () {
  window.location.reload()
}

export function saveToStorage() {
  localStorage.setItem('notesList', JSON.stringify(notesList));
}



export async function displayNoteContent(id) {


  if (notesList.length === 0) {
  }

  const selectedNote =   notesList.find(note => String(note.id) === String(id) )

  if (selectedNote) {
    document.querySelector('.js-notes-title').value = selectedNote.title;
    document.querySelector('.js-note-pad').value = selectedNote.content;
  } else {
    console.log('selected note error')
  }
 }


export function deleteNote(id) {
  const index  = notesList.findIndex(note => String(note.id) == String(id));

  if (index !== -1) {
    notesList.splice(index, 1);
    saveToStorage();
    clearData();
    renderSideBar(notesList);
    resetCurrentNoteId();
  }
}


document.getElementById('signup-btn').addEventListener('click', async() => {
  const email = document.getElementById('auth-email').value;
  const password = document.getElementById('auth-password').value;

  const {data, error} = await supaBase.auth.signUp({email, password});
  if (error) {
    document.getElementById('auth-error').innerText = error.message;
  }else {
    alert('Check your email for a confirmation link!')
  }
});

document.getElementById('login-btn').addEventListener('click',async () => {
  const email = document.getElementById('auth-email').value;
  const password = document.getElementById('auth-password').value;

  const {data, error} = await supaBase.auth.signInWithPassword({
    email, password
  });

  if (error) {
    document.getElementById('auth-error').innerText = error.message;

  } else {
    document.getElementById('auth-modal').style.display ='none';
    document.getElementById('main-app').style.display = 'flex';
    location.reload;
    renderCloud()
  }
})


supaBase.auth.onAuthStateChange((event, session) => {
  const authModal = document.getElementById('auth-modal');
  const mainApp = document.getElementById('main-app');
  if (session && session.user) {
    CURRENT_USER_ID = session.user.id;
    mainApp.style.display = 'flex';
    authModal.style.display = 'none';
    renderCloud();
  } else {
    authModal.style.display ='flex';
    mainApp.style.display ='none';
  }
})

document.getElementById('logout-btn').addEventListener('click', async () => {
  const {error} = await supaBase.auth.signOut();

  if (error) {
    alert('Logout failed. Check your internet connection')
  } else {
    location.reload();
  }
})