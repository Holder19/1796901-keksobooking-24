import {createAdvertisements, OBJECT_COUNT} from './mock.js';
import {renderCard} from './card.js';
import {addListenersOnForm, deactivateForm, activateForm} from './form.js';
const adsData = createAdvertisements(OBJECT_COUNT);
renderCard(adsData[0]);
addListenersOnForm();
