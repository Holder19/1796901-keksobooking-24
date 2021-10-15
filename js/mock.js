import {getRandomPositiveFloat, getRandomPositiveInteger, getRandomArrayElement, createAvatarNumber, getArrayRandomLength} from './utils.js';
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
const CHECK_IN_OUT = [
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

const createOffer = () => {
  const location = getLocation();
  return {
    author: {
      avatar: `img/avatars/user${createAvatarNumber(getRandomPositiveInteger(1, 10))}.png`,
    },
    title: getRandomArrayElement(TITLES),
    address: `${location.latitude}, ${location.longitude}`,
    price: getRandomPositiveInteger(0, 100000),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomPositiveInteger(0, 15),
    guests: getRandomPositiveInteger(0, 10),
    checkin: getRandomArrayElement(CHECK_IN_OUT),
    checkout: getRandomArrayElement(CHECK_IN_OUT),
    features: getArrayRandomLength(FEATURES),
    description: getRandomArrayElement(DESCRIPTION),
    photos: getArrayRandomLength(PHOTOS),
    location: location,
  };
};

const createAdvertisements = (count) => [...Array(count)].map(createOffer);

export {createAdvertisements, OBJECT_COUNT};
