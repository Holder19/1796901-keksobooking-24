import {activateForm, addListenersOnForm, deactivateForm, addUserFormSubmitHandler} from './form.js';
import { createMarkers } from './map.js';
import { getData } from './api.js';
const MARKERS_COUNT = 10;

deactivateForm();

getData((advertisements) => {
  activateForm();
  createMarkers(advertisements.slice(0, MARKERS_COUNT));

  addListenersOnForm(() => {
    createMarkers(advertisements.slice(0, MARKERS_COUNT));
  });

  addUserFormSubmitHandler(() => {
    createMarkers(advertisements.slice(0, MARKERS_COUNT));
  });

});
