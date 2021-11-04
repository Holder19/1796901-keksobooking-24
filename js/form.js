const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_PRICE_PER_NIGHT = 1000000;
const MIN_PRICE_PER_NIGHT = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const MAX_ROOMS = 100;
const NOT_FOR_GUESTS = 0;
const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('select, fieldset');
const userTitleInput = adForm.querySelector('#title');
const userPriceInput = adForm.querySelector('#price');
const formType = adForm.querySelector('#type');
const formGuests = adForm.querySelector('#capacity');
const formRooms = adForm.querySelector('#room_number');
const inTime = adForm.querySelector('#timein');
const outTime = adForm.querySelector('#timeout');

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

const checkValidityTitle = () => {
  const valueLength = userTitleInput.value.length;

  if (valueLength < MIN_LENGTH_TITLE) {
    userTitleInput.setCustomValidity(`Введите еще ${MIN_LENGTH_TITLE - valueLength} символов`);
  } else if (valueLength > MAX_LENGTH_TITLE) {
    userTitleInput.setCustomValidity(`Удалите ${MAX_LENGTH_TITLE - valueLength} символов`);
  } else {
    userTitleInput.setCustomValidity('');
  }

  userTitleInput.reportValidity();
};

const onInputTitle = () => {
  userTitleInput.addEventListener('input', checkValidityTitle);
};

const checkValidityPrice = () => {
  const minPrice = MIN_PRICE_PER_NIGHT[formType.value];
  const price = userPriceInput.value;

  userPriceInput.placeholder = minPrice;
  userPriceInput.min = minPrice;
  if (price > MAX_PRICE_PER_NIGHT) {
    userPriceInput.setCustomValidity(`Максимальная цена ${MAX_PRICE_PER_NIGHT}`);
  } else if (price < minPrice) {
    userPriceInput.setCustomValidity(`Минимальная цена ${minPrice}`);
  } else {
    userPriceInput.setCustomValidity('');
  }

  userPriceInput.reportValidity();
};

const onPriceChange = () => {
  formType.addEventListener('change', checkValidityPrice);
};

const checkValidityRooms = () => {
  const rooms = Number(formRooms.value);
  const guests = Number(formGuests.value);
  if (guests > rooms) {
    formGuests.setCustomValidity(`Максимальное количество гостей ${rooms}`);
  } else if (rooms === MAX_ROOMS && guests !== NOT_FOR_GUESTS) {
    formGuests.setCustomValidity('Не для гостей');
  } else {
    formGuests.setCustomValidity('');
  }

  formGuests.reportValidity();
};

const onRoomsChange = () => {
  formRooms.addEventListener('change', checkValidityRooms);
};

const checkIntime = () => {
  outTime.value = inTime.value;
};

const checkOutTime = () => {
  inTime.value = outTime.value;
};

const onTimeInChange = () => {
  inTime.addEventListener('change', checkIntime);
};

const onTimeOutChange = () => {
  outTime.addEventListener('change', checkOutTime);
};

const checkValidityForm = () => {
  onInputTitle();
  onPriceChange();
  onRoomsChange();
  onTimeInChange();
  onTimeOutChange();
};

export {checkValidityForm, deactivateForm, activateForm};

