const DEFAULT_PICTURE_URL = 'img/muffin-grey.svg';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const userPictureSettings = {
  width: '70',
  height: '70',
  alt : 'Фотография вашего жилья',
};

const avatarInput = document.querySelector('.ad-form-header__input');
const houseImgInput = document.querySelector('.ad-form__input');
const previewAvatar = document.querySelector('.ad-form-header__preview').querySelector('img');
const previewHouse = document.querySelector('.ad-form__photo');

const addChangePreviewAvatar = () => {

  const fileAvatar = avatarInput.files[0];
  const fileAvatarName = fileAvatar.name.toLowerCase();

  const matches = FILE_TYPES.some((fileType) => fileAvatarName.endsWith(fileType));

  if (matches) {
    previewAvatar.src = URL.createObjectURL(fileAvatar);
  }

};

const houseImg = document.createElement('img');
const createElement = (container) => {

  houseImg.width = userPictureSettings.width;
  houseImg.height = userPictureSettings.height;
  houseImg.alt = userPictureSettings.alt;
  return container.appendChild(houseImg);
};

const addChangePreviewHouse = () => {
  const fileHouse = houseImgInput.files[0];
  const fileHouseName = fileHouse.name.toLowerCase();

  const matches = FILE_TYPES.some((fileType) => fileHouseName.endsWith(fileType));

  if (matches) {
    const img = createElement(previewHouse);
    img.src = URL.createObjectURL(fileHouse);
  }

};

const resetPhotos = () => {
  previewAvatar.src = DEFAULT_PICTURE_URL;
  houseImg.remove();
};

const setListenerInputFile = () => {
  avatarInput.addEventListener('change', addChangePreviewAvatar);
  houseImgInput.addEventListener('change', addChangePreviewHouse);
};

export {setListenerInputFile, resetPhotos };
