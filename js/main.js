import {buttonListener, editButtonListener, resetEditor, clearData} from './buttons.js'
import { sideBarClose, sideBar, sideBarOpen, reloadPage} from './intial.js'
import {saveButtonEdit, deleteFromCloud, notesList, deleteNote, displayNoteContent, saveToStorage,  initializingApp, setupAuthListeners, getSupabase,saveToCloud } from './storage.js'

import { setupNoteItems} from './render.js';

import {deleteButton,  renderSideBar, getCurrentId, setCurrentId} from './render.js'

const supaBase = getSupabase();

initializingApp(renderSideBar, supaBase);
/*fetchNotes(supaBase);
saveToCloud()*/


buttonListener(setCurrentId);
editButtonListener();
sideBar(sideBarClose);


deleteButton({
  getCurrentId: getCurrentId,
  setCurrentId: setCurrentId,
  deleteFromCloud: deleteFromCloud,
  deleteNote: deleteNote,
  displayNoteContent: displayNoteContent,
  renderSideBar: renderSideBar,
  getNotes: () => notesList,
  saveToStorage: saveToStorage,
  clearData: clearData,
  supaBase: supaBase,
})

  setupNoteItems(displayNoteContent,sideBarClose, resetEditor)


  const saveButton = document.querySelector('.js-save-button');

  saveButton.addEventListener('click', () => {
    saveButtonEdit({
      setCurrentId: setCurrentId,
      getCurrentId: getCurrentId,
      renderFn: renderSideBar,
      sideBarOpenFn: sideBarOpen,
      clearDataFn: clearData,
      supaBase: supaBase,
      saveToCloud: saveToCloud
    })
  })
  
setupAuthListeners(renderSideBar, supaBase)

reloadPage();