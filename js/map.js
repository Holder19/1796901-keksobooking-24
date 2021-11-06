import {deactivateForm, activateForm} from './form.js';
import {renderCard} from './card.js';
import {createAdvertisements, OBJECT_COUNT} from './mock.js';
const initMap = () => {
  deactivateForm();
  const map = L.map('map-canvas')
    .on('load',activateForm)
    .setView({
      lat: 35.6895000,
      lng: 139.6917100,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    })
    .addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    {
      lat: 35.6895000,
      lng: 139.6917100,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  mainPinMarker.addTo(map);

  const address = document.querySelector('#address');

  const onMarkerMove = (evt) => {
    const lat = evt.target.getLatLng().lat.toFixed(5);
    const lng = evt.target.getLatLng().lng.toFixed(5);
    address.value = `${lat}, ${lng}`;
  };

  mainPinMarker.on('move', onMarkerMove);

  const advertisements = createAdvertisements(OBJECT_COUNT);
  advertisements.forEach ((advertisement) => {
    const pinIcon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: advertisement.location.lat,
        lng: advertisement.location.lng,
      },
      {
        icon: pinIcon,
      },
    );

    marker.addTo(map)
      .bindPopup(renderCard(advertisement));
  });

};
export {initMap};
