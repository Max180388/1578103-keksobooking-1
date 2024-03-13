import { Сoordinates, SCALE_MAP, MAX_ADS_MARKERS } from './constants.js';
import { compareMarkers } from './filters.js';
import { createPopup } from './create-popup.js';

let loadingMap = false;
let centralPointLat = Сoordinates.LAT;
let centralPointLng = Сoordinates.LNG;

const map = L.map('map-canvas')
  .on('load', () => {
    loadingMap = true;
  })
  .setView({
    lat: Сoordinates.LAT,
    lng: Сoordinates.LNG,
  }, SCALE_MAP);


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const adPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const adsMarkerGroup = L.layerGroup().addTo(map);

const mainMarker = L.marker(
  {
    lat: Сoordinates.LAT,
    lng: Сoordinates.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);


const setMainMarkerMoveend = (cd) => {
  mainMarker.on('moveend', (e) => {
    centralPointLat = e.target.getLatLng().lat;
    centralPointLng = e.target.getLatLng().lng;
    cd();
  });
};

const createAdsMarkers = (ad) => {
  const { lat, lng } = ad.location;
  const adMarcker = L.marker(
    {
      lat,
      lng,
    },
    {
      adPinIcon,
    },
  );
  adMarcker
    .addTo(adsMarkerGroup)
    .bindPopup(createPopup(ad));
};


const showAdsMarkers = (ads) => {
  adsMarkerGroup.clearLayers();
  ads
    .sort(compareMarkers)
    .slice(0, MAX_ADS_MARKERS)
    .forEach((ad) => {
      createAdsMarkers(ad);
    });
};

const resetMap = () => {
  adsMarkerGroup.clearLayers();
  mainPinIcon
    .setLatLng({
      lat: Сoordinates.LAT,
      lng: Сoordinates.LNG,
    })
    .setView({
      lat: Сoordinates.LAT,
      lng: Сoordinates.LNG,
    }, SCALE_MAP);
};

export { loadingMap, showAdsMarkers, centralPointLat, centralPointLng, setMainMarkerMoveend };
