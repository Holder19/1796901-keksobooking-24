import {activateForm, addListenersOnForm, deactivateForm, onUserFormSubmit} from './form.js';
import { createMarkers } from './map.js';
import { getData } from './api.js';
const MARKERS_COUNT = 10;

deactivateForm();

getData((advertisements) => {
  activateForm();
  createMarkers(advertisements.slice(0, MARKERS_COUNT));

});
addListenersOnForm();
onUserFormSubmit();
