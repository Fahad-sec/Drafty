import {buttonListener, editButtonListener} from './buttons.js'
import { sideBarClose, sideBar} from './intial.js'
import {saveButtonEdit} from './storage.js'
import {resetCurrentNoteId} from './render.js';


buttonListener(resetCurrentNoteId);
editButtonListener(saveButtonEdit);
sideBar(sideBarClose);
reloadPage();