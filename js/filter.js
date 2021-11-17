const ANY = 'any';
const priceMap = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: Infinity,
  },
};

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');

const checkFilterInputs = ({offer}) => {
  const checkedFeatures = mapFilters.querySelectorAll('input[name="features"]:checked');

  let isType = true;
  let isRooms = true;
  let isGuests = true;
  let isPrice = true;
  let isFeatures = true;

  if (checkedFeatures.length) {
    checkedFeatures.forEach((feature) => {
      if (!offer.features) {
        isFeatures = false;
      } else  if (offer.features.indexOf(feature.value) === -1) {
        isFeatures = false;
      }
    });
  }

  if (housingType.value !== ANY) {
    isType = offer.type === housingType.value;
  }

  if (housingRooms.value !== ANY) {
    isRooms = offer.rooms === Number(housingRooms.value);
  }

  if (housingGuests.value !== ANY) {
    isGuests = offer.guests === Number(housingGuests.value);
  }

  if (housingPrice.value !== ANY) {
    isPrice = offer.price >= priceMap[housingPrice.value].min && offer.price < priceMap[housingPrice.value].max;
  }

  return isType && isRooms && isGuests && isFeatures && isPrice;
};

const addFilterOnAds = (advertisements) => advertisements.filter(checkFilterInputs);

const addFiltersHandler = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb();
  });
};

export {addFilterOnAds, addFiltersHandler};
