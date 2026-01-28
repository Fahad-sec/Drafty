import {buttonListener, editButtonListener, resetEditor, clearData} from './buttons.js'
import { sideBarClose, sideBar, sideBarOpen, reloadPage} from './intial.js'
import {saveButtonEdit, deleteFromCloud, notesList, deleteNote, displayNoteContent, saveToStorage,  initializingApp, setupAuthListeners} from './storage.js'

import { setupNoteItems} from './render.js';

import {deleteButton,  renderSideBar, getCurrentId, setCurrentId} from './render.js'

initializingApp(renderSideBar);




buttonListener();
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
  clearData: clearData
})

  setupNoteItems(displayNoteContent,sideBarClose, resetEditor)


  const saveButton = document.querySelector('.js-save-button');

  saveButton.addEventListener('click', () => {
    saveButtonEdit({
      setCurrentId: setCurrentId,
      getCurrentId: getCurrentId,
      renderFn: renderSideBar,
      sideBarOpenFn: sideBarOpen,
      clearDataFn: clearData
    })
  })
  
setupAuthListeners(renderSideBar)

reloadPage();