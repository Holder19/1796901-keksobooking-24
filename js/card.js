const map = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const typesHousing = {
  flat: 'Квартира',
  palace: 'Дворец',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const renderCard = ({title, description, price, address, rooms,
  guests, checkin, checkout, type, photos, author, features}) => {
  const cardElement = cardTemplate.cloneNode(true);

  if (title) {
    cardElement.querySelector('.popup__title').textContent = title;
  } else {
    cardElement.querySelector('.popup__title').remove();
  }

  if (description) {
    cardElement.querySelector('.popup__description').textContent = description;
  } else {
    cardElement.querySelector('.popup__description').remove();
  }

  if (price) {
    cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  } else {
    cardElement.querySelector('.popup__text--price').remove();
  }

  if (address) {
    cardElement.querySelector('.popup__text--address').textContent = address;
  } else {
    cardElement.querySelector('.popup__text--address').remove();
  }

  if (rooms && guests) {
    cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  } else {
    cardElement.querySelector('.popup__text--capacity').remove();
  }

  if (checkin, checkout) {
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    cardElement.querySelector('.popup__text--time').remove();
  }

  if (type) {
    cardElement.querySelector('.popup__type').textContent = typesHousing[type];
  } else {
    cardElement.querySelector('.popup__type').remove();
  }

  if (photos) {
    const photoContainer =  cardElement.querySelector('.popup__photos');
    const photoItem = photoContainer.querySelector('.popup__photo');
    photoContainer.innerHTML = '';
    photos.forEach((photo) => {
      const photoElement = photoItem.cloneNode(true);
      photoElement.src = photo;
      photoContainer.appendChild(photoElement);
    });
  } else {
    cardElement.querySelector('.popup__photo').remove();
  }

  if (author) {
    const avatarItem = cardElement.querySelector('.popup__avatar');
    avatarItem.src = author.avatar;
  } else {
    cardElement.querySelector('.popup__avatar').remove();
  }

  if (features) {
    const featuresList = cardElement.querySelector('.popup__features');
    const featuresitems = featuresList.querySelectorAll('.popup__feature');
    featuresitems.forEach((featuresItem) => {
      const isNecessary = features.some(
        (feature) => featuresItem.classList.contains(`popup__feature--${feature}`),
      );
      if (!isNecessary) {
        featuresItem.remove();
      }
    });
  } else {
    cardElement.querySelector('.popup__features').remove();
  }

  map.appendChild(cardElement);
};

export {renderCard};
