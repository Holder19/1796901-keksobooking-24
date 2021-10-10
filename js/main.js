const getRandomPositiveFloat = (min, max, digits = 1) => {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
};

const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const TITLES = [
  'Дворец',
  'Квартира',
  'Дом',
  'Бунгало',
  'Отель',
];
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTION = [
  'Два шага и вы на пляже!',
  'Выход на прекрасную набережную с дворцами и памятниками',
  'Прекрасный вид на море',
  'Тихое уютное местечко',
  'Отличная квартирка с прекрасными соседями',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const OBJECT_COUNT = 10;

const getLocation = () => ({
  latitude: getRandomPositiveFloat(35.65, 35.7, 5),
  longitude: getRandomPositiveFloat(139.7, 139.8, 5),
});

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getArrayRandomLength = (array) => array.slice(getRandomPositiveInteger(1, array.length - 1));

const createOffer = () => {
  const location = getLocation();
  return {
    author: {
      avatar: `img/avatars/user0${getRandomPositiveInteger(1, 10)}.png`,
    },
    title: getRandomArrayElement(TITLES),
    address: `${location.latitude}, ${location.longitude}`,
    price: getRandomPositiveInteger(0, 100000),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomPositiveInteger(0, 15),
    guests: getRandomPositiveInteger(0, 10),
    checkin: getRandomArrayElement(CHECKIN),
    checkout: getRandomArrayElement(CHECKOUT),
    features: getArrayRandomLength(FEATURES),
    description: getRandomArrayElement(DESCRIPTION),
    photos: getArrayRandomLength(PHOTOS),
    location: location,
  };
};

const createOffers = Array.from({length: OBJECT_COUNT}, createOffer);

const createAdvertisements = (count) => [...Array(OBJECT_COUNT)].map(createOffer);

