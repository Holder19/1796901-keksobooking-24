import { showAlert } from './utils.js';

const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert('Ошибка получения данных сервера, попробуйте перезагрузить страницу!');
      }
    })
    .then((advertisements) => {
      onSuccess(advertisements);
    })
    .catch(() => {
      showAlert('Ошибка получения данных сервера, попробуйте перезагрузить страницу!');
    });
};


const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
