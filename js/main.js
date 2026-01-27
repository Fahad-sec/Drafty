import {buttonListener, editButtonListener} from './buttons.js'

import {saveButtonEdit} from './storage.js'
import {resetCurrentNoteId} from './render.js';


buttonListener(resetCurrentNoteId);
editButtonListener(saveButtonEdit);