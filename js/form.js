import { sendData } from './api.js';
import {DefaultSettingsMap, resetMarkers } from './map.js';
import { isEscapeKey} from './utils.js';

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_PRICE_PER_NIGHT = 1000000;
const MAX_ROOMS = 100;
const NOT_FOR_GUESTS = 0;
const minPricePerNight = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('select, fieldset');
const inputTitle = adForm.querySelector('#title');
const inputPrice = adForm.querySelector('#price');
const inputType = adForm.querySelector('#type');
const inputGuests = adForm.querySelector('#capacity');
const inputRooms = adForm.querySelector('#room_number');
const inputInTimeIn = adForm.querySelector('#timein');
const inputTimeOut = adForm.querySelector('#timeout');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const address = adForm.querySelector('#address');

const deactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  adFormElements.forEach((adFormElement) => {
    adFormElement.disabled = true;
  });
  mapFiltersElements.forEach((mapFiltersElement) => {
    mapFiltersElement.disabled = true;
  });
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  adFormElements.forEach((adFormElement) => {
    adFormElement.disabled = false;
  });
  mapFiltersElements.forEach((mapFiltersElement) => {
    mapFiltersElement.disabled = false;
  });
};

const onTitleInput = () => {
  const valueLength = inputTitle.value.length;

  if (valueLength < MIN_LENGTH_TITLE) {
    inputTitle.setCustomValidity(`Введите еще ${MIN_LENGTH_TITLE - valueLength} символов`);
  } else if (valueLength > MAX_LENGTH_TITLE) {
    inputTitle.setCustomValidity(`Удалите ${MAX_LENGTH_TITLE - valueLength} символов`);
  } else {
    inputTitle.setCustomValidity('');
  }

  inputTitle.reportValidity();
};

const onPriceChange = () => {
  const minPrice = minPricePerNight[inputType.value];
  const price = inputPrice.value;

  inputPrice.placeholder = minPrice;
  inputPrice.min = minPrice;
  if (price > MAX_PRICE_PER_NIGHT) {
    inputPrice.setCustomValidity(`Максимальная цена ${MAX_PRICE_PER_NIGHT}`);
  } else if (price < minPrice) {
    inputPrice.setCustomValidity(`Минимальная цена ${minPrice}`);
  } else {
    inputPrice.setCustomValidity('');
  }

  inputPrice.reportValidity();
};

const onRoomsChange = () => {
  const rooms = Number(inputRooms.value);
  const guests = Number(inputGuests.value);
  if (guests > rooms) {
    inputGuests.setCustomValidity(`Максимальное количество гостей ${rooms}`);
  } else if (rooms === MAX_ROOMS && guests !== NOT_FOR_GUESTS) {
    inputGuests.setCustomValidity('Не для гостей');
  } else {
    inputGuests.setCustomValidity('');
  }

  inputGuests.reportValidity();
};

const onTimeInChange = () => {
  inputTimeOut.value = inputInTimeIn.value;
};

const onTimeOutChange = () => {
  inputInTimeIn.value = inputTimeOut.value;
};

const resetForm = () => {
  adForm.reset();
  resetMarkers();
  address.value = `${DefaultSettingsMap.LAT.toFixed(5)}, ${DefaultSettingsMap.LNG.toFixed(5)}`;
  mapFilters.reset();
};

const onSuccess = () => {
  const successMesage = successTemplate.cloneNode(true);
  document.body.appendChild(successMesage);

  successMesage.addEventListener('click', () => {
    successMesage.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      successMesage.remove();
    }
  });
  resetForm();
};

const onFail= () => {
  const errorMessage = errorTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');
  document.body.appendChild(errorMessage);
  errorMessage.addEventListener('click', () => {
    errorMessage.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      errorMessage.remove();
    }
  });
  errorButton.addEventListener('click', () => {
    errorMessage.remove();
  });
};

const onUserFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};

const addListenersOnForm = () => {
  inputTitle.addEventListener('input', onTitleInput);
  inputType.addEventListener('change', onPriceChange);
  inputRooms.addEventListener('change', onRoomsChange);
  inputGuests.addEventListener('change', onRoomsChange);
  inputInTimeIn.addEventListener('change', onTimeInChange);
  inputTimeOut.addEventListener('change', onTimeOutChange);
  adForm.addEventListener('reset', () => {
    resetForm();
  });
};

export {addListenersOnForm, deactivateForm, activateForm, onUserFormSubmit};

