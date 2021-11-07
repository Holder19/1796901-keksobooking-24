import { renderCard } from './card.js';
import { activateForm , deactivateForm} from './form.js';
const DefaultSettingsMap = {
  LAT: 35.6895000,
  LNG: 139.6917100,
  ZOOM: 10,
};

const DefaultMainPinSettings = {
  WIDTH: 52,
  HEIGHT: 52,
  URL: '../img/main-pin.svg',
};

const DefaultPinSettings = {
  WIDTH: 40,
  HEIGHT: 40,
  URL: '../img/pin.svg',
};

const address = document.querySelector('#address');

deactivateForm();
const map = L.map('map-canvas')
  .on('load',activateForm)
  .setView({
    lat: DefaultSettingsMap.LAT,
    lng: DefaultSettingsMap.LNG,
  }, DefaultSettingsMap.ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  })
  .addTo(map);

const mainPinIcon = L.icon({
  iconUrl: DefaultMainPinSettings.URL,
  iconSize: [DefaultMainPinSettings.WIDTH, DefaultMainPinSettings.HEIGHT],
  iconAnchor: [(DefaultMainPinSettings.WIDTH / 2), DefaultMainPinSettings.HEIGHT],
});

const mainPinMarker = L.marker(
  {
    lat: DefaultSettingsMap.LAT,
    lng: DefaultSettingsMap.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

const onMarkerMove = (evt) => {
  const lat = evt.target.getLatLng().lat.toFixed(5);
  const lng = evt.target.getLatLng().lng.toFixed(5);
  address.value = `${lat}, ${lng}`;
};

mainPinMarker.on('move', onMarkerMove);

const markerGroup = L.layerGroup().addTo(map);
const createMarkers = (advertisements) => {
  advertisements.forEach((advertisement) => {
    const pinIcon = L.icon({
      iconUrl: DefaultPinSettings.URL,
      iconSize: [DefaultPinSettings.WIDTH, DefaultPinSettings.HEIGHT],
      iconAnchor: [(DefaultPinSettings.WIDTH / 2), DefaultPinSettings.HEIGHT],
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

    marker.addTo(markerGroup)
      .bindPopup(renderCard(advertisement));
  });
};

export {createMarkers};
