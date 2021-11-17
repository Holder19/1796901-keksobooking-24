import {activateForm, addListenersOnForm, deactivateForm, addUserFormSubmitHandler} from './form.js';
import { createMarkers, resetMarkers } from './map.js';
import { getData } from './api.js';
import {addFilterOnAds , addFiltersHandler} from './filter.js';
import { debounce } from './utils/debounce.js';
import { setListenerInputFile } from './avatar.js';

const MARKERS_COUNT = 10;

deactivateForm();

getData((advertisements) => {
  activateForm();
  createMarkers(advertisements.slice(0, MARKERS_COUNT));

  addFiltersHandler(debounce(() => {
    resetMarkers();
    createMarkers(addFilterOnAds(advertisements).slice(0, MARKERS_COUNT));
  }));

  addListenersOnForm(() => {
    createMarkers(advertisements.slice(0, MARKERS_COUNT));
  });

  addUserFormSubmitHandler(() => {
    createMarkers(advertisements.slice(0, MARKERS_COUNT));
  });

  setListenerInputFile();

});
