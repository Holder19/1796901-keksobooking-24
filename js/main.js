import {addListenersOnForm} from './form.js';
import {createAdvertisements} from './mock.js';
import { createMarkers } from './map.js';
const MARKERS_COUNT = 10;

createMarkers(createAdvertisements(MARKERS_COUNT));
addListenersOnForm();

