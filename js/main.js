import {createAdvertisements, OBJECT_COUNT} from './mock.js';
import {renderCard} from './card.js';
const adsData = createAdvertisements(OBJECT_COUNT);
renderCard(adsData[0]);
